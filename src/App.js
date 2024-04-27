import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./App.css";
import WalletDisplay from "./components/WalletDisplay";
import { INFURA_URL } from "./utils/api";
import { METAMASK_DOWNLOAD_URL } from "./utils/constants";

function App() {
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);

    const showMetaMaskAlert = () => {
        alert(
            "MetaMask is not installed. Please consider " +
                `installing it: ${METAMASK_DOWNLOAD_URL}`
        );
        window.open(METAMASK_DOWNLOAD_URL, "_blank", "noopener");
    };

    useEffect(() => {
        if (window.ethereum) {
            console.log("Called web3 constructor");
            const web3Instance = new Web3(
                new Web3.providers.HttpProvider(INFURA_URL)
            );
            setWeb3(web3Instance);
        } else {
            showMetaMaskAlert();
        }
    }, []);

    const connectWallet = async () => {
        if (!window.ethereum || !web3) {
            return showMetaMaskAlert();
        }
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
                    <h1 style={{ marginRight: 10 }}>Ethereum Wallet Info</h1>
                    <img
                        src="/MetaMask_Fox.png"
                        alt=""
                        width="200px"
                        height="200px"
                    />
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
