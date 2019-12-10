const path = require('path');
const fs = require('fs');
const solc = require('czr-solc');

const srcpath = path.resolve(__dirname,'contracts','test3.sol');
const source = fs.readFileSync(srcpath,'utf-8');

let input={
    "language":'Solidity',
    "sources":{
        'test3.sol':{
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
const contractByteCode=output.contracts['test3.sol']['Test3'].evm.bytecode.object

const methodIdentifiers={
    Test3MethodIdentifiers:output.contracts['test3.sol']['Test3'].evm.methodIdentifiers
}
const abi={
    Test3Abi:output.contracts['test3.sol']['Test3']['abi']
}

let keysTest3=[];
let valuesTest3=Object.values(methodIdentifiers.Test3MethodIdentifiers)
let methodBytecode={
    Test3MethodBytecode:{}
}
for(let k in Object.keys(methodIdentifiers.Test3MethodIdentifiers)){
    keysTest3.push(Object.keys(methodIdentifiers.Test3MethodIdentifiers)[k].split('(')[0]);
    methodBytecode.Test3MethodBytecode[keysTest3[k]]=valuesTest3[k]
}

// console.log(methodIdentifiers,abi);
// console.log(contractByteCode,methodBytecode,abi);

module.exports={
    contractByteCode:contractByteCode,
    methodBytecode:methodBytecode,
    abi:abi
}
