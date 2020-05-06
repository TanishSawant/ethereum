var Web3 = require('web3');
const web3 = new Web3('https://mainnet.infura.io/v3/ab9f92e073fe46d285f09353a66f1031')

web3.eth.getBlock('latest').then((block) => {
    console.log(
        'BlockHash: ', block.hash,
        'BlockNumber: ', block.number
    );
})