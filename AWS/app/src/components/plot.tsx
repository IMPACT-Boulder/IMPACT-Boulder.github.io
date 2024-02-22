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

const DustPlot: React.FC<DustPlotProps> = ({ numberOfDataValues, data, }) => {
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

  const chartData = data;

  const limitedDataItems: DataItem[] = chartData.slice(0, numberOfDataValues || 1);

  console.log('Limited Data Items:', limitedDataItems); // Add this logging statement

  const plotData = {
    x: limitedDataItems.map(item => item[xAxis]), // Use dynamic property access to get x values
    y: limitedDataItems.map(item => item[yAxis]), // Use dynamic property access to get y values
    mode: 'markers',
    type: 'scatter',
    marker: {
      size: limitedDataItems.map(item => item.Radius * 100000000), // Scale radius directly here
    },
    hoverinfo: 'text',
    text: limitedDataItems.map(item =>
      `Velocity[ km/s ]: ${item.Velocity}<br>Mass [ kg ]: ${item.Mass}<br>Charge[ C ]: ${item.Charge}<br>Original Radius[ m ]: ${item.Radius}<br>Trace Number: ${item.TraceNumber}<br>Estimate Quality: ${item.EstimateQuality}<br>Velocity[ km/s ]: ${item.Velocity}<br>Time [ MST ]: ${item.Time}<br>Dust Type: ${item.DustName}<br>Tag: ${item.Tag}`,
    ),
  };

  console.log('Plot Data:', plotData); // Add this logging statement

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

  console.log('Layout', layout); // Add this logging statement

  Plotly.newPlot('dust_plot', [plotData], layout); // Wrap plotData in an array

}, [xAxis, yAxis, data, numberOfDataValues]);


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
