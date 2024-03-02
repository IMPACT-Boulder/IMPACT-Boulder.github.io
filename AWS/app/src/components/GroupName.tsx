// // GroupName.tsx

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { sortBy } from 'lodash';

interface GroupNameProps {
  onChange: (groups: string[]) => void;
  selectedGroups: string[];
}

const GroupName: React.FC<GroupNameProps> = ({ onChange, selectedGroups }) => {
  const [groupsInputValue, setGroupsInputValue] = useState<string[]>(selectedGroups.map(String));
  const [groupNames, setGroupNames] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const fetchGroupNames = async () => {
      try {
        const response = await fetch('https://10.247.28.195:3000/api/group_names');
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data: { group_names: string[] }[] = await response.json();
        const extractedGroupNames = data.map((item) => item.group_names).flat();
        const sortedGroupNames = sortBy(extractedGroupNames);
        setGroupNames(sortedGroupNames);
      } catch (error) {
        console.error('Error fetching group names:', error);
        setErrorMessage('Cannot Connect to Server');
      }
    };

    fetchGroupNames();
  }, []);

  const handleDropDownChange = (value: string | string[]) => {
    setGroupsInputValue(Array.isArray(value) ? value : [value]);
  };

  const handleBlur = () => {
    onChange(groupsInputValue);
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '20ch' },
      }}
      noValidate
      autoComplete="off"
    >
      {errorMessage && <p>Error: {errorMessage}</p>}
      {groupNames.length > 0 && (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="label-group-name">Experiment Group</InputLabel>
          <Select
            labelId="label-group-name"
            id="select-group-name"
            value={groupsInputValue[0] || ''}
            label="Experiment Group"
            onChange={(e: SelectChangeEvent<string | string[]>) => handleDropDownChange(e.target.value)}
            onBlur={handleBlur}
          >
            {groupNames.map((groupName, index) => (
              <MenuItem key={groupName} value={groupName}>
                {groupName}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText></FormHelperText>
        </FormControl>
      )}
    </Box>
  );
};

export default GroupName;

// import React, { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import InputLabel from '@mui/material/InputLabel';
// import FormHelperText from '@mui/material/FormHelperText';
// import { sortBy } from 'lodash';

// interface GroupNameProps {
//   onChange: (groups: string[]) => void;
//   selectedGroups: string[];
// }

// const GroupName: React.FC<GroupNameProps> = ({ onChange, selectedGroups }) => {
//   const [groupsInputValue, setGroupsInputValue] = useState<string[]>(selectedGroups.map(String));
//   const [groupNames, setGroupNames] = useState<string[]>([]);
//   const [errorMessage, setErrorMessage] = useState<string>('');

//   useEffect(() => {
//     const fetchGroupNames = async () => {
//       try {
//         const response = await fetch('127.0.0.1:5000/api/group_names');
//         const data: { group_names: string[] }[] = await response.json();

//         const extractedGroupNames = data.map((item) => item.group_names).flat();
//         const sortedGroupNames = sortBy(extractedGroupNames);

//         // Prepend 'All' to the sorted group names
//         const groupNamesWithAll = ['All', ...sortedGroupNames];
//         setGroupNames(groupNamesWithAll);
//       } catch (error) {
//         console.error('Error fetching group names:', error);
//         setErrorMessage('Cannot Connect to Server');
//       }
//     };

//     fetchGroupNames();
//   }, []);

//   const handleDropDownChange = (value: string | string[]) => {
//     setGroupsInputValue(Array.isArray(value) ? value : [value]);
//   };

//   const handleBlur = () => {
//     onChange(groupsInputValue);
//   };

//   return (
//     <Box
//       component="form"
//       sx={{
//         '& > :not(style)': { m: 1, width: '20ch' },
//       }}
//       noValidate
//       autoComplete="off"
//     >
//       {groupNames.length > 0 && (
//         <FormControl sx={{ m: 1, minWidth: 120 }}>
//           <InputLabel id="label-group-name">Experiment Group</InputLabel>
//           <Select
//             labelId="label-group-name"
//             id="select-group-name"
//             value={groupsInputValue[0] || ''}
//             label="Experiment Group"
//             onChange={(e: SelectChangeEvent<string | string[]>) => handleDropDownChange(e.target.value)}
//             onBlur={handleBlur}
//           >
//             {groupNames.map((groupName, index) => (
//               <MenuItem key={groupName} value={groupName}>
//                 {groupName}
//               </MenuItem>
//             ))}
//           </Select>
//           <FormHelperText></FormHelperText>
//         </FormControl>
//       )}
//     </Box>
//   );
// };

// export default GroupName;
