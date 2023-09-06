import { collection, getDocs, addDoc,deleteDoc,doc } from "firebase/firestore";
import database from '../../components/firebase/firebase';
import { useEffect, useState } from "react";
import { sendEmail, sendMail } from "../../utils/sendEmail";
//import { sendMail } from "../../utils/sendEmail";
import './tx.css'
import { Last24HrCard, PendingCard, RatesCard, ReusableCard, ReusableCardDollar, ReusableCardMargin } from "../cards/Cards";
import { getUsdToInr } from "../../apis/currency";
import { getBnbBalance, getEthBalance } from "../../components/functions/web3Functions";

export const Home = ()=>{
    const [data,setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [rate, setRate] = useState(83)
    const[bnbBalance, setBnbBalance] = useState(0)
    const [last24, setLast24] = useState([])
    const [last7, setLast7] = useState([])

    const getTransactions = async () => {
        setLoading(true)
        const response = await getDocs(collection(database, "transactions")).then(
          (querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
           console.log(newData)
           setData(newData)
           // setLoad(false);
           setLoading(false)
            return newData;
          }
        );
    
        return response;
      };
      const getLast24Tx = async ()=>{
        const response = await getDocs(collection(database, "transactions")).then(
          (querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
           console.log(newData)
           setLast24(newData.filter((item)=>{
            return( new Date(item.date).getTime() > Date.now() - 24 * 60 * 60 * 1000)
           }))           // setLoad(false);
           setLoading(false)
            return newData;
          }
        );
      }
      const getLast7DaysTx = async ()=>{
        const response = await getDocs(collection(database, "transactions")).then(
          (querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
           console.log(newData)
           setLast7(newData.filter((item)=>{
            return( new Date(item.date).getTime() > Date.now() - 7*24 * 60 * 60 * 1000)
           }))           // setLoad(false);
           setLoading(false)
            return newData;
          }
        );
      }

      const getRates = async()=>{
        const rate = await getUsdToInr()
        setRate(rate)
      }
      const getBalance = async()=>{
       const balance = await getBnbBalance('0x55d398326f99059ff775485246999027b3197955')
       setBnbBalance(Number(balance).toFixed(2))
      }
      useEffect(()=>{
        getTransactions()
        getLast24Tx()
        getEthBalance('0x337610d27c682E347C9cD60BD4b3b107C9d34dDd')
        //getBnbBalance('0x55d398326f99059ff775485246999027b3197955')
        getLast7DaysTx()
        getBalance()
      //  getRates()
      },[])
    return(
        <div style={{
          display:'flex',
          justifyContent:'center',
          flexDirection:'column',
          marginLeft:200
        }}>
           <h5 
           className="textstyle"
            >Dashboard</h5>
          
              <div  style={{
              display:'flex',
              flexDirection:'row',
              justifyContent:'space-between',

            }}>
              
              <PendingCard Pending={data?.length}/>
              <RatesCard rates={rate}/>
              <Last24HrCard data={0}/>

              </div>
              <div  style={{
              display:'flex',
              flexDirection:'row',
              justifyContent:'space-between',

            }}>
              <ReusableCard title={'Last 24hr'} data={last24.length}/>

              <ReusableCardDollar title={'24hr Volume'} data={0}/>
              <ReusableCardMargin title={'Tron'} data={0}/>
              </div>
              <div  style={{
              display:'flex',
              flexDirection:'row',
              justifyContent:'space-between',

            }}>
              
              <ReusableCard title={'7 day orders'} data={last7.length}/>
              <ReusableCardDollar title={'7 day volume'} data={0}/>
              <ReusableCardMargin title={'Eth'} data={0}/>
              </div>
              <div  style={{
              display:'flex',
              flexDirection:'row',
              justifyContent:'space-between',

            }}>
              
              <ReusableCard title={'30 day orders'} data={0}/>
              <ReusableCardDollar title={'30 day volume'} data={0}/>
              <ReusableCardMargin title={'Binance'} data={bnbBalance}/>
              </div>
            {/* <button 
            onClick={()=>{
               // sendMail()
               //sendMail()
               sendEmail('tushant',300)
            }}
            >email</button> */}
        </div>
    )
}