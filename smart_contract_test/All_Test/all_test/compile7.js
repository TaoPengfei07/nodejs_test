const path = require('path');
const fs = require('fs');
const solc = require('czr-solc');

const srcpath = path.resolve(__dirname,'contracts','pekka.sol');
const source = fs.readFileSync(srcpath,'utf-8');

let input={
    "language":'Solidity',
    "sources":{
        'pekka.sol':{
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
    CentralContractContractByteCode:output.contracts['pekka.sol']['CentralContract'].evm.bytecode.object,
    MachineContractContractByteCode:output.contracts['pekka.sol']['MachineContract'].evm.bytecode.object,
    TaskContractContractByteCode:output.contracts['pekka.sol']['TaskContract'].evm.bytecode.object,
}

const methodIdentifiers={
    CentralContractMethodIdentifiers:output.contracts['pekka.sol']['CentralContract'].evm.methodIdentifiers,
    MachineContractMethodIdentifiers:output.contracts['pekka.sol']['MachineContract'].evm.methodIdentifiers,
    TaskContractMethodIdentifiers:output.contracts['pekka.sol']['TaskContract'].evm.methodIdentifiers,
}
const abi={
    CentralContractAbi:output.contracts['pekka.sol']['CentralContract']['abi'],
    MachineContractAbi:output.contracts['pekka.sol']['MachineContract']['abi'],
    TaskContractAbi:output.contracts['pekka.sol']['TaskContract']['abi'],
}

let keysCentralContract=[];
let keysMachineContract=[];
let keysTaskContract=[];

let valuesCentralContract=Object.values(methodIdentifiers.CentralContractMethodIdentifiers)
let valuesMachineContract=Object.values(methodIdentifiers.MachineContractMethodIdentifiers)
let valuesTaskContract=Object.values(methodIdentifiers.TaskContractMethodIdentifiers)

let methodBytecode={
    CentralContractMethodBytecode:{},
    MachineContractMethodBytecode:{},
    TaskContractMethodBytecode:{},
}

for(let k in Object.keys(methodIdentifiers.CentralContractMethodIdentifiers)){
    keysCentralContract.push(Object.keys(methodIdentifiers.CentralContractMethodIdentifiers)[k].split('(')[0]);
    methodBytecode.CentralContractMethodBytecode[keysCentralContract[k]]=valuesCentralContract[k]
}

for(let k in Object.keys(methodIdentifiers.MachineContractMethodIdentifiers)){
    keysMachineContract.push(Object.keys(methodIdentifiers.MachineContractMethodIdentifiers)[k].split('(')[0]);
    methodBytecode.MachineContractMethodBytecode[keysMachineContract[k]]=valuesMachineContract[k]
}

for(let k in Object.keys(methodIdentifiers.TaskContractMethodIdentifiers)){
    keysTaskContract.push(Object.keys(methodIdentifiers.TaskContractMethodIdentifiers)[k].split('(')[0]);
    methodBytecode.TaskContractMethodBytecode[keysTaskContract[k]]=valuesTaskContract[k]
}

// console.log(abi.CentralContractAbi[14]);
// console.log(contractByteCode,methodBytecode,abi);

module.exports={
    contractByteCode:contractByteCode,
    methodBytecode:methodBytecode,
    abi:abi
}
