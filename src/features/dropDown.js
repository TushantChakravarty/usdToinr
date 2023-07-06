import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DropDown({network, setNetwork}) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setNetwork(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 150, padding:5 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Network</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={network}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={'Ethereum'}>Ethereum</MenuItem>
          <MenuItem value={'Binance'}>Binance</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}