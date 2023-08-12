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
import React, { useState } from "react";
import ManualCard from "../Card";
import database from "../firebase/firebase";
import Main from "../Main";
import useWindowSize from "@rooks/use-window-size";
import { useLocation, useNavigate } from "react-router-dom";

export default function NewAccountPage() {
  const [manualPage, setManualPage] = useState(false);
  const [load, setLoad] = useState(false);
  const [label, setLabel] = useState("personal");
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
  const location = useLocation();
  const navigate = useNavigate();
  const amount = location?.state?.amount ? location.state.amount : 0;
  const [data, setData] = useState({
    accountNo: "",
    accountName: "",
    businessName: "",
    emailId: "",
    beneficiery: "",
    amount: amount,
    ifscCode: "",
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
        Step 2: Bank Details
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
          <div style={{ display: "flex",marginLeft:innerWidth < 700?10:0}}>
            <Button
            size="small"
              sx={{
                backgroundColor: label == "personal" ? "#2637FF" : "",
                color: label == "personal" ? "white" : "black",
                borderRadius:0,
                height:innerWidth < 700?'2.5vh':'',
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
                height:innerWidth < 700?'2.5vh':'',
                borderRadius:0,
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
                marginTop:10
              }}
            >
              <InputLabel style={{ color: "black", marginTop: 10,alignSelf:'flex-start',marginLeft:innerWidth < 700 ?30:5 }}>
                Account Beneficiary Name
              </InputLabel>
              <TextField
                style={{
                  border: "2px solid white",
                  backgroundColor: "white",
                  marginTop: 10,
                  

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
                }}
              />
              <InputLabel style={{ color: "black", marginTop: 5,alignSelf:'flex-start',marginLeft:innerWidth < 700 ?30:5  }}>
                Account Number
              </InputLabel>
              <TextField
                style={{
                  border: "2px solid white",
                  backgroundColor: "white",
                  marginTop: 10,
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
                }}
              />

              <InputLabel style={{ color: "black", marginTop: 10,alignSelf:'flex-start',marginLeft:innerWidth < 700 ?30:5  }}>
                IFSC Code
              </InputLabel>
              <TextField
                style={{
                  border: "2px solid white",
                  backgroundColor: "white",
                  marginTop: 10,
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
                }}
              />
            </div>
          ) : (
            <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              width: innerWidth < 800 ? "91%" : "20vw",
              marginTop:10
            }}
          >              <InputLabel style={{ color: "black", marginTop: 10,alignSelf:'flex-start',marginLeft:innerWidth < 700 ?30:5  }}>
                Account Beneficiary Name
              </InputLabel>
              <TextField
                style={{
                  border: "2px solid white",
                  backgroundColor: "white",
                  marginTop: 10,
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
                }}
              />
              <InputLabel style={{ color: "black", marginTop: 5,alignSelf:'flex-start',marginLeft:innerWidth < 700 ?30:5  }}>
                Account Number
              </InputLabel>
              <TextField
                style={{
                  border: "2px solid white",
                  backgroundColor: "white",
                  marginTop: 10,
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
                }}
              />

              <InputLabel style={{ color: "black", marginTop: 10,alignSelf:'flex-start',marginLeft:innerWidth < 700 ?30:5  }}>
                IFSC Code
              </InputLabel>
              <TextField
                style={{
                  border: "2px solid white",
                  backgroundColor: "white",
                  marginTop: 10,
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
                }}
              />
              <InputLabel style={{ color: "black", marginTop: 10,alignSelf:'flex-start',marginLeft:innerWidth < 700 ?30:5  }}>
                Business Name
              </InputLabel>
              <TextField
                style={{
                  border: "2px solid white",
                  backgroundColor: "white",
                  marginTop: 10,
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
              <InputLabel style={{ color: "black", marginTop: 10 ,alignSelf:'flex-start',marginLeft:innerWidth < 700 ?30:5 }}>
                Beneficiery name
              </InputLabel>
              <TextField
                style={{
                  border: "2px solid white",
                  backgroundColor: "white",
                  marginTop: 10,
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
                }}
              />
            </div>
          )}
        </form>
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
            sx={{
              width: innerWidth < 700 ?"58vw":"20vw",
              height:innerWidth < 700 ?"7vh": "7vh",
              backgroundColor: "#2637FF",
              borderRadius: "0",
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
              } else {
                if (
                  data.accountName &&
                  data.accountNo &&
                  data.emailId &&
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
            Continue
          </Button>
        </div>
      </div>
      </div>
  );
}
