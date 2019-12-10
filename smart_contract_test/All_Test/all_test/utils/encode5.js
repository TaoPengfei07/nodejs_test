const AbiCoder = require('../../TestAddressAndKill/utils/abi-coder');
const compile = require('../compile5');

function encodeParams(Params) {
    return new Promise(async (resolve, reject) => {
        try {
            let functionName = Params.functionName;
            let abi = compile.abi;
            let funABI = '';
            let args = Params.args ? Params.args : [];
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
            Params.funABI = funABI
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
            if (funABI.name === "constructor" || funABI.type === "constructor" || functionName === "constructor") {
                Params.data = compile.contractByteCode + paramsEncode;
            } else {
                let methodBytecode = compile.methodBytecode;
                Params.data = methodBytecode[functionName] + paramsEncode;
            }
            resolve(Params)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    encodeParams: encodeParams
}

