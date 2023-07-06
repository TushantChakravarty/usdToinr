import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { Modal } from "react-bootstrap"
import { Button, CircularProgress } from "@mui/material";
import { ethers, utils } from 'ethers';
import qs from 'qs'
import "../assets/css/styles.css";
import { tokens, exchanges, exchangesMap } from "../utils/helpers";
import IRouter from "../artifacts/interfaces/IUniswapV2Router02.json";
import ISwapRouter from "../artifacts/interfaces/ISwapRouter.json";
import ERC20 from "../artifacts/interfaces/IERC20.json";
import Exchanges from './Exchanges';
import { getUsdToInr } from '../apis/currency';
import AccountModal from './modals/Account.modal';
import NestedModal from './modals/Manual.modal';
import Card from './Card';
import ManualCard from './Card';
import { adminWallet } from './constants';
const Web3 = require("web3");

function Swap() {
    const data = useSelector((state) => state.blockchain.value)
    const [amountIn, setAmountIn] = useState(0);
    const [amountOut, setAmountOut] = useState(0);
    const [tokenInBalance, setTokenInBalance] = useState(null);
    const [gasPrice, setGasPrice] = useState(null);
    const [loading, setLoading] = useState(null);
    const [isSwapping, setIsSwapping] = useState(false);
    const [rate,setRate] = useState(81.99)
    const [tradeSide, setTradeSide] = useState("");
    const[open,setOpen] = useState(false)
    const [trade, setTrade] = useState({
        fromToken: "3",
        toToken: "1"
    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (side) => {
        setTradeSide(side)
        setShow(true);
    }

    
    async function getErc20Balance() {
        if (window.ethereum !== undefined) {
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            const accounts= await window.ethereum.request({method: 'eth_requestAccounts'});
            console.log(accounts[0])
            const signer = provider.getSigner()
            console.log(signer.getAddress())
            console.log(data)
            console.log("network",currentNet)
            const decimals = tokens[currentNet][0]["decimals"]
            const _tokenIn = tokens[currentNet][0]["address"]
            console.log(decimals,_tokenIn)
            const erc20Contract = new ethers.Contract(_tokenIn, ERC20.abi, signer);
            const balance = (await erc20Contract.balanceOf(data.account)).toString();
            console.log(balance)
            const Balance = ethers.BigNumber.from(balance)
            const finalBalance = ethers.utils.formatEther(Balance)//Number(balance) / 10 ** decimals
            console.log(finalBalance)
            setTokenInBalance(finalBalance)
        }
    }

    async function selectToken(tokenIndex) {
        handleClose()
        if (tradeSide == "from") {
            setTrade({ ...trade, fromToken: tokenIndex })
        } else {
            setTrade({ ...trade, toToken: tokenIndex })
        }
    }
    const currentNet = data.network !== "" ? data.network : "Ethereum Mainnet"

    const getExchangeRate = async ()=>{
       const rate =await getUsdToInr()
       console.log("My rate",rate)
       setRate(rate)
    }

    const getAmountsOut =(amountIn,amountOut)=>{
        if(amountIn)
        {
            const finalAmount = Number(amountIn)*Number(rate)
            console.log(Number(amountIn),Number(rate))
            console.log(finalAmount)
            setAmountOut(finalAmount.toFixed(2))
            return
        }else{
            
                const inrUsd = 1/Number(rate)
                console.log(inrUsd)
                const finalAmount = Number(amountOut)*inrUsd
                console.log(finalAmount)
                setAmountIn(finalAmount.toFixed(2))
                return
                //console.log(Number(amountIn),Number(rate))
            
        }
        
          
    }

    async function sendUsdt(amount)
    {
        try{

            //const web3 = new Web3(window.ethereum);
            const accounts= await window.ethereum.request({method: 'eth_requestAccounts'});
            console.log(accounts[0])
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            const signer = provider.getSigner()
            const USDTAddress = tokens[currentNet][0]["address"]
            
            
            let contract = new ethers.Contract(
                USDTAddress,
                ERC20.abi,
                signer
                )
                
                // How many tokens?
                let numberOfTokens = ethers.utils.parseUnits(amount, 18)
                console.log(`numberOfTokens: ${numberOfTokens}`)
                
                // Send tokens
               const response = await contract.transfer(adminWallet, numberOfTokens).then((transferResult) => {
                    console.dir(transferResult)
                    setLoading(false)
                    //alert("sent token")
                    
                    return transferResult
                })
                console.log('transafer log',response.hash)
                getErc20Balance()
                return response
            }catch(error)
            {
                setLoading(false)

                console.log(error)
                alert(error.message)
            }
        }


    
    useEffect(() => {
        if (window.ethereum != undefined && data.network !== "") {
            getErc20Balance()
            console.log("network data",data)
        }
        //getExchangeRate()
    }, [trade.fromToken, data.network])

    return (
        data.network !== "" ? (
            <div className="header" >
                <div className="header-container">
                    <div className="header-box">
                        <div id="window">
                            <h4>Sell</h4>
                            <div id="form">
                                <div className="swapbox">
                                    <div className="swapbox_select token_select"
                                        onClick={() => { handleShow("from") }}>
                                            <>
                                                <img className="token_img"
                                                    src={tokens["Ethereum Mainnet"][0].image}
                                                />
                                                <span className='token_text'>
                                                    {tokens["Ethereum Mainnet"][0].name}
                                                </span>
                                            </>
                                    </div>
                                    <div className="swapbox_select">
                                        <input className="number form-control"
                                            type="number"
                                            value={amountIn !== 0 ? amountIn : ""}
                                            placeholder='Enter Amount'
                                            onChange={(e) => {
                                                if(e.target.value)
                                                {
                                                    getAmountsOut(e.target.value,null)
                                                    setAmountIn(e.target.value)
                                                    return
                                                }
                                                setAmountIn(0)
                                                setAmountOut(0)
                                                                                             //getPriceOut(e.target.value) 
                                                 }} />
                                    </div>
                                </div>
                                <div className="swapbox">
                                    <div className="swapbox_select token_select"
                                        onClick={() => { handleShow("to") }}>
                                            <>
                                                <img className="token_img"
                                                    src={tokens["currency"][0].image}
                                                />
                                                <span className='token_text'>
                                                    {tokens["currency"][0].name}
                                                </span>
                                            </>
                                    </div>
                                    <div className="swapbox_select">
                                        <input className="number form-control"
                                            type="number"
                                            value={amountOut !== 0 ? amountOut : ""}
                                            placeholder={'Enter Amount'}
                                            onChange={(e) => { 
                                               // getPriceIn(e.target.value) 
                                               if(e.target.value)
                                               {
                                                   getAmountsOut(null,e.target.value)
                                                   setAmountOut(e.target.value)
                                                   return
                                                }
                                                setAmountIn(0)
                                                setAmountOut(0)
                                                                                            }} />
                                    </div>
                                </div>
                                <div className="gas_estimate_label">
                                    Estimated Gas: <span>{gasPrice}</span>
                                </div>
                                <div className="gas_estimate_label">
                                    Your {tokens["Ethereum Mainnet"][0].name} Balance: <span>{tokenInBalance}</span>
                                </div>
                                <div className="gas_estimate_label">
                                   For {amountIn} USDT You'll get <span>{amountOut} INR</span>
                                </div>
                                
                                <button className="btn btn-primary" style={{ width: "100%" }}  onClick={()=>{
                                    try{

                                      /*  if(amountIn)
                                        {
                                            sendUsdt(amountIn)
                                            .catch((error)=>{
                                                console.log(error)
                                                alert(error.message)
                                            })
                                            console.log(amountOut)
                                            return
                                        }else{
                                            alert('you must enter an amount to proceed')
                                        }*/
                                        setLoading(true)
                                        setOpen(true)
                                    }catch(error)
                                    {
                                        console.log(error)
                                        alert(error.message)
                                        setLoading(false)

                                    }
                                    }} >
                                    {loading ? <CircularProgress color="inherit" size={18} /> : "Sell"}
                                </button>
                            </div>
                        </div>
                    </div>
                    <Modal show={show} onHide={handleClose} style={{ overflow: 'scroll' }}>
                        <Modal.Header closeButton>
                            <Modal.Title>SELECT A TOKEN</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {tradeSide=='to'? 
                            tokens["currency"].map((token, index) => {
                                return (
                                    <div className="token_row" key={index} onClick={() => { selectToken(index) }} >
                                        <img className="token_img" src={token.image} />
                                        <span className="token_text">{token.name}</span>
                                    </div>
                                )
                            })
                            :
                            tokens["Ethereum Mainnet"].map((token, index) => {
                                return (
                                    <div className="token_row" key={index} onClick={() => { selectToken(index) }} >
                                        <img className="token_img" src={token.image} />
                                        <span className="token_text">{token.name}</span>
                                    </div>
                                )
                            })}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="contained" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    {open && <AccountModal open={open} setOpen={setOpen} amount={amountOut} amountIn={amountIn} sendUsdt={sendUsdt} setLoading={setLoading} loading={loading}/>}
                    <div className="header-box" style={{ textAlign: "center" }}>
                        <h3 >INR Exchange</h3>
                        <Exchanges token0={trade.fromToken} token1={trade.toToken} rate={rate}/>
                    </div>
                </div>
            </div>
        ) : <div className='App' style={{display:'flex', alignItems:'center', alignContent:'center', justifyContent:'center'}}>
                        <ManualCard/>
            </div>
    )
}

export default Swap;
