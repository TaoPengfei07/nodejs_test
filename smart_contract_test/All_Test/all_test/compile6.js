const path = require('path');
const fs = require('fs');
const solc = require('czr-solc');

const srcpath = path.resolve(__dirname,'contracts','testFactoryModel.sol');
const source = fs.readFileSync(srcpath,'utf-8');

let input={
    "language":'Solidity',
    "sources":{
        'testFactoryModel.sol':{
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
// console.log(output.contracts['testFactoryModel.sol']);
const contractByteCode=output.contracts['testFactoryModel.sol']['A'].evm.bytecode.object

const methodIdentifiers={
    AMethodIdentifiers:output.contracts['testFactoryModel.sol']['A'].evm.methodIdentifiers,
    BMethodIdentifiers:output.contracts['testFactoryModel.sol']['B'].evm.methodIdentifiers,
    CMethodIdentifiers:output.contracts['testFactoryModel.sol']['C'].evm.methodIdentifiers,
}
const abi={
    AAbi:output.contracts['testFactoryModel.sol']['A']['abi'],
    BAbi:output.contracts['testFactoryModel.sol']['B']['abi'],
    CAbi:output.contracts['testFactoryModel.sol']['C']['abi'],
}

let keysA=[];
let valuesA=Object.values(methodIdentifiers.AMethodIdentifiers)
let methodBytecode={
    AMethodBytecode:{},
    BMethodBytecode:{},
    CMethodBytecode:{},
}
for(let k in Object.keys(methodIdentifiers.AMethodIdentifiers)){
    keysA.push(Object.keys(methodIdentifiers.AMethodIdentifiers)[k].split('(')[0]);
    methodBytecode.AMethodBytecode[keysA[k]]=valuesA[k]
}

let keysB=[];
let valuesB=Object.values(methodIdentifiers.BMethodIdentifiers)
for(let k in Object.keys(methodIdentifiers.BMethodIdentifiers)){
    keysB.push(Object.keys(methodIdentifiers.BMethodIdentifiers)[k].split('(')[0]);
    methodBytecode.BMethodBytecode[keysB[k]]=valuesB[k]
}

let keysC=[];
let valuesC=Object.values(methodIdentifiers.CMethodIdentifiers)
for(let k in Object.keys(methodIdentifiers.CMethodIdentifiers)){
    keysC.push(Object.keys(methodIdentifiers.CMethodIdentifiers)[k].split('(')[0]);
    methodBytecode.CMethodBytecode[keysC[k]]=valuesC[k]
}

// console.log(methodIdentifiers,abi);
// console.log(contractByteCode,methodBytecode,abi);

module.exports={
    contractByteCode:contractByteCode,
    methodBytecode:methodBytecode,
    abi:abi
}
