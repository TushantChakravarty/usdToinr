import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import {
  FaAmazonPay,
  FaApplePay,
  FaBeer,
  FaCcMastercard,
  FaCcPaypal,
  FaCcVisa,
  FaGooglePay,
} from "react-icons/fa";
import useWindowSize from "@rooks/use-window-size";
import SvgIcon from "@mui/material/SvgIcon";
import paytm from '../../assets/4.png'
import phonepay from '../../assets/5.png'

export default function DropDownWallett({data, setData}) {
  const [age, setAge] = React.useState('');
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();

  const handleChange = (event) => {
   // setAge(event.target.value);
    console.log(event.target.value)
    setData({
      ...data,
      wallet:event.target.value
    })
  };

  return (
    <Box sx={{ width:innerWidth<700?'95%':'100%', marginTop:2, display:'flex', marginLeft:innerWidth<700?2:0 }}>
      <FormControl  size='small'>

        <InputLabel id="implementation-status" style={{ marginleft: 10,top:"-20%"}}>Select Wallet</InputLabel>
        <Select
         labelStyle={{ color: 'blue' }}
         sx={{
           color: "blue",
           '.MuiOutlinedInput-notchedOutline': {
             borderColor: 'blue',
           },
           '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
             borderColor: 'blue',
           },
           '&:hover .MuiOutlinedInput-notchedOutline': {
             borderColor: 'blue',
           },
           '.MuiSvgIcon-root ': {
             fill: "blue",
           }
         }}
         labelId="select-filter-by-field-labe;"
         id="select-filter-by-field"
          value={data.wallet}
          label="Wallet"
          size='small'
          onChange={handleChange}
          renderValue={(value)=>{
            return(

          <Box sx={{ display: "flex", gap: 1 }}>
            <SvgIcon color="primary">
                
              </SvgIcon>
              {value==='Gpay'&&(<FaGooglePay/>)}
                {value==='Amazon pay'&&(<FaAmazonPay/>)}
                {value==='Phone pay'&&( <img src={phonepay} style={{
              height:20,
              width:20
            }} />)}
               
                {value==='Apple pay'&&(<FaApplePay/>)}

              {value==='Paytm'&&(<img src={paytm} style={{
              height:20,
              width:20
            }} />)}
            {value}
          </Box>
              )
          }}
          style={{
            backgroundColor:'white'
          }}
        >
          <MenuItem value={'Gpay'} >
            <ListItemIcon >
              <FaGooglePay />
            </ListItemIcon>
            <ListItemText>Google Pay</ListItemText>
            </MenuItem>
          <MenuItem value={'Phone pay'}><ListItemIcon>
          <img src={phonepay} style={{
              height:20,
              width:20
            }} />
            </ListItemIcon>
            <ListItemText>Phone Pay</ListItemText></MenuItem>
          <MenuItem value={'Amazon pay'}><ListItemIcon>
              <FaAmazonPay/>
            </ListItemIcon>
            <ListItemText>Amazon Pay</ListItemText></MenuItem>
            <MenuItem value={'Apple pay'}><ListItemIcon>
            <FaApplePay/>
            </ListItemIcon>
            <ListItemText>Apple Pay</ListItemText></MenuItem>
            <MenuItem value={'Paytm'}><ListItemIcon>
            <img src={paytm} style={{
              height:20,
              width:20
            }} />
            </ListItemIcon>
            <ListItemText>PayTM</ListItemText></MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}