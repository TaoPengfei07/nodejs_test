const Czr = require('czr')
const sleep = require('sleep')
const czr = new Czr()

//主测试账号
// let account = "czr_4apwRzA8YFs2q2EfDGeYnBrGHSh2chFetxdERGgHEEpm38i2X3"
let account = "czr_35vDkfSth7N1WFjh9MT7NZekYGdu6ihLSMmmGjCwBPSHTm5QWi"
// let account = "czr_33EuccjKjcZgwbHYp8eLhoFiaKGARVigZojeHzySD9fQ1ysd7u"

//合约地址
// let contractAddress = "czr_3KfLt664eysPMc5pp1wTiRQhYELXM7EruDVoEPYWM4bmZRDZJq"

function sendBlock(parameters) {
    //console.log(parameters.data)
    return new Promise(async (resolve, reject) => {
        czr.request.sendBlock({
            "from": parameters.from ? parameters.from : account,
            "to": parameters.to ? parameters.to : "",
            "amount": parameters.amount ? parameters.amount : "0",
            "password": "12345678",
            "gas": 6000000,
            "gas_price": "50000000000000",
            "data": parameters.data ? parameters.data : ""
        }).then(ret => {
            // console.log(ret)
            if (ret.code === 0) {
                //console.log(parameters.functionName + ":" + ret.hash)
                resolve(ret.hash)
            } else {
                console.log('request failed =>', ret)
                reject(ret)
            }
        });
    })
}

async function getBlockState(hash) {
    let result = await czr.request.getBlockState(hash)
    //console.log(result);
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
    // return new Promise(async (resolve, reject) => {
    //     //console.log("hash:" + hash)
    //     czr.request.getBlock(hash)
    //         .then(ret => {
    //             //console.log(ret.code)
    //             if (ret.code === 0) {
    //                 // console.log(ret)
    //                 resolve(ret)
    //             } else if (ret.code === 2) {
    //                 sleep.msleep(100)
    //                 getBlock(hash)
    //             } else {
    //                 console.log('request failed =>', ret)
    //                 reject(ret)
    //             }
    //         })
    //         .catch(err => reject(err))
    // })
}

function creatAccount() {
    return new Promise(async (resolve, reject) => {
        czr.request.accountCreate('12345678')
            .then(ret => {
                if (ret.code === 0) {
                    resolve(ret.account)
                } else {
                    console.log('request failed =>', ret)
                    reject(ret)
                }
            })
            .catch(err => reject(err))
    })
}

module.exports = {
    sendBlock: sendBlock,
    getBlockState: getBlockState,
    creatAccount: creatAccount
}