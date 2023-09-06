import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Main from "./components/Main";
import Swap from "./components/Swap";
import { WagmiConfig, createConfig, mainnet } from "wagmi";
import { createPublicClient, http } from "viem";
import Exchanges from "./components/Exchanges";
import React from "react";
import { getUsdToInr } from "./apis/currency";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
import ManualCard from "./components/Card";
import cryptoImage from './usdt-inr.jpeg'
import Root from "./root";
import Welcome from "./components/Welcome"
import NewAccountPage from "./components/modals/NewAccountPage";
import CompletePage from "./components/Complete";
import { startMoralis } from "./components/functions/web3Functions";
import { Dashboard } from "./Dashboard/Dashboard";
import BodyOnlyExample from "./Dashboard/pages/Transactions";
import Completed from "./Dashboard/pages/Completed";
import { Login } from "./Dashboard/pages/Login";
import { Home } from "./Dashboard/pages/home";

const config = createConfig({
  autoConnect: false,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
});
function App() {
  const [rate, setRate] = React.useState(81.99);
  const [data, setData] = React.useState({
    accountNo: "",
    accountName: "",
    businessName:"",
    emailId: "",
    beneficiery: "",
    amount: 0,
    ifscCode: "",
  });
  const router = createBrowserRouter([
    {
      path: "/",
      element:  <Root/>,
      children: [
        {
          path: "swap",
          element: <Swap />,
        },
        {
          path: "qrcode",
          element: <ManualCard />,
        },
      ],
        
    }
  ],{
    basename:'/'
  });
  const getExchangeRate = async () => {
    const rate = await getUsdToInr();
    console.log("My rate", rate);
    setRate(rate);
  };
  const token = localStorage.getItem('rupexToken')

  React.useEffect(() => {
    //getExchangeRate()
    startMoralis()
  }, []);
  return (
      <div className="App" style={{width:'100%',backgroundColor:'#FBF8F4'}}>
    <WagmiConfig config={config}>
      <BrowserRouter >
      <Routes >
      
        <Route path="/" element={<Root />}>
      
     
          <Route
            index                 // <-- rendered on "/"
            element={<Swap />}
          />
            <Route path="/swap" element={<Swap />} />
          <Route path="/account" element={<NewAccountPage />} />
          <Route path="/qrcode" element={<ManualCard Data={data} />} />
          <Route path="/complete" element={<CompletePage />} />

        </Route>
        <Route path="/login" element={<Login />} />

        <Route path="/Dashboard" element={token?<Dashboard />:<Login/>} >
        <Route
            index                 // <-- rendered on "/"
            element={<Home />}
          />
        <Route path="tx" element={<Home />} />
        <Route path="completed" element={<Completed />} />
        <Route path="pending" element={<BodyOnlyExample />} />

          </Route>
        
      </Routes>
      </BrowserRouter>
    </WagmiConfig>
           </div>
  );
  }

export default App;
