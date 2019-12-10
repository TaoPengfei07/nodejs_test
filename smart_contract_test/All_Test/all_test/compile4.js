const path = require('path');
const fs = require('fs');
const solc = require('czr-solc');

const srcpath = path.resolve(__dirname,'contracts','test4.sol');
const source = fs.readFileSync(srcpath,'utf-8');

let input={
    "language":'Solidity',
    "sources":{
        'test4.sol':{
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
    Test4part1ContractByteCode:output.contracts['test4.sol']['Test4part1'].evm.bytecode.object,
    Test4part2ContractByteCode:output.contracts['test4.sol']['Test4part2'].evm.bytecode.object,
    Test4part3ContractByteCode:output.contracts['test4.sol']['Test4part3'].evm.bytecode.object,
    Test4part4ContractByteCode:output.contracts['test4.sol']['Test4part4'].evm.bytecode.object,
    Test4part5ContractByteCode:output.contracts['test4.sol']['Test4part5'].evm.bytecode.object,
    Test4part6ContractByteCode:output.contracts['test4.sol']['Test4part6'].evm.bytecode.object,
    Test4part7ContractByteCode:output.contracts['test4.sol']['Test4part7'].evm.bytecode.object,
    Test4part8ContractByteCode:output.contracts['test4.sol']['Test4part8'].evm.bytecode.object,
    Test4partModifier1ContractByteCode:output.contracts['test4.sol']['Test4partModifier1'].evm.bytecode.object,
    Test4partModifier2ContractByteCode:output.contracts['test4.sol']['Test4partModifier2'].evm.bytecode.object,
    Test4partModifier3ContractByteCode:output.contracts['test4.sol']['Test4partModifier3'].evm.bytecode.object,
    Test4partModifier4ContractByteCode:output.contracts['test4.sol']['Test4partModifier4'].evm.bytecode.object,
    Test4partModifier5ContractByteCode:output.contracts['test4.sol']['Test4partModifier5'].evm.bytecode.object,
    Test4partFallBack1ContractByteCode:output.contracts['test4.sol']['Test4partFallBack1'].evm.bytecode.object,
    Test4partFunctionOverloading1ContractByteCode:output.contracts['test4.sol']['Test4partFunctionOverloading1'].evm.bytecode.object,
    Test4partFunctionOverloading2ContractByteCode:output.contracts['test4.sol']['Test4partFunctionOverloading2'].evm.bytecode.object,
    Test4partEventsContractByteCode:output.contracts['test4.sol']['Test4partEvents'].evm.bytecode.object,
    Test4partAbstractContracts2ContractByteCode:output.contracts['test4.sol']['Test4partAbstractContracts2'].evm.bytecode.object,
    Test4partLibrary1ContractByteCode:output.contracts['test4.sol']['Test4partLibrary1'].evm.bytecode.object,
    Test4partLibrary2ContractByteCode:output.contracts['test4.sol']['Test4partLibrary2'].evm.bytecode.object,
    Test4partUsingForContractByteCode:output.contracts['test4.sol']['Test4partUsingFor'].evm.bytecode.object,
}

const methodIdentifiers={
    Test4part1MethodIdentifiers:output.contracts['test4.sol']['Test4part1'].evm.methodIdentifiers,
    Test4part2MethodIdentifiers:output.contracts['test4.sol']['Test4part2'].evm.methodIdentifiers,
    Test4part3MethodIdentifiers:output.contracts['test4.sol']['Test4part3'].evm.methodIdentifiers,
    Test4part4MethodIdentifiers:output.contracts['test4.sol']['Test4part4'].evm.methodIdentifiers,
    Test4part5MethodIdentifiers:output.contracts['test4.sol']['Test4part5'].evm.methodIdentifiers,
    Test4part6MethodIdentifiers:output.contracts['test4.sol']['Test4part6'].evm.methodIdentifiers,
    Test4part7MethodIdentifiers:output.contracts['test4.sol']['Test4part7'].evm.methodIdentifiers,
    Test4part8MethodIdentifiers:output.contracts['test4.sol']['Test4part8'].evm.methodIdentifiers,
    Test4partModifier1MethodIdentifiers:output.contracts['test4.sol']['Test4partModifier1'].evm.methodIdentifiers,
    Test4partModifier2MethodIdentifiers:output.contracts['test4.sol']['Test4partModifier2'].evm.methodIdentifiers,
    Test4partModifier3MethodIdentifiers:output.contracts['test4.sol']['Test4partModifier3'].evm.methodIdentifiers,
    Test4partModifier4MethodIdentifiers:output.contracts['test4.sol']['Test4partModifier4'].evm.methodIdentifiers,
    Test4partModifier5MethodIdentifiers:output.contracts['test4.sol']['Test4partModifier5'].evm.methodIdentifiers,
    Test4partFallBack1MethodIdentifiers:output.contracts['test4.sol']['Test4partFallBack1'].evm.methodIdentifiers,
    Test4partFunctionOverloading1MethodIdentifiers:output.contracts['test4.sol']['Test4partFunctionOverloading1'].evm.methodIdentifiers,
    Test4partFunctionOverloading2MethodIdentifiers:output.contracts['test4.sol']['Test4partFunctionOverloading2'].evm.methodIdentifiers,
    Test4partEventsMethodIdentifiers:output.contracts['test4.sol']['Test4partEvents'].evm.methodIdentifiers,
    Test4partAbstractContracts2MethodIdentifiers:output.contracts['test4.sol']['Test4partAbstractContracts2'].evm.methodIdentifiers,
    Test4partLibrary1MethodIdentifiers:output.contracts['test4.sol']['Test4partLibrary1'].evm.methodIdentifiers,
    Test4partLibrary2MethodIdentifiers:output.contracts['test4.sol']['Test4partLibrary2'].evm.methodIdentifiers,
    Test4partUsingForMethodIdentifiers:output.contracts['test4.sol']['Test4partUsingFor'].evm.methodIdentifiers,
}
const abi={
    Test4part1Abi:output.contracts['test4.sol']['Test4part1']['abi'],
    Test4part2Abi:output.contracts['test4.sol']['Test4part2']['abi'],
    Test4part3Abi:output.contracts['test4.sol']['Test4part3']['abi'],
    Test4part4Abi:output.contracts['test4.sol']['Test4part4']['abi'],
    Test4part5Abi:output.contracts['test4.sol']['Test4part5']['abi'],
    Test4part6Abi:output.contracts['test4.sol']['Test4part6']['abi'],
    Test4part7Abi:output.contracts['test4.sol']['Test4part7']['abi'],
    Test4part8Abi:output.contracts['test4.sol']['Test4part8']['abi'],
    Test4partModifier1Abi:output.contracts['test4.sol']['Test4partModifier1']['abi'],
    Test4partModifier2Abi:output.contracts['test4.sol']['Test4partModifier2']['abi'],
    Test4partModifier3Abi:output.contracts['test4.sol']['Test4partModifier3']['abi'],
    Test4partModifier4Abi:output.contracts['test4.sol']['Test4partModifier4']['abi'],
    Test4partModifier5Abi:output.contracts['test4.sol']['Test4partModifier5']['abi'],
    Test4partFallBack1Abi:output.contracts['test4.sol']['Test4partFallBack1']['abi'],
    Test4partFunctionOverloading1Abi:output.contracts['test4.sol']['Test4partFunctionOverloading1']['abi'],
    Test4partFunctionOverloading2Abi:output.contracts['test4.sol']['Test4partFunctionOverloading2']['abi'],
    Test4partEventsAbi:output.contracts['test4.sol']['Test4partEvents']['abi'],
    Test4partAbstractContracts2Abi:output.contracts['test4.sol']['Test4partAbstractContracts2']['abi'],
    Test4partLibrary1Abi:output.contracts['test4.sol']['Test4partLibrary1']['abi'],
    Test4partLibrary2Abi:output.contracts['test4.sol']['Test4partLibrary2']['abi'],
    Test4partUsingForAbi:output.contracts['test4.sol']['Test4partUsingFor']['abi'],
}

let keysTest4part1=[];
let keysTest4part2=[];
let keysTest4part3=[];
let keysTest4part4=[];
let keysTest4part5=[];
let keysTest4part6=[];
let keysTest4part7=[];
let keysTest4part8=[];
let keysTest4partModifier1=[];
let keysTest4partModifier2=[];
let keysTest4partModifier3=[];
let keysTest4partModifier4=[];
let keysTest4partModifier5=[];
let keysTest4partFallBack1=[];
let keysTest4partFunctionOverloading1=[];
let keysTest4partFunctionOverloading2=[];
let keysTest4partEvents=[];
let keysTest4partAbstractContracts2=[];
let keysTest4partLibrary1=[];
let keysTest4partLibrary2=[];
let keysTest4partUsingFor=[];

let valuesTest4part1=Object.values(methodIdentifiers.Test4part1MethodIdentifiers)
let valuesTest4part2=Object.values(methodIdentifiers.Test4part2MethodIdentifiers)
let valuesTest4part3=Object.values(methodIdentifiers.Test4part3MethodIdentifiers)
let valuesTest4part4=Object.values(methodIdentifiers.Test4part4MethodIdentifiers)
let valuesTest4part5=Object.values(methodIdentifiers.Test4part5MethodIdentifiers)
let valuesTest4part6=Object.values(methodIdentifiers.Test4part6MethodIdentifiers)
let valuesTest4part7=Object.values(methodIdentifiers.Test4part7MethodIdentifiers)
let valuesTest4part8=Object.values(methodIdentifiers.Test4part8MethodIdentifiers)
let valuesTest4partModifier1=Object.values(methodIdentifiers.Test4partModifier1MethodIdentifiers)
let valuesTest4partModifier2=Object.values(methodIdentifiers.Test4partModifier2MethodIdentifiers)
let valuesTest4partModifier3=Object.values(methodIdentifiers.Test4partModifier3MethodIdentifiers)
let valuesTest4partModifier4=Object.values(methodIdentifiers.Test4partModifier4MethodIdentifiers)
let valuesTest4partModifier5=Object.values(methodIdentifiers.Test4partModifier5MethodIdentifiers)
let valuesTest4partFallBack1=Object.values(methodIdentifiers.Test4partFallBack1MethodIdentifiers)
let valuesTest4partFunctionOverloading1=Object.values(methodIdentifiers.Test4partFunctionOverloading1MethodIdentifiers)
let valuesTest4partFunctionOverloading2=Object.values(methodIdentifiers.Test4partFunctionOverloading2MethodIdentifiers)
let valuesTest4partEvents=Object.values(methodIdentifiers.Test4partEventsMethodIdentifiers)
let valuesTest4partAbstractContracts2=Object.values(methodIdentifiers.Test4partAbstractContracts2MethodIdentifiers)
let valuesTest4partLibrary1=Object.values(methodIdentifiers.Test4partLibrary1MethodIdentifiers)
let valuesTest4partLibrary2=Object.values(methodIdentifiers.Test4partLibrary2MethodIdentifiers)
let valuesTest4partUsingFor=Object.values(methodIdentifiers.Test4partUsingForMethodIdentifiers)

let methodBytecode={
    Test4part1MethodBytecode:{},
    Test4part2MethodBytecode:{},
    Test4part3MethodBytecode:{},
    Test4part4MethodBytecode:{},
    Test4part5MethodBytecode:{},
    Test4part6MethodBytecode:{},
    Test4part7MethodBytecode:{},
    Test4part8MethodBytecode:{},
    Test4partModifier1MethodBytecode:{},
    Test4partModifier2MethodBytecode:{},
    Test4partModifier3MethodBytecode:{},
    Test4partModifier4MethodBytecode:{},
    Test4partModifier5MethodBytecode:{},
    Test4partFallBack1MethodBytecode:{},
    Test4partFunctionOverloading1MethodBytecode:{},
    Test4partFunctionOverloading2MethodBytecode:{},
    Test4partEventsMethodBytecode:{},
    Test4partAbstractContracts2MethodBytecode:{},
    Test4partLibrary1MethodBytecode:{},
    Test4partLibrary2MethodBytecode:{},
    Test4partUsingForMethodBytecode:{},
}

for(let k in Object.keys(methodIdentifiers.Test4part1MethodIdentifiers)){
    keysTest4part1.push(Object.keys(methodIdentifiers.Test4part1MethodIdentifiers)[k].split('(')[0]);
    methodBytecode.Test4part1MethodBytecode[keysTest4part1[k]]=valuesTest4part1[k]
}

for(let k in Object.keys(methodIdentifiers.Test4part2MethodIdentifiers)){
    keysTest4part2.push(Object.keys(methodIdentifiers.Test4part2MethodIdentifiers)[k].split('(')[0]);
    methodBytecode.Test4part2MethodBytecode[keysTest4part2[k]]=valuesTest4part2[k]
}

for(let k in Object.keys(methodIdentifiers.Test4part3MethodIdentifiers)){
    keysTest4part3.push(Object.keys(methodIdentifiers.Test4part3MethodIdentifiers)[k].split('(')[0]);
    methodBytecode.Test4part3MethodBytecode[keysTest4part3[k]]=valuesTest4part3[k]
}

for(let k in Object.keys(methodIdentifiers.Test4part4MethodIdentifiers)){
    keysTest4part4.push(Object.keys(methodIdentifiers.Test4part4MethodIdentifiers)[k].split('(')[0]);
    methodBytecode.Test4part4MethodBytecode[keysTest4part4[k]]=valuesTest4part4[k]
}

for(let k in Object.keys(methodIdentifiers.Test4part5MethodIdentifiers)){
    keysTest4part5.push(Object.keys(methodIdentifiers.Test4part5MethodIdentifiers)[k].split('(')[0]);
    methodBytecode.Test4part5MethodBytecode[keysTest4part5[k]]=valuesTest4part5[k]
}

for(let k in Object.keys(methodIdentifiers.Test4part6MethodIdentifiers)){
    keysTest4part6.push(Object.keys(methodIdentifiers.Test4part6MethodIdentifiers)[k].split('(')[0]);
    methodBytecode.Test4part6MethodBytecode[keysTest4part6[k]]=valuesTest4part6[k]
}

for(let k in Object.keys(methodIdentifiers.Test4part7MethodIdentifiers)){
    keysTest4part7.push(Object.keys(methodIdentifiers.Test4part7MethodIdentifiers)[k].split('(')[0]);
    methodBytecode.Test4part7MethodBytecode[keysTest4part7[k]]=valuesTest4part7[k]
}

for(let k in Object.keys(methodIdentifiers.Test4part8MethodIdentifiers)){
    keysTest4part8.push(Object.keys(methodIdentifiers.Test4part8MethodIdentifiers)[k].split('(')[0]);
    methodBytecode.Test4part8MethodBytecode[keysTest4part8[k]]=valuesTest4part8[k]
}

for(let k in Object.keys(methodIdentifiers.Test4partModifier1MethodIdentifiers)){
    keysTest4partModifier1.push(Object.keys(methodIdentifiers.Test4partModifier1MethodIdentifiers)[k].split('(')[0]);
    methodBytecode.Test4partModifier1MethodBytecode[keysTest4partModifier1[k]]=valuesTest4partModifier1[k]
}

for(let k in Object.keys(methodIdentifiers.Test4partModifier2MethodIdentifiers)){
    keysTest4partModifier2.push(Object.keys(methodIdentifiers.Test4partModifier2MethodIdentifiers)[k].split('(')[0]);
    methodBytecode.Test4partModifier2MethodBytecode[keysTest4partModifier2[k]]=valuesTest4partModifier2[k]
}

for(let k in Object.keys(methodIdentifiers.Test4partModifier3MethodIdentifiers)){
    keysTest4partModifier3.push(Object.keys(methodIdentifiers.Test4partModifier3MethodIdentifiers)[k].split('(')[0]);
    methodBytecode.Test4partModifier3MethodBytecode[keysTest4partModifier3[k]]=valuesTest4partModifier3[k]
}

for(let k in Object.keys(methodIdentifiers.Test4partModifier4MethodIdentifiers)){
    keysTest4partModifier4.push(Object.keys(methodIdentifiers.Test4partModifier4MethodIdentifiers)[k].split('(')[0]);
    methodBytecode.Test4partModifier4MethodBytecode[keysTest4partModifier4[k]]=valuesTest4partModifier4[k]
}

for(let k in Object.keys(methodIdentifiers.Test4partModifier5MethodIdentifiers)){
    keysTest4partModifier5.push(Object.keys(methodIdentifiers.Test4partModifier5MethodIdentifiers)[k].split('(')[0]);
    methodBytecode.Test4partModifier5MethodBytecode[keysTest4partModifier5[k]]=valuesTest4partModifier5[k]
}

for(let k in Object.keys(methodIdentifiers.Test4partFallBack1MethodIdentifiers)){
    keysTest4partFallBack1.push(Object.keys(methodIdentifiers.Test4partFallBack1MethodIdentifiers)[k].split('(')[0]);
    methodBytecode.Test4partFallBack1MethodBytecode[keysTest4partFallBack1[k]]=valuesTest4partFallBack1[k]
}

for(let k in Object.keys(methodIdentifiers.Test4partFunctionOverloading1MethodIdentifiers)){
    keysTest4partFunctionOverloading1.push(Object.keys(methodIdentifiers.Test4partFunctionOverloading1MethodIdentifiers)[k].split('(')[0]);
    methodBytecode.Test4partFunctionOverloading1MethodBytecode[keysTest4partFunctionOverloading1[k]]=valuesTest4partFunctionOverloading1[k]
}

for(let k in Object.keys(methodIdentifiers.Test4partFunctionOverloading2MethodIdentifiers)){
    keysTest4partFunctionOverloading2.push(Object.keys(methodIdentifiers.Test4partFunctionOverloading2MethodIdentifiers)[k].split('(')[0]);
    methodBytecode.Test4partFunctionOverloading2MethodBytecode[keysTest4partFunctionOverloading2[k]]=valuesTest4partFunctionOverloading2[k]
}

for(let k in Object.keys(methodIdentifiers.Test4partEventsMethodIdentifiers)){
    keysTest4partEvents.push(Object.keys(methodIdentifiers.Test4partEventsMethodIdentifiers)[k].split('(')[0]);
    methodBytecode.Test4partEventsMethodBytecode[keysTest4partEvents[k]]=valuesTest4partEvents[k]
}

for(let k in Object.keys(methodIdentifiers.Test4partAbstractContracts2MethodIdentifiers)){
    keysTest4partAbstractContracts2.push(Object.keys(methodIdentifiers.Test4partAbstractContracts2MethodIdentifiers)[k].split('(')[0]);
    methodBytecode.Test4partAbstractContracts2MethodBytecode[keysTest4partAbstractContracts2[k]]=valuesTest4partAbstractContracts2[k]
}

for(let k in Object.keys(methodIdentifiers.Test4partLibrary1MethodIdentifiers)){
    keysTest4partLibrary1.push(Object.keys(methodIdentifiers.Test4partLibrary1MethodIdentifiers)[k].split('(')[0]);
    methodBytecode.Test4partLibrary1MethodBytecode[keysTest4partLibrary1[k]]=valuesTest4partLibrary1[k]
}

for(let k in Object.keys(methodIdentifiers.Test4partLibrary2MethodIdentifiers)){
    keysTest4partLibrary2.push(Object.keys(methodIdentifiers.Test4partLibrary2MethodIdentifiers)[k].split('(')[0]);
    methodBytecode.Test4partLibrary2MethodBytecode[keysTest4partLibrary2[k]]=valuesTest4partLibrary2[k]
}

for(let k in Object.keys(methodIdentifiers.Test4partUsingForMethodIdentifiers)){
    keysTest4partUsingFor.push(Object.keys(methodIdentifiers.Test4partUsingForMethodIdentifiers)[k].split('(')[0]);
    methodBytecode.Test4partUsingForMethodBytecode[keysTest4partUsingFor[k]]=valuesTest4partUsingFor[k]
}

// console.log(output.contracts['test4.sol']['Test4partLibrary1']);
// console.log(output.contracts['test4.sol']['Test4partLibrary2']);
// console.log(methodIdentifiers,abi);
// console.log(contractByteCode,methodBytecode,abi);

module.exports={
    contractByteCode:contractByteCode,
    methodBytecode:methodBytecode,
    abi:abi
}
