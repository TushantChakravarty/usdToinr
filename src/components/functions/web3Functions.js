//import Web3 from 'web3';
import Moralis from "moralis"
import { EvmChain }  from "@moralisweb3/common-evm-utils";
const {Web3} = require('web3');
const { bscProvider, adminWallet, ethProvider } = require('../constants');
const TronWeb = require("tronweb");
const TronTxDecoder = require('tron-tx-decoder');
 
const decoder = new TronTxDecoder({ mainnet: false });
 const fullNode = 'https://api.shasta.trongrid.io';
const solidityNode = 'https://api.shasta.trongrid.io';
const eventServer = 'https://api.shasta.trongrid.io';
var privateKey = "45BA0740DE75DB71C23811139F27438254EC2A83F5A531E01EB567E7466E8F1D"
const tronWeb = new TronWeb(fullNode,solidityNode,eventServer,privateKey);
// => 1.0.0-beta.34

export const getTransactionDetails = async (hash,allTransactions,network)=>{
    //let allTransactions=[]
    let provider = network=='Ethereum'?ethProvider:network==='Binance'?bscProvider:bscProvider
    var web3 = new Web3(provider);
    const transaction = await web3.eth.getTransactionReceipt(hash)
    .then(async (response)=>{
        //console.log(response.logs[0])
        const addressFrom = await web3.eth.abi.decodeParameter('address',response.logs[0].topics[1])
        const addressTo = await web3.eth.abi.decodeParameter('address',response.logs[0].topics[2])
       // console.log(addressTo,addressFrom)
       const decodeParam = await web3.eth.abi.decodeParameter('uint256',response.logs[0].data)
       const value = web3.utils.fromWei(decodeParam,'ether')
       //console.log(value)
       if(addressFrom&&addressTo==adminWallet&&value)
       {
        allTransactions.push({
          addressFrom:addressFrom,
          addressTo:addressTo,
          value:value,
          txHash:hash
        })
       }
       return value
    })
    return allTransactions
    
   // console.log(transaction)
}
export const startMoralis = async ()=>{
    await Moralis.start({
        apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjVlNThkOTUxLTM4N2MtNGQ4YS1hYWVkLWIyYmNlOWM5NDhjZCIsIm9yZ0lkIjoiMjIwNzUwIiwidXNlcklkIjoiMjIwNTkxIiwidHlwZUlkIjoiYjdhZmY1YzctNjFhMy00ZTFmLTlkNmQtMmFjNmE4YjQ3YzYyIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODQ0MDU0MjQsImV4cCI6NDg0MDE2NTQyNH0.bLk4kuAHjftGqLnyArEn_wkzl5bGd0xGmxqywToZOys",
      });
}
export const getAllTransactions = async (address,network)=>{
    
   
    
      //const address = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045";
    
      const chain = network=='Ethereum'?EvmChain.GOERLI: network=='Binance'?EvmChain.BSC_TESTNET:EvmChain.BSC_TESTNET;
    
      const response = await Moralis.EvmApi.transaction.getWalletTransactions({
        address,
        chain,
      });
    
     // console.log(response.result[0]);
      const transactions = response.result
      let allTransactions =[]
      const userTransactions = transactions.map(async (item)=>{
      //console.log(item.to._value,'0x337610d27c682E347C9cD60BD4b3b107C9d34dDd')
       if(item.to._value.toLowerCase()=='0x337610d27c682E347C9cD60BD4b3b107C9d34dDd'.toLowerCase())
       {

        await getTransactionDetails(item.hash,allTransactions,network)
       }
        //console.log(details)
        
      })
      //console.log('user tx',allTransactions)
      return allTransactions
    
}

export const getUserTronTransactions = async (address)=>{
  const options = {method: 'GET',  headers: {accept: 'application/json'}};
  // TNjjEPxABffHAzVZnfrun4KbjReZJ34Zcs
 const response =await fetch(`https://api.shasta.trongrid.io/v1/accounts/${address}/transactions`, options)
    .then(response => response.json())
    .then(response => {
      //console.log(response.data)
     return response.data
    })
    .catch(err => console.error(err));
  return response
}

export const getTronBalance = async (address)=>{
  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {accept: 'application/json', 'content-type': 'application/json'},
    body: JSON.stringify({address: address, visible: true})
  };
  
  fetch('https://api.shasta.trongrid.io/wallet/getaccount', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err))
}

export const createTronWallet =async()=>{
  const fullNode = 'https://nile.trongrid.io';
const solidityNode = 'https://nile.trongrid.io';
const eventServer = 'https://nile.trongrid.io';
var privateKey = "45BA0740DE75DB71C23811139F27438254EC2A83F5A531E01EB567E7466E8F1D"
console.log("Private Key", privateKey);
const tronWeb = new TronWeb(fullNode,solidityNode,eventServer,privateKey);
const wallet = await tronWeb.createAccount()
console.log(wallet)
//A1DE3F4F4CEB3C53440F25498DE1627BCB0204ACC56C48672D6C955C6EF19718
//TTv8tvdpaKWbstbfRn5fiGJuXfk3yUWwvM
}
export const getTronTransactionDetails = async (hash,allTx)=>{
  const decodeTx = await decoder.decodeInputById(hash)
  const addressToHex = decodeTx.decodedInput[0]
  const addressTo = tronWeb.address.fromHex(addressToHex)
  console.log(addressTo)
  if(typeof(addressTo)==='string' && addressTo=='TDnTU6qKv4fNAqdWoFgGW1zBeubNvRiuj6')
  {
    allTx.push({
      hash:hash,
      addressTo:addressTo
    })
  }
  return allTx
  // const options = {
  //   method: 'POST',
  //   headers: {accept: 'application/json', 'content-type': 'application/json'},
  //   body: JSON.stringify({value: hash})
  // };
  
  // fetch('https://api.shasta.trongrid.io/wallet/gettransactioninfobyid', options)
  //   .then(response => response.json())
  //   .then(response =>{

  //     console.log(response.log[0].topics[2])
  //     console.log(decoder.decodeInputById(hash))
  //     console.log(tronWeb.address.fromHex(response.log[0].topics[2]))
  //     console.log(tronWeb.address.fromHex('0xF557F4d60D6276A7d87E46fE8eC14E93e6e6ABA5'))
  //   } 
  //   )
  //   .catch(err => console.error(err))
}