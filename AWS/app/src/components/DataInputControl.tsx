//DataInputControl.tsx
import React, { useState } from 'react';
import TextBox from './inputLimit.tsx';
import VelocityLow from './VelocityRange/VelocityLow.tsx';
import VelocityHigh from './VelocityRange/VelocityHigh.tsx';
import QualityHigh from './EstimateQualityRange/QualityHigh.tsx';
import QualityLow from './EstimateQualityRange/QualityLow.tsx';
import MassLow from './MassRange/MassLow.tsx';
import MassHigh from './MassRange/MassHigh.tsx';
import ChargeLow from './ChargeRange/ChargeLow.tsx';
import ChargeHigh from './ChargeRange/ChargeHigh.tsx';
import RadiusLow from './RadiusRange/RadiusLow.tsx';
import RadiusHigh from './RadiusRange/RadiusHigh.tsx';
import TimeLow from './TimeRange/TimeLow.tsx';
import TimeHigh from './TimeRange/TimeHigh.tsx';
import DustType from './DustType.tsx';
import GroupName from './GroupName.tsx';
import TagDropdown from './TagDropDown.tsx';
import { convertToCSV } from './CSVUtils.ts';
import Button from '@mui/material/Button';
import '../styles/Controls.css';

interface DataInputControlProps {
  onDataUpdate: (data: any[]) => void;
}

interface FormState {
  limitValue: number;
  velLow: number;
  velHigh: number;
  qualLow: number;
  qualHigh: number;
  massLow: number;
  massHigh: number;
  chargeLow: number;
  chargeHigh: number;
  radiusLow: number;
  radiusHigh: number;
  timeLow: number;
  timeHigh: number | null;
  dustTypes: number[];
  groupNames: string[];
  tagNames: string[];
}

const DataInputControl: React.FC<DataInputControlProps> = ({ onDataUpdate }) => {
  const [formState, setFormState] = useState<FormState>({
    limitValue: 100,
    velLow: 0,
    velHigh: Infinity,
    qualLow: 0,
    qualHigh: 10,
    massLow: 0,
    massHigh: 1000000000000,
    chargeLow: 0,
    chargeHigh: 1000000000000,
    radiusLow: 0,
    radiusHigh: 1000000000000,
    timeLow: 0,
    timeHigh: null,
    dustTypes: [],
    groupNames: [],
    tagNames: [],
  });

  const [loading, setLoading] = useState(false);
  const [fetchTimestamp, setFetchTimestamp] = useState<number | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [actualArray, setActualArray] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleTagNamesChange = (value: string) => {
    console.log('Selected Tag Names:', value);
    setSelectedTag(value);
  };

  const handleLimitValueChange = (value: number) => {
    setFormState((prevFormState) => ({ ...prevFormState, limitValue: value }));
  };

  const handleDustTypeChange = (values: number[]) => {
    setFormState((prevFormState) => ({ ...prevFormState, dustTypes: values }));
  };

  const handleVelocityLowChange = (low: number) => {
    setFormState((prevFormState) => ({ ...prevFormState, velLow: low }));
  };

  const handleGroupNamesChange = (values: string[]) => {
    console.log('Selected Group Names:', values);
    setFormState((prevFormState) => ({ ...prevFormState, groupNames: values }));
  };

  const handleVelocityHighChange = (high: number) => {
    setFormState((prevFormState) => ({ ...prevFormState, velHigh: high }));
  };

  const handleQualityLowChange = (low: number) => {
    setFormState((prevFormState) => ({ ...prevFormState, qualLow: low }));
  };

  const handleQualityHighChange = (high: number) => {
    setFormState((prevFormState) => ({ ...prevFormState, qualHigh: high }));
  };

  const handleMassLowChange = (low: number) => {
    setFormState((prevFormState) => ({ ...prevFormState, massLow: low }));
  };

  const handleMassHighChange = (high: number) => {
    setFormState((prevFormState) => ({ ...prevFormState, massHigh: high }));
  };

  const handleChargeLowChange = (low: number) => {
    setFormState((prevFormState) => ({ ...prevFormState, chargeLow: low }));
  };

  const handleChargeHighChange = (high: number) => {
    setFormState((prevFormState) => ({ ...prevFormState, chargeHigh: high }));
  };

  const handleRadiusLowChange = (low: number) => {
    setFormState((prevFormState) => ({ ...prevFormState, radiusLow: low }));
  };

  const handleRadiusHighChange = (high: number) => {
    setFormState((prevFormState) => ({ ...prevFormState, radiusHigh: high }));
  };

  const handleTimeLowChange = (low: number) => {
    setFormState((prevFormState) => ({ ...prevFormState, timeLow: low }));
  };

  const handleTimeHighChange = (high: number | null) => {
    setFormState((prevFormState) => ({ ...prevFormState, timeHigh: high !== null ? high : prevFormState.timeHigh }));
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleFormSubmit();
    }
  };

  const handleFormSubmit = async () => {
    try {
      setLoading(true); // Set loading state to true when form is submitted

      const dustTypesParam = formState.dustTypes.join(',');
      const groupNamesParam = formState.groupNames.join(',');
      const tagNamesParam = selectedTag;
      const apiUrl = `https://10.247.29.177:3000/api/data?limit=${formState.limitValue}&velocityLow=${(formState.velLow)*1000}&velocityHigh=${(formState.velHigh)*1000}&qualityLow=${formState.qualLow}&qualityHigh=${formState.qualHigh}&massLow=${formState.massLow}&massHigh=${formState.massHigh}&chargeLow=${formState.chargeLow}&chargeHigh=${formState.chargeHigh}&radiusLow=${formState.radiusLow}&radiusHigh=${formState.radiusHigh}&timeLow=${formState.timeLow}&timeHigh=${formState.timeHigh}&dustType=${dustTypesParam}&groupName=${groupNamesParam}&tagName=${tagNamesParam}`;
      
      const response = await fetch(apiUrl);
      const rawData: string = await response.json();
      const parsedArray: any[] = JSON.parse(rawData);

      if (Array.isArray(parsedArray)) {
        onDataUpdate(parsedArray);
        setActualArray(parsedArray);
      } else {
        console.error('Data is not an array:', parsedArray);
        setErrorMessage('Error: Data is not in the expected format');
      }
      setFetchTimestamp(Date.now());
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('Error: Failed to fetch data');
    } finally {
      setLoading(false); // Set loading state to false when fetch operation completes
    }
  };

  const handleDownload = () => {
    // Check if data is available
    if (actualArray && actualArray.length > 0) {
      try {
        // Convert data to CSV
        const csvData = convertToCSV(actualArray);

        // Download the CSV file
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (error) {
        console.error('Error converting data to CSV:', error);
        setErrorMessage('Error: Failed to download data as CSV');
      }
    } else {
      console.error('No data available to download.');
      setErrorMessage('Error: No data available to download');
    }
  };

  return (
    <div id="box">
      <form onSubmit={handleFormSubmit}>
        <div id="controls" onKeyDown={handleKeyDown}>
          <div id="limit_box">
            <TextBox onChange={handleLimitValueChange} limitValueProp={formState.limitValue} />
          </div>
          <div id="constraints">
            <div id="constraints_top">
              <DustType onChange={handleDustTypeChange} selectedTypes={formState.dustTypes} />
              <GroupName onChange={handleGroupNamesChange} selectedGroups={formState.groupNames} />
              <TagDropdown onChange={handleTagNamesChange} selectedTag={selectedTag} />
            </div>
            <div id="constraints_main">
              <div className="controls">
                <h3>Lower Constraints</h3>
                <VelocityLow onChange={handleVelocityLowChange} velLowProp={formState.velLow} />
                <QualityLow onChange={handleQualityLowChange} qualLowProp={formState.qualLow} />
                <MassLow onChange={handleMassLowChange} massLowProp={formState.massLow} />
                <ChargeLow onChange={handleChargeLowChange} chargeLowProp={formState.chargeLow} />
                <RadiusLow onChange={handleRadiusLowChange} radiusLowProp={formState.radiusLow} />
                <TimeLow onChange={handleTimeLowChange} timeLowProp={formState.timeLow} />
              </div>
              <div className="controls">
                <h3>Upper Constraints</h3>
                <VelocityHigh onChange={handleVelocityHighChange} velHighProp={formState.velHigh} />
                <QualityHigh onChange={handleQualityHighChange} qualHighProp={formState.qualHigh} />
                <MassHigh onChange={handleMassHighChange} massHighProp={formState.massHigh} />
                <ChargeHigh onChange={handleChargeHighChange} chargeHighProp={formState.chargeHigh} />
                <RadiusHigh onChange={handleRadiusHighChange} radiusHighProp={formState.radiusHigh} />
                <TimeHigh onChange={handleTimeHighChange} timeHighProp={formState.timeHigh} />
              </div>
            </div>
          </div>
          <Button type="button" variant="contained" onClick={handleFormSubmit} id="submit">
            Submit
          </Button>
          <div id="loading">
            {loading && <p>Loading...</p>}
            {!loading && fetchTimestamp !== null && <p>Data fetched at: {new Date(fetchTimestamp).toLocaleString()}</p>}
          </div>
        </div>
        <Button type="button" variant="outlined" onClick={handleDownload} id="download">
          Download Data as CSV
        </Button>
      </form>
      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default DataInputControl;
