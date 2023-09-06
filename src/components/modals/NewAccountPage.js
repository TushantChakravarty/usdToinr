import { render } from "react-dom";
import { useForm } from "react-cool-form";
import {
  FormGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  TextField,
  Select,
  Checkbox,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import Button from "@mui/material/Button";

import "./styles.scss";
import React, { useEffect, useState } from "react";
import ManualCard from "../Card";
import database from "../firebase/firebase";
import Main from "../Main";
import useWindowSize from "@rooks/use-window-size";
import { useLocation, useNavigate } from "react-router-dom";
import { checkAccountBeneficiery, checkAccountName, checkIFSC, isValid_Bank_Acc_Number, isValid_Phone_Number, isValid_UPI_ID } from "../functions/Bankaccount";
import DropDownWallet from "../dropdown/DropDown";
import SnackbarComponent from "../../utils/Alert";

export default function NewAccountPage() {
  const [manualPage, setManualPage] = useState(false);
  const [load, setLoad] = useState(false);
  const [label, setLabel] = useState("personal");
  const[openSnackbar, setSnackbar] = React.useState(false)
  const[snackbarMessage, setSnackbarMessage] = React.useState('')
  const [type, setType] = React.useState('')
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
  const [msg, setMsg] = useState('')
  const location = useLocation();
  const navigate = useNavigate();
  const amount = location?.state?.amount ? location.state.amount : 0;
  const usdt = location?.state?.amount ? location.state.usdt : 0;
  const [disable,setDisable] = useState(true)
  const [data, setData] = useState({
    accountNo: "",
    accountName: "",
    businessName: "",
    emailId: "",
    beneficiery: "",
    amount: amount,
    ifscCode: "",
    wallet:'',
    upiId:'',
    phoneNo:'',
    usdt:usdt
  });
  const { form, use } = useForm({
    defaultValues: { username: "", framework: "", fruit: [], mood: "" },
    onSubmit: (values) => setManualPage(true),
  });
  const errors = use("errors");

  React.useEffect(() => {
    //console.log(location.state.amount)
    setData({
      ...data,
      amount: amount,
    });
  }, []);

  useEffect(()=>{
    // isValid_Bank_Acc_Number(data.accountNo,setMsg)
    if(data.accountNo==='')
    {
      setMsg('')
    }
  
  },[data.accountNo])

  return (
    <div 
    className="App"
    style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}
    >
     
      <div
        style={{
          width: innerWidth < 700 ? "90vw" : "25vw",
          borderWidth: 2,
          borderColor: "black",
          border: "2px solid cream",
          marginTop: "10px",
          backgroundColor: "#F5EEE6",
          boxShadow: "0 0 0px black",
          padding: 30,
          border: '2px solid white',
          borderRadius: '10px',

        }}
      >
         <h5
        style={{
          fontSize: innerWidth < 700 ? 17 : 23.5,
          fontWeight:'bolder',
          color: "black",
          paddingBottom:'10%',
          marginTop:5

        }}
      >
         Account Details
      </h5>

        <form
          ref={form}
          onSubmit={() => {
            // setManualPage(true);
            console.log(data);
          }}
          style={{
            marginTop: 0,
            display: "flex",
            flexDirection: "column",
            width: innerWidth < 700 ?'70vw':"",
            marginLeft:innerWidth < 700 ?22:5
          }}
        >
          <div style={{ display: "flex",marginLeft:innerWidth < 700?0:0}}>
          {/* <Button
              type="button"
              size="small"
              sx={{
                backgroundColor: label == "Wallet" ? "#2637FF" : "",
                color: label == "Wallet" ? "white" : "black",
                height:innerWidth < 700?'4.5vh':'',
                borderRadius: '10px',
                marginLeft: 2,
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
              variant={label === "Wallet" ? "contained" : "text"}
              color="primary"
              onClick={() => {
               // setLabel("Wallet");
               setType('error')
               setSnackbarMessage('Wallet/Upi is under development')
               setSnackbar(true)
              }}
            >
              Wallet
            </Button> */}
            <Button
            size="small"
              sx={{
                backgroundColor: label == "personal" ? "#2637FF" : "",
                color: label == "personal" ? "white" : "black",
                borderRadius: '10px',
                height:innerWidth < 700?'4.5vh':'',
                marginLeft: 2,
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
              type="button"
              variant={label === "personal" ? "contained" : "text"}
              color="primary"
              onClick={() => {
                setLabel("personal");
              }}
            >
              Personal
            </Button>
            <Button
              type="button"
              size="small"
              sx={{
                backgroundColor: label == "business" ? "#2637FF" : "",
                color: label == "business" ? "white" : "black",
                height:innerWidth < 700?'4.5vh':'',
                borderRadius: '10px',
                marginLeft: 2,
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
              variant={label === "business" ? "contained" : "text"}
              color="primary"
              onClick={() => {
                setLabel("business");
              }}
            >
              Business
            </Button>
           
          </div>
          {/* <FormControl>
            <InputLabel htmlFor="framework">Account Type</InputLabel>
            {/* When working with select, we need to enable the native use element or you can use the "NativeSelect" instead */}
          {/* <Select inputProps={{ id: "framework", name: "framework" }} native>
              <option aria-label="None" value="" />
              <option value="react">Personal</option>
              <option value="vue">Business</option>
            </Select>
          </FormControl> */}
          {label === "personal" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                width: innerWidth < 800 ? "91%" : "20vw",
                marginTop:10,
                marginLeft:innerWidth < 800 ?0:5,
                borderRadius: '10px',

              }}
            >
              <InputLabel style={{ color: "black", marginTop: 10,alignSelf:'flex-start',marginLeft:innerWidth < 700 ?15:5,fontSize:innerWidth < 700?13:'' }}>
                Account Beneficiary Name
              </InputLabel>
              <TextField
                style={{
                  border: "2px solid white",
                  backgroundColor: "white",
                  marginTop: 10,
                  borderRadius: '10px',


                }}
                name={data.accountName}
                required
                InputProps={{ disableUnderline: true }}
                error={!!errors.username}
                helperText={errors.username}
                value={data.accountName}
                onChange={(e) => {
                  setData({
                    ...data,
                    accountName: e.target.value,
                  });
                  checkAccountName(e.target.value,setMsg,setDisable)
                }}
              />
              <InputLabel style={{ color: "black", marginTop: 3,alignSelf:'flex-start',marginLeft:innerWidth < 700 ?15:5,fontSize:innerWidth < 700?13:'' }}>
                Account Number
              </InputLabel>
              <TextField
                style={{
                  border: "2px solid white",
                  backgroundColor: "white",
                  marginTop: 10,
                  borderRadius: '10px',

                }}
                InputProps={{ disableUnderline: true }}
                name={data.accountNo}
                required
                error={!!errors.username}
                helperText={errors.username}
                value={data.accountNo}
                onChange={(e) => {
                  setData({
                    ...data,
                    accountNo: e.target.value,
                  });
                  isValid_Bank_Acc_Number(e.target.value,setMsg,setDisable)

                }}
              />

              <InputLabel style={{ color: "black", marginTop: 10,alignSelf:'flex-start',marginLeft:innerWidth < 700 ?15:5,fontSize:innerWidth < 700?13:''  }}>
                IFSC Code
              </InputLabel>
              <TextField
                style={{
                  border: "2px solid white",
                  backgroundColor: "white",
                  marginTop: 10,
                  borderRadius: '10px',

                }}
                InputProps={{ disableUnderline: true }}
                name={data.ifscCode}
                required
                error={!!errors.username}
                helperText={errors.username}
                value={data.ifscCode}
                onChange={(e) => {
                  setData({
                    ...data,
                    ifscCode: e.target.value,
                  });
                  checkIFSC(e.target.value,setMsg,setDisable)
                }}
              />
            </div>
          ) :label==='business' ?(
            <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              width: innerWidth < 800 ? "91%" : "20vw",
              marginTop:10,
              marginLeft:innerWidth < 800 ?0:5,
              borderRadius: '10px',


            }}
          >              <InputLabel style={{ color: "black", marginTop: 10,alignSelf:'flex-start',marginLeft:innerWidth < 700 ?15:5,fontSize:innerWidth < 700?13:'' }}>
                Account Beneficiary Name
              </InputLabel>
              <TextField
                style={{
                  border: "2px solid white",
                  backgroundColor: "white",
                  marginTop: 10,
                  borderRadius: '10px',

                }}
                name={data.accountName}
                required
                InputProps={{ disableUnderline: true }}
                error={!!errors.username}
                helperText={errors.username}
                value={data.accountName}
                onChange={(e) => {
                  setData({
                    ...data,
                    accountName: e.target.value,
                  });
                  checkAccountBeneficiery(e.target.value,setMsg,setDisable)

                }}
              />
              <InputLabel style={{ color: "black", marginTop: 3,alignSelf:'flex-start',marginLeft:innerWidth < 700 ?15:5,fontSize:innerWidth < 700?13:'' }}>
                Account Number
              </InputLabel>
              <TextField
                style={{
                  border: "2px solid white",
                  backgroundColor: "white",
                  marginTop: 10,
                  borderRadius: '10px',

                }}
                InputProps={{ disableUnderline: true }}
                name={data.accountNo}
                required
                error={!!errors.username}
                helperText={errors.username}
                value={data.accountNo}
                onChange={(e) => {
                  setData({
                    ...data,
                    accountNo: e.target.value,
                  });
                  isValid_Bank_Acc_Number(e.target.value,setMsg,setDisable)

                }}
              />

              <InputLabel style={{ color: "black", marginTop: 10,alignSelf:'flex-start',marginLeft:innerWidth < 700 ?15:5,fontSize:innerWidth < 700?13:''  }}>
                IFSC Code
              </InputLabel>
              <TextField
                style={{
                  border: "2px solid white",
                  backgroundColor: "white",
                  marginTop: 10,
                  borderRadius: '10px',

                }}
                InputProps={{ disableUnderline: true }}
                name={data.ifscCode}
                required
                error={!!errors.username}
                helperText={errors.username}
                value={data.ifscCode}
                onChange={(e) => {
                  setData({
                    ...data,
                    ifscCode: e.target.value,
                  });
                  checkIFSC(e.target.value,setMsg,setDisable)

                }}
              />
              <InputLabel style={{ color: "black", marginTop: 10,alignSelf:'flex-start',marginLeft:innerWidth < 700 ?15:5,fontSize:innerWidth < 700?13:'' }}>
                Business Name
              </InputLabel>
              <TextField
                style={{
                  border: "2px solid white",
                  backgroundColor: "white",
                  marginTop: 10,
                  borderRadius: '10px',

                }}
                InputProps={{ disableUnderline: true }}
                name={data.businessName}
                required
                error={!!errors.username}
                helperText={errors.username}
                value={data.businessName}
                onChange={(e) => {
                  setData({
                    ...data,
                    businessName: e.target.value,
                  });
                }}
              />
              <InputLabel style={{ color: "black", marginTop: 10 ,alignSelf:'flex-start',marginLeft:innerWidth < 700 ?15:5,fontSize:innerWidth < 700?13:''}}>
                Account name
              </InputLabel>
              <TextField
                style={{
                  border: "2px solid white",
                  backgroundColor: "white",
                  marginTop: 10,
                  borderRadius: '10px',

                }}
                InputProps={{ disableUnderline: true }}
                name={data.beneficiery}
                required
                error={!!errors.username}
                helperText={errors.username}
                value={data.beneficiery}
                onChange={(e) => {
                  setData({
                    ...data,
                    beneficiery: e.target.value,
                  });
                  checkAccountName(e.target.value,setMsg,setDisable)

                }}
              />
            </div>
          ):<div
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            width: innerWidth < 800 ? "91%" : "20vw",
            marginTop:10,
            marginLeft:innerWidth < 800 ?0:5,
            borderRadius: '10px',

          }}
        >
          {/* <InputLabel style={{ color: "black", marginTop: 10,alignSelf:'flex-start',marginLeft:innerWidth < 700 ?15:5,fontSize:innerWidth < 700?13:'' }}>
            Select Wallet
          </InputLabel>
          */}

          <DropDownWallet data={data} setData={setData}/>
          
          {/* <TextField
            style={{
              border: "2px solid white",
              backgroundColor: "white",
              marginTop: 10,
              borderRadius: '10px',


            }}
            name={data.accountName}
            required
            InputProps={{ disableUnderline: true }}
            error={!!errors.username}
            helperText={errors.username}
            value={data.accountName}
            onChange={(e) => {
              setData({
                ...data,
                accountName: e.target.value,
              });
              checkAccountName(e.target.value,setMsg,setDisable)
            }}
          /> */}
          <InputLabel style={{ color: "black", marginTop: 3,alignSelf:'flex-start',marginLeft:innerWidth < 700 ?15:5,fontSize:innerWidth < 700?13:'' }}>
            UPI ID
          </InputLabel>
          <TextField
            style={{
              border: "2px solid white",
              backgroundColor: "white",
              marginTop: 10,
              borderRadius: '10px',

            }}
            InputProps={{ disableUnderline: true }}
            name={data.upiId}
            required
            error={!!errors.username}
            helperText={errors.username}
            value={data.upiId}
            onChange={(e) => {
              setData({
                ...data,
                upiId: e.target.value,
              });
              if(e.target.value)
              {
                
                setDisable(false)
                isValid_UPI_ID( e.target.value,setMsg, setDisable)
              }else{
                setMsg('')
                setDisable(true)
              }
             // isValid_Bank_Acc_Number(e.target.value,setMsg,setDisable)

            }}
          />

          <InputLabel style={{ color: "black", marginTop: 10,alignSelf:'flex-start',marginLeft:innerWidth < 700 ?15:5,fontSize:innerWidth < 700?13:''  }}>
            Mobile Number
          </InputLabel>
          <input
                    className="number form-control"
                    type="number"
                    min="0" inputmode="numeric" pattern="[0-9]*"
                    value={data.phoneNo}
                    style={{  width: innerWidth < 700 ? "58vw":"20vw",borderRadius:'10px', fontFamily:'sans-serif', marginTop:10, outline:'none',color:'black'}}
                    onChange={(e) => {
                      // getPriceIn(e.target.value)
                      setData({
                        ...data,
                        phoneNo: e.target.value,
                      });
                      if(e.target.value)
                      {
        
                        setDisable(false)
                        isValid_Phone_Number(e.target.value,setMsg, setDisable)
                      }else{
                        setMsg('')
                        setDisable(true)
                      }
                    }}
                  />
          {/* <TextField
            style={{
              border: "2px solid white",
              backgroundColor: "white",
              marginTop: 10,
              borderRadius: '10px',

            }}
            type="number"
            InputProps={{ disableUnderline: true, inputMode: 'numeric', pattern: '[0-9]' }}
            name={data.phoneNo}
            required
            inputMode="numeric"
            
            error={!!errors.username}
            helperText={errors.username}
            value={data.phoneNo}
            onChange={(e) => {
              setData({
                ...data,
                phoneNo: e.target.value,
              });
              if(e.target.value)
              {

                setDisable(false)
                isValid_Phone_Number(e.target.value,setMsg, setDisable)
              }else{
                setMsg('')
                setDisable(true)
              }
              //checkIFSC(e.target.value,setMsg,setDisable)
            }}
          /> */}
        </div>}
        </form>
        <div>
          <p
            style={{
              color:'red'
            }}
          >{msg}</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            justifyItems: "center",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={disable}
            sx={{
              width: innerWidth < 700 ?"58vw":"20vw",
              height:innerWidth < 700 ?"7vh": "7vh",
              backgroundColor: disable?'grey':"#2637FF",
              borderRadius: '10px',
              fontSize:innerWidth < 700 ?14:20,
              marginTop:5,
              fontWeight:"bold",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
              },
            }}
            onClick={() => {
              console.log(data);
              if (label === "personal") {
                if (data.accountName && data.accountNo && data.ifscCode) {
                  navigate("/qrcode", { state: { data: data } });
                } else {
                  alert("please enter all fields to proceed");
                  return;
                }
              }else if(label === "Wallet"){
                if (data.wallet && data.upiId && data.phoneNo) {
                  navigate("/qrcode", { state: { data: data } });
                } else {
                  alert("please enter all fields to proceed");
                  return;
                }
              } else {
                if (
                  data.accountName &&
                  data.accountNo &&
                  data.beneficiery &&
                  data.businessName &&
                  data.ifscCode
                ) {
                  navigate("/qrcode", { state: { data: data } });
                } else {
                  alert("please enter all fields to proceed");
                }
              }
            }}
          >
            Proceed
          </Button>
        </div>
      </div>
      <SnackbarComponent open={openSnackbar} setOpen={setSnackbar} message={snackbarMessage} type={type}/>

      </div>
  );
}
