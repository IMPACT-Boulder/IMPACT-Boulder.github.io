//TagDropDown.tsx
import React, { useEffect, useState, lazy, Suspense } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { FixedSizeList } from 'react-window';

interface TagDropdownProps {
  onChange: (value: string) => void;
  selectedTag: string;
}

const LazyMenuItem = lazy(() => import('@mui/material/MenuItem'));

const TagDropdown: React.FC<TagDropdownProps> = ({ onChange, selectedTag }) => {
  const [tagNames, setTagNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchTagNames = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/tag_names?page=1');
        const data: { tag: string }[] = await response.json();
        const fetchedTagNames = data.map((item) => item.tag);
        console.log('Processed Tag Names:', fetchedTagNames);
        setTagNames(fetchedTagNames);
      } catch (error) {
        console.error('Error fetching tag names:', error);
      }
    };

    fetchTagNames();
  }, []);

  const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, tag: string) => {
    event.preventDefault(); // Prevent default behavior of the click event
    onChange(tag);
  };
  

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const tag = tagNames[index];
  
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <LazyMenuItem
          key={tag}
          value={tag}
          style={style}
          onClick={(event) => handleMenuItemClick(event, tag)} // Pass the event and tag
          selected={selectedTag === tag}
        >
          {tag}
        </LazyMenuItem>
      </Suspense>
    );
  };
  

  useEffect(() => {
    console.log('Selected Tag:', selectedTag);
  }, [selectedTag]);

  useEffect(() => {
    console.log('Tag Names:', tagNames);
  }, [tagNames]);

  console.log('Selected Tag:', selectedTag);

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '20ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="label-tag-names">Experiment Names</InputLabel>
        <Select
          labelId="label-tag-names"
          id="select-tag-names"
          value={selectedTag || ''}
          label="Experiment Names"
          onChange={(event) => onChange(event.target.value as string)}
          renderValue={(selected) => selected}
        >
          <FixedSizeList
            height={400}
            itemCount={tagNames.length}
            itemSize={40}
            width={200}
          >
            {Row}
          </FixedSizeList>
        </Select>
        <FormHelperText></FormHelperText>
      </FormControl>
    </Box>
  );
};

export default TagDropdown;
