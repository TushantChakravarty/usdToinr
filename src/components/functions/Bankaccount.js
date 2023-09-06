export function isValid_Bank_Acc_Number(bank_account_number,setMsg,setDisable) {
    // Regex to check valid
    // BANK ACCOUNT NUMBER CODE
    console.log(bank_account_number)
    let regex = new RegExp(/^[0-9]{9,18}$/);
 
    // bank_account_number CODE
    // is empty return false
    if (bank_account_number == null) {
        setMsg('Invalid bank account number')
        setDisable(true)
        return "false";
    }
 
    // Return true if the bank_account_number
    // matched the ReGex
    if (regex.test(bank_account_number) == true) {
        setMsg('')
        setDisable(false)
        return "true";
    }
    else {
        setMsg('Invalid bank account number')
        setDisable(true)

        return "false";
    }
}

export const checkAccountName =(str,setMsg,setDisable)=>{
    const response =  /^[A-Za-z\s]*$/.test(str)
    if(str!=='')
    {

        
        if(response===false)
        {
            setDisable(true)
            setMsg('Invalid Account Name')
            return
        }
        setMsg('')
        setDisable(false)
    }
    else{
        setDisable(true)
        setMsg('')
    }
}

export const checkAccountBeneficiery = (str,setMsg,setDisable)=>{
    const response =  /^[A-Za-z\s]*$/.test(str)
    console.log(response)
    if(str!=='')
    {

        if(response==false)
        {
            setDisable(true)
            setMsg('Invalid Beneficiery Name')
            return
        }
        setMsg('')
        setDisable(false)
    }else{
        setMsg('')
        setDisable(true)
    }


}

export function checkIFSC(value, setMsg,setDisable){
    console.log(value)
    if(value!=='')
    {
        let regex = new RegExp(/^[A-Z]{4}0[A-Z0-9]{6}$/);

        const response = regex.test(value)
        if(response===false)
        {
            setDisable(true)
            setMsg('Invalid IFSC code')
            return
        }else{
            setMsg('')
            setDisable(false)
        }
    }else{

        setMsg('')
        setDisable(true)
    }

}
export function isValid_UPI_ID(upi_Id, setMsg, setDisable) {
    // Regex to check valid
    // upi_Id
    let regex = new RegExp(/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}/);
    console.log(regex.test(upi_Id) == true)
    // upi_Id
    // is empty return false
    if (upi_Id == null) {
        setDisable(true)
        setMsg('')
        return "false";
    }
 
    // Return true if the upi_Id
    // matched the ReGex
    if (regex.test(upi_Id) == true) {
        setDisable(false)
        setMsg('')
        return "true";
    }
    else {
        setDisable(true)
        setMsg('Invalid Upi ID')
        return "false";
    }
}

export function isValid_Phone_Number(number, setMsg, setDisable) {
    // Regex to check valid
    // upi_Id
    let regex = new RegExp(/^[789]\d{9}$/);
    console.log(regex.test(number) == true)
    // upi_Id
    // is empty return false
    if (number == null) {
        setDisable(true)
        setMsg('')
        return "false";
    }
 
    // Return true if the upi_Id
    // matched the ReGex
    if (regex.test(number) == true) {
        setDisable(false)
        setMsg('')
        return "true";
    }
    else {
        setDisable(true)
        setMsg('Invalid Phone Number')
        return "false";
    }
}