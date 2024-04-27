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

export { USDT_ABI, USDT_ADDRESS };
