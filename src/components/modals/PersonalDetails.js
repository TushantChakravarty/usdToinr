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

export default function PersonalDetails({
  amount,
  amountIn,
  sendUsdt,
  data,
  setData
}) {
  //const [open, setOpen] = React.useState(false);
  
 const [load, setLoad] = useState(false)
  

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
    setData({
      ...data
    })
  },[data])
  return (
    <React.Fragment>
      <div style={{width:'50vw'}}>
          <Typography id="basic-modal-dialog-title" component="h2" fontSize={20}>
            Enter Personal Details
          </Typography>
          <form
            onSubmit={(event) => {
              event.preventDefault();
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
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel> Name</FormLabel>
                <Input
                  autoFocus
                  required
                  value={data.name}
                  onChange={(e) => {
                    setData({
                      ...data,
                      name: e.target.value,
                    });
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Account Holder E-mail</FormLabel>
                <Input autoFocus required value={data.emailId}
                  onChange={(e) => {
                    setData({
                      ...data,
                      emailId: e.target.value,
                    });
                  }}/>
              </FormControl>
              <FormControl>
                <FormLabel>Business type</FormLabel>
                <Input autoFocus required value={data.businessType}
                  onChange={(e) => {
                    setData({
                      ...data,
                      businessType: e.target.value,
                    });
                  }} />
              </FormControl>
              </Stack>
          </form>
          </div>
    </React.Fragment>
  );
}
