const AbiCoder = require('./abi-coder');
const Block = require('../utils/send-block');
const compile = require('../compile')
const Czr = require('czr')
const czr = new Czr()

// encodeParams({
//     from: "czr_4kYTyZTjRGQoEioCbT8JcKpDaqjJs2ekpxcucTC14SniuNABi6",
//     to: "",
//     amount: '0',
//     password: "12345678",
//     gas: 10000000000000000,
//     gas_price: "10000000",
//     functionName:"constructor",
//     args:["1000", "czr", "CZR"]
// })

// encodeParams({
//     from: "czr_4kYTyZTjRGQoEioCbT8JcKpDaqjJs2ekpxcucTC14SniuNABi6",
//     to: "",
//     amount: '0',
//     password: "12345678",
//     gas: 10000000000000000,
//     gas_price: "10000000",
//     functionName:"transfer",
//     args:["czr_4kYTyZTjRGQoEioCbT8JcKpDaqjJs2ekpxcucTC14SniuNABi6", "1000"]
// })

function encodeParams(Params) {
    return new Promise(async (resolve, reject) => {
        try {
            let functionName = Params.functionName;
            let abi = compile.abi;
            let funABI = '';
            let args = Params.args?Params.args:[];
            for (let i in abi) {
                let name;
                if (abi[i].name === undefined) {
                    name = abi[i].type;
                } else {
                    name = abi[i].name;
                }

                if (name === functionName) {
                    funABI = abi[i];
                    break
                }
            }
            Params.funABI=funABI
            let types = [];
            if (funABI.inputs && funABI.inputs.length) {
                for (var i = 0; i < funABI.inputs.length; i++) {
                    var type = funABI.inputs[i].type;
                    types.push(type);
                    if (args.length < types.length) {
                        args.push('');
                    }
                }
            }
            let abiCoder = new AbiCoder();
            let paramsEncode = abiCoder.encode(types, args);
            paramsEncode = paramsEncode.substr(0, 2) === "0x" ? paramsEncode.substr(2) : paramsEncode
            if (funABI.name === "constructor" || funABI.type === "constructor") {
                Params.data = compile.contractByteCode + paramsEncode;
            } else {
                let methodBytecode = compile.methodBytecode;
                // console.log(functionName);
                // console.log(methodBytecode)
                // console.log(methodBytecode[functionName])
                Params.data = methodBytecode[functionName] + paramsEncode;
            }
            // console.log(Params.data)
            resolve(Params)
        }catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    encodeParams: encodeParams
}

