import { useState } from "react";
import MultiStep from "react-multistep";
import AccountPageScreen from "./modals/AccountPage";
import PersonalDetails from "./modals/PersonalDetails";

export const AccountPage = ({  amount, amountIn, sendUsdt }) => {
  const prevButton = () => {};
  const nextButton = () => {};
  const [data, setData] = useState({
    accountNo: "",
    accountName: "",
    name:"",
    emailId: "",
    beneficiery: "",
    amount: amount,
    businessType: "",
    ifscCode: "",
  });
  return( 
    <div className="account" style={{opacity:0.9,borderRadius:10, backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'}}>
  <MultiStep activeStep={0} prevButton={prevButton} nextButton={nextButton} stepCustomStyle={{display:'flex',alignContent:'center',alignItems:'center',justifyContent:'center',justifyItems:'center',marginLeft:'10vw',color:'black'}} showNavigation={false}>
<PersonalDetails amount={amount} amountIn={amountIn} sendUsdt={sendUsdt} data={data} setData={setData} />
<AccountPageScreen amount={amount} amountIn={amountIn} sendUsdt={sendUsdt} data={data} setData={setData}/> 
</MultiStep>
    </div>
)
};
