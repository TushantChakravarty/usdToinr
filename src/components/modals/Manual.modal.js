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

export default function ManualAccountModal({
  open,
  setOpen,
  amount,
  setLoading,
  txHash
}) {
  //const [open, setOpen] = React.useState(false);
  const [data, setData] = useState({
    accountNo: "",
    accountName: "",
    emailId: "",
    beneficiery: "",
    amount: amount,
    businessType: "",
    ifscCode: "",
  });
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
    setLoading(false)
    setOpen(false)
    alert('Success! Transaction will be processed in 24 hrs')
    return docRef
  } catch (e) {
    setLoad(false)
    setLoading(false)
    setOpen(false)
    alert(e)
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
  return (
    <React.Fragment>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ maxWidth: 600, width: 700 }}
        >
          <ModalClose
            variant="outlined"
            onClick={() => {
               setLoading(false)
              setOpen(false)
             
            }}
          />
          <Typography id="basic-modal-dialog-title" component="h2">
            Enter account Details
          </Typography>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setLoading(true)
              setLoad(true)
              if(data.accountName&&data.accountNo&&data.amount&&data.beneficiery&&data.businessType&&data.emailId&&data.ifscCode)
              {
                Push(data,txHash)
                return
              }else{
                setLoading(false)

                alert('all fields are necessary')
                return
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
              <Button type="submit" >{load?<CircularProgress color="inherit" size={18} /> :'Submit'}</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
