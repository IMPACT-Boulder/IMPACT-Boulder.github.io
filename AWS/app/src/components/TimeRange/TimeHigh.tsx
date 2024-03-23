//TimeHigh.tsx
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface TimeHighProps {
  onChange: (high: number | null) => void;
  timeHighProp: number | null;
}

const TimeHigh: React.FC<TimeHighProps> = ({ onChange, timeHighProp }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    timeHighProp ? new Date(timeHighProp) : null
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const unixTimestamp = date.getTime();
      onChange(unixTimestamp);
    }
  };

  const formatDate = (date: Date | null) => {
    return date ? date.toISOString().slice(0, -5) : '';
  };

  return (
    <div className='constraint'>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '100%', maxWidth: '20ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="yyyy-MM-dd HH:mm:ss.SSS"
          customInput={
            <TextField
              id="outlined-basic-high"
              label="Time YYYY-mm-dd HH:MM:SS.f"
              variant="outlined"
              value={formatDate(selectedDate)}
              onChange={() => {}}
              onBlur={() => {}}
            />
          }
        />
      </Box>
    </div>
  );
};

export default TimeHigh;