const path = require('path');
const fs = require('fs');
const solc = require('czr-solc');
// const solc = require('solc');

const srcpath = path.resolve(__dirname,'contracts','test5.sol');
const source = fs.readFileSync(srcpath,'utf-8');

let input={
    "language":'Solidity',
    "sources":{
        'test5.sol':{
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
// console.log(output);
// console.log(output.contracts['test4-1.sol']['ddd'].evm);
// console.log(output.contracts['testFactoryModel.sol']);
const contractByteCode={
    //GetCodeContractByteCode:output.contracts['test5.sol']['GetCode'].evm.bytecode.object,
    //VectorSumContractByteCode:output.contracts['test5.sol']['VectorSum'].evm.bytecode.object,
    Test5ContractByteCode:output.contracts['test5.sol']['test5'].evm.bytecode.object,
}

const methodIdentifiers={
    //GetCodeMethodIdentifiers:output.contracts['test5.sol']['GetCode'].evm.methodIdentifiers,
    //VectorSumMethodIdentifiers:output.contracts['test5.sol']['VectorSum'].evm.methodIdentifiers,
    Test5MethodIdentifiers:output.contracts['test5.sol']['test5'].evm.methodIdentifiers,
}
const abi={
    //GetCodeAbi:output.contracts['test5.sol']['GetCode']['abi'],
    //VectorSumAbi:output.contracts['test5.sol']['VectorSum']['abi'],
    Test5Abi:output.contracts['test5.sol']['test5']['abi'],
}

// let keysGetCode=[];
// let keysVectorSum=[];
let keysTest5=[];

// let valuesGetCode=Object.values(methodIdentifiers.GetCodeMethodIdentifiers)
// let valuesVectorSum=Object.values(methodIdentifiers.VectorSumMethodIdentifiers)
let valuesTest5=Object.values(methodIdentifiers.Test5MethodIdentifiers)

let methodBytecode={
    GetCodeMethodBytecode:{},
    VectorSumMethodBytecode:{},
    Test5MethodBytecode:{},
}

// for(let k in Object.keys(methodIdentifiers.GetCodeMethodIdentifiers)){
//     keysGetCode.push(Object.keys(methodIdentifiers.GetCodeMethodIdentifiers)[k].split('(')[0]);
//     methodBytecode.GetCodeMethodBytecode[keysGetCode[k]]=valuesGetCode[k]
// }
//
// for(let k in Object.keys(methodIdentifiers.VectorSumMethodIdentifiers)){
//     keysVectorSum.push(Object.keys(methodIdentifiers.VectorSumMethodIdentifiers)[k].split('(')[0]);
//     methodBytecode.VectorSumMethodBytecode[keysVectorSum[k]]=valuesVectorSum[k]
// }

for(let k in Object.keys(methodIdentifiers.Test5MethodIdentifiers)){
    keysTest5.push(Object.keys(methodIdentifiers.Test5MethodIdentifiers)[k].split('(')[0]);
    methodBytecode.Test5MethodBytecode[keysTest5[k]]=valuesTest5[k]
}

// console.log(output.contracts['test5.sol']['GetCode']);
// console.log(output.contracts['test5.sol']['test5']);
// console.log(methodIdentifiers,abi);
console.log(contractByteCode,methodBytecode,abi);
// console.log(output.contracts['test5.sol']['test5']);

module.exports={
    contractByteCode:contractByteCode,
    methodBytecode:methodBytecode,
    abi:abi
}
