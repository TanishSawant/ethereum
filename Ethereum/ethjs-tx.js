var Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/ab9f92e073fe46d285f09353a66f1031')

const account1 = '0x0ba869112Cb2Aeb8fdf76D67E80910D9650D8Cc0' // Your account address 1
const account2 = '0xeC12CAAB0993164C7556b95d89A9f5811468452b' // Your account address 2

const privateKey1 = Buffer.from('F5F125640540508EAB6156745C79A0AFEE48EAE91306B94DC92EF22B0F1BE07B', 'hex')
const privateKey2 = Buffer.from('47B90F7CAB37702A8814226BF842687E5A842244E8BE92E6284583676EF4D495', 'hex')

web3.eth.getTransactionCount(account1, (err, txCount) => {
    // Build the transaction
    console.log('nonce: ', txCount)
    const txObject = {
        nonce: web3.utils.toHex(txCount),
        to: account2,
        value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
        gasLimit: web3.utils.toHex(1000000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }

    // Sign the transaction
    const tx = new Tx(txObject, { chain: 'ropsten', hardfork: 'petersburg' })
    tx.sign(privateKey1)

    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')
    console.log(raw)
        // Broadcast the transaction
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('err: ', err, 'txHash:', txHash)
            // Now go check etherscan to see the transaction!
    })
})