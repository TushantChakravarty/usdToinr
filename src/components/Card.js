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
  const [exchangeRate, getExchangeRate] = React.useState(0);
  const [userWallet, setUserWallet] = React.useState("");
  const location = useLocation();
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

  const Push = async (Data) => {
    try {
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
      });
      console.log("Document written with ID: ", docRef.id);
      setLoad(false);
      navigate("/complete");
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

  React.useEffect(() => {
    if (network === "Ethereum" || network === "Binance") {
      setWalletAddress(adminWallet);
    } else {
      setWalletAddress(tronWallet);
    }
  }, [network]);
  React.useEffect(() => {
    console.log(innerWidth);
    //  getUsdToInr()
    //  .then((response)=>{
    //    getExchangeRate(response)
    //  })
  }, []);
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
          height:innerWidth < 700 ?'80vh': "85vh",
          width: innerWidth < 700 ? "90vw" : "25vw",
          borderRadius: 0,
          marginTop: innerWidth < 700 ?1.3:1.2,
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
           Final Step: Sender Wallet
          </h5>
        ) : (
          <h5
            style={{
              fontSize: innerWidth < 700 ? 17 : 23.5,
              color: "black",
              width: "50vw",
              fontWeight: "bolder",
              marginTop:innerWidth < 361 ?'1%':innerWidth < 376 ?'12%':innerWidth < 380 ?'12%':innerWidth<400?'-14%':innerWidth<420?'-21%':innerWidth<700?'-23%':0
            }}
          >
            Step 3: Transfer USDT
          </h5>
        )}

        {!confirm ? (
          <div>
            <div style={{ width:innerWidth < 700 ?'100%': "50%" }}>
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
                flexDirection: "column",
                backgroundColor: "white",
                padding: 5,
                width:innerWidth < 700 ?"50vw": "16vw",
                marginLeft: "10%",
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
                  borderRadius: 0,
                  marginBottom: 2,
                  padding: 2,
                  fontSize: 10,
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                  },
                }}
                onClick={() => {
                  alert("Copied successfully");
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
                USDT from below and we'll transfer 
                <br />INR funds to your bank account after <br />
                confirming the transaction
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
                        onChange={(e) => {
                          setUserWallet(e.target.value);
                        }}
                      />
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
          }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: innerWidth < 700 ? "50vw" : "18vw",
              height: "7vh",
              backgroundColor: "#2637FF",
              fontSize: innerWidth < 700 ?14:20,
              fontWeight: "bold",
              marginTop: 3,
              marginLeft:innerWidth>390?1:innerWidth>400?2.5:innerWidth>410?3:0,
              marginRight:innerWidth<361?1:0,
              borderRadius: "0",
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
                  const AllTX = await getTransactions();
                  let finalData = [];
                  let allTx = [];
                  const tx = await getUserTronTransactions(userWallet).then(
                    (response) => {
                      // const txDetails = await getTronTransactionDetails(response[0].txID)
                      // console.log(response)
                      //TDnTU6qKv4fNAqdWoFgGW1zBeubNvRiuj6
                      if (response[0]) {
                        response.map(async (item, index) => {
                          console.log(item);
                          await getTronTransactionDetails(item.txID, allTx);
                          if (index == response.length - 1) {
                            console.log("All tx", allTx);
                            allTx.map((item, index) => {
                              let found;
                              console.log("index", index);
                              AllTX.map((Item) => {
                                // console.log(Item)
                                if (Item.hash == item.hash) {
                                  found = true;
                                }
                              });
                              if (!found) {
                                let data = item;
                                customerData.txHash = item.hash;

                                finalData.push(data);
                              }
                              if (index === allTx.length - 1) {
                                if (finalData.length > 0) {
                                  alert("new transaction found");
                                  console.log(finalData);
                                  setOpen(true);
                                  return;
                                } else {
                                  alert("no transaction found");
                                  return;
                                }
                              }
                            });
                          }
                        });
                      }
                    }
                  );
                } else {
                  const allTX = await getAllTransactions(userWallet, network);

                  await getTransactions().then(async (response) => {
                    console.log(response);
                    if (response) {
                      let finalData = [];
                      allTX.map(async (data) => {
                        //console.log(data.txHash);
                        let found = false;
                        response.map(async (item) => {
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
                          finalData.push(Data);
                        }
                      });

                      if (finalData.length > 0) {
                        alert("Transaction found");
                        console.log("My finalTx", finalData);
                        setOpen(true);
                        return;
                      } else {
                        alert("No new transaction found");
                      }
                    }
                  });
                }
              } else {
                if (!network) {
                  return alert("please select a network");
                }
                // if (
                //   !customerData?.accountNo &&
                //   !customerData?.accountName &&
                //   !customerData?.ifscCode &&
                //   !customerData?.amount
                // ) {
                //   return alert("please add bank account details to continue");
                // }

                //console.log('tron tx',tx[0])
                // await getTronBalance("TDnTU6qKv4fNAqdWoFgGW1zBeubNvRiuj6")
                //await createTronWallet()
                //TUWfa8FgnVbFa8n2P37sVGTwLKHbpio7Ey
                setConfirm(true);
                //  const response = await getAllTransactions('0x5C9Fc43F845425a661A1B3D5e7132076600E3395')
                //  console.log('My transactions',response)
              }
            }}
          >
            {load ? (
              <CircularProgress color="inherit" size={18} />
            ) : !confirm ? (
              "Confirm USDT Sent"
            ) : (
              "Complete"
            )}
          </Button>
        </CardActions>
      </Card>
      {open && (
        <ConfirmModal
          open={open}
          setOpen={setOpen}
          Data={customerData}
          setLoad={setLoad}
          Push={Push}
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
