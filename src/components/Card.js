import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import QRCode from "react-qr-code";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import { collection, getDocs } from "firebase/firestore";
import database from './firebase/firebase';
import { CircularProgress } from '@mui/material';
import DropDown from '../features/dropDown';
import { ethers } from 'ethers';
import { adminWallet, bscProvider, ethProvider } from './constants';
import ManualAccountModal from './modals/Manual.modal';
import { getTransactionDetails } from './functions/web3Functions';
import { getUsdToInr } from '../apis/currency';
const {Web3} = require('web3');

export default function ManualCard() {
  const [txHash, setTxHash] = React.useState()
  const [walletAddress, setWalletAddress] = React.useState()
  const [load,setLoad] = React.useState(false)
  const [network,setNetwork] = React.useState('')
  const [open,setOpen] = React.useState(false)
  const [ amount, setAmount] = React.useState()
  const [loading,setLoading] = React.useState(false)
  const getTransactions = async ()=>{
       
      const response =await getDocs(collection(database, "transactions"))
          .then((querySnapshot)=>{               
              const newData = querySnapshot.docs
                  .map((doc) => ({...doc.data(), id:doc.id }))
                  
                 
              setLoad(false)
              return newData
          })

          return response
     
  
  }
  React.useEffect(()=>{
    console.log(network)
  },[network])
  return (
    <div className='App'>

    <Card sx={{ maxWidth: 345, marginTop:5 }}>
    <Typography gutterBottom variant="h5" component="div">
          Sell USDT manually
        </Typography>
        <QRCode value="0xC4d937B3dF224D58FcC5F31D4B8a64F725C7688e" />
      <CardContent>
        
        <Typography variant="body2" color="text.secondary">
          Scan the QR code above and send USDT to that address.
          After transaction, enter the transaction hash below to confirm
        </Typography>
        <Stack spacing={2}>
        <form
        >
              <FormControl>
                <DropDown network={network} setNetwork={setNetwork}/>
                <FormLabel>Transaction Hash</FormLabel>
                <Input
                  autoFocus
                  required
                 value={txHash}
                  onChange={(e) => {
                    setTxHash(e.target.value)
                  }}
                />
                </FormControl>
                <FormControl>
                <FormLabel>Wallet address</FormLabel>
                <Input
                  autoFocus
                  required
                 value={walletAddress}
                  onChange={(e) => {
                    setWalletAddress(e.target.value)
                  }}
                />
              </FormControl>
              </form>
              </Stack>
      </CardContent>
      <CardActions>
        <Button size="medium" type='submit' onClick={async ()=>{
          setLoad(true)
          let provider

          await getTransactions()
          .then(async (response)=>{
            console.log(response)
            if(response)
            {

              let found
              response.map(async (data)=>{
                console.log(data.txHash)
                if(data.txHash == txHash)
                {
                  found = true
                  return
                }
              })

                if(!found)
                {
                  alert('Transaction already exists. please use a different hash')
                  return
                }
                else{
                  if(network==='Binance')
                  {
                    var web3 = new Web3(bscProvider);

                    provider = new ethers.providers.JsonRpcProvider(bscProvider)
                    console.log(provider)
                    const txReceipt = await provider.getTransactionReceipt(txHash)
                    console.log("value",txReceipt)
                    const toAddress = await web3.eth.abi.decodeParameter('address',txReceipt.logs[0].topics[2])
                    console.log('to', toAddress)
                    if(txReceipt.from===walletAddress&&toAddress===adminWallet)
                    {
                      //setOpen(true) 0xa527c1085e5f71a9e1a37d1e371ed71043cecd776255083eaf280227bf6fe897 0x5C9Fc43F845425a661A1B3D5e7132076600E3395
                      const amount = await getTransactionDetails(txHash)
                      console.log(amount)
                      const exchangeRate = await getUsdToInr()
                      const amountInRupee = Number(amount)*Number(exchangeRate)
                      console.log(amountInRupee)
                      setAmount(amountInRupee)
                      setOpen(true)
                      setLoad(false)
                      alert('New transaction found')
                      return
                    }
                  }else if(network==='Ethereum')
                  {
                    var web3 = new Web3(ethProvider);

                    provider = new ethers.providers.JsonRpcProvider(ethProvider)
                    console.log(provider)
        
                    const txReceipt = await provider.getTransactionReceipt(txHash)
                    console.log("value",txReceipt)
                    const toAddress = await web3.eth.abi.decodeParameter('address',txReceipt.logs[0].topics[2])
                    console.log('to', toAddress)
                    if(txReceipt.from===walletAddress&&toAddress===adminWallet)
                    {
                      //setOpen(true) 0xa527c1085e5f71a9e1a37d1e371ed71043cecd776255083eaf280227bf6fe897 0x5C9Fc43F845425a661A1B3D5e7132076600E3395
                      const amount = await getTransactionDetails(txHash)
                      console.log(amount)
                      const exchangeRate = await getUsdToInr()
                      const amountInRupee = Number(amount)*Number(exchangeRate)
                      console.log(amountInRupee)
                      setAmount(amountInRupee)
                      setOpen(true)
                      setLoad(false)
                      alert('New transaction found')
                      return
                    }
                  }
                  else{
                    return alert('network not supported yet')
                  }

                }

            }
          })
        }}>{load?<CircularProgress color="inherit" size={18} /> :'Next'}</Button>

      </CardActions>
    </Card>
    <ManualAccountModal open={open} setOpen={setOpen} amount={amount} setLoading={setLoading} txHash={txHash}/>
        </div>
  );
}