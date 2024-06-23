import React, { useEffect, useState } from 'react'; // Import React hooks
import Plotly from 'plotly.js-dist'; // Import Plotly library
import DropDown from './axisDropdown'; // Import DropDown component
import { DataItem } from './types'; // Import DataItem interface
import Button from '@mui/material/Button'; // Import Button component from Material-UI
import '../styles/Plot.css'; // Import CSS styles

interface DustPlotProps {
  numberOfDataValues: number; // Define prop types for DustPlot component
  data: DataItem[]; // Define prop types for DustPlot component
}

// Mapping of axis labels
const axisLabelMapping: Record<string, string> = {
  'Mass': 'Mass [ kg ]',
  'Velocity': 'Velocity [ km/s ]',
  'Charge': 'Charge [ C ]',
  'Trace Number': 'Trace Number',
  'Radius': 'Radius [ m ]',
  'Estimate Quality': 'Estimate Quality',
  'Time': 'Time [ MST ]',
  'Dust Name': 'Dust Name',
  'Tag': 'Tag',
};

const DustPlot: React.FC<DustPlotProps> = ({ numberOfDataValues, data }) => {
  // State hooks for axis settings
  const [xAxis, setXAxis] = useState<string>('Velocity');
  const [yAxis, setYAxis] = useState<string>('Mass');
  const [xAxisScaleType, setXAxisScaleType] = useState<'linear' | 'log'>('linear');
  const [yAxisScaleType, setYAxisScaleType] = useState<'linear' | 'log'>('linear');
  const [keyVisibility, setKeyVisibility] = useState<'none' | 'block'>('none');

  // Function to handle X axis change
  const handleXAxisChange = (axisType: string, selectedXAxis: string) => {
    if (axisType === 'x') {
      setXAxis(selectedXAxis);
    } else if (axisType === 'y') {
      setYAxis(selectedXAxis);
    }
  };

  // Function to handle Y axis change
  const handleYAxisChange = (axisType: string, selectedYAxis: string) => {
    if (axisType === 'y') {
      setYAxis(selectedYAxis);
    } else if (axisType === 'x') {
      setXAxis(selectedYAxis);
    }
  };

  // Function to toggle X axis scale type
  const toggleXAxisScaleType = () => {
    setXAxisScaleType(xAxisScaleType === 'linear' ? 'log' : 'linear');
  };

  // Function to toggle Y axis scale type
  const toggleYAxisScaleType = () => {
    setYAxisScaleType(yAxisScaleType === 'log' ? 'linear' : 'log');
  };

  // Effect hook to update plot
  useEffect(() => {
    if (data.length > 0) {
      setKeyVisibility('block');
    } else {
      setKeyVisibility('none');
    }

    console.log('Data:', data);

    const chartData = data;

    // Extracting limited data for plot
    const limitedVelocities = chartData.map((item) => item['Velocity (km/s)']).slice(0, numberOfDataValues || 1);
    const limitedMasses = chartData.map((item) => item['Mass (kg)']).slice(0, numberOfDataValues || 1);
    const limitedCharges = chartData.map((item) => item['Charge (C)']).slice(0, numberOfDataValues || 1);
    const limitedTraceNumbers = chartData.map((item) => item['Trace Number']).slice(0, numberOfDataValues || 1);
    const limitedEstimateQualities = chartData.map((item) => item['Estimate Quality']).slice(0, numberOfDataValues || 1);
    const limitedTimes = chartData.map((item) => item['Time']).slice(0, numberOfDataValues || 1);
    const limitedRadii = chartData.map((item) => item['Radius (m)']).slice(0, numberOfDataValues || 1);
    const limitedDataItems: DataItem[] = chartData.map((item) => ({
      Mass: item['Mass (kg)'],
      Velocity: item['Velocity (km/s)'],
      Charge: item['Charge (C)'],
      TraceNumber: item['Trace Number'],
      Radius: item['Radius (m)'],
      EstimateQuality: item['Estimate Quality'],
      Time: item['Time'],
      DustName: item['Dust Name'],
      Tag: item['Tag'],
    }) as DataItem);
    

    console.log('Data:', data);
    console.log('Mapped Data Items:', limitedDataItems);

    const scalingFactor = 100000000;
    const scaledRadii = limitedRadii.map((radius) => radius * scalingFactor);

    // Plot data
    const plotData = [
      {
        x: getXAxisData(xAxis, limitedVelocities, limitedCharges, limitedTraceNumbers, limitedRadii, limitedEstimateQualities, limitedMasses, limitedTimes),
        y: getYAxisData(yAxis, limitedVelocities, limitedCharges, limitedTraceNumbers, limitedRadii, limitedEstimateQualities, limitedMasses, limitedTimes),
        mode: 'markers',
        type: 'scatter',
        marker: {
          size: scaledRadii,
        },
        hoverinfo: 'text',
        text: scaledRadii.map((_, index) =>  // Use '_' as a placeholder to indicate unused parameter
        `<br> <br> <br>Velocity[ km/s ]: ${limitedVelocities[index]}<br>Mass [ kg ]: ${limitedMasses[index]}<br>Charge[ C ]: ${limitedCharges[index]}<br>Original Radius[ m ]: ${limitedRadii[index]}<br>Trace Number: ${limitedTraceNumbers[index]}<br>Estimate Quality: ${limitedEstimateQualities[index]}<br>Time [ MST ]: ${limitedTimes[index]}<br>Dust Type: ${limitedDataItems[index]['DustName']}<br>Experiment Name: ${limitedDataItems[index]['Tag']}`,
        ),
        hoverlabel: {
          bgcolor: '#A4D2FE',  // Background color of the hover label
          font: {
            color: '#000',  // Text color of the hover label
            size: 12,  // Font size of the hover label
          },
          bordercolor: '#000'  // Border color of the hover label
        }
      },
    ];

    // Plot layout
    const initialLayout = {
      xaxis: {
          zeroline: false,
          title: axisLabelMapping[xAxis] || xAxis,
          automargin: true,
          type: xAxis === 'Time' ? 'date' : xAxisScaleType,
      },
      yaxis: {
          zeroline: false,
          title: axisLabelMapping[yAxis] || yAxis,
          automargin: true,
          type: yAxis === 'Time' ? 'date' : yAxisScaleType,
      },
      margin: { l: 100, t: 20, b: 40, r: 20 },
      plot_bgcolor: "white",
      paper_bgcolor: "white",
  };

  Plotly.newPlot('dust_plot', plotData, initialLayout).then(() => {
      Plotly.relayout('dust_plot', {
          'yaxis.titlefont.size': 40,
          'yaxis.titlefont.color': 'black',
          'xaxis.titlefont.color': 'black',
          'yaxis.titlestandoff': 10,
          'yaxis.rotate': -45  // Using negative to rotate counter-clockwise
      });
  });
  }, [xAxis, yAxis, data, numberOfDataValues, xAxisScaleType, yAxisScaleType]);

  // Effect hook for plot resizing
  useEffect(() => {
    const updatePlot = () => {
      const dustPlot = document.getElementById('dust_plot');
      if (dustPlot && dustPlot.parentElement) {
        const currentWidth = dustPlot.offsetWidth;
        const containerWidth = dustPlot.parentElement.offsetWidth;
        const initialWidth = containerWidth * 0.9;
        if (currentWidth !== initialWidth) {
          Plotly.relayout('dust_plot', {
            width: initialWidth,
          });
        }
      }
    };

    updatePlot(); // Initial plot sizing

    window.addEventListener('resize', updatePlot);

    return () => {
      window.removeEventListener('resize', updatePlot);
    };
  }, []);

  // Function to get X axis data
  const getXAxisData = (axis: string, velocities: number[], charges: number[], traceNumbers: number[], radii: number[], estimateQualities: number[], masses: number[], times: number[]) => {
    switch (axis) {
      case 'Mass':
        return masses;
      case 'Charge':
        return charges;
      case 'Trace Number':
        return traceNumbers;
      case 'Radius':
        return radii;
      case 'Estimate Quality':
        return estimateQualities;
      case 'Time':
        return times;
      default:
        return velocities;
    }
  };

  // Function to get Y axis data
  const getYAxisData = (axis: string, velocities: number[], charges: number[], traceNumbers: number[], radii: number[], estimateQualities: number[], masses: number[], times: number[]) => {
    switch (axis) {
      case 'Velocity':
        return velocities;
      case 'Charge':
        return charges;
      case 'Trace Number':
        return traceNumbers;
      case 'Radius':
        return radii;
      case 'Estimate Quality':
        return estimateQualities;
      case 'Time':
        return times;
      default:
        return masses;
    }
  };

  return (
    <div id='plot_div'> {/* Container for the plot */}
      <div id='key_controls'>
        <div id='axis_selectors'> {/* Axis selectors container */}
          {/* Dropdown for X axis */}
          <div className='axis_selectors'>
            <DropDown
              label='X axis'
              values={['', 'Mass', 'Velocity', 'Charge', 'Trace Number', 'Radius', 'Estimate Quality', 'Time']}
              onChange={(selectedXAxis) => handleXAxisChange('x', selectedXAxis)}
            />
            {/* Button to toggle X axis scale type */}
            <Button variant="contained" onClick={toggleXAxisScaleType} id="x-scale-toggle">
              {xAxisScaleType === 'linear' ? 'Log Scale' : 'Linear Scale'}
            </Button>
          </div>

          {/* Dropdown for Y axis */}
          <div className='axis_selectors'>
            <DropDown
              label='Y axis'
              values={['', 'Mass', 'Velocity', 'Charge', 'Trace Number', 'Radius', 'Estimate Quality', 'Time']}
              onChange={(selectedYAxis) => handleYAxisChange('y', selectedYAxis)}
            />
            {/* Button to toggle Y axis scale type */}
            <Button variant="contained" onClick={toggleYAxisScaleType} id="y-scale-toggle">
              {yAxisScaleType === 'linear' ? 'Log Scale' : 'Linear Scale'}
            </Button>
          </div>
        </div>
        <div id='key-1' className='key' > {/* Key for plot */}
          <h2>Key:</h2>
          <p>Radius of markers are scaled 100,000,000 times larger than the actual radius.</p>
        </div>
      </div>
      <div id='plot'> {/* Plot container */}
        <div id='dust_plot' /> {/* Div for Plotly plot */}
      </div>
      <div id='key-2' className='key' style={{ display: keyVisibility }}>  {/*Key for plot*/}
          <h2>Key:</h2>
          <p>Radius of markers are scaled 100,000,000 times larger than the actual radius.</p>
        </div>
    </div>
  );
};

export default DustPlot; // exporting DustPlot component
