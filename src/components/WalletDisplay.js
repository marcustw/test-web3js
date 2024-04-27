import React, { useState, useEffect } from "react";

const USDT_ABI = [
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    type: "function",
  },
];
const USDT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

function WalletDisplay({ web3, account }) {
  const [ethBalance, setEthBalance] = useState("0");
  const [usdtBalance, setUsdtBalance] = useState("0");

  useEffect(() => {
    const fetchBalances = async () => {
      const ethBal = await web3.eth.getBalance(account);
      setEthBalance(web3.utils.fromWei(ethBal, "ether"));
      const usdtContract = new web3.eth.Contract(USDT_ABI, USDT_ADDRESS);
      const usdtBalance = await usdtContract.methods.balanceOf(account).call();
      setUsdtBalance(web3.utils.fromWei(usdtBalance, "mwei"));
    };
    if (web3) {
      fetchBalances();
    }
  }, [web3, account]);

  return (
    <div>
      <p>Wallet Address: {account}</p>
      <p>ETH Balance: {ethBalance}</p>
      <p>USDT Balance: {usdtBalance}</p>
    </div>
  );
}

export default WalletDisplay;
