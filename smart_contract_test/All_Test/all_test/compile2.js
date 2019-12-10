const path = require('path');
const fs = require('fs');
const solc = require('czr-solc');

const srcpath = path.resolve(__dirname,'contracts','test2.sol');
const source = fs.readFileSync(srcpath,'utf-8');

let input={
    "language":'Solidity',
    "sources":{
        'test2.sol':{
            "content":source
        }
    },
    "settings":{
        "optimizer": {
            "enabled": true,
            "runs": 200
        },
        "outputSelection": {
            '*':{
                '': [ 'legacyAST' ],
                '*': [ 'abi', 'metadata', 'devdoc', 'userdoc', 'evm.legacyAssembly', 'evm.bytecode', 'evm.deployedBytecode', 'evm.methodIdentifiers', 'evm.gasEstimates' ]
            }
        }
    }
}

let output = JSON.parse(solc.compile(JSON.stringify(input)));

let contractByteCode=output.contracts['test2.sol']['Test2'].evm.bytecode.object
let methodIdentifiers=output.contracts['test2.sol']['Test2'].evm.methodIdentifiers
let abi=output.contracts['test2.sol']['Test2']['abi']

let keys=[];
let values=Object.values(methodIdentifiers)
let methodBytecode={}
for(let k in Object.keys(methodIdentifiers)){
    keys.push(Object.keys(methodIdentifiers)[k].split('(')[0]);
    methodBytecode[keys[k]]=values[k]
}

// console.log(contractByteCode,methodBytecode,abi);

module.exports={
    contractByteCode:contractByteCode,
    methodBytecode:methodBytecode,
    abi:abi
}