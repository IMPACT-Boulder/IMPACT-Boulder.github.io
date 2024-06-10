import React, { useState } from 'react';
import TextBox from './inputLimit';
import VelocityLow from './VelocityRange/VelocityLow';
import VelocityHigh from './VelocityRange/VelocityHigh';
import QualityHigh from './EstimateQualityRange/QualityHigh';
import QualityLow from './EstimateQualityRange/QualityLow';
import MassLow from './MassRange/MassLow';
import MassHigh from './MassRange/MassHigh';
import ChargeLow from './ChargeRange/ChargeLow';
import ChargeHigh from './ChargeRange/ChargeHigh';
import RadiusLow from './RadiusRange/RadiusLow';
import RadiusHigh from './RadiusRange/RadiusHigh';
import TimeLow from './TimeRange/TimeLow';
import TimeHigh from './TimeRange/TimeHigh';
import DustType from './DustType';
import GroupName from './GroupName';
import TagDropdown from './TagDropDown';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import '../styles/Controls.css';
import '../styles/Error.css';

// Define types for props
interface DataInputControlProps {
  onDataUpdate: (data: any[]) => void; // Function to update data
}

// Define interface for form state
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
  selectedGroup: string;
}

// Define interface for error content
interface ErrorContent {
  html: string;
}

// DataInputControl component
const DataInputControl: React.FC<DataInputControlProps> = ({ onDataUpdate }) => {
  // State variables
  const [formState, setFormState] = useState<FormState>({
    limitValue: 100, // Default limit value
    velLow: 0, // Default low velocity value
    velHigh: Infinity, // Default high velocity value
    qualLow: 0, // Default low estimate quality value
    qualHigh: 10, // Default high estimate quality value
    massLow: 0, // Default low mass value
    massHigh: 1000000000000, // Default high mass value
    chargeLow: 0, // Default low charge value
    chargeHigh: 1000000000000, // Default high charge value
    radiusLow: 0, // Default low radius value
    radiusHigh: 1000000000000, // Default high radius value
    timeLow: 0, // Default low time value
    timeHigh: null, // Default high time value
    dustTypes: [], // Array to store selected dust types
    groupNames: [], // Array to store selected group names
    tagNames: [], // Array to store selected tag names
    selectedGroup: '', // Selected group name
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [fetchTimestamp, setFetchTimestamp] = useState<number | null>(null); // Timestamp when data is fetched
  const [selectedTag, setSelectedTag] = useState<string>(''); // Selected tag name
  // const [actualArray, setActualArray] = useState<any[]>([]); // Actual array of data
  const [errorMessage, setErrorMessage] = useState<string | ErrorContent>(''); // Error message

  // Function to handle change in tag names
  const handleTagNamesChange = (value: string) => {
    console.log('Selected Tag Names:', value);
    // Display error message if no tag names are selected
    setErrorMessage(
      value.length === 0
        ? {
            html: `
              <h1>Server Error</h1>
              <h2>Make sure you are connected to the LASP VPN</h2>
              <h2>Secure Socket Layer not yet configured. Open a new tab and enter 
              <a href='https://10.247.28.195:3000' target='_blank'> 'https://10.247.28.195:3000'</a>. 
              Click 'Advanced' or 'show details', and then choose to proceed. This issue is temporary.
            `,
          }
        : ''
    );

    setSelectedTag(value);
  };

  // Function to handle change in limit value
  const handleLimitValueChange = (value: number) => {
    setFormState((prevFormState) => ({ ...prevFormState, limitValue: value }));
  };

  // Function to handle change in dust type selection
  const handleDustTypeChange = (values: number[]) => {
    setFormState((prevFormState) => ({ ...prevFormState, dustTypes: values }));
  };

  // Function to handle change in low velocity value
  const handleVelocityLowChange = (low: number) => {
    setFormState((prevFormState) => ({ ...prevFormState, velLow: low }));
  };

  // Function to handle change in group names
  const handleGroupChange = (group: string) => {
    console.log('Selected Group Names:', group);
    // Display error message if no group names are selected
    setErrorMessage(
      group.length === 0
        ? {
            html: `
              <h1>Server Error</h1>
              <h2>Make sure you are connected to the LASP VPN</h2>
              <h2>Secure Socket Layer not yet configured. Open a new tab and enter 
              <a href='https://10.247.28.195:3000' target='_blank'> 'https://10.247.28.195:3000'</a>. 
              Click 'Advanced' or 'show details', and then choose to proceed. This issue is temporary.
            `,
          }
        : ''
    );
    setFormState((prevFormState) => ({ ...prevFormState, selectedGroup: group }));
    // Set the selectedGroup based on the first value in the array or empty string if no value
  };

  // Function to handle change in high velocity value
  const handleVelocityHighChange = (high: number) => {
    setFormState((prevFormState) => ({ ...prevFormState, velHigh: high }));
  };

  // Function to handle change in low estimate quality value
  const handleQualityLowChange = (low: number) => {
    setFormState((prevFormState) => ({ ...prevFormState, qualLow: low }));
  };

  // Function to handle change in high estimate quality value
  const handleQualityHighChange = (high: number) => {
    setFormState((prevFormState) => ({ ...prevFormState, qualHigh: high }));
  };

  // Function to handle change in low mass value
  const handleMassLowChange = (low: number) => {
    setFormState((prevFormState) => ({ ...prevFormState, massLow: low }));
  };

  // Function to handle change in high mass value
  const handleMassHighChange = (high: number) => {
    setFormState((prevFormState) => ({ ...prevFormState, massHigh: high }));
  };

  // Function to handle change in low charge value
  const handleChargeLowChange = (low: number) => {
    setFormState((prevFormState) => ({ ...prevFormState, chargeLow: low }));
  };

  // Function to handle change in high charge value
  const handleChargeHighChange = (high: number) => {
    setFormState((prevFormState) => ({ ...prevFormState, chargeHigh: high }));
  };

  // Function to handle change in low radius value
  const handleRadiusLowChange = (low: number) => {
    setFormState((prevFormState) => ({ ...prevFormState, radiusLow: low }));
  };

  // Function to handle change in high radius value
  const handleRadiusHighChange = (high: number) => {
    setFormState((prevFormState) => ({ ...prevFormState, radiusHigh: high }));
  };

  // Function to handle change in low time value
  const handleTimeLowChange = (low: number) => {
    setFormState((prevFormState) => ({ ...prevFormState, timeLow: low }));
  };

  // Function to handle change in high time value
  const handleTimeHighChange = (high: number | null) => {
    setFormState((prevFormState) => ({ ...prevFormState, timeHigh: high !== null ? high : prevFormState.timeHigh }));
  };

  // Function to handle key down event
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleFormSubmit(); // Submit form on Enter key press
    }
  };

  // Function to handle form submission
  const handleFormSubmit = async () => {
    try {
      setLoading(true); // Set loading state to true when form is submitted

      // Construct API URL with form values
      const dustTypesParam = formState.dustTypes.join(',');
      const groupNamesParam = formState.groupNames.join(',');
      const tagNamesParam = selectedTag;
      const apiUrl = `https://10.247.28.195:3000/api/data?limit=${formState.limitValue}&velocityLow=${(formState.velLow)*1000}&velocityHigh=${(formState.velHigh)*1000}&qualityLow=${formState.qualLow}&qualityHigh=${formState.qualHigh}&massLow=${formState.massLow}&massHigh=${formState.massHigh}&chargeLow=${formState.chargeLow}&chargeHigh=${formState.chargeHigh}&radiusLow=${formState.radiusLow}&radiusHigh=${formState.radiusHigh}&timeLow=${formState.timeLow}&timeHigh=${formState.timeHigh}&dustType=${dustTypesParam}&groupName=${groupNamesParam}&tagName=${tagNamesParam}`;
      
       // Log the API URL
      console.log('Fetch URL:', apiUrl);

      // Fetch data from API
      const response = await fetch(apiUrl);
      const rawData: string = await response.json();
      const parsedArray: any[] = JSON.parse(rawData);

      // Update data if response is an array
      if (Array.isArray(parsedArray)) {
        onDataUpdate(parsedArray); // Update data
        // setActualArray(parsedArray); // Set actual array state

      } else {
        console.error('Data is not an array:', parsedArray);
        setErrorMessage('Error: Data is not in the expected format'); // Set error message for invalid data format
      }
      setFetchTimestamp(Date.now()); // Set fetch timestamp
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('Error: Failed to fetch data'); // Set error message for fetch failure
    } finally {
      setLoading(false); // Set loading state to false when fetch operation completes
    }
  };

  return (
    <div id="box">
      {/* Error Modal */}
      {/* <div className={`error-modal ${errorMessage ? 'show' : ''}`}>
        <div className="error-modal-content">
          {/* Display error message */}
          {typeof errorMessage === 'string' ? (
            <p className="error-message">{errorMessage}</p>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: errorMessage.html }} />
          )}
        {/* </div> */}
      {/* </div> */} 
      {/* Form */}
      <form onSubmit={handleFormSubmit}>
        <div id="controls" onKeyDown={handleKeyDown}>
          {/* Limit Box */}
          <div id="limit_box">
            <TextBox onChange={handleLimitValueChange} limitValueProp={formState.limitValue} />
          </div>
          {/* Constraints */}
          <div id="constraints">
            {/* DustType, GroupName, and TagDropdown components */}
            <div id="constraints_top">
              {/* Dropdowns for selecting dust types, group names, and tags */}
              <DustType onChange={handleDustTypeChange} selectedTypes={formState.dustTypes} />
              <GroupName onChange={handleGroupChange} onGroupChange={handleGroupChange} selectedGroups={formState.selectedGroup} />
              <TagDropdown onChange={handleTagNamesChange} selectedTag={selectedTag} selectedGroup={formState.selectedGroup} tagNames={formState.tagNames} />
            </div>
            {/* Lower and Upper Constraints */}
            <div id="constraints_main">
              {/* Lower Constraints */}
              <div className="controls">
                <h3>Lower Constraints</h3>
                <div className='constraint_container'>
                  {/* Components for setting lower constraints */}
                  <VelocityLow onChange={handleVelocityLowChange} velLowProp={formState.velLow} />
                  <MassLow onChange={handleMassLowChange} massLowProp={formState.massLow} />
                  <ChargeLow onChange={handleChargeLowChange} chargeLowProp={formState.chargeLow} />
                  <RadiusLow onChange={handleRadiusLowChange} radiusLowProp={formState.radiusLow} />
                  <QualityLow onChange={handleQualityLowChange} qualLowProp={formState.qualLow} />
                  <TimeLow onChange={handleTimeLowChange} timeLowProp={formState.timeLow} />
                </div>
              </div>
              {/* Upper Constraints */}
              <div className="controls">
                <h3>Upper Constraints</h3>
                <div className='constraint_container'>
                  {/* Components for setting upper constraints */}
                  <VelocityHigh onChange={handleVelocityHighChange} velHighProp={formState.velHigh} />
                  <MassHigh onChange={handleMassHighChange} massHighProp={formState.massHigh} />
                  <ChargeHigh onChange={handleChargeHighChange} chargeHighProp={formState.chargeHigh} />
                  <RadiusHigh onChange={handleRadiusHighChange} radiusHighProp={formState.radiusHigh} />
                  <QualityHigh onChange={handleQualityHighChange} qualHighProp={formState.qualHigh} />
                  <TimeHigh onChange={handleTimeHighChange} timeHighProp={formState.timeHigh} />
                </div>
              </div>
            </div>
          </div>
          <div id='submit-load'>
            {/* Button for submitting form */}
            <Button type="button" variant="contained" onClick={handleFormSubmit} id="submit">
              Submit
            </Button>
            {/* Loading Indicator */}
            <div id="loading">
              {/* Display loading indicator */}
              {loading && <CircularProgress />}
              {/* Display fetch timestamp */}
              {!loading && fetchTimestamp !== null && <p>Data fetched at: {new Date(fetchTimestamp).toLocaleString()}</p>}
            </div>
          </div>
        </div>
        {/* //Download Button
        <Button type="button" variant="outlined" onClick={handleDownload} id="download">
          Download Data as CSV
        </Button> */}
      </form>
    </div>
  );
};

export default DataInputControl; // Exporting DataInputControl component
