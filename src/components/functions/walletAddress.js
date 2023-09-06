import { ethers } from 'ethers';

var WAValidator = require('wallet-address-validator');


export async function validateAdddress(network,address)
{
    console.log(address)
   if(network=='Tron')
   {

      
       const options = {
        method: 'POST',
        headers: {accept: 'application/json', 'content-type': 'application/json'},
        body: JSON.stringify({address:address, visible: true})
      };
      
    const response = await fetch('https://api.trongrid.io/wallet/validateaddress', options)
        .then(response => response.json())
        .then(response =>{

            console.log('tron',response)
            return response
        } 
        )
        .catch(err => console.error(err));
        if(response.result==true)
        return true
        else
        return false
    } else{
       const valid = ethers.utils.isAddress(address)
       console.log('ether',valid)
       if(valid)
       {
        return valid
       }
       else{
        return false
       }

    }
}

// This will log 'This is a valid address' to the console.