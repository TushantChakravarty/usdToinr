const {Web3} = require('web3');
const { bscProvider } = require('../constants');
console.log(Web3.version);
// => 1.0.0-beta.34

export const getTransactionDetails = async (hash)=>{

    var web3 = new Web3(bscProvider);
    const transaction = await web3.eth.getTransactionReceipt(hash)
    .then(async (response)=>{
        console.log(response.logs[0].data)
       const decodeParam = await web3.eth.abi.decodeParameter('uint256',response.logs[0].data)
       const value = web3.utils.fromWei(decodeParam,'ether')
       console.log(decodeParam)
       console.log(value)
       return value
    })
    return transaction
    
   // console.log(transaction)
}