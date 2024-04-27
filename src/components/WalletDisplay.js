import React, { useState, useEffect } from "react";
import { USDT_ABI, USDT_ADDRESS } from "../utils/contracts";
import { ClipLoader } from "react-spinners";

function WalletDisplay({ web3, account }) {
    const [ethBalance, setEthBalance] = useState("-");
    const [usdtBalance, setUsdtBalance] = useState("-");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBalances = async () => {
            setLoading(true);
            try {
                const ethBal = await web3.eth.getBalance(account);
                setEthBalance(web3.utils.fromWei(ethBal, "ether"));
                const usdtContract = new web3.eth.Contract(
                    USDT_ABI,
                    USDT_ADDRESS
                );
                const usdtBalance = await usdtContract.methods
                    .balanceOf(account)
                    .call();
                setUsdtBalance(web3.utils.fromWei(usdtBalance, "mwei"));
            } catch (e) {
                console.error("Error fetching balances:", e);
            } finally {
                setLoading(false);
            }
        };
        if (web3) {
            fetchBalances();
        } else {
            console.error("Web3 is not initialized");
        }
    }, [web3, account]);

    return loading ? (
        <ClipLoader size={150} color={"#123abc"} loading={loading} />
    ) : (
        <div>
            <p>Wallet Address: {account}</p>
            <p>ETH Balance: {ethBalance}</p>
            <p>USDT Balance: {usdtBalance}</p>
        </div>
    );
}

export default WalletDisplay;
