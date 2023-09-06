import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import database from '../../components/firebase/firebase';
import './tx.css'
import { useEffect, useState } from 'react';
import Loader from '../../utils/loader';
function Completed() {

  const [data, setData] = useState()

  const Push = async (Data) => {
    try {
      const docRef = await addDoc(collection(database, "completed"), {
        //todo: todo,
        accountNo: Data.accountNo ? Data.accountNo : '',
        accountName: Data.accountName ? Data.accountName : '',
        emailId: Data.emailId ? Data.emailId : '',
        beneficiery: Data.beneficiery ? Data.beneficiery : '',
        amount: Data.amount ? Data.amount : '',
        businessType: Data.businessType ? Data.businessType : '',
        ifscCode: Data.ifscCode ? Data.ifscCode : '',
        txHash: Data.txHash ? Data.txHash : '',
        upiId: Data.upiId ? Data.upiId : '',
        phoneNo: Data.phoneNo ? Data.phoneNo : '',
        wallet: Data.wallet ? Data.wallet : ''
      });
      console.log("Document written with ID: ", docRef.id);

      return docRef;
    } catch (e) {
      // setLoad(false);
      console.error("Error adding document: ", e);
    }

  };
  const getTransactions = async () => {
    const response = await getDocs(collection(database, "completed")).then(
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(newData)
        setData(newData)
        // setLoad(false);
        return newData;
      }
    );

    return response;
  };

  const deleteTransactions = async (item) => {
    const docRef = doc(database, "transactions", item.id);

    deleteDoc(docRef)
      .then(() => {
        console.log("Entire Document has been deleted successfully.")
      })
      .catch(error => {
        console.log(error);
      })
  }
  useEffect(() => {
    getTransactions()
  }, [])
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      marginLeft: 200

    }}>
      <h5
        className='textstyle'
      >Completed</h5>
      {
        data ?
          data.map((item) => {
            if (item.wallet && item.wallet !== '') {
              return (
                <div class="card purple">
                  {item.processed && (
                    <div style={{
                      display: 'flex',
                      alignSelf: 'flex-start',
                      flexDirection: 'row'
                    }}>
                      <h1
                        style={{
                          alignSelf: 'flex-start',
                          fontWeight: 'bolder'
                        }}
                      > Completed Date: </h1><h1 style={{
                        marginLeft: 5
                      }}>{item.processed}</h1>
                    </div>
                  )}
                  {item?.date && (
                    <div style={{
                      display: 'flex',
                      alignSelf: 'flex-start',
                      flexDirection: 'row'
                    }}>
                      <h1
                        style={{
                          alignSelf: 'flex-start',
                          fontWeight: 'bolder'
                        }}
                      >Order  Date: </h1><h1 style={{
                        marginLeft: 5
                      }}>{item.date}</h1>
                    </div>
                  )}
                  <br />
                  {item?.paymentId && (
                    <div style={{
                      display: 'flex',
                      alignSelf: 'flex-start',
                      flexDirection: 'row'
                    }}>
                      <h1
                        style={{
                          alignSelf: 'flex-start',
                          fontWeight: 'bolder'
                        }}
                      > Payment Id: </h1><h1 style={{
                        marginLeft: 5
                      }}>{item.paymentId}</h1>
                    </div>
                  )}

                  <div style={{
                    display: 'flex',
                    alignSelf: 'flex-start',
                    flexDirection: 'row'
                  }}>
                    <h1
                      style={{
                        alignSelf: 'flex-start',
                        fontWeight: 'bolder'
                      }}
                    > Transaction ID: </h1><h1
                      style={{
                        marginLeft: 5
                      }}
                    >{item.id}</h1>
                  </div>


                  {item?.walletAddress && (
                    <div style={{
                      display: 'flex',
                      alignSelf: 'flex-start',
                      flexDirection: 'row'
                    }}>
                      <h1
                        style={{
                          alignSelf: 'flex-start',
                          fontWeight: 'bolder'
                        }}
                      > Sender Wallet: </h1><h1 style={{
                        marginLeft: 5
                      }}>{item.walletAddress}</h1>
                    </div>
                  )}
                  <br />
                  <div style={{
                    display: 'flex',
                    alignSelf: 'flex-start',
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                  }}>
                    <h1
                      style={{
                        alignSelf: 'flex-start',
                        fontWeight: 'bolder'
                      }}
                    > Wallet: </h1><h1 style={{
                      marginLeft: 5
                    }}>{item.wallet}</h1>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignSelf: 'flex-start',
                    flexDirection: 'row'
                  }}>
                    <h1
                      style={{
                        alignSelf: 'flex-start',
                        fontWeight: 'bolder'
                      }}
                    > Upi Id: </h1><h1
                      style={{
                        marginLeft: 5
                      }}
                    >{item.upiId}</h1>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignSelf: 'flex-start',
                    flexDirection: 'row'
                  }}>
                    <h1
                      style={{
                        alignSelf: 'flex-start',
                        fontWeight: 'bolder'
                      }}
                    > PhoneNo: </h1><h1
                      style={{
                        marginLeft: 5
                      }}
                    >{item.phoneNo}</h1>
                  </div>
                  <br />
                  {
                    item?.rate && (
                      <div style={{
                        display: 'flex',
                        alignSelf: 'flex-start',
                        flexDirection: 'row'
                      }}>
                        <h1
                          style={{
                            alignSelf: 'flex-start',
                            fontWeight: 'bolder'
                          }}
                        > Rate: </h1><h1 style={{
                          marginLeft: 5
                        }}>{item.rate}</h1>
                      </div>
                    )
                  }
                  {
                    item?.usdt && (
                      <div style={{
                        display: 'flex',
                        alignSelf: 'flex-start',
                        flexDirection: 'row'
                      }}>
                        <h1
                          style={{
                            alignSelf: 'flex-start',
                            fontWeight: 'bolder'
                          }}
                        > USD: </h1><h1 style={{
                          marginLeft: 5
                        }}>${item.usdt}</h1>
                      </div>
                    )
                  }

                  <div style={{
                    display: 'flex',
                    alignSelf: 'flex-start',
                    flexDirection: 'row'
                  }}>
                    <h1
                      style={{
                        alignSelf: 'flex-start',
                        fontWeight: 'bolder'
                      }}
                    > INR: </h1><h1 style={{
                      marginLeft: 5
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
                      alignSelf: 'flex-end',
                      position: 'absolute'
                    }}
                  >
                    <button>Completed</button>
                  </div>

                </div>
              )
            } else {
              return (
                <div class="card purple">
                  {item.processed && (
                    <div style={{
                      display: 'flex',
                      alignSelf: 'flex-start',
                      flexDirection: 'row'
                    }}>
                      <h1
                        style={{
                          alignSelf: 'flex-start',
                          fontWeight: 'bolder'
                        }}
                      > Completed Date: </h1><h1 style={{
                        marginLeft: 5
                      }}>{item.processed}</h1>
                    </div>
                  )}
                  {item?.date && (
                    <div style={{
                      display: 'flex',
                      alignSelf: 'flex-start',
                      flexDirection: 'row'
                    }}>
                      <h1
                        style={{
                          alignSelf: 'flex-start',
                          fontWeight: 'bolder'
                        }}
                      >Order Date: </h1><h1 style={{
                        marginLeft: 5
                      }}>{item.date}</h1>
                    </div>
                  )}
                  <br />
                  {item?.paymentId && (
                    <div style={{
                      display: 'flex',
                      alignSelf: 'flex-start',
                      flexDirection: 'row'
                    }}>
                      <h1
                        style={{
                          alignSelf: 'flex-start',
                          fontWeight: 'bolder'
                        }}
                      > Payment Id: </h1><h1 style={{
                        marginLeft: 5
                      }}>{item.paymentId}</h1>
                    </div>
                  )}
                  <div style={{
                    display: 'flex',
                    alignSelf: 'flex-start',
                    flexDirection: 'row'
                  }}>
                    <h1
                      style={{
                        alignSelf: 'flex-start',
                        fontWeight: 'bolder'
                      }}
                    > Transaction ID: </h1><h1
                      style={{
                        marginLeft: 5
                      }}
                    >{item.id}</h1>
                  </div>
                 
                  {item?.walletAddress && (
                    <div style={{
                      display: 'flex',
                      alignSelf: 'flex-start',
                      flexDirection: 'row'
                    }}>
                      <h1
                        style={{
                          alignSelf: 'flex-start',
                          fontWeight: 'bolder'
                        }}
                      > Sender Wallet: </h1><h1 style={{
                        marginLeft: 5
                      }}>{item.walletAddress}</h1>
                    </div>
                  )}
                  <br />
                  {item?.businessType && (
                    <div style={{
                      display: 'flex',
                      alignSelf: 'flex-start',
                      flexDirection: 'row'
                    }}>
                      <h1
                        style={{
                          alignSelf: 'flex-start',
                          fontWeight: 'bolder'
                        }}
                      > Business Name: </h1><h1 style={{
                        marginLeft: 5
                      }}>{item.businessType}</h1>
                    </div>
                  )}
                  <div style={{
                    display: 'flex',
                    alignSelf: 'flex-start',
                    flexDirection: 'row'
                  }}>
                    <h1
                      style={{
                        alignSelf: 'flex-start',
                        fontWeight: 'bolder'
                      }}
                    >Account Name: </h1><h1
                      style={{
                        marginLeft: 5
                      }}
                    >{item.accountName}</h1>
                  </div>
                  {item?.beneficiery && (
                    <div style={{
                      display: 'flex',
                      alignSelf: 'flex-start',
                      flexDirection: 'row'
                    }}>
                      <h1
                        style={{
                          alignSelf: 'flex-start',
                          fontWeight: 'bolder'
                        }}
                      > Beneficiery: </h1><h1 style={{
                        marginLeft: 5
                      }}>{item.beneficiery}</h1>
                    </div>
                  )}
                  <div style={{
                    display: 'flex',
                    alignSelf: 'flex-start',
                    flexDirection: 'row'
                  }}>
                    <h1
                      style={{
                        alignSelf: 'flex-start',
                        fontWeight: 'bolder'
                      }}
                    > Account No </h1><h1
                      style={{
                        marginLeft: 5
                      }}
                    >{item.accountNo}</h1>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignSelf: 'flex-start',
                    flexDirection: 'row'
                  }}>
                    <h1
                      style={{
                        alignSelf: 'flex-start',
                        fontWeight: 'bolder'
                      }}
                    > IFSC: </h1><h1
                      style={{
                        marginLeft: 5
                      }}
                    >{item.ifscCode}</h1>
                  </div>
                  <br />
                  {
                    item?.rate && (
                      <div style={{
                        display: 'flex',
                        alignSelf: 'flex-start',
                        flexDirection: 'row'
                      }}>
                        <h1
                          style={{
                            alignSelf: 'flex-start',
                            fontWeight: 'bolder'
                          }}
                        > Rate: </h1><h1 style={{
                          marginLeft: 5
                        }}>{item.rate}</h1>
                      </div>
                    )
                  }

                  {
                    item?.usdt && (
                      <div style={{
                        display: 'flex',
                        alignSelf: 'flex-start',
                        flexDirection: 'row'
                      }}>
                        <h1
                          style={{
                            alignSelf: 'flex-start',
                            fontWeight: 'bolder'
                          }}
                        > USD: </h1><h1 style={{
                          marginLeft: 5
                        }}>{item.usdt}</h1>
                      </div>
                    )
                  }

                  <div style={{
                    display: 'flex',
                    alignSelf: 'flex-start',
                    flexDirection: 'row'
                  }}>
                    <h1
                      style={{
                        alignSelf: 'flex-start',
                        fontWeight: 'bolder'
                      }}
                    > INR: </h1><h1
                      style={{
                        marginLeft: 5
                      }}
                    >{Number(item.amount).toFixed(2)}</h1>
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
                      alignSelf: 'flex-end',
                      position: 'absolute'
                    }}
                  >
                    <button>Completed</button>
                  </div>

                </div>
              )
            }
          }) :
          <div >
            <Loader />
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

export default Completed;