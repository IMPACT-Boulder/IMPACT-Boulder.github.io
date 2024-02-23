// plot.tsx
import React, { useEffect, useState } from 'react';
import Plotly from 'plotly.js-dist';
import DropDown from './axisDropdown.tsx';
import { DataItem } from './types';

interface DustPlotProps {
  numberOfDataValues: number;
  data: DataItem[];
}

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
  const [xAxis, setXAxis] = useState<string>('Mass');
  const [yAxis, setYAxis] = useState<string>('Velocity');

  const handleAxisChange = (axisType: string, selectedAxis: string) => {
    if (axisType === 'x') {
      setXAxis(selectedAxis);
    } else if (axisType === 'y') {
      setYAxis(selectedAxis);
    }
  };

  const [keyVisibility, setKeyVisibility] = useState<'none' | 'block'>('none');

  useEffect(() => {
    if (data.length > 0) {
      setKeyVisibility('block');
    } else {
      setKeyVisibility('none');
    }

    console.log('Data:', data);

    const chartData = data;

    const limitedVelocities = chartData.map((item) => item['Velocity (km/s)']).slice(0, numberOfDataValues || 1);
    const limitedMasses = chartData.map((item) => item['Mass (kg)']).slice(0, numberOfDataValues || 1);
    const limitedCharges = chartData.map((item) => item['Charge (C)']).slice(0, numberOfDataValues || 1);
    const limitedTraceNumbers = chartData.map((item) => item['Trace Number']).slice(0, numberOfDataValues || 1);
    const limitedEstimateQualities = chartData.map((item) => item['Estimate Quality']).slice(0, numberOfDataValues || 1);
    const limitedTimes = chartData.map((item) => item['Time']).slice(0, numberOfDataValues || 1);
    const limitedRadii = chartData.map((item) => item['Radius (m)']).slice(0, numberOfDataValues || 1);
    const limitedDataItems: DataItem[] = chartData.map((item) => ({
      'Mass (kg)': item['Mass'],
      'Velocity (km/s)': item['Velocity'],
      'Charge (C)': item['Charge'],
      'Trace Number': item['Trace Number'],
      'Radius (m)': item['Radius'],
      'Estimate Quality': item['Estimate Quality'],
      'Time': item['Time'],
      'Dust Name': item['Dust Name'],
      'Tag': item['Tag'],
    } as DataItem));
    

    const scalingFactor = 100000000;
    const scaledRadii = limitedRadii.map((radius) => radius * scalingFactor);

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
        text: scaledRadii.map((radius, index) =>
          `Velocity[ km/s ]: ${limitedVelocities[index]}<br>Mass [ kg ]: ${limitedMasses[index]}<br>Charge[ C ]: ${limitedCharges[index]}<br>Original Radius[ m ]: ${limitedRadii[index]}<br>Trace Number: ${limitedTraceNumbers[index]}<br>Estimate Quality: ${limitedEstimateQualities[index]}<br>Velocity[ km/s ]: ${limitedVelocities[index]}<br>Time [ MST ]: ${limitedTimes[index]}<br>Dust Type: ${limitedDataItems[index]['Dust Name']}<br>Tag: ${limitedDataItems[index]['Tag']}`,
        ),
      },
    ];

    const layout = {
      title: 'Dust Plot',
      xaxis: {
        zeroline: false,
        title: getXAxisTitle(xAxis),
        automargin: true,
        titlefont: {
          color: 'black',
        },
      },
      yaxis: {
        zeroline: false,
        title: getYAxisTitle(yAxis),
        automargin: true,
        titlefont: {
          color: 'black',
        },
      },
    };

    Plotly.newPlot('dust_plot', plotData, layout);
  }, [xAxis, yAxis, data, numberOfDataValues]);

  const getXAxisData = (axis: string, velocities: number[], charges: number[], traceNumbers: number[], radii: number[], estimateQualities: number[], masses: number[], times: number[]) => {
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

  const getXAxisTitle = (axis: string) => {
    return axis === '' ? '' : axisLabelMapping[axis] || axis;
  };

  const getYAxisTitle = (axis: string) => {
    return axis === '' ? '' : axisLabelMapping[axis] || axis;
  };

  return (
    <div id='plot_div'>
      <div id='axis-selectors'>
        <DropDown
          label='X axis'
          values={['', 'Mass', 'Velocity', 'Charge', 'Trace Number', 'Radius', 'Estimate Quality', 'Time']}
          onChange={(selectedAxis) => handleAxisChange('x', selectedAxis)}
        />
        <DropDown
          label='Y axis'
          values={['', 'Mass', 'Velocity', 'Charge', 'Trace Number', 'Radius', 'Estimate Quality', 'Time']}
          onChange={(selectedAxis) => handleAxisChange('y', selectedAxis)}
        />
      </div>
      <div id='plot'>
        <div id='dust_plot' />
        <div id='key' style={{ display: keyVisibility }}>
          <h2>Key:</h2>
          <p>Radius of markers are scaled 100,000,000 times larger than the actual radius.</p>
        </div>
      </div>
    </div>
  );
};

export default DustPlot;
