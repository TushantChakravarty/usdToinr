import React, { useEffect, useState } from "react"
import './login.css'
import { collection, getDocs, addDoc,deleteDoc,doc } from "firebase/firestore";
import database from '../../components/firebase/firebase';
import { useNavigate } from "react-router-dom";
import logo from '../../assets/dashboardLogo.png'

export const Login = () => {
    const [data, setData] = useState()
    const [userData, setUserData] = useState({
        email:'',
        password:''
    })
    const navigate = useNavigate()
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const getTransactions = async () => {
    const response = await getDocs(collection(database, "admin")).then(
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

useEffect(()=>{
    getTransactions()
},[])
  return (
     <div 
     style={{
        marginTop:'5%'
     }}
     > 
    <div class="login-container">
  <div class="login-form">
    <div class="login-form-inner">
      <div class="logo"><svg height="512" viewBox="0 0 192 192" width="512" xmlns="http://www.w3.org/2000/svg">
          <path d="m155.109 74.028a4 4 0 0 0 -3.48-2.028h-52.4l8.785-67.123a4.023 4.023 0 0 0 -7.373-2.614l-63.724 111.642a4 4 0 0 0 3.407 6.095h51.617l-6.962 67.224a4.024 4.024 0 0 0 7.411 2.461l62.671-111.63a4 4 0 0 0 .048-4.027z" />
        </svg></div>
        <div 
        style={{
            display:'flex',
            flexDirection:'column'
        }}
        >

      <h1 style={{
          alignSelf:'flex-start'
        }}>Dashboard Login</h1>
      {/* <p class="body-text">See your growth and get consulting support!</p> */}
        </div>

      {/* <a href="#" class="rounded-button google-login-button">
        <span class="google-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M113.47 309.408L95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z" fill="#fbbb00" />
            <path d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z" fill="#518ef8" />
            <path d="M416.253 455.624l.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z" fill="#28b446" />
            <path d="M419.404 58.936l-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z" fill="#f14336" />
          </svg></span>
        <span>Sign in with google</span>
      </a> */}

      <div class="sign-in-seperator">
        <span> Sign in with Email</span>
      </div>

      <div class="login-form-group">
        <label for="email">Email <span class="required-star">*</span></label>
        <input type="text" placeholder="email@website.com" id="email" onChange={(e)=>{
            setUserData({
                ...userData,
                email:e.target.value
            })
        }}/>
      </div>
      <div class="login-form-group">
        <label for="pwd">Password <span class="required-star">*</span></label>
        <input autocomplete="off" type="text" placeholder="Minimum 8 characters" id="pwd" onChange={(e)=>{
           
            setUserData({
                ...userData,
                password:e.target.value
            })
        }}/>
      </div>

      <div class="login-form-group single-row">
        <div class="custom-check">
          <input autocomplete="off" type="checkbox" checked id="remember"/><label for="remember">Remember me</label>
        </div>

        <a href="#" class="link forgot-link">Forgot Password ?</a>
      </div>

      <a href="" class="rounded-button login-cta" onClick={()=>{
        if(userData.email==data[0].email && userData.password==data[0].password)
        {
            localStorage.setItem('rupexToken','Rupex')
            navigate('/dashboard')
        }else{
          alert('Invalid username/password')

        }
      }}>Login</a>

    </div>

  </div>
  <div class="onboarding">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide color-1">
          <div class="slide-image">
            <img src={logo} loading="lazy" alt="" />
          </div>
          {/* <div class="slide-content">
            <h2>Welcome to Rupex Dashboard</h2>
          </div> */}
        </div>
      

        
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</div>
</div>
);
};


// "https://raw.githubusercontent.com/ismailvtl/ismailvtl.github.io/master/images/startup-launch.png"