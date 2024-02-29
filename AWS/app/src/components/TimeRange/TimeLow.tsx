//TimeLow.tsx
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DatePicker from 'react-datepicker';
//import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/Time.css'

interface TimeLowProps {
  onChange: (low: number) => void;
  timeLowProp: number;
}

const TimeLow: React.FC<TimeLowProps> = ({ onChange, timeLowProp }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    timeLowProp ? new Date(timeLowProp) : null
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
    <Box
      component="form"
      // className="opaque-datepicker"
      sx={{
        '& > :not(style)': { m: 1, width: '20ch' },
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
  );
};

export default TimeLow;
