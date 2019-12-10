const Czr = require('czr')
const czr = new Czr()
const decode = require('../../TestPekka/utils/decode')
const sleep = require('sleep')
const bs58check = require("bs58check");

//let account = "czr_33EuccjKjcZgwbHYp8eLhoFiaKGARVigZojeHzySD9fQ1ysd7u"
let account = "czr_35vDkfSth7N1WFjh9MT7NZekYGdu6ihLSMmmGjCwBPSHTm5QWi"

function call(parameters) {
    return new Promise(async (resolve, reject) => {
        czr.request.call({
            "from": parameters.from ? parameters.from : account,
            "to": parameters.to,
            "data": parameters.data
        })
            .then(ret => {
                if (ret.code === 0) {
                    let response = "0x" + ret.output;
                    let fnabi = parameters.funABI
                    // console.log(response,fnabi);
                    let decres = decode.decodeResponse(response, fnabi);
                    let res = []
                    for (var key in decres) {
                        res.push(decres[key].split(": ")[1])
                    }
                    if (res.length === 1) {
                        resolve(res[0])
                    } else {
                        resolve(res)
                    }
                } else {
                    console.log('getBlock7 request failed =>', ret);
                    reject(ret)
                }
            })
    })
}

function getaccountBalance(account) {
    return new Promise(async (resolve, reject) => {
        czr.request.accountBalance(account)
            .then(ret => {
                if (ret.code === 0) {
                    //console.log('request success =>', ret)
                    resolve(ret.balance)
                } else {
                    console.log('accountBalance request failed =>', ret)
                    reject(ret)
                }
            })
            .catch(err => reject(err))
    })
}

async function getBlockState(hash) {
    let result = await czr.request.getBlockState(hash)
    while (result.block_state === null && result.code === 0) {
        sleep.msleep(100)
        result = await czr.request.getBlockState(hash)
    }

    while (result.block_state.is_stable === 0) {
        sleep.msleep(100)
        result = await czr.request.getBlockState(hash)
    }

        return result

}

async function getBlock7(hash) {
    let result = await czr.request.getBlock(hash)
    return result
}

async function getBlockTraces(hash){
    let result=await czr.request.blockTraces(hash)
    return result;
}

async function getGas(hash){
    let gasPrice = await getBlock7(hash)
    let usedGas = await getBlockState(hash)
    let gas = usedGas.block_state.stable_content.gas_used * gasPrice.block.content.gas_price
    return gas
}

function getCzrAddress(hexCzrAddress){
    let pub=Buffer.from(hexCzrAddress, "hex");
    let version = Buffer.from([0x01]);
    let v_pub = Buffer.concat([version, pub]);
    let account = "czr_" + bs58check.encode(v_pub);
    return account
}

function getHexCzrAddress(CzrAddress){
    let res=CzrAddress.split("_")
    let bytecode=bs58check.decode(res[1])
    let hexCzrAddress=bytecode.toString("hex").substring(2).toUpperCase()
    return hexCzrAddress
}

module.exports = {
    call: call,
    getaccountBalance: getaccountBalance,
    getBlockState: getBlockState,
    getCzrAddress:getCzrAddress,
    getHexCzrAddress:getHexCzrAddress,
    getBlock:getBlock7,
    getGas:getGas,
    getBlockTraces:getBlockTraces
}