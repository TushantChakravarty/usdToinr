import Tri from "./Icons/Tri";
import Diamond from "../assets/images/diamond.png";
import {
  FaAmazonPay,
  FaAngleRight,
  FaApplePay,
  FaBeer,
  FaCcMastercard,
  FaCcPaypal,
  FaCcVisa,
  FaGooglePay,
} from "react-icons/fa";
import { Outlet, Link } from "react-router-dom";
import useWindowSize from "@rooks/use-window-size";
import { useNavigate } from "react-router-dom";
import "./welcome.scss";
const Welcome = () => {
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
  const Navigate = useNavigate();
  return (
    <>
      {innerWidth > 900 ? (
        <div class="landing-page">
          <div class="container">
            <div class="header-area">
              <div class="logo">
                USDT <b>Exchange</b>
              </div>
              <ul class="links">
              <li>
                  <Link to={"/swap"}>Sell USDT</Link>
                </li>
                <li>
                  <Link to={"/about"}>About Us</Link>
                </li>      
                <li>
                  <Link to={"/swap"}>Get Started</Link>
                </li>               
                
              </ul>
            </div>
            <div class="info">
              <h1>
                Our basic thesis for bitcoin <br /> is that it is better than
                gold.
              </h1>
              <p style={{ fontWeight: 20, fontSize: 15 }}>
                we always see on-ramps and off-ramps as critical capabilities
                for reaching a <br />
                larger user base and significantly increasing cryptocurrency
                mass adoption{" "}
              </p>

              <button onClick={()=>{
                Navigate('/swap')
              }}>Sell USDT</button>
            </div>
            <div class="image">
              <img src="https://blog.ramp.network/hs-fs/hubfs/infographic-2-on-off-ramps.jpg?width=1920&name=infographic-2-on-off-ramps.jpg" />
            </div>
            <div class="clearfix"></div>
          </div>
        </div>
      ) : (
        <div class="landing-page">
          <div class="container" >
            <div class="header-area">
              <div class="logo">
              USDT <b>Exchange</b>
              </div>
              <ul class="links">
               
              <li>
                  <Link to={"/swap"}>Sell USDT</Link>
                </li>
                <li>
                  <Link to={"/swap"}>About Us</Link>
                </li>      
                <li>
                  <Link to={"/swap"}>Get Started</Link>
                </li>               
                
              </ul>
            </div>
            <div style={{marginTop:10}}>
              <img src="https://blog.ramp.network/hs-fs/hubfs/infographic-2-on-off-ramps.jpg?width=1920&name=infographic-2-on-off-ramps.jpg" />
            </div>
            <div className="info" style={{width:'100%'}} >
              <h1>
                Our basic thesis for bitcoin <br /> is that it is better than
                gold.
              </h1>
              <p style={{ fontWeight: 20, fontSize: 15 }}>
                we always see on-ramps and off-ramps as critical capabilities
                for reaching a <br />
                larger user base and significantly increasing cryptocurrency
                mass adoption{" "}
              </p>

              <button onClick={()=>{
                Navigate('/swap')
              }}>Sell USDT</button>
            </div>
            
            <div class="clearfix"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Welcome;
