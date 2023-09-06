import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import QRCode from "react-qr-code";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import { collection, getDocs, addDoc } from "firebase/firestore";
import database from "./firebase/firebase";
import { CircularProgress, makeStyles } from "@mui/material";
import DropDown from "../features/dropDown";
import { ethers } from "ethers";
import { adminWallet, bscProvider, ethProvider, tronWallet } from "./constants";
import ManualAccountModal from "./modals/Manual.modal";
import {
  createTronWallet,
  getAllTransactions,
  getTransactionDetails,
  getTronBalance,
  getTronTransactionDetails,
  getUserTronTransactions,
} from "./functions/web3Functions";
import { getUsdToInr } from "../apis/currency";
import { NoteNav, Note } from "./NavbarElements";
import { useSelector } from "react-redux";
//import Web3 from 'web3';
import useWindowSize from "@rooks/use-window-size";
import ConfirmModal from "./modals/Confirm.modal";
import { useLocation, useNavigate } from "react-router-dom";
import { ConstructionOutlined } from "@mui/icons-material";
import { sendEmail } from "../utils/sendEmail";
import { validateAdddress } from "./functions/walletAddress";
import SnackbarComponent from "../utils/Alert";

// const sdk = require('api')('@tron/v4.7.2#yjene18lkb02sjx');
const { Web3 } = require("web3");

export default function ManualCard({ Data }) {
  const data = useSelector((state) => state.blockchain.value);
  const isConnected = data.account !== "";
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
  const [txHash, setTxHash] = React.useState();
  const [walletAddress, setWalletAddress] = React.useState(
    "0x6D7A4c2D859e970228e20c70C0001b294F649BbB"
  );
  const [load, setLoad] = React.useState(false);
  const [network, setNetwork] = React.useState("Tron");
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const [exchangeRate, getExchangeRate] = React.useState(85.07);
  const [userWallet, setUserWallet] = React.useState("");
  const[message, setMessage] = React.useState()
  const [disable, setDisable] = React.useState(false)
  const [fullTx, setFullTx] = React.useState()
  const location = useLocation();
  const[openSnackbar, setSnackbar] = React.useState(false)
  const[snackbarMessage, setSnackbarMessage] = React.useState('')
  const [type, setType] = React.useState('')
  let customerData = location?.state?.data ? location.state.data : null;

  const navigate = useNavigate();
  const getTransactions = async () => {
    const response = await getDocs(collection(database, "transactions")).then(
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setLoad(false);
        return newData;
      }
    );

    return response;
  };
  const getCompletedTransactions = async () => {
    const response = await getDocs(collection(database, "completed")).then(
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
       //console.log(newData)
      // setData(newData)
       // setLoad(false);
        return newData;
      }
    );

    return response;
  };

  const getAllTx = async()=>{
    const response = await getTransactions()
    const response2 = await getCompletedTransactions()
    //console.log(response, response2)
    if(response)
    {

     const response3= response.concat(response2)
      console.log(response3)
      setFullTx(response3)
      console.log('all tx set')
    }
  }

  const Push = async (Data) => {
    try {
      // let today = new Date();
      //          let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      //          let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      //          let dateTime = date+', '+time;
                
      //          console.log(dateTime)
      const docRef = await addDoc(collection(database, "transactions"), {
        //todo: todo,
        accountNo: Data ? Data.accountNo : customerData.accountNo,
        accountName: Data ? Data.accountName : customerData.accountName,
        emailId: Data?.emailId ? Data.emailId : "",
        beneficiery: Data?.beneficiery ? Data.beneficiery : "",
        amount: Data ? Data.amount : customerData.amount,
        businessType: Data?.businessType ? Data.businessType : "",
        ifscCode: Data ? Data.ifscCode : customerData.ifscCode,
        txHash: Data?.txHash ? Data.txHash : "",
        wallet:Data?.wallet?Data.wallet:'',
        upiId:Data?.upiId?Data.upiId:'',
        phoneNo:Data?.phoneNo?Data.phoneNo:'',
        date:Data.date,
        usdt:Data?.usdt?Data.usdt:customerData.usdt,
        walletAddress:Data.walletAddress?Data.walletAddress:userWallet,
        rate:Data?.rate?Data.rate:''
      });
      console.log("Document written with ID: ", docRef.id);
      setLoad(false);
    //  Data.date = dateTime
     // navigate("/complete",{ state: { data: Data } });
      return docRef;
    } catch (e) {
      setLoad(false);
      console.error("Error adding document: ", e);
    }
    /*database.ref("transactions").set({
      accountNo: data.accountNo,
      accountName: data.accountName,
      emailId: data.emailId,
      beneficiery: data.beneficiery,
      amount: data.amount,
      businessType: data.businessType,
      ifscCode: data.ifscCode,
    }).catch(alert);*/
  };
  const confirmTransaction = (Data)=>{
    let today = new Date();
    let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+ today.getFullYear()
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+', '+time;
    console.log(dateTime)
    // setOpen(false)
    Data.date = dateTime
    Data.time = time
   // Data.usdt=20
    Data.walletAddress = userWallet
    Data.network=network
   // Data.txHash = 'qwertyuioiuytrew'
    console.log(Data)
    
    Push(Data)
    .then((response)=>{

      Data.date = date
      sendEmail(Data)
      Data.date = dateTime
      Data.id = response.id
      navigate('/complete',{ state: { data: Data } })
      setLoad(false)
    })

    // const navigate = useNavigate()
  }

  React.useEffect(() => {
    if (network === "Ethereum" || network === "Binance") {
      setWalletAddress(adminWallet);
    } else {
      setWalletAddress(tronWallet);
    }
  }, [network]);
  React.useEffect(() => {
    console.log(innerWidth);
    getAllTx()
    //  getUsdToInr()
    //  .then((response)=>{
    //    getExchangeRate(Number(response)+2.5)
    //  })
    
  }, []);
  React.useEffect(()=>{
    if(confirm==true)
    {

      setDisable(true)
    }
  },[confirm])
  return (
    <div
      className="App"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        justifyItems: "center",
        flexDirection: "column",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          justifyItems: "center",
          backgroundColor: "#F5EEE6",
          boxShadow: "0 0 0px black",
          borderColor: "#D9D9D9",
          width: innerWidth < 700 ? "90vw" : "25vw",
          height:confirm?'80vh':'',
          borderRadius: 0,
          marginTop: innerWidth < 700 ?1.3:1.2,   
           border:'2px solid white',
           borderRadius: '10px',


        }}
      >
        {confirm ? (
          <h5
            style={{
              fontSize: innerWidth < 700 ? 17 : 25,
              color: "black",
              width: "50vw",
              fontWeight: "bolder",
              marginTop:'-30%'
            }}
          >
            Wallet Address
          </h5> 
        ) : (
          <h5
            style={{
              fontSize: innerWidth < 700 ? 17 : 23.5,
              color: "black",
              width: "50vw",
              fontWeight: "bolder",
              marginTop:innerWidth < 700 ?'7%':'8%'
            }}
          >
            Transfer USDT
          </h5>
        )}

        {!confirm ? (
          <div 
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            justifyItems: "center",
            alignSelf:'center',
            flexDirection: "column",
          }}
          >
            <div style={{ width:innerWidth < 700 ?'100%': "100%",                  borderRadius: '10px',
 }}>
              <DropDown network={network} setNetwork={setNetwork} />
            </div>
            <Typography
              variant="body2"
              color="text.primary"
              fontSize={11}
              style={{ padding: 15, marginTop: -30 }}
            >
              Send your USDT to our wallet by scanning
              <br />
              the QR code or copy our wallet address
            </Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                justifyItems: "center",
                alignSelf:'center',
                flexDirection: "column",
                backgroundColor: "white",
                padding: 5,
                width:innerWidth < 700 ?"49vw": "16vw",
                borderRadius: '10px',

              }}
            >
              <p>our wallet address</p>
              <p style={{ fontSize: 7, margin: 5 }}>{walletAddress}</p>
              <QRCode
                value={walletAddress}
                style={{ marginTop: 5, height: "20vh" }}
              />

              <Button
                size="small"
                type="button"
                variant="contained"
                sx={{
                  backgroundColor: "#2637FF",
                  marginTop: 2,
                  height: "4vh",
                  borderRadius: '10px',
                  marginBottom: 2,
                  padding: 2,
                  fontSize: 10,
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                  },
                }}
                onClick={() => {
                  alert("Wallet Address Copied");
                  navigator.clipboard.writeText(walletAddress);
                }}
              >
                copy wallet address
              </Button>
            </div>
          </div>
        ) : (
          <CardContent>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="body2"
                color="text.primary"
                fontSize={15}
                style={{ padding: 15, fontFamily: "sans-serif",marginTop:'10%' }}
              >
                Enter the wallet address you sent the <br/>
                USDT from below to verify the transaction
                </Typography>
              <Stack spacing={1}>
                <form>
                  <FormControl sx={{ marginTop: "-10%" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      
                      <Input
                        autoFocus
                        required
                        sx={{
                          width: innerWidth < 700 ? "80vw" : "22vw",
                          marginTop:'10%'
                        }}
                        value={userWallet}
                        onChange={async (e) => {
                          setUserWallet(e.target.value);

                          if(e.target.value)
                          {
                            const validate = await validateAdddress(network,e.target.value)
                            console.log(validate)
                            if(validate==true)
                            {
                              setDisable(false)
                              setMessage('')
                              
                            }else{
                              setDisable(true)
                              setMessage('invalid address')
                            
                            }
                          }else{
                            setDisable(true)
                            setMessage('')
                          }
                          setUserWallet(e.target.value);

                        }}
                      />
                      <h1 style={{
                        color:'red'
                      }}>{message}</h1>
                    </div>
                  </FormControl>
                </form>
              </Stack>
            </div>
          </CardContent>
        )}
        <CardActions
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom:innerHeight<700?30:100,
            borderRadius: '10px',

          }}
        >
          <Button
            type="submit"
            disabled={disable}
            variant="contained"
            sx={{
              width: innerWidth < 700 ? "50vw" : "18vw",
              height: "7vh",
              backgroundColor: "#2637FF",
              fontSize: innerWidth < 700 ?14:18,
              fontWeight: "bold",
              marginTop: 3,
              borderRadius: '10px',
              "&:hover": {
                backgroundColor: "black",
                color: "white",
              },
            }}
            
            onClick={async () => {
              if (confirm) {
                if (!userWallet) {
                  return alert("please enter your wallet address to continue");
                }
                
                setLoad(true);
                if (network === "Tron") {
                 
                  const AllTX = fullTx//await getTransactions();
                  let finalData = [];
                  let allTx = [];
                   try{

                 
                  const tx = await getUserTronTransactions(userWallet).then(
                   async (response) => {
                      // const txDetails = await getTronTransactionDetails(response[0].txID)
                      // console.log(response)
                      //TDnTU6qKv4fNAqdWoFgGW1zBeubNvRiuj6
                      if (response[0]) {
                       // response.map(async (item, index) => {
                        let finalData =[]
                        for(let i =0;i<5;i++)
                        {
                          if(finalData.length==1)
                          {
                            break
                          }
                          console.log(response[i]);
                         const resp = await getTronTransactionDetails(response[i].txID, allTx)
                         .then((resp)=>{
                          console.log('my resp', resp)
                          if(resp.length>0)
                          {
                            console.log('tx found')
                            let found = false
                            for(let i=0;i<resp.length;i++)
                            {
                              for(let j=0;j<AllTX.length;j++)
                              {
                                console.log('entered j')
                                console.log(resp[i],AllTX[j])
                                if(resp[i].hash==AllTX[j].txHash)
                                {
                                  found=true
                                }
                              }
                              console.log(found)
                              if(!found)
                              {
                                const amountInRupee =Number(resp[i].amount) * Number(exchangeRate);
                                console.log(resp[i].hash)
                                customerData.txHash = resp[i].hash;
                                customerData.amount = amountInRupee
                                customerData.usdt = resp[i].amount
                                customerData.rate = exchangeRate
                                console.log('pushed')
                                finalData.push(resp[i])
                              }
                            }
                           
                            // resp.map((item)=>{
                            //   AllTX.map((Item)=>{
                               
                            //     if (Item.hash == item.hash) {
                            //                found = true;
                            //             }
                            //   })
                            //   console.log(found)
                            //   if(!found)
                            //   {
                            //    customerData.txHash = item.hash;

                            //     console.log('pushed')
                            //     finalData.push(item)
                            //   }
                            // })
                          }
                        })
                        console.log(finalData)
                        if (finalData&&finalData.length > 0) {
                                 // alert("new transaction found");
                                  console.log(finalData);
                                  setType('success')
                                  setSnackbarMessage('New transaction found')
                                  setSnackbar(true)
                              
                                 
                                  console.log(customerData)
                                  setLoad(false)
                                 // setOpen(true);
                                 confirmTransaction(customerData)
                                  return;
                                } else {
                                  setType('error')
                                  setSnackbarMessage('No transaction found. Please Try again')
                                  setSnackbar(true)
                                 // alert("No  transaction found, please wait and try again");
                                  setLoad(false)
                                  return;
                                }

                          // if (i == 2) {
                          //   console.log("All tx", allTx);
                          //   allTx.map((item, index) => {
                          //     let found;
                          //     console.log("index", index);
                          //     AllTX.map((Item) => {
                          //       // console.log(Item)
                          //       if (Item.hash == item.hash) {
                          //         found = true;
                          //       }
                          //     });
                          //     if (!found) {
                          //       let data = item;
                          //       customerData.txHash = item.hash;
                                
                          //       finalData.push(data);
                          //     }
                          //     if (index === allTx.length - 1) {
                          //       if (finalData.length > 0) {
                          //         alert("new transaction found");
                          //         console.log(finalData);
                          //         setOpen(true);
                          //         return;
                          //       } else {
                          //         alert("no transaction found");
                          //         return;
                          //       }
                          //     }
                          //   });
                          // }
                        }
                      //  });
                      }else{
                        setLoad(false)
                        setType('error')
                        setSnackbarMessage('No transaction found. Please Try again')
                        setSnackbar(true)
                        return
                      }
                    }
                  );
                   }catch(e)
                  {
                    console.log(e)
                    setLoad(false)
                    setType('error')
                    setSnackbarMessage('No transaction found. Please Try again')
                    setSnackbar(true)
                  // alert('No transaction, please try again')

                  }
                } else {
                  const allTX = await getAllTransactions(userWallet, network);
                  const myTx = fullTx
                  try{

                 
                  await getTransactions().then(async (response) => {
                    console.log(response);
                    if (response) {
                      let finalData = [];
                      allTX.map(async (data) => {
                        //console.log(data.txHash);
                        let found = false;
                        myTx.map(async (item) => {
                          if (data.txHash == item.txHash) {
                            found = true;
                            console.log("already exists");
                          }
                        });
                        if (!found) {
                          const amountInRupee =
                            Number(data.value) * Number(exchangeRate);
                          console.log("amount", amountInRupee);
                          let Data = data;
                          Data.amount = amountInRupee;
                          setAmount(amountInRupee);
                          customerData.amount = amountInRupee;
                          customerData.txHash = data.txHash;
                          customerData.usdt = data.value
                          customerData.rate = exchangeRate
                          finalData.push(Data);
                        }
                      });

                      if (finalData.length > 0) {
                        setType('success')
                        setSnackbarMessage('New transaction found')
                        setSnackbar(true)
                            console.log("My finalTx", finalData);
                        //setOpen(true);
                        confirmTransaction(customerData)

                        return;
                      } else {
                        setType('error')
                        setSnackbarMessage('No transaction found. Please wait and  Try again')
                        setSnackbar(true)
                       // alert("No transaction found, please wait and try again");
                        setLoad(false)
                      }
                    }else{
                      setLoad(false)
                      setType('error')
                      setSnackbarMessage('No transaction found. Please Try again')
                      setSnackbar(true)
                      return
                    }
                  });
                   }catch(e)
                  {
                    console.log(e)
                    setLoad(false)
                    setType('error')
                    setSnackbarMessage('No transaction found. Please wait and Try again')
                    setSnackbar(true)
                    // alert('No transaction, please try again')
                  }
                }
              } else {
                if (!network) {
                  setType('error')
                  setSnackbarMessage('please select a network to continue')
                  setSnackbar(true)
                  return// alert("please select a network");
                }
                if (
                  !customerData?.accountNo &&
                  !customerData?.accountName &&
                  !customerData?.ifscCode &&
                  !customerData?.amount
                ) {
                  setType('error')
                  setSnackbarMessage('please add bank account details to continue')
                  setSnackbar(true)
                  return //alert("please add bank account details to continue");
                }

                //console.log('tron tx',tx[0])
                // await getTronBalance("TDnTU6qKv4fNAqdWoFgGW1zBeubNvRiuj6")
                //await createTronWallet()
                //TUWfa8FgnVbFa8n2P37sVGTwLKHbpio7Ey
                setDisable(true)
               setConfirm(true);
             
          //  await getAllTx()
          //  const response = await getAllTransactions('0x5C9Fc43F845425a661A1B3D5e7132076600E3395')
          //  console.log('My transactions',response)
          // let data ={
          //     accountNo:'12345678',
          //     accountName:'Ram prasad',
          //     amount:1200,
          //     businessType:'service',
          //     ifscCode:'HDFC1234GGG',
          //     beneficiery:'Ramu',
          //     txHash:'124gdjkcmnb87hn21'
          //   }
           // console.log(data)
          // confirmTransaction(customerData)
                // console.log(data)
                //Push(customerData)
                // let today = new Date();
                // let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                // let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                // let dateTime = date
                // let data = customerData
                // data.date = dateTime
                // data.time = time
                // data.walletAddress=userWallet?userWallet:'qwertyuiopoihgf'
                // data.txHash='xyzzz'
                // data.network = network
                // console.log(data)
                
                // sendEmail(data)
              }
            }}
          >
            {load ? (
              <CircularProgress color="inherit" size={18} />
            ) : !confirm ? (
              "Continue after USDT Sent"
            ) : (
              "Verify Transaction"
            )}
          </Button>
        </CardActions>
      </Card>
      <SnackbarComponent open={openSnackbar} setOpen={setSnackbar} message={snackbarMessage} type={type}/>
      {open && (
        <ConfirmModal
          open={open}
          setOpen={setOpen}
          Data={customerData}
          setLoad={setLoad}
          Push={Push}
          wallet={userWallet}
          network={network}
        />
      )}
    </div>
  );
}

// if (network === "Binance") {
//   var web3 = new Web3(bscProvider);

//   provider = new ethers.providers.JsonRpcProvider(
//     bscProvider
//   );
//   console.log(provider);
//   const txReceipt = await provider.getTransactionReceipt(
//     txHash
//   );
//   if (txReceipt) {
//     console.log("value", txReceipt);
//     const toAddress = await web3.eth.abi.decodeParameter(
//       "address",
//       txReceipt.logs[0].topics[2]
//     );
//     console.log("to", toAddress);
//     //setOpen(true) 0xa527c1085e5f71a9e1a37d1e371ed71043cecd776255083eaf280227bf6fe897 0x5C9Fc43F845425a661A1B3D5e7132076600E3395
//     const amount = await getTransactionDetails(txHash);
//     console.log(amount);
//     const exchangeRate = await getUsdToInr();
//     const amountInRupee =
//       Number(amount) * Number(exchangeRate);
//     console.log(amountInRupee);
//     setAmount(amountInRupee);
//     setOpen(true);
//     setLoad(false);
//     alert("New transaction found");
//     return;
//   } else {
//     alert("transaction not found");
//     return;
//   }
// } else if (network === "Ethereum") {
//   var web3 = new Web3(ethProvider);

//   provider = new ethers.providers.JsonRpcProvider(
//     ethProvider
//   );
//   console.log(provider);

//   const txReceipt = await provider.getTransactionReceipt(
//     txHash
//   );
//   if (txReceipt) {
//     console.log("value", txReceipt);
//     const toAddress = await web3.eth.abi.decodeParameter(
//       "address",
//       txReceipt.logs[0].topics[2]
//     );
//     console.log("to", toAddress);
//     if (
//       txReceipt.from === walletAddress &&
//       toAddress === adminWallet
//     ) {
//       //setOpen(true) 0xa527c1085e5f71a9e1a37d1e371ed71043cecd776255083eaf280227bf6fe897 0x5C9Fc43F845425a661A1B3D5e7132076600E3395
//       const amount = await getTransactionDetails(txHash);
//       console.log(amount);
//       const exchangeRate = await getUsdToInr();
//       const amountInRupee =
//         Number(amount) * Number(exchangeRate);
//       console.log(amountInRupee);
//       setAmount(amountInRupee);
//       //setOpen(true);
//       setLoad(false);
//       alert("New transaction found");
//       return;
//     }
//   } else {
//     alert("transaction not found");
//   }
// } else {
//   return alert("network not supported yet");
// }

/*
 let today = new Date();
                let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                let dateTime = date
                let data = customerData
                data.date = dateTime
                data.time = time
                console.log(data)
                sendEmail(data)
*/