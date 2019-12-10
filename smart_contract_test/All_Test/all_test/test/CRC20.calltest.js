const Czr = require('czr')
const czr = new Czr()
const decode = require('../utils/decode')

//合约地址
// let contractAddress = "czr_3KfLt664eysPMc5pp1wTiRQhYELXM7EruDVoEPYWM4bmZRDZJq";
// let account = "czr_4apwRzA8YFs2q2EfDGeYnBrGHSh2chFetxdERGgHEEpm38i2X3"
let account = "czr_35vDkfSth7N1WFjh9MT7NZekYGdu6ihLSMmmGjCwBPSHTm5QWi"
// let account = "czr_33EuccjKjcZgwbHYp8eLhoFiaKGARVigZojeHzySD9fQ1ysd7u"

// balanceOf()
//buyPrice()
//decimals()
// frozenAccount()
//name()
//owner()
//sellPrice()
//symbol()
// totalSupply()
// allowance()

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
                        res.push(decres[key])
                    }
                    //console.log(res)
                    resolve(res)
                } else {
                    console.log('request failed =>', ret);
                    reject(ret)
                }
            })
    })
}

/**
 * balanceOf
 */
function balanceOf(parameters) {
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
                    let fnabi = {
                        constant: true,
                        inputs: [{name: "", type: "address"}],
                        name: "balanceOf",
                        outputs: [{name: "", type: "uint256"}],
                        payable: false,
                        stateMutability: "view",
                        type: "function",
                    }
                    let decres = decode.decodeResponse(response, fnabi);
                    let res = []
                    for (var key in decres) {
                        res.push(decres[key])
                    }
                    //console.log(res)
                    resolve(res)
                } else {
                    console.log('request failed =>', ret);
                    reject(ret)
                }
            })
    });
}

/**
 * buyPrice
 */
function buyPrice(parameters) {
    return new Promise(async (resolve, reject) => {
        czr.request.call({
            "from": parameters.from ? parameters.from : account,
            "to": parameters.to,
            "data": parameters.data
        })
            .then(ret => {
                if (ret.code === 0) {
                    let response = "0x" + ret.output;
                    let fnabi = {
                        constant: true,
                        inputs: [],
                        name: "buyPrice",
                        outputs: [{name: "", type: "uint256"}],
                        payable: false,
                        stateMutability: "view",
                        type: "function",
                    }
                    let decres = decode.decodeResponse(response, fnabi);
                    let res = [];
                    for (var key in decres) {
                        res.push(decres[key])
                    }
                    resolve(res)
                } else {
                    console.log('request failed =>', ret)
                    reject(ret)
                }
            })
    })
}

/**
 * decimals
 */
function decimals(parameters) {
    czr.request.call({
        "from": parameters.from ? parameters.from : account,
        "to": parameters.to,
        "data": parameters.data
    })
        .then(ret => {
            if (ret.code === 0) {
                let response = "0x" + ret.output;
                let fnabi = {
                    constant: true,
                    inputs: [],
                    name: "decimals",
                    outputs: [{name: "", type: "uint8"}],
                    payable: false,
                    stateMutability: "view",
                    type: "function",
                }
                let res = decode.decodeResponse(response, fnabi)
                console.log(res)
            } else {
                console.log('request failed =>', ret)
            }
        })
}

/**
 * frozenAccount
 */
function frozenAccount(parameters) {
    return new Promise(async (resolve, reject) => {
        czr.request.call({
            "from": parameters.from ? parameters.from : account,
            "to": parameters.to,
            "data": parameters.data
        })
            .then(ret => {
                if (ret.code === 0) {
                    let response = "0x" + ret.output;
                    let fnabi = {
                        constant: true,
                        inputs: [{name: "", type: "address"}],
                        name: "frozenAccount",
                        outputs: [{name: "", type: "bool"}],
                        payable: false,
                        stateMutability: "view",
                        type: "function",
                    }
                    let decres = decode.decodeResponse(response, fnabi);
                    let res = [];
                    for (var key in decres) {
                        res.push(decres[key])
                    }
                    //console.log(res)
                    resolve(res)
                } else {
                    console.log('request failed =>', ret)
                }
            })
    })
}

/**
 * name
 */
function name(parameters) {
    czr.request.call({
        "from": parameters.from ? parameters.from : account,
        "to": parameters.to,
        "data": parameters.data
    })
        .then(ret => {
            if (ret.code === 0) {
                let response = "0x" + ret.output;
                let fnabi = {
                    constant: true,
                    inputs: [],
                    name: "name",
                    outputs: [{name: "", type: "string"}],
                    payable: false,
                    stateMutability: "view",
                    type: "function",
                }
                let res = decode.decodeResponse(response, fnabi)
                console.log(res)
            } else {
                console.log('request failed =>', ret)
            }
        })
}

/**
 * owner
 */
function owner(parameters) {
    return new Promise(async (resolve, reject) => {
        czr.request.call({
            "from": parameters.from ? parameters.from : account,
            "to": parameters.to,
            "data": parameters.data
        })
            .then(ret => {
                if (ret.code === 0) {
                    let response = "0x" + ret.output;
                    let fnabi = {
                        constant: true,
                        inputs: [],
                        name: "owner",
                        outputs: [{name: "", type: "address"}],
                        payable: false,
                        stateMutability: "view",
                        type: "function",
                    }
                    let decres = decode.decodeResponse(response, fnabi);
                    let res = [];
                    for (var key in decres) {
                        res.push(decres[key])
                    }
                    resolve(res)
                } else {
                    console.log('request failed =>', reject(ret))
                }
            })
    })
}

/**
 * sellPrice
 */
function sellPrice(parameters) {
    return new Promise(async (resolve, reject) => {
        czr.request.call({
            "from": parameters.from ? parameters.from : account,
            "to": parameters.to,
            "data": parameters.data
        })
            .then(ret => {
                if (ret.code === 0) {
                    let response = "0x" + ret.output;
                    let fnabi = {
                        constant: true,
                        inputs: [],
                        name: "sellPrice",
                        outputs: [{name: "", type: "uint256"}],
                        payable: false,
                        stateMutability: "view",
                        type: "function",
                    }
                    let decres = decode.decodeResponse(response, fnabi);
                    let res = [];
                    for (var key in decres) {
                        res.push(decres[key])
                    }
                    resolve(res)
                } else {
                    console.log('request failed =>', ret)
                    reject(ret)
                }
            })
    })
}

/**
 * symbol
 */
function symbol(parameters) {
    czr.request.call({
        "from": parameters.from ? parameters.from : account,
        "to": parameters.to,
        "data": parameters.data
    })
        .then(ret => {
            if (ret.code === 0) {
                let response = "0x" + ret.output;
                let fnabi = {
                    constant: true,
                    inputs: [],
                    name: "symbol",
                    outputs: [{name: "", type: "string"}],
                    payable: false,
                    stateMutability: "view",
                    type: "function",
                }
                let res = decode.decodeResponse(response, fnabi)
                console.log(res)
            } else {
                console.log('request failed =>', ret)
            }
        })
}

/**
 * totalSupply
 */
function totalSupply(parameters) {
    return new Promise(async (resolve, reject) => {
        czr.request.call({
            "from": parameters.from ? parameters.from : account,
            "to": parameters.to,
            "data": parameters.data
        })
            .then(ret => {
                if (ret.code === 0) {
                    let response = "0x" + ret.output;
                    let fnabi = {
                        constant: true,
                        inputs: [],
                        name: "totalSupply",
                        outputs: [{name: "", type: "uint256"}],
                        payable: false,
                        stateMutability: "view",
                        type: "function",
                    };
                    let decres = decode.decodeResponse(response, fnabi);
                    let res = [];
                    for (var key in decres) {
                        res.push(decres[key]);
                    }
                    //console.log(res);
                    resolve(res)
                } else {
                    console.log('request failed =>', ret)
                }
            })
    })
}

/**
 * allowance
 */
function allowance(parameters) {
    return new Promise(async (resolve, reject) => {
        czr.request.call({
            "from": parameters.from ? parameters.from : account,
            "to": parameters.to,
            "data": parameters.data
        }).then(ret => {
            if (ret.code === 0) {
                let response = "0x" + ret.output;
                let fnabi = {
                    constant: true,
                    inputs: [{name: "", type: "address"}, {name: "", type: "address"}],
                    name: "allowance",
                    outputs: [{name: "", type: "uint256"}],
                    payable: false,
                    stateMutability: "view",
                    type: "function",
                };
                let decres = decode.decodeResponse(response, fnabi);
                let res = [];
                for (var key in decres) {
                    res.push(decres[key]);
                }
                //console.log(res);
                resolve(res)
            } else {
                console.log('request failed =>', reject(ret))
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

// function getBlockReceipt(blockHash) {
//     return new Promise(async (resolve, reject) => {
//         czr.request.getBlockReceipt(blockHash).then(ret => {
//             if (ret.code === 0) {
//                 resolve(ret.contractAddress)
//             } else {
//                 console.log('request failed =>', ret)
//                 reject(ret)
//             }
//         })
//     })
// }


module.exports = {
    // balanceOf: balanceOf,
    // buyPrice: buyPrice,
    // decimals: decimals,
    // frozenAccount: frozenAccount,
    // name: name,
    // owner: owner,
    // sellPrice: sellPrice,
    // symbol: symbol,
    // totalSupply: totalSupply,
    // allowance: allowance,
    getaccountBalance: getaccountBalance,
    //getBlockReceipt: getBlockReceipt,
    call:call
}