import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

export default function ReceiptModal({open, setOpen, data}) {
 // const [open, setOpen] = React.useState(false);
   React.useEffect(()=>{
    console.log(data)
   })
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
              width:20,
              color:'white'
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
            Transaction Reciept
          </Typography>
          {data?
          
          data.wallet!==''?
          <>
          <Typography id="modal-desc" textColor="text.tertiary">
           <span style={{
               fontSize:20,
            fontWeight:'bolder'
           }}>Date :</span><span style={{
               marginLeft:5
           }}>{data.date}</span>
          </Typography>
          {data.id &&(
             <Typography id="modal-desc" textColor="text.tertiary">
             <span style={{
              fontSize:20,
              fontWeight:'bolder'
          }}>Tx Id :</span><span style={{
              marginLeft:5
             }}>{data.id}</span>
            </Typography>
          )}
          <Typography id="modal-desc" textColor="text.tertiary">
           <span style={{
            fontSize:20,
            fontWeight:'bolder'
           }}>Wallet :</span><span style={{
            marginLeft:5
           }}>{data.wallet}</span>
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
           <span style={{
            fontSize:20,
            fontWeight:'bolder'
           }}>Phone :</span><span style={{
               marginLeft:5
           }}>{data.phoneNo}</span>
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
           <span style={{
            fontSize:20,
            fontWeight:'bolder'
        }}>Rate :</span><span style={{
            marginLeft:5
           }}>{data.rate}</span>
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
           <span style={{
            fontSize:20,
            fontWeight:'bolder'
        }}>USD :</span><span style={{
            marginLeft:5
           }}>{data.usdt}</span>
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
           <span style={{
            fontSize:20,
            fontWeight:'bolder'
        }}>Amount :</span><span style={{
            marginLeft:5
           }}>{Number(data.amount).toFixed(2)}</span>
          </Typography>
          
         </> 
        : <>
        
        <Typography id="modal-desc" textColor="text.tertiary">
           <span style={{
               fontSize:20,
            fontWeight:'bolder'
           }}>Date :</span><span style={{
               marginLeft:5
           }}>{data.date}</span>
          </Typography>
          
          <Typography id="modal-desc" textColor="text.tertiary">
           <span style={{
            fontSize:20,
            fontWeight:'bolder'
           }}>Account Name :</span><span style={{
            marginLeft:5
           }}>{data.accountName}</span>
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
           <span style={{
            fontSize:20,
            fontWeight:'bolder'
           }}>Account Number :</span><span style={{
               marginLeft:5
           }}>{data.accountNo}</span>
          </Typography>
         
          <Typography id="modal-desc" textColor="text.tertiary">
           <span style={{
            fontSize:20,
            fontWeight:'bolder'
        }}>IFSC :</span><span style={{
            marginLeft:5
           }}>{data.ifscCode}</span>
          </Typography>
          {data.id &&(
             <Typography id="modal-desc" textColor="text.tertiary">
             <span style={{
              fontSize:20,
              fontWeight:'bolder'
          }}>Tx Id :</span><span style={{
              marginLeft:5
             }}>{data.id}</span>
            </Typography>
          )}
           <Typography id="modal-desc" textColor="text.tertiary">
           <span style={{
            fontSize:20,
            fontWeight:'bolder'
        }}>USD :</span><span style={{
            marginLeft:5
           }}>{data.usdt}</span>
          </Typography>
           <Typography id="modal-desc" textColor="text.tertiary">
           <span style={{
            fontSize:20,
            fontWeight:'bolder'
        }}>Rate :</span><span style={{
            marginLeft:5
           }}>{data.rate}</span>
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
           <span style={{
            fontSize:20,
            fontWeight:'bolder'
        }}>Amount :</span><span style={{
            marginLeft:5
           }}>{Number(data.amount).toFixed(2)}</span>
          </Typography>
        </>:<div><Typography id="modal-desc" textColor="text.tertiary">
             <span style={{
              fontSize:20,
              fontWeight:'bolder'
          }}>No Reciept</span>
            </Typography></div>}
          </Sheet>
      </Modal>
    </React.Fragment>
  );
}