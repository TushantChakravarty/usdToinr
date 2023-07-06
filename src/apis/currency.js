import currencyapi from '@everapi/currencyapi-js'
const axios = require('axios');
export const getUsdToInr = async ()=>{

   
try{

    const client = new currencyapi('iW9bXxgwhcPPd5ady5NXlh1inqnPIp2ycTh4EEhc')
   const response = client.latest({
        base_currency:'USD',
        currencies:'INR'
    }).then(response => {
        console.log(response.data.INR.value)
        return response.data.INR.value
    });
    return response
}catch(error){
    console.log(error)
    return error
}
    
}