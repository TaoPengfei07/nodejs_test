const Czr = require('czr')
const czr = new Czr()
const decode = require('../../TestAddressAndKill/utils/decode')
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
                    //console.log('request success =>', ret)
                    let response = "0x" + ret.output;
                    let fnabi = parameters.funABI
                    let decres = decode.decodeResponse(response, fnabi);
                    let res = []
                    for (var key in decres) {
                        res.push(decres[key].split(": ")[1])
                    }
                    //console.log(res)
                    resolve(res)
                } else {
                    console.log('getBlock5 request failed =>', ret);
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
                    console.log('request failed =>', ret)
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

async function getBlock5(hash) {
    let result = await czr.request.getBlock(hash)
        return result
}

module.exports = {
    call: call,
    getaccountBalance: getaccountBalance,
    getBlockState: getBlockState,
    getBlock:getBlock5
}