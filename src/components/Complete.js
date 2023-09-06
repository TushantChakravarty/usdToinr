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
import ReceiptModal from "./modals/Receipt.modal";

//const sdk = require('api')('@tron/v4.7.2#17d20r2ql9cidams');
const { Web3 } = require("web3");
const TronWeb = require("tronweb");

export default function CompletePage() {
  const data = useSelector((state) => state.blockchain.value);
  // let customerData = location?.state?.data ? location.state.data : null;
  // const location = useLocation();
  const isConnected = data.account !== "";
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
  const [txHash, setTxHash] = React.useState();
  const [open, setOpen] = React.useState(false);

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
          height: innerWidth < 700 ? "" : "",
          width: innerWidth < 700 ? "90vw" : "25vw",
          borderRadius: '10px',
          border: '2px solid white'
        }}
      >
        <Typography
          variant="body2"
          color="text.primary"
          fontSize={25}
          style={{
            padding: 15, color: 'black', fontWeight: 'bold', paddingBottom: 50, marginTop: innerWidth < 700 ? '' : 0, borderRadius: '10px',
          }}
        >Success

        </Typography>
        <FiCheckCircle size={100} color="green" />

        <div>
          <Typography
            variant="body2"
            color="text.primary"
            fontSize={16}
            style={{ padding: 15, color: 'black', marginTop: 10 }}
          >Your transaction has been received.  <br />
           funds wiil be deposited into your <br />
           bank or wallet account as soon as <br />
           it is processed.

          </Typography>
        </div>
        <div>
          <Typography
            variant="body2"
            color="text.primary"
            fontSize={17}
            style={{ padding: 15, color: 'black', marginTop: 10, fontWeight:'bolder' }}
          >
            You may now close this window.
          </Typography>
        </div>
        <CardActions style={{
          paddingBottom: 30,

        }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: innerWidth < 700 ? "50vw" : "18vw",
              height: "7vh",
              backgroundColor: "#2637FF",
              borderRadius: '10px',
              "&:hover": {
                backgroundColor: "black",
                color: "white",
              },
            }}
            onClick={async () => {
              console.log("clicked");
              setOpen(true)
            }}
          >
            View Receipt
          </Button>
        </CardActions>
        <div style={{
          display:'flex',
          flexDirection:'row'
        }}>
          <Typography
            variant="body2"
            color="text.primary"
            fontSize={16}
            style={{ padding: 15, color: 'black', marginTop: 10, fontWeight:'bolder', display:'flex',
            flexDirection:'row' }}
          >Contact Us :  <Typography
          variant="body2"
          color="text.primary"
          fontSize={16}
          style={{ color: 'black'}}
        > Support@rupex.in

        </Typography>

          </Typography>
        </div>
      </Card>
      <ReceiptModal open={open} setOpen={setOpen} data={customerData}/>
    </div>
  );
}
