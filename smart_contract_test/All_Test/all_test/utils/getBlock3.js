const Czr = require('czr')
const czr = new Czr()
const decode = require('../../Test3/utils/decode')
const sleep = require('sleep')

// let account = "czr_33EuccjKjcZgwbHYp8eLhoFiaKGARVigZojeHzySD9fQ1ysd7u"
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
                    console.log('getBlock3 request failed =>', ret);
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

    if (result.code === 0 && result.block_state.stable_content.status === 0) {
        return result
    } else {
        throw result
    }
}

async function getBlock3(hash) {
    let result = await czr.request.getBlock(hash)
    return result
}

async function getBlockTraces(hash){
    let result=await czr.request.blockTraces(hash)
    return result;
}

async function getGas(hash){
    let gasPrice = await getBlock3(hash)
    let usedGas = await getBlockState(hash)
    let gas = usedGas.block_state.stable_content.gas_used * gasPrice.block.content.gas_price
    return gas
}

module.exports = {
    call: call,
    getaccountBalance: getaccountBalance,
    getBlockState: getBlockState,
    getBlock:getBlock3,
    getGas:getGas,
    getBlockTraces:getBlockTraces
}