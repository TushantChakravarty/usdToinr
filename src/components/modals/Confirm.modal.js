import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { useNavigate } from 'react-router-dom';
import { sendEmail } from '../../utils/sendEmail';

export default function ConfirmModal({open, setOpen, Data,setLoad,Push,wallet,network}) {
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date+', '+time;
  const navigate = useNavigate()
  return (
    <React.Fragment>
     
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: 'calc(-1/4 * var(--IconButton-size))',
              right: 'calc(-1/4 * var(--IconButton-size))',
              boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
              borderRadius: '50%',
              bgcolor: '#2637FF',
              width:20
            }}
          />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Confirm Your Transaction
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
            Are you sure you want to transfer {Data.amount?Data.amount:0} to <code>{Data.accountNo?Data.accountNo:Data.upiId}</code> ?
          </Typography>
          <button style={{marginTop:15}} onClick={()=>{
            Push(Data)
            setOpen(false)
            setLoad(false)
            Data.date = date
            Data.time = time
            Data.walletAddress = wallet
            Data.network=network
            sendEmail(Data)
            Data.date = dateTime
            navigate('/complete',{ state: { data: Data } })
          }}>Confirm</button>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}