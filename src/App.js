import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./App.css";
import WalletDisplay from "./components/WalletDisplay";

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    } else {
      alert(
        "MetaMask is not installed. Please consider installing it: https://metamask.io/"
      );
    }
  }, []);

  const connectWallet = async () => {
    try {
      const accs = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accs);
    } catch (e) {
      console.error("Error connecting to MetaMask", e);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <h1 style={{ marginRight: "10px" }}>Ethereum Wallet Info</h1>
          <img src="/MetaMask_Fox.png" alt="" width="200px" height="200px" />
        </div>
        {accounts.length === 0 ? (
          <button onClick={connectWallet}>Connect MetaMask</button>
        ) : (
          <WalletDisplay web3={web3} account={accounts[0]} />
        )}
      </header>
    </div>
  );
}

export default App;
