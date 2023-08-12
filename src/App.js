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

  React.useEffect(() => {
    //getExchangeRate()
    startMoralis()
  }, []);
  return (
      <div className="App" style={{width:'100%',backgroundColor:'#FBF8F4'}}>
    <WagmiConfig config={config}>
      <BrowserRouter >
      <Routes >
        <Route path="/welcome" element={<Welcome />} />
        <Route
            index                 // <-- rendered on "/"
            element={<Welcome />}
          />
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
      </Routes>
      </BrowserRouter>
    </WagmiConfig>
           </div>
  );
  }

export default App;
