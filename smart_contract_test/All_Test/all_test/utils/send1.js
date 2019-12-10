const Czr = require('czr')
const sleep = require('sleep')
const czr = new Czr()

//主测试账号
// let account = "czr_33EuccjKjcZgwbHYp8eLhoFiaKGARVigZojeHzySD9fQ1ysd7u"
let account = "czr_35vDkfSth7N1WFjh9MT7NZekYGdu6ihLSMmmGjCwBPSHTm5QWi"

function sendBlock(parameters) {
    //console.log(parameters.data)
    return new Promise(async (resolve, reject) => {
        czr.request.sendBlock({
            "from": parameters.from ? parameters.from : account,
            "to": parameters.to ? parameters.to : "",
            "amount": parameters.amount ? parameters.amount : "0",
            "password": "12345678",
            "gas": 2000000,
            "gas_price": "1000000000",
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
    creatAccount: creatAccount
}