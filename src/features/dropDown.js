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
    <Box sx={{ minWidth: '20vw', padding:3}}>
      <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">Select Network</InputLabel>
        <Select
          style={{backgroundColor:'white'}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={network}
          label="network"
          onChange={handleChange}
        >
          <MenuItem value={'Ethereum'}>Ethereum</MenuItem>
          <MenuItem value={'Binance'}>Binance</MenuItem>
          <MenuItem value={'Tron'}>Tron</MenuItem>

        </Select>
      </FormControl>
    </Box>
  );
}