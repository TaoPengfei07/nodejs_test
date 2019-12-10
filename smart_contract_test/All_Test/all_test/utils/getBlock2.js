const Czr = require('czr')
const czr = new Czr()
const decode = require('../../Test2/utils/decode')
const sleep = require('sleep')

// let account = "czr_33EuccjKjcZgwbHYp8eLhoFiaKGARVigZojeHzySD9fQ1ysd7u"
let account = "czr_35vDkfSth7N1WFjh9MT7NZekYGdu6ihLSMmmGjCwBPSHTm5QWi"

function call(parameters) {
    return new Promise(async (resolve, reject) => {
        czr.request.call({
            "from": parameters.from ? parameters.from : account,
            "to": parameters.to,
            "data": parameters.data,
            "mci": parameters.mci ? parameters.mci : "latest"
        })
            .then(ret => {
                if (ret.code === 0) {
                    // console.log(ret.output)
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
                    console.log('getBlock request failed =>', ret);
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
    return result
}

async function getStatus(){
    let result=await czr.request.status()
    return result;
}

module.exports = {
    call: call,
    getaccountBalance: getaccountBalance,
    getBlockState: getBlockState,
    getStatus:getStatus
}