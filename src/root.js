import React, { useEffect } from "react";
import Exchanges from "./components/Exchanges";
import Main from "./components/Main";
import { Outlet, Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useWindowSize from "@rooks/use-window-size";
import {
  FaAmazonPay,
  FaApplePay,
  FaBeer,
  FaCcMastercard,
  FaCcPaypal,
  FaCcVisa,
  FaGooglePay,
} from "react-icons/fa";
import { IconName } from "react-icons/fa6";
import { getUsdToInr } from "./apis/currency";
import logo from "./assets/logo.jpg";
export default function Root() {
  const [rate, setRate] = React.useState(81.99);
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
  const [render, setRender] = React.useState(false);
  const location = useLocation();

  const getExchangeRate = async () => {
    const rate = await getUsdToInr();
    console.log("My rate", rate);
    setRate(rate);
  };

  useEffect(() => {
    // getExchangeRate()
    console.log(location);
  }, [location]);
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          color: "white",
          backgroundColor: "#FBF8F4",
          height: "100%",
          alignItems: "flex-start",
        }}
      >
        {innerWidth > 700 ? (
          <div id="sidebar">
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                flexDirection: "column",
              }}
            >
              <img
                src={logo}
                style={{
                  height: "10vh",
                  width: "5vw",
                  marginLeft: "-70%",
                }}
              />
              <h4
                style={{
                  marginLeft: "-10%",
                  fontWeight: "bold",
                }}
              >
                USDT to INR service
              </h4>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                color: "white",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignSelf: "flex-start",
                  alignItems: "flex-start",
                  width: "90%",
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20,
                  marginLeft: "-10%",
                  padding: 20,
                }}
              >
                <h2
                  style={{
                    fontSize: 18,
                    alignSelf: "flex-start",
                    color: "#8BFBAF",
                    fontWeight: "bold",
                  }}
                >
                  Step 1 : GET RATES
                </h2>
                <nav>
                  <Link to={"/swap"}>
                    Enter your USDT amount to get the <br />
                    rate and know exactly what you'll
                    <br />
                    receive in Rupees
                  </Link>
                </nav>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignSelf: "flex-start",
                  alignItems: "flex-start",
                  width: "90%",
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20,
                  marginLeft: "-10%",
                  padding: 18,
                }}
              >
                <h2
                  style={{ fontSize: 18, color: "#8BFBAF", fontWeight: "bold" }}
                >
                  Step 2 : BANK DETAILS
                </h2>
                <nav>
                  <Link to={"/account"}>
                    Submit your bank details to receive the <br />
                    funds. Your financial information is
                    <br />
                    kept secure and private
                  </Link>
                </nav>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignSelf: "flex-start",
                  alignItems: "flex-start",
                  width: "100%",
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20,
                  marginLeft: "-10%",
                  padding: 20,
                }}
              >
                <h2
                  style={{ fontSize: 18, color: "#8BFBAF", fontWeight: "bold" }}
                >
                  Step 3 : SEND USDT
                </h2>
                <nav>
                  <Link to={"/qrcode"}>
                    Initiate your USDT transafer by securely
                    <br />
                    scanning our QR code or by copying <br />
                    our wallet address into your USDT wallet
                  </Link>
                </nav>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignSelf: "flex-start",
                  alignItems: "flex-start",
                  width: "100%",
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20,
                  marginLeft: "-6%",
                  padding: 10,
                }}
              >
                <h2
                  style={{ fontSize: 17, color: "#8BFBAF", fontWeight: "bold" }}
                >
                  Final Step : WALLET ADDRESS
                </h2>

                <nav>
                  <Link to={"/complete"}>
                    Provide your USDT wallet address and
                    <br />
                    upon verifying the transaction, we'll
                    <br />
                    transfer the INR funds directly to your
                    <br />
                    bank account
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        ) : null}
        {innerWidth < 700 ? (
          <div>
            {innerWidth < 700 ? (
              <img
                src={logo}
                style={{
                  height: "7vh",
                  width: "13vw",
                  float: "left",
                  marginLeft:20,
                  marginTop:15
                }}
              />
            ) : null}
            <div
              id="detail"
              style={{
                width: innerWidth > 900 ? null : "90vw",
                marginTop: "10vh",
              }}
            >
              <Outlet />
            </div>
          </div>
        ) : (
          <div id="detail" style={{ width: innerWidth > 900 ? null : "90vw" }}>
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
}
