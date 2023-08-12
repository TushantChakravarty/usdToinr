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
import { adminWallet, bscProvider, ethProvider } from "./constants";
import ManualAccountModal from "./modals/Manual.modal";
import { getTransactionDetails } from "./functions/web3Functions";
import { getUsdToInr } from "../apis/currency";
import { NoteNav, Note } from "./NavbarElements";
import { useSelector } from "react-redux";
//import Web3 from 'web3';
import { FiCheckCircle } from "react-icons/fi";
import useWindowSize from "@rooks/use-window-size";
import ConfirmModal from "./modals/Confirm.modal";
import { useLocation } from "react-router-dom";
//const sdk = require('api')('@tron/v4.7.2#17d20r2ql9cidams');
const { Web3 } = require("web3");
const TronWeb = require("tronweb");

export default function CompletePage() {
  const data = useSelector((state) => state.blockchain.value);
  const isConnected = data.account !== "";
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
  const [txHash, setTxHash] = React.useState();

  const [load, setLoad] = React.useState(false);
  const [network, setNetwork] = React.useState("Ethereum");
  const [confirm, setConfirm] = React.useState(false);
  const location = useLocation();
  const customerData = location?.state?.data ? location.state.data : null;

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

 

  React.useEffect(() => {
    
//     
//     const fullNode = 'https://testhttpapi.tronex.io';
// const solidityNode = 'https://testhttpapi.tronex.io';
// const eventServer = 'https://testhttpapi.tronex.io';
// const sideOptions = {
//   fullNode: 'https://suntest.tronex.io',
//   solidityNode: 'https://suntest.tronex.io',
//   eventServer: 'https://suntest.tronex.io',
//   mainGatewayAddress: 'TFLtPoEtVJBMcj6kZPrQrwEdM3W3shxsBU',
//   sideGatewayAddress: 'TRDepx5KoQ8oNbFVZ5sogwUxtdYmATDRgX',
//   sideChainId: '413AF23F37DA0D48234FDD43D89931E98E1144481B'
// }
// const tronWeb = new TronWeb({
//   fullHost: 'https://api.shasta.trongrid.io',
//   headers: { "TRON-PRO-API-KEY": '67618319-f032-41e9-82ef-a20341eba399' },
//   privateKey: '45BA0740DE75DB71C23811139F27438254EC2A83F5A531E01EB567E7466E8F1D'
// })

// console.log(tronWeb)
   // const wallet = await tronWeb.createAccount()
   // const balance = await tronWeb.trx.getBalance('TNjjEPxABffHAzVZnfrun4KbjReZJ34Zcs')
   // console.log("Waller",wallet);
   // console.log("Balance",balance);
    //const result = await fetch(`https://api.trongrid.io/v1/accounts/TNjjEPxABffHAzVZnfrun4KbjReZJ34Zcs/transactions/trc20?&contract_address=TG3XXyExBkPp9nzdajDZsozEu4BkaSJozs`)
   // console.log(result)
    {
      /*
      base58
: 
"TNjjEPxABffHAzVZnfrun4KbjReZJ34Zcs"
hex
: 
"418C0D0BE249774C130689403197CE27B4983EC27E"


privateKey
: 
"45BA0740DE75DB71C23811139F27438254EC2A83F5A531E01EB567E7466E8F1D"
publicKey
: 
"04FDAC35903A9232D68A0A98AD9E7710339FA5648373F52C60B5831AC161E5EA52B498C7BB6107023303BDD54B765803D2870B9717C6D2242E0446E7D0C4B85986"

      */
    }
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
        marginTop: -10,
      }}
    >
      <Card
        sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          justifyItems: "center",
          backgroundColor: "#F5EEE6",
          boxShadow: "0 0 0 0 ",
          borderColor: "#D9D9D9",
          height: innerWidth < 700 ? "60vh" : "50vh",
          width: innerWidth < 700 ? "90vw" : "25vw",
          borderRadius:0,
          border:innerWidth < 700 ?'2px solid white':''
        }}
      >
        <Typography
            variant="body2"
            color="text.primary"
            fontSize={25}
            style={{ padding: 15,color:'black',fontWeight:'bold',paddingBottom:50, marginTop:innerWidth < 700 ? '-20%':0 }}
          >Complete
            
          </Typography>
        <FiCheckCircle size={100} color="black" />

        <div>
          <Typography
            variant="body2"
            color="text.primary"
            fontSize={12}
            style={{ padding: 15,color:'black' ,marginTop:10}}
          >Your transaction is being  <br /> 
           processed.once verified, your<br /> 
           funds will be deposited to your <br />
           Bank account . 
            
          </Typography>
        </div>
        <CardActions style={{
                        paddingBottom:30,

        }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: innerWidth < 700 ? "50vw" : "18vw",
              height: "7vh",
              backgroundColor: "#2637FF",
              borderRadius: "0",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
              },
            }}
            onClick={async () => {
              console.log("clicked");
            }}
          >
            {load ? <CircularProgress color="inherit" size={18} /> : "Close"}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
