import IRouter from "./../artifacts/interfaces/IUniswapV2Router02.json";
import ISwapRouter from "./../artifacts/interfaces/ISwapRouter.json";
import IQouter from "./../artifacts/interfaces/IQuoter.json";

import eth from "./../assets/images/etherLogo.png";
import bnb from "./../assets/images/bnb.png";
import matic from "./../assets/images/matic.png";
import dai from "./../assets/images/dai.png";
import crv from "./../assets/images/crv.png";
import usdc from "./../assets/images/usdc.png";
import aave from "./../assets/images/aave.png"
import link from "./../assets/images/link.png"
import usdt from "./../assets/images/usdt.png";
import uni from "./../assets/images/uni.jpg"
import rupee from "./../assets/images/rupee.jpeg"
export const tokens = {
    "Ethereum Mainnet": [
        
        {
            "image": usdt,
            "name": "USDT",
            "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
            "decimals": 6
        },
           ],
    "Goerli": [
        {
            "image": usdt,
            "name": "INR",
            "address": "0xf3e0d7bF58c5d455D31ef1c2d5375904dF525105",
            "decimals": 6
        },
       
    ],
    "currency":[
        {
            "name":"INR",
            "image":rupee,
        }
    ],
    "Polygon Mainnet": [
       
        {
            "image": usdt,
            "name": "USDT",
            "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
            "decimals": 6
        },
       
    ],
    "BSC": [
        {
            "image": usdt,
            "name": "USDT",
            "address": "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
            "decimals": 6
        },
       
    ],
    "BSC Testnet": [
        {
            "image": usdt,
            "name": "USDT",
            "address": "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
            "decimals": 18
        },
       
    ],
}

export const exchanges = {
    "Ethereum Mainnet": [
        {
            "name": "Uniswap",
            "address": "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
            "router": IRouter
        },
        {
            "name": "Uniswap V3",
            "address": "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6",
            "router": ISwapRouter,
            "quoter": IQouter
        },
        {
            "name": "Sushiswap",
            "address": "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F",
            "router": IRouter
        },
        {
            "name": "Shibaswap",
            "address": "0x03f7724180AA6b939894B5Ca4314783B0b36b329",
            "router": IRouter
        }
    ],
    "Goerli": [
        {
            "name": "Uniswap",
            "address": "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
            "router": IRouter
        },
        {
            "name": "Uniswap V3",
            "address": "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6",
            "router": ISwapRouter,
            "quoter": IQouter
        },
        {
            "name": "Sushiswap",
            "address": "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F",
            "router": IRouter
        },
        {
            "name": "Shibaswap",
            "address": "0x03f7724180AA6b939894B5Ca4314783B0b36b329",
            "router": IRouter
        }
    ],
    "Polygon Mainnet": [
        {
            "name": "Sushiswap",
            "address": "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
            "router": IRouter
        },
        {
            "name": "Uniswap V3",
            "address": "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6",
            "router": ISwapRouter,
            "quoter": IQouter
        },
        {
            "name": "Quickswap",
            "address": "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
            "router": IRouter
        },
        {
            "name": "Jetswap",
            "address": "0x5C6EC38fb0e2609672BDf628B1fD605A523E5923",
            "router": IRouter
        },
        {
            "name": "Apeswap",
            "address": "0xC0788A3aD43d79aa53B09c2EaCc313A787d1d607",
            "router": IRouter
        }

    ],
    "BSC": [
        {
            "name": "Sushiswap",
            "address": "0x947950BcC74888a40Ffa2593C5798F11Fc9124C4",
            "router": IRouter
        },
        {
            "name": "Apeswap",
            "address": "0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7",
            "router": IRouter
        },
        {
            "name": "Jetswap",
            "address": "0x5C6EC38fb0e2609672BDf628B1fD605A523E5923",
            "router": IRouter
        },
        {
            "name": "Pancakeswap",
            "address": "0x10ED43C718714eb63d5aA57B78B54704E256024E",
            "router": IRouter
        }
    ]
}

export const exchangesMap = {
    "Ethereum Mainnet": {
        0: {
            "name": "UNISWAP",
            "address": "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
        },
        1: {
            "name": "Uniswap V3",
            "address": "0xE592427A0AEce92De3Edee1F18E0157C05861564",
        },
        2: {
            "name": "SUSHISWAP",
            "address": "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F"
        },
        3: {
            "name": "SHIBASWAP",
            "address": "0x03f7724180AA6b939894B5Ca4314783B0b36b329"
        }
    },
    "Goerli": {
        0: {
            "name": "UNISWAP",
            "address": "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
        },
        1: {
            "name": "Uniswap V3",
            "address": "0xE592427A0AEce92De3Edee1F18E0157C05861564",
        },
        2: {
            "name": "SUSHISWAP",
            "address": "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F"
        },
        3: {
            "name": "SHIBASWAP",
            "address": "0x03f7724180AA6b939894B5Ca4314783B0b36b329"
        }
    },
    "Polygon Mainnet": {
        0: {
            "name": "SUSHISWAP",
            "address": "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506"
        },
        1: {
            "name": "Uniswap V3",
            "address": "0xE592427A0AEce92De3Edee1F18E0157C05861564",
        },
        2: {
            "name": "QUICKSWAP",
            "address": "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff"
        },
        3: {
            "name": "JETSWAP",
            "address": "0x5C6EC38fb0e2609672BDf628B1fD605A523E5923"
        },
        4: {
            "name": "APESWAP",
            "address": "0xC0788A3aD43d79aa53B09c2EaCc313A787d1d607"
        }
    },
    "BSC": {
        0: {
            "name": "SUSHISWAP",
            "address": "0x947950BcC74888a40Ffa2593C5798F11Fc9124C4"
        },
        1: {
            "name": "PANCAKESWAP",
            "address": "0x10ED43C718714eb63d5aA57B78B54704E256024E"
        },
        2: {
            "name": "JETSWAP",
            "address": "0x5C6EC38fb0e2609672BDf628B1fD605A523E5923"
        },
        3: {
            "name": "APESWAP",
            "address": "0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7"
        }
    },
}
