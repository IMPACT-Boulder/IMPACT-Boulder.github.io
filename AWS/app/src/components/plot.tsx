import React, { useEffect, useState } from 'react'; // Import React hooks
import Plotly from 'plotly.js-dist'; // Import Plotly library for data visualization
import DropDown from './axisDropdown'; // Import DropDown component for axis selection
import { DataItem } from './types'; // Import DataItem interface representing the dataset structure
import Button from '@mui/material/Button'; // Import Button component from Material-UI
import '../styles/Plot.css'; // Import CSS styles for the Plot component

/**
 * Props for the DustPlot component.
 * 
 * @interface DustPlotProps
 * @property {number} numberOfDataValues - The number of data points to be plotted.
 * @property {DataItem[]} data - The dataset to be visualized in the plot.
 */
interface DustPlotProps {
  numberOfDataValues: number; // Number of data points to be plotted
  data: DataItem[]; // Data array representing the dataset to be plotted
}

// Mapping of axis labels to user-friendly labels
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

/**
 * DustPlot component.
 * 
 * Renders an interactive Plotly chart visualizing the dust data, with customizable X and Y axes.
 * Users can toggle between linear and logarithmic scales for both axes and select different variables for plotting.
 * 
 * @component
 * @param {DustPlotProps} props - The props for the DustPlot component.
 * @returns {JSX.Element} The rendered DustPlot component.
 */
const DustPlot: React.FC<DustPlotProps> = ({ numberOfDataValues, data }) => {
  // State for X-axis variable
  const [xAxis, setXAxis] = useState<string>('Velocity');

  // State for Y-axis variable
  const [yAxis, setYAxis] = useState<string>('Mass');

  // State for X-axis scale type (linear or log)
  const [xAxisScaleType, setXAxisScaleType] = useState<'linear' | 'log'>('linear');

  // State for Y-axis scale type (linear or log)
  const [yAxisScaleType, setYAxisScaleType] = useState<'linear' | 'log'>('linear');

  // State to control the visibility of the key (legend)
  const [keyVisibility, setKeyVisibility] = useState<'none' | 'block'>('none');

  /**
   * Handle changes to the X-axis variable.
   * 
   * @param {string} axisType - The type of axis ('x' or 'y').
   * @param {string} selectedXAxis - The selected variable for the X-axis.
   */
  const handleXAxisChange = (axisType: string, selectedXAxis: string) => {
    if (axisType === 'x') {
      setXAxis(selectedXAxis); // Set the selected variable for the X-axis
    } else if (axisType === 'y') {
      setYAxis(selectedXAxis); // Set the selected variable for the Y-axis
    }
  };

  /**
   * Handle changes to the Y-axis variable.
   * 
   * @param {string} axisType - The type of axis ('x' or 'y').
   * @param {string} selectedYAxis - The selected variable for the Y-axis.
   */
  const handleYAxisChange = (axisType: string, selectedYAxis: string) => {
    if (axisType === 'y') {
      setYAxis(selectedYAxis); // Set the selected variable for the Y-axis
    } else if (axisType === 'x') {
      setXAxis(selectedYAxis); // Set the selected variable for the X-axis
    }
  };

  /**
   * Toggle between linear and logarithmic scale for the X-axis.
   */
  const toggleXAxisScaleType = () => {
    setXAxisScaleType(xAxisScaleType === 'linear' ? 'log' : 'linear'); // Toggle scale type
  };

  /**
   * Toggle between linear and logarithmic scale for the Y-axis.
   */
  const toggleYAxisScaleType = () => {
    setYAxisScaleType(yAxisScaleType === 'log' ? 'linear' : 'log'); // Toggle scale type
  };

  /**
   * Effect hook to update the plot when axis variables or data change.
   */
  useEffect(() => {
    if (data.length > 0) {
      setKeyVisibility('block'); // Show the key if data exists
    } else {
      setKeyVisibility('none'); // Hide the key if no data
    }

    console.log('Data:', data);

    const chartData = data;

    // Extracting data for plotting (limited by numberOfDataValues)
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

    const scalingFactor = 100000000; // Scaling factor for marker sizes (to visualize radii)
    const scaledRadii = limitedRadii.map((radius) => radius * scalingFactor);

    // Prepare the plot data
    const plotData = [
      {
        x: getXAxisData(xAxis, limitedVelocities, limitedCharges, limitedTraceNumbers, limitedRadii, limitedEstimateQualities, limitedMasses, limitedTimes),
        y: getYAxisData(yAxis, limitedVelocities, limitedCharges, limitedTraceNumbers, limitedRadii, limitedEstimateQualities, limitedMasses, limitedTimes),
        mode: 'markers',
        type: 'scatter',
        marker: {
          size: scaledRadii, // Marker size based on scaled radii
        },
        hoverinfo: 'text', // Information displayed on hover
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
      title: axisLabelMapping[xAxis] || xAxis, // Set the title based on axis label mapping
      automargin: true,
      type: xAxis === 'Time' ? 'date' : xAxisScaleType, // Handle time axis separately
    },
    yaxis: {
      zeroline: false,
      title: axisLabelMapping[yAxis] || yAxis, // Set the title based on axis label mapping
      automargin: true,
      type: yAxis === 'Time' ? 'date' : yAxisScaleType, // Handle time axis separately
    },
    margin: { l: 100, t: 20, b: 40, r: 20 },
    plot_bgcolor: "white",
    paper_bgcolor: "white",
  };

  // Render the plot using Plotly
  Plotly.newPlot('dust_plot', plotData, initialLayout).then(() => {
    // Update layout properties
    Plotly.relayout('dust_plot', {
      'yaxis.titlefont.size': 40,
      'yaxis.titlefont.color': 'black',
      'xaxis.titlefont.color': 'black',
      'yaxis.titlestandoff': 10,
      'yaxis.rotate': -45, // Rotate Y-axis title counter-clockwise
    });
  });
}, [xAxis, yAxis, data, numberOfDataValues, xAxisScaleType, yAxisScaleType]); // Re-run effect when dependencies change

/**
 * Effect hook to handle plot resizing when the window size changes.
 */
useEffect(() => {
  const updatePlot = () => {
    const dustPlot = document.getElementById('dust_plot'); // Get the plot element
    if (dustPlot && dustPlot.parentElement) {
      const currentWidth = dustPlot.offsetWidth;
      const containerWidth = dustPlot.parentElement.offsetWidth;
      const initialWidth = containerWidth * 0.9; // Set initial width to 90% of container
      if (currentWidth !== initialWidth) {
        Plotly.relayout('dust_plot', { width: initialWidth }); // Adjust plot width
      }
    }
  };

  updatePlot(); // Perform initial plot sizing
  window.addEventListener('resize', updatePlot); // Update plot size on window resize

  return () => {
    window.removeEventListener('resize', updatePlot); // Clean up event listener on component unmount
  };
}, []);

/**
 * Function to get data for the X-axis based on the selected variable.
 * 
 * @param {string} axis - The selected axis variable.
 * @param {number[]} velocities - Array of velocity values.
 * @param {number[]} charges - Array of charge values.
 * @param {number[]} traceNumbers - Array of trace number values.
 * @param {number[]} radii - Array of radius values.
 * @param {number[]} estimateQualities - Array of estimate quality values.
 * @param {number[]} masses - Array of mass values.
 * @param {number[]} times - Array of time values.
 * @returns {number[]} The array of values for the selected X-axis variable.
 */
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

/**
 * Function to get data for the Y-axis based on the selected variable.
 * 
 * @param {string} axis - The selected axis variable.
 * @param {number[]} velocities - Array of velocity values.
 * @param {number[]} charges - Array of charge values.
 * @param {number[]} traceNumbers - Array of trace number values.
 * @param {number[]} radii - Array of radius values.
 * @param {number[]} estimateQualities - Array of estimate quality values.
 * @param {number[]} masses - Array of mass values.
 * @param {number[]} times - Array of time values.
 * @returns {number[]} The array of values for the selected Y-axis variable.
 */
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
      <div id='key-1' className='key'> {/* Key for plot */}
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

export default DustPlot; // Exporting DustPlot component