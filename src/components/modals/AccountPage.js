import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import Typography from "@mui/joy/Typography";
import ModalClose from "@mui/joy/ModalClose";
import { useState } from "react";
import { useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import database from "../firebase/firebase";
import { CircularProgress } from "@mui/material";

export default function AccountPageScreen({
  amount,
  amountIn,
  sendUsdt,
  data,
  setData
}) {
  //const [open, setOpen] = React.useState(false);
  
 const [load, setLoad] = useState(false)
  const [disable,setDisable] = useState(true)

  const Push = async(data,txHash) => {
    try {
    const docRef = await addDoc(collection(database, "transactions"), {
      //todo: todo, 
      accountNo: data.accountNo,
      accountName: data.accountName,
      emailId: data.emailId,
      beneficiery: data.beneficiery,
      amount: data.amount,
      businessType: data.businessType,
      ifscCode: data.ifscCode,   
      txHash:txHash
    });
    console.log("Document written with ID: ", docRef.id);
    setLoad(false)
    return docRef
  } catch (e) {
    setLoad(false)
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
}


  useEffect(()=>{
    setData({
      ...data,
      amount:amount
    })
  },[])
  useEffect(()=>{
    if(data.accountNo&&data.accountName&&data.ifscCode&&data.beneficiery&&data.businessType&&data.name&&data.emailId)
    {
      setDisable(false)
    }
    else{
      setDisable(true)
    }
    setData({
      ...data
    })
    console.log(data)
  },[data])
  return (
    <React.Fragment>
      <div style={{width:'50vw'}}>
          <Typography id="basic-modal-dialog-title" component="h2" fontWeight={20} fontSize={20}>
            Enter account Details
          </Typography>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if(data.accountNo&&data.accountName&&data.ifscCode&&data.beneficiery&&data.businessType&&data.name&&data.emailId)
              {

                if (amountIn) {
                  setLoad(true)
                  console.log(data)
                  sendUsdt(amountIn)
                  .then((response)=>{
                    console.log("My hash",response.hash)
                    if(response.hash)
                    {
                      Push(data,response.hash)
                      .then((response)=>{
                        if(response.id)
                        {
                          setLoad(false)
                          alert('transaction successful')
                          return
                        }
                        setLoad(false)
                        alert('failed to save transaction')
                        return
                      })
                      
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                    setLoad(false)
                    alert(error.message);
                  });
                  console.log(amount);
                  return;
                } else {
                  setLoad(false)
                  alert("you must enter an amount to proceed");
                }
              }else{
                setLoad(false)
                alert('please enter all details to proceed')
              }
              }}
              >
              <Stack spacing={2}>
              <FormControl>
                <FormLabel>Account Holder Name</FormLabel>
                <Input
                  autoFocus
                  required
                  value={data.accountName}
                  onChange={(e) => {
                    setData({
                      ...data,
                      accountName: e.target.value,
                    });
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Account Number</FormLabel>
                <Input autoFocus required value={data.accountNo}
                  onChange={(e) => {
                    setData({
                      ...data,
                      accountNo: e.target.value,
                    });
                  }}/>
              </FormControl>
              <FormControl>
                <FormLabel>IFSC Code</FormLabel>
                <Input required value={data.ifscCode}
                  onChange={(e) => {
                    setData({
                      ...data,
                      ifscCode: e.target.value,
                    });
                  }}/>
              </FormControl>
              <FormControl>
                <FormLabel>Beneficiery</FormLabel>
                <Input autoFocus required value={data.beneficiery}
                  onChange={(e) => {
                    setData({
                      ...data,
                      beneficiery: e.target.value,
                    });
                  }}/>
              </FormControl>
              <FormControl>
                <FormLabel>Amount INR</FormLabel>
                <Input
                  autoFocus
                  required
                  disabled
                  value={amount}
                  placeholder={"$"}
                />
              </FormControl>
              <Button type="submit"  disabled={disable}>{load?<CircularProgress color="inherit" size={18} /> :'Submit'}</Button>
            </Stack>
          </form>
          </div>
    </React.Fragment>
  );
}
