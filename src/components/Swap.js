import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { CircularProgress } from "@mui/material";
import { ethers, utils } from "ethers";
import "../assets/css/styles.css";
import { tokens, exchanges, exchangesMap } from "../utils/helpers";
import ERC20 from "../artifacts/interfaces/IERC20.json";
import { getUsdToInr } from "../apis/currency";
import AccountModal from "./modals/Account.modal";
import { adminWallet } from "./constants";
import useWindowSize from "@rooks/use-window-size";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

function Swap() {
  const data = useSelector((state) => state.blockchain.value);
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
  const [amountIn, setAmountIn] = useState(0);
  const [amountOut, setAmountOut] = useState(0);
  const [tokenInBalance, setTokenInBalance] = useState(null);
  const [gasPrice, setGasPrice] = useState(null);
  const [loading, setLoading] = useState(null);
  const [isSwapping, setIsSwapping] = useState(false);
  const [rate, setRate] = useState(84.70);
  const [showAccount, setShowAccount] = useState(false);
  const [disable, setDisable] = useState(false);
  const [tradeSide, setTradeSide] = useState("");
  const [manual, showManual] = useState(false);
  const navigation = useNavigate();
  const [open, setOpen] = useState(false);
  const [trade, setTrade] = useState({
    fromToken: "3",
    toToken: "1",
  });
  const isConnected = data.account !== "";

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (side) => {
    setTradeSide(side);
    setShow(true);
  };

  async function getErc20Balance() {
    if (window.ethereum !== undefined) {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts[0]);
      const signer = provider.getSigner();
      console.log(signer.getAddress());
      console.log(data);
      console.log("network", currentNet);
      const decimals = tokens[currentNet][0]["decimals"];
      const _tokenIn = tokens[currentNet][0]["address"];
      console.log(decimals, _tokenIn);
      const erc20Contract = new ethers.Contract(_tokenIn, ERC20.abi, signer);
      const balance = (await erc20Contract.balanceOf(data.account)).toString();
      console.log(balance);
      const Balance = ethers.BigNumber.from(balance);
      const finalBalance = ethers.utils.formatEther(Balance); //Number(balance) / 10 ** decimals
      console.log(finalBalance);
      setTokenInBalance(finalBalance);
    }
  }

  async function selectToken(tokenIndex) {
    handleClose();
    if (tradeSide == "from") {
      setTrade({ ...trade, fromToken: tokenIndex });
    } else {
      setTrade({ ...trade, toToken: tokenIndex });
    }
  }
  const currentNet = data.network !== "" ? data.network : "Ethereum Mainnet";

  const getExchangeRate = async () => {
    const rate = await getUsdToInr();
    console.log("My rate", rate);
    setRate(Number(rate)+2.5);
  };

  const getAmountsOut = (amountIn, amountOut) => {
    if (amountIn) {
      const finalAmount = Number(amountIn) * Number(rate);
      console.log(Number(amountIn), Number(rate));
      console.log(finalAmount);
      setAmountOut(finalAmount.toFixed(2));
      return;
    } else {
      const inrUsd = 1 / Number(rate);
      console.log(inrUsd);
      const finalAmount = Number(amountOut) * inrUsd;
      console.log(finalAmount);
      setAmountIn(finalAmount.toFixed(2));
      return;
      //console.log(Number(amountIn),Number(rate))
    }
  };

  async function sendUsdt(amount) {
    try {
      //const web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts[0]);
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      const signer = provider.getSigner();
      const USDTAddress = tokens[currentNet][0]["address"];

      let contract = new ethers.Contract(USDTAddress, ERC20.abi, signer);

      // How many tokens?
      let numberOfTokens = ethers.utils.parseUnits(amount, 18);
      console.log(`numberOfTokens: ${numberOfTokens}`);

      // Send tokens
      const response = await contract
        .transfer(adminWallet, numberOfTokens)
        .then((transferResult) => {
          console.dir(transferResult);
          setLoading(false);
          //alert("sent token")

          return transferResult;
        });
      console.log("transafer log", response.hash);
      getErc20Balance();
      return response;
    } catch (error) {
      setLoading(false);

      console.log(error);
      alert(error.message);
    }
  }

 useEffect(()=>{
  getExchangeRate()
 },[])
  return (
    <div
      className="header"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        margin: 0,

      }}
    >
      {/* {
        showAccount?
        <div >
        <NewAccountPage amount={amountOut} amountIn={amountIn} sendUsdt={sendUsdt} />
        </div>
        :   */}
      <div
        className="header"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <div className="header-box">
          <div id="window" style={{ marginTop: 10, display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:innerWidth<700?'90vw':'25vw' }}>
            

            <div id="form">
              
              <div className="swapbox">
              <h5
              style={{
                fontSize: innerWidth < 700 ? 17 : 23.5,
                paddingBottom:'20%',
                fontWeight:'bolder',
                marginTop:10
              }}
            >
              Live Rates
            </h5>
                <div className="swapbox_select">
                
                  <h2 style={{display:'flex',alignSelf:'flex-start'}}>You Send</h2>
                  <input
                    className="number form-control"
                    type="number"
                    
                    min="0" inputmode="numeric" pattern="[0-9]*"
                    style={{ padding: 10, width:innerWidth < 700 ? "60vw":"20vw",borderRadius:'10px',border:'1px solid white', fontFamily:'sans-serif',fontSize:20 }}
                    value={amountIn !== 0 ? amountIn : ""}
                    placeholder="Enter Amount"
                    onChange={(e) => {
                      if (e.target.value) {
                        getAmountsOut(e.target.value, null);
                        setAmountIn(e.target.value);
                        return;
                      }
                      setAmountIn(0);
                      setAmountOut(0);
                      //getPriceOut(e.target.value)
                    }}
                  />
                </div>
                <div
                  className="swapbox_select token_select"
                  style={{
                    marginLeft: innerWidth < 700 ? "35vw" : "13vw",
                    position: "absolute",
                  }}
                  //onClick={() => { handleShow("from") }}
                >
                  <img
                    className="token_img"
                    src={tokens["Ethereum Mainnet"][0].image}
                  />
                  <span className="token_text">
                    {tokens["Ethereum Mainnet"][0].name}
                  </span>
                </div>
              </div>

              <div className="swapbox">
                <div className="swapbox_select">
                  <h2 style={{display:'flex',alignSelf:'flex-start' }}>You Recieve</h2>
                  <input
                    className="number form-control"
                    type="number"
                    min="0" inputmode="numeric" pattern="[0-9]*"
                    value={amountOut !== 0 ? amountOut : ""}
                    placeholder={"You Get"}
                    style={{ padding: 10, width: innerWidth < 700 ? "60vw":"20vw",borderRadius:'10px', fontFamily:'sans-serif', fontSize:20}}
                    onChange={(e) => {
                      // getPriceIn(e.target.value)
                      if (e.target.value) {
                        getAmountsOut(null, e.target.value);
                        setAmountOut(e.target.value);
                        return;
                      }
                      setAmountIn(0);
                      setAmountOut(0);
                    }}
                  />
                </div>
                <div
                  className="swapbox_select token_select"
                  // onClick={() => { handleShow("to") }}
                  style={{
                    marginLeft: innerWidth < 700 ? "35vw" : "13vw",
                    position: "absolute",
                  }}
                >
                  <>
                    <img
                      className="token_img"
                      src={tokens["currency"][0].image}
                    />
                    <span className="token_text">
                      {tokens["currency"][0].name}
                    </span>
                  </>
                </div>
              </div>
              {/* <div className="gas_estimate_label">
                                    Estimated Gas: <span>{gasPrice}</span>
                                </div>
                                <div className="gas_estimate_label">
                                    {tokens["Ethereum Mainnet"][0].name} Balance: <span>{tokenInBalance}</span>
                                </div>
                                */}
                                <div
                                style={{
                                  paddingBottom:'20%',
                                  marginTop:'20%'
                                }}
                                >
              <Button
                variant="contained"
                sx={{
                  width: innerWidth < 700 ?"60vw":"20vw",
                  height: "7vh",
                  backgroundColor: "#2637FF",
                  marginTop:'20%',
                  borderRadius: '10px',
                  fontSize:innerWidth < 700 ?14:20,
                  fontWeight:"bold",
                  maarginBottom:'20%',
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                  },
                }}
                disabled={disable}
                onClick={() => {
                  try {
                    setLoading(true);
                    // setOpen(true)
                    // setShowAccount(true)
                    if(!amountOut)
                    {
                      setLoading(false);

                      return alert('Please enter an amount to proceed')
                    }
                    navigation("/account", { state: { amount: amountOut, usdt:amountIn } });
                  } catch (error) {
                    console.log(error);
                    alert(error.message);
                    setLoading(false);
                  }
                }}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={18} />
                ) : (
                  "Proceed"
                )}
              </Button>
              </div>
            </div>
          </div>
        </div>
        <Modal show={show} onHide={handleClose} style={{ overflow: "scroll" }}>
          <Modal.Header closeButton>
            <Modal.Title>SELECT A TOKEN</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {tradeSide == "to"
              ? tokens["currency"].map((token, index) => {
                  return (
                    <div
                      className="token_row"
                      key={index}
                      onClick={() => {
                        selectToken(index);
                      }}
                    >
                      <img className="token_img" src={token.image} />
                      <span className="token_text">{token.name}</span>
                    </div>
                  );
                })
              : tokens["Ethereum Mainnet"].map((token, index) => {
                  return (
                    <div
                      className="token_row"
                      key={index}
                      onClick={() => {
                        selectToken(index);
                      }}
                    >
                      <img className="token_img" src={token.image} />
                      <span className="token_text">{token.name}</span>
                    </div>
                  );
                })}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {open && (
          <AccountModal
            open={open}
            setOpen={setOpen}
            amount={amountOut}
            amountIn={amountIn}
            sendUsdt={sendUsdt}
            setLoading={setLoading}
            loading={loading}
          />
        )}
      </div>
      {/* } */}
    </div>
  );
}

export default Swap;
