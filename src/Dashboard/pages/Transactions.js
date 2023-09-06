import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { collection, getDocs, addDoc,deleteDoc,doc } from "firebase/firestore";
import database from '../../components/firebase/firebase';
import './tx.css'
import { useEffect, useState } from 'react';
import CircularIntegration from '../../utils/Spinner';
import Loader from '../../utils/loader';
import { useNavigate } from 'react-router-dom';
import { hash, processTransaction } from '../../apis/sha';
function BodyOnlyExample() {

  const [data,setData] = useState()
  const[loading, setLoading] =useState(false)
  const navigate = useNavigate()
  const Push = async (Data) => {

    try {
      let today = new Date();
      let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+ today.getFullYear()
      let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      let dateTime = date+', '+time;
       
      console.log(dateTime)
      const docRef = await addDoc(collection(database, "completed"), {
        //todo: todo,
        accountNo:  Data.accountNo?Data.accountNo:'' ,
        accountName:  Data.accountName?Data.accountName:'' ,
        emailId:  Data.emailId?Data.emailId:'' ,
        beneficiery:  Data.beneficiery?Data.beneficiery:'',
        amount:  Data.amount?Data.amount:'' ,
        businessType: Data.businessType?Data.businessType:'' ,
        ifscCode:  Data.ifscCode?Data.ifscCode:'' ,
        txHash:  Data.txHash ? Data.txHash:'',
        upiId:Data.upiId?Data.upiId:'',
        phoneNo:Data.phoneNo?Data.phoneNo:'',
        wallet:Data.wallet?Data.wallet:'',
        date:Data.date,
        processed:dateTime,
        walletAddress:Data.walletAddress?Data.walletAddress:'',
        rate:Data.rate?Data.rate:'',
        paymentId:Data.paymentId?Data.paymentId:'',
      });
      console.log("Document written with ID: ", docRef.id);
     
      return docRef;
    } catch (e) {
     // setLoad(false);
      console.error("Error adding document: ", e);
    }
   
  };
  const getTransactions = async () => {
    setLoading(true)
    const response = await getDocs(collection(database, "transactions")).then(
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
       console.log(newData)
       const sorted = newData.sort(
        (objA, objB) => Number(objA.date) - Number(objB.date),
      );
       setData(sorted)
       // setLoad(false);
       setLoading(false)
        return newData;
      }
    );

    return response;
  };

  const deleteTransactions = async(item)=>{
    const docRef = doc(database, "transactions",item.id);

    deleteDoc(docRef)
    .then(() => {
        console.log("Entire Document has been deleted successfully.")
    })
    .catch(error => {
        console.log(error);
    })
  }
  const saveTx = async(item)=>{
   await Push(item)
    .then(()=>{
      deleteTransactions(item)
      .then(()=>{
        setTimeout(() => {
          
          getTransactions()
          .then(()=>{
            getTransactions()
            
            // navigate('/dashboard/completed')
          })
        }, 1500);
      })
    })
  }
  useEffect(()=>{
    getTransactions()
  },[])
  return (
    <div style={{
     display:'flex',
     justifyContent:'center',
     flexDirection:'column',
     marginLeft:200


    }}>
      <h5 className='textstyle'
      >Pending</h5>
    {
      data?.length?
      
      data.map((item)=>{
        if(item.wallet && item.wallet!=='')
        {
          return(
            <div class="card purple">
              {item?.date &&(
           <div style={{
            display:'flex',
            alignSelf:'flex-start',
            flexDirection: 'row'
          }}>
          <h1
          style={{
            alignSelf:'flex-start',
            fontWeight:'bolder'
          }}
          >Order Date: </h1><h1 style={{
            marginLeft:5
          }}>{item.date}</h1>
          </div>
         )}
         <br/>
          <div style={{
              display:'flex',
              alignSelf:'flex-start',
              flexDirection: 'row'
            }}>
          <h1
          style={{
            alignSelf:'flex-start',
            fontWeight:'bolder'
          }}
          > Transaction ID: </h1><h1 
          style={{
            marginLeft:5
          }}
          >{item.id}</h1>
          </div>
          {item?.walletAddress &&(
           <div style={{
            display:'flex',
            alignSelf:'flex-start',
            flexDirection: 'row'
          }}>
          <h1
          style={{
            alignSelf:'flex-start',
            fontWeight:'bolder'
          }}
          > Sender Wallet: </h1><h1 style={{
            marginLeft:5
          }}>{item.walletAddress}</h1>
          </div>
         )}
         <br/>
         <div style={{
            display:'flex',
            alignSelf:'flex-start',
            flexDirection: 'row',
            justifyContent:'space-around'
            }}>
          <h1
          style={{
            alignSelf:'flex-start',
            fontWeight:'bolder'
          }}
          > Wallet: </h1><h1 style={{
            marginLeft:5
          }}>{item.wallet}</h1>
          </div>
            <div style={{
              display:'flex',
              alignSelf:'flex-start',
              flexDirection: 'row'
            }}>
          <h1
          style={{
            alignSelf:'flex-start',
            fontWeight:'bolder'
          }}
          > Upi Id: </h1><h1 
          style={{
            marginLeft:5
          }}
          >{item.upiId}</h1>
          </div>
          <div style={{
              display:'flex',
              alignSelf:'flex-start',
              flexDirection: 'row'
            }}>
          <h1
          style={{
            alignSelf:'flex-start',
            fontWeight:'bolder'
          }}
          > PhoneNo: </h1><h1 
          style={{
            marginLeft:5
          }}
          >{item.phoneNo}</h1>
          </div>
          <br/>
          {
            item?.rate &&(
              <div style={{
                display:'flex',
                alignSelf:'flex-start',
                flexDirection: 'row'
              }}>
              <h1
              style={{
                alignSelf:'flex-start',
                fontWeight:'bolder'
              }}
              > Rate: </h1><h1 style={{
                marginLeft:5
              }}>{item.rate}</h1>
              </div>
            )
          }
          
          {
            item?.usdt &&(
              <div style={{
                display:'flex',
                alignSelf:'flex-start',
                flexDirection: 'row'
              }}>
              <h1
              style={{
                alignSelf:'flex-start',
                fontWeight:'bolder'
              }}
              > USD: </h1><h1 style={{
                marginLeft:5
              }}>${item.usdt}</h1>
              </div>
            )
          }
          
          <div style={{
            display:'flex',
            alignSelf:'flex-start',
            flexDirection: 'row'
          }}>
          <h1
          style={{
            alignSelf:'flex-start',
            fontWeight:'bolder'
          }}
          > INR: </h1><h1 style={{
            marginLeft:5
          }}>{Number(item.amount).toFixed(2)}</h1>
          </div>
         
          {/* <button onClick={()=>{
            Push(item)
            .then(()=>{
              deleteTransactions(item)
              .then(()=>{
                getTransactions()
              })
            })
          }}>Completed</button> */}
          <div
          style={{
            alignSelf:'flex-end',
            position:'absolute'
          }}
          >
          <CircularIntegration SaveTx={saveTx} item={item} getTransactions={getTransactions} processTransaction={processTransaction}/>
          </div>
        </div>
          )
        }else{

          return(
            <div class="card purple">
              {item?.date &&(
           <div style={{
            display:'flex',
            alignSelf:'flex-start',
            flexDirection: 'row'
          }}>
          <h1
          style={{
            alignSelf:'flex-start',
            fontWeight:'bolder'
          }}
          >Order Date: </h1><h1 style={{
            marginLeft:5
          }}>{item.date}</h1>
          </div>
         )}
         <br/>
          <div style={{
              display:'flex',
              alignSelf:'flex-start',
              flexDirection: 'row'
            }}>
          <h1
          style={{
            alignSelf:'flex-start',
            fontWeight:'bolder'
          }}
          > Transaction ID: </h1><h1 
          style={{
            marginLeft:5
          }}
          >{item.id}</h1>

          </div>
          {item?.walletAddress &&(
           <div style={{
            display:'flex',
            alignSelf:'flex-start',
            flexDirection: 'row'
          }}>
          <h1
          style={{
            alignSelf:'flex-start',
            fontWeight:'bolder'
          }}
          > Sender Wallet: </h1><h1 style={{
            marginLeft:5
          }}>{item.walletAddress}</h1>
          </div>
         )}
         <br/>
         {item?.businessType &&(
             <div style={{
              display:'flex',
              alignSelf:'flex-start',
              flexDirection: 'row'
            }}>
            <h1
            style={{
              alignSelf:'flex-start',
              fontWeight:'bolder'
            }}
            > Business Name: </h1><h1 style={{
              marginLeft:5
            }}>{item.businessType}</h1>
            </div>
          )}
            <div style={{
              display:'flex',
              alignSelf:'flex-start',
              flexDirection: 'row'
            }}>
          <h1
          style={{
            alignSelf:'flex-start',
            fontWeight:'bolder'
          }}
          >Account Name: </h1><h1 
          style={{
            marginLeft:5
          }}
          >{item.accountName}</h1>
          </div>
          {item?.beneficiery &&(
             <div style={{
              display:'flex',
              alignSelf:'flex-start',
              flexDirection: 'row'
            }}>
            <h1
            style={{
              alignSelf:'flex-start',
              fontWeight:'bolder'
            }}
            > Beneficiery: </h1><h1 style={{
              marginLeft:5
            }}>{item.beneficiery}</h1>
            </div>
          )}
          <div style={{
            display:'flex',
            alignSelf:'flex-start',
            flexDirection: 'row',
            justifyContent:'space-around'
            }}>
          <h1
          style={{
            alignSelf:'flex-start',
            fontWeight:'bolder'
          }}
          > Account No: </h1><h1 style={{
            marginLeft:5
          }}>{item.accountNo}</h1>
          </div>
          <div style={{
            display:'flex',
            alignSelf:'flex-start',
            flexDirection: 'row'
          }}>
          <h1
          style={{
            alignSelf:'flex-start',
            fontWeight:'bolder'
          }}
          > IFSC: </h1><h1 style={{
            marginLeft:5
          }}>{item.ifscCode}</h1>
          </div>
          

          <br/>
         
           {
            item?.rate &&(
              <div style={{
                display:'flex',
                alignSelf:'flex-start',
                flexDirection: 'row'
              }}>
              <h1
              style={{
                alignSelf:'flex-start',
                fontWeight:'bolder'
              }}
              > Rate: </h1><h1 style={{
                marginLeft:5
              }}>{item.rate}</h1>
              </div>
            )
          }
           {
            item?.usdt &&(
              <div style={{
                display:'flex',
                alignSelf:'flex-start',
                flexDirection: 'row'
              }}>
              <h1
              style={{
                alignSelf:'flex-start',
                fontWeight:'bolder'
              }}
              > USD: </h1><h1 style={{
                marginLeft:5
              }}>${item.usdt}</h1>
              </div>
            )
          }
          <div style={{
            display:'flex',
            alignSelf:'flex-start',
            flexDirection: 'row'
          }}>
          <h1
          style={{
            alignSelf:'flex-start',
            fontWeight:'bolder'
          }}
          > INR: </h1><h1 style={{
            marginLeft:5
          }}>{Number(item.amount).toFixed(2)}</h1>
          </div>
         
          {/* <button onClick={()=>{
            Push(item)
            .then(()=>{
              deleteTransactions(item)
              .then(()=>{
                getTransactions()
              })
            })
          }}>Completed</button> */}
          <div
          style={{
            alignSelf:'flex-end',
            position:'absolute'
          }}
          >
          <CircularIntegration SaveTx={saveTx} item={item} getTransactions={getTransactions} processTransaction={processTransaction}/>
          {/* <button onClick={async ()=>{
           //processTransaction('20.00','20323508372','tushant','SBIN0007258','sbi')
           await fetch('http://localhost:2000/test')
           .then((res)=>res.json())
           .then((response)=>{
            console.log(response)
           })
           
          }}>test</button> */}
          </div>
        </div>
        )
      }
      }):
     loading?
     <div>
      <Loader/>
      </div>:
     <div 
     style={{
      display:'flex',
      marginTop:30
     }}
     >
        <h5
        style={{
          alignSelf:'center',
          fontWeight:'bolder'
        }}
        >No pending Transactions</h5>
      </div>
  
    }
    
    {/* <div class="card purple">
    <h1>Transaction</h1>
    <p>Here is a paragraph of text than is being added to the card. And here is some more text to make it even longer than it already was. Here is a paragraph of text than is being added to the card. And here is some more text to make it even longer than it already was.</p>
    <button>Completed</button>
  </div>
     */}
  {/* <div class="card green">
    <h1>Pricing</h1>
    <p>Here is a paragraph of text than is being added to the card. And here is some more text to make it even longer than it already was. Here is a paragraph of text than is being added to the card. And here is some more text to make it even longer than it already was.</p>
    <button>Sign Up</button>
  </div> */}
  </div>
  );
}

export default BodyOnlyExample;