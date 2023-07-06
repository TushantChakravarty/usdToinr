import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Main from "./components/Main";
import Swap from './components/Swap';
import { WagmiConfig, createConfig, mainnet } from 'wagmi'
import { createPublicClient, http } from 'viem'
const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http()
  }),
})
function App() {

  return (
<WagmiConfig config={config}>
    <div >
  
      <Main />
      <div style={{ textAlign: "center" }}>
        <h3>Multi-Chain USDT Exchange</h3>
      </div>
      <Swap />
    </div>
</WagmiConfig>
  );
}

export default App;

