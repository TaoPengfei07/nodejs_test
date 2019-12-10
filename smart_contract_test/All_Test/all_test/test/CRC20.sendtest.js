const assert = require('assert');
const callTest = require('./CRC20.calltest');
const Block = require('../utils/send-block');
const BigNumber = require('big-number');
const encode = require('../utils/encode');
const sleep = require('sleep');
const Czr=require('czr');
const czr=new Czr();

const getBlock1 = require('../../all_test/utils/getBlock1');
const Block1 = require('../../all_test/utils/send1');
const encode1 = require('../../all_test/utils/encode1');

const getBlock2 = require('../../all_test/utils/getBlock2');
const Block2 = require('../../all_test/utils/send2');
const encode2 = require('../../all_test/utils/encode2');

const getBlock3 = require('../../all_test/utils/getBlock3');
const Block3 = require('../../all_test/utils/send3');
const encode3 = require('../../all_test/utils/encode3');
const compile3 = require('../../all_test/compile3');

const getBlock4 = require('../../all_test/utils/getBlock4');
const Block4 = require('../../all_test/utils/send4');
const encode4 = require('../../all_test/utils/encode4');
const compile4 = require('../../all_test/compile4');
const bs58check = require("bs58check");

const getBlock5 = require('../../all_test/utils/getBlock5');
const Block5 = require('../../all_test/utils/send5');
const encode5 = require('../../all_test/utils/encode5');

const getBlock6 = require('../../all_test/utils/getBlock6');
const Block6 = require('../../all_test/utils/send6');
const encode6 = require('../../all_test/utils/encode6');

const getBlock7 = require('../../all_test/utils/getBlock7');
const Block7 = require('../../all_test/utils/send7');
const encode7 = require('../../all_test/utils/encode7');


//辅助测试账号
// let account2 = "czr_4XDyKJF7sTVQHmrj3FhFsie6u9rt2CLg4AdSmqpyvLZzisChhj";
// let account1 = "czr_4apwRzA8YFs2q2EfDGeYnBrGHSh2chFetxdERGgHEEpm38i2X3"
// let account1 = "czr_33EuccjKjcZgwbHYp8eLhoFiaKGARVigZojeHzySD9fQ1ysd7u"
let account1 = "czr_35vDkfSth7N1WFjh9MT7NZekYGdu6ihLSMmmGjCwBPSHTm5QWi"
let account2 = "";
let contractAddress = "";
let mappingContractAddress = "";

let test4part1ContractAddress = "";
let test4part2ContractAddress = "";
let test4part3ContractAddress = "";
let test4part8ContractAddress = "";
let Test4partModifier2ContractAddress = "";
let Test4partModifier4ContractAddress = "";
let Test4partModifier5ContractAddress = "";
let Test4partFallBack1ContractAddress = "";
let test4partEventsContractAddress = "";
let test4partAbstractContracts2ContractAddress = "";
let test4partLibrary1ContractAddress = "";
let test4partLibrary2ContractAddress = "";
let Test4partUsingForContractAddress = "";

let AContractAddress = "";
let BContractAddress = "";
let CContractAddress = "";

let account3 = "";
let account4 = "";
let account5 = "";
let centralContractContractAddress = "";
let machineContractContractAddress1 = "";
let machineContractContractAddress2 = "";
let machineContractContractAddress3 = "";
let machineContractContractAddress4 = "";
let taskContractContractAddress1 = "";
let taskContractContractAddress2 = "";
let taskContractContractAddress3 = "";
let taskContractContractAddress4 = "";
let taskContractContractAddress5 = "";
let taskContractContractAddress6 = "";

describe("联合测试", () => {
    describe("测试CRC20Token合约", () => {
        it("导入基因账户", async () => {
            await czr.request.accountImport("{\"account\":\"czr_33EuccjKjcZgwbHYp8eLhoFiaKGARVigZojeHzySD9fQ1ysd7u\",\"kdf_salt\":\"774DDE2B6D01D6A2B000BB42F8118E2C\",\"iv\":\"5EF469016DB117B4437FB46D37BFA925\",\"ciphertext\":\"2B9567F4184B4D0A4AD9D5A3BF94805662B562167AFBEC575B06C23F708F0CA0\"}");

            await czr.request.accountImport("{\"account\":\"czr_35vDkfSth7N1WFjh9MT7NZekYGdu6ihLSMmmGjCwBPSHTm5QWi\",\"kdf_salt\":\"EE77309E8A04EDF777BBE7246AE15DDC\",\"iv\":\"F1C2EE0F24EEE85EECD5E538A4601C41\",\"ciphertext\":\"22C6DB6AA029C2D3CF7D546EC9B2DC99D90E744A507FEE390F81A0C50E324C4B\"}");

            let ret = await czr.request.sendBlock({
                "from": "czr_33EuccjKjcZgwbHYp8eLhoFiaKGARVigZojeHzySD9fQ1ysd7u",
                "to": "czr_35vDkfSth7N1WFjh9MT7NZekYGdu6ihLSMmmGjCwBPSHTm5QWi",
                "amount": "100000000000000000000000",
                "password": "12345678",
                "gas": "21000",
                "gas_price": "1000000000",
                "data": ""
            });

            let blockReceiptawait2 = await Block.getBlockState(ret.hash);
            while (!blockReceiptawait2.block_state.is_stable) {
                sleep.msleep(100);
                blockReceiptawait2 = await Block.getBlockState(ret.hash);
            }

            await czr.request.accountBalance('czr_35vDkfSth7N1WFjh9MT7NZekYGdu6ihLSMmmGjCwBPSHTm5QWi')

        });

        it("初始化环境，创建账号account2并转1CZR给改账号account2", async () => {
            let beforeAmount = 0;
            account2 = await Block.creatAccount();
            console.log("account2:" + account2)
            beforeAmount = await callTest.getaccountBalance(account2);
            //console.log(beforeAmount)
            let blockHash = await Block.sendBlock({
                to: account2,
                amount: "1000000000000000000000"
            });
            // console.log(blockHash)
            let blockReceiptawait = await Block.getBlockState(blockHash);
            // console.log(!blockReceiptawait.block.is_stable)
            while (!blockReceiptawait.block_state.is_stable) {
                sleep.msleep(100)
                blockReceiptawait = await Block.getBlockState(blockHash);
            }
            let afterAmount = 0;
            afterAmount = await callTest.getaccountBalance(account2);
            // console.log(afterAmount,beforeAmount)
            assert.equal('1000000000000000000000', (afterAmount - beforeAmount))
        }).timeout(10000000);

        it("部署CRC20合约", async () => {
            let data = await encode.encodeParams({
                functionName: "constructor",
                args: ["1000000000000000000000000000", "pekka", "PKA"]
            });
            let blockHash = await Block.sendBlock(data);
            console.log(blockHash);
            let blockReceiptawait = await Block.getBlockState(blockHash);
            while (!blockReceiptawait.block_state.is_stable) {
                sleep.msleep(100)
                blockReceiptawait = await Block.getBlockState(blockHash);
            }
            contractAddress = blockReceiptawait.block_state.stable_content.contract_account
            console.log("contractAddress:" + contractAddress)
            assert.ok(contractAddress.substr(0, 3) === "czr")
        }).timeout(10000000);

        it("测试合约的转账，向合约地址contractAddress中转1000weiToken的功能", async () => {
            let beforeTransfer = 0;
            let afterTransfer = 0;
            let callParams = await encode.encodeParams({
                to: contractAddress,
                functionName: "balanceOf",
                args: [contractAddress]
            });
            // console.log(callParams)
            beforeTransfer = await callTest.call(callParams);
            beforeTransfer = beforeTransfer[0].split(": ")[1];
            let sendParams = await encode.encodeParams({
                to: contractAddress,
                functionName: "transfer",
                args: [contractAddress, "1000"]
            });
            // console.log(sendParams)
            let blockHash = await Block.sendBlock(sendParams);
            console.log(blockHash);
            //data: "0xa9059cbbcfb6f9f487421f5e1fc34426223acd0071d321923722ce7c8a99a18e1e07793d00000000000000000000000000000000000000000000000000000000000003e8"

            let blockReceiptawait = await Block.getBlockState(blockHash);
            while (!blockReceiptawait.block_state.is_stable) {
                sleep.msleep(100)
                blockReceiptawait = await Block.getBlockState(blockHash)
            }
            afterTransfer = await callTest.call(callParams);
            afterTransfer = afterTransfer[0].split(": ")[1];
            assert.equal('1000', (afterTransfer - beforeTransfer))
        }).timeout(10000000);

        it("测试合约的价格设置功能，将买卖价格均设置成1000wei", async () => {
            let sendParams = await encode.encodeParams({
                to: contractAddress,
                functionName: "setPrices",
                args: ["1000", "1000"]
            });
            let blockHash = await Block.sendBlock(sendParams);
            //data: "0x05fefda700000000000000000000000000000000000000000000000000000000000003e800000000000000000000000000000000000000000000000000000000000003e8"

            let blockReceiptawait = await Block.getBlockState(blockHash);
            while (!blockReceiptawait.block_state.is_stable) {
                sleep.msleep(100)
                blockReceiptawait = await Block.getBlockState(blockHash);
            }
            let callParams1 = await encode.encodeParams({
                to: contractAddress,
                functionName: "buyPrice"
            });
            let buyPrice = await callTest.call(callParams1);
            let callParams2 = await encode.encodeParams({
                to: contractAddress,
                functionName: "sellPrice"
            });
            let sellPrice = await callTest.call(callParams2);
            buyPrice = buyPrice[0].split(": ")[1];
            sellPrice = sellPrice[0].split(": ")[1];
            assert.equal('1000', buyPrice);
            assert.equal('1000', sellPrice);
        }).timeout(10000000);

        it("测试合约的买Token功能，按照1000wei每个token的价格向合约购买10个wei的token", async () => {
            let beforeTransfer = 0;
            let beforeAmount = 0;
            let callParams = await encode.encodeParams({
                to: contractAddress,
                functionName: "balanceOf",
                args: [account2]
            });
            beforeTransfer = await callTest.call(callParams);
            beforeTransfer = beforeTransfer[0].split(": ")[1];

            //beforeAmount = await callTest.getaccountBalance(account2);

            //console.log(beforeTransfer, beforeAmount);

            let sendParams = await encode.encodeParams({
                from: account2,
                to: contractAddress,
                functionName: "buy",
                amount: "10000"
            });
            //console.log(sendData)
            let blockHash = await Block.sendBlock(sendParams);
            // data: "0xa6f2ae3a",
            //console.log("sendBlockFinsh:" + blockHash);
            let blockReceiptawait = await Block.getBlockState(blockHash);
            while (!blockReceiptawait.block_state.is_stable) {
                sleep.msleep(100)
                blockReceiptawait = await Block.getBlockState(blockHash);
                //console.log(blockReceiptawait)
            }
            //console.log("交易稳定")
            let afterTransfer = 0;
            let afterAmount = 0;
            afterTransfer = await callTest.call(callParams);
            afterTransfer = afterTransfer[0].split(": ")[1];

            //afterAmount = await callTest.getaccountBalance(account2);

            //console.log(afterTransfer, afterAmount);
            //console.log(afterTransfer,beforeTransfer)
            assert.equal('10', afterTransfer - beforeTransfer);
            //assert.equal('10000', afterAmount - beforeAmount);
        }).timeout(10000000);

        it("测试合约的卖Token功能，按照1000wei每个token的价格向合约卖出10个wei的token", async () => {
            let beforeTransfer = 0;
            let beforeAmount = 0;
            let callParams = await encode.encodeParams({
                to: contractAddress,
                functionName: "balanceOf",
                args: [account2]
            });
            beforeTransfer = await callTest.call(callParams);
            beforeTransfer = beforeTransfer[0].split(": ")[1];
            let sendParams = await encode.encodeParams({
                from: account2,
                to: contractAddress,
                functionName: "sell",
                args: ["10"]
            });
            let blockHash = await Block.sendBlock(sendParams);
            // data: "0xe4849b32000000000000000000000000000000000000000000000000000000000000000a"
            let blockReceiptawait = await Block.getBlockState(blockHash);
            while (!blockReceiptawait.block_state.is_stable) {
                sleep.msleep(100)
                blockReceiptawait = await Block.getBlockState(blockHash);
            }
            let afterTransfer = 0;
            let afterAmount = 0;
            afterTransfer = await callTest.call(callParams);
            afterTransfer = afterTransfer[0].split(": ")[1];
            //console.log(beforeTransfer,afterTransfer)
            assert.equal('10', beforeTransfer - afterTransfer);
            //assert.equal('10000', beforeAmount - afterAmount);
        }).timeout(10000000);

        it("测试合约授权token功能，授权1000wei的token", async () => {
            let sendParams = await encode.encodeParams({
                to: contractAddress,
                functionName: "approve",
                args: [account2, "1000"]
            });
            let blockHash = await Block.sendBlock(sendParams);
            console.log(blockHash)
            // data: "0x095ea7b3cfb6f9f487421f5e1fc34426223acd0071d321923722ce7c8a99a18e1e07793d00000000000000000000000000000000000000000000000000000000000003e8"
            let blockReceiptawait = await Block.getBlockState(blockHash);
            while (!blockReceiptawait.block_state.is_stable) {
                sleep.msleep(100)
                blockReceiptawait = await Block.getBlockState(blockHash);
            }
            let afterTransfer = 0;
            let callParams = await encode.encodeParams({
                to: contractAddress,
                functionName: "allowance",
                args: [account1, account2]
            });
            afterTransfer = await callTest.call(callParams);
            afterTransfer = afterTransfer[0].split(": ")[1];
            //console.log(afterTransfer);
            assert.equal('1000', afterTransfer);
        }).timeout(10000000);

        it("测试合约转账已授权的token，将已授权的1000wei的token转出", async () => {
            let sendParams = await encode.encodeParams({
                from: account2,
                to: contractAddress,
                functionName: "transferFrom",
                args: [account1, account2, "1000"]
            });
            //console.log(sendData);
            let blockHash = await Block.sendBlock(sendParams);
            console.log(blockHash)
            // data: "0x23b872ddedf4f4eeb522c68e79804fb0d81ae82241c96ef30738918c2ab3e4b1bc8905c1cfb6f9f487421f5e1fc34426223acd0071d321923722ce7c8a99a18e1e07793d00000000000000000000000000000000000000000000000000000000000003e8"
            let blockReceiptawait = await Block.getBlockState(blockHash);
            while (!blockReceiptawait.block_state.is_stable) {
                sleep.msleep(100)
                blockReceiptawait = await Block.getBlockState(blockHash);
            }
            let afterTransfer = 0;
            let callParams = await encode.encodeParams({
                to: contractAddress,
                functionName: "allowance",
                args: [account1, account2]
            });
            afterTransfer = await callTest.call(callParams);
            afterTransfer = afterTransfer[0].split(": ")[1];
            //console.log(afterTransfer);
            assert.equal('0', afterTransfer);
        }).timeout(10000000);

        it("测试合约销毁token的功能，销毁1000token", async () => {
            let beforeTransfer = 0;
            let beforeTotalSupply = 0;
            let callParams1 = await encode.encodeParams({
                to: contractAddress,
                functionName: "balanceOf",
                args: [account2]
            });
            beforeTransfer = await callTest.call(callParams1);
            beforeTransfer = beforeTransfer[0].split(": ")[1];
            let callParams2 = await encode.encodeParams({
                to: contractAddress,
                functionName: "totalSupply"
            });
            beforeTotalSupply = await callTest.call(callParams2);
            beforeTotalSupply = beforeTotalSupply[0].split(": ")[1];
            let sendParams = await encode.encodeParams({
                from: account2,
                to: contractAddress,
                functionName: "burn",
                args: ["1000"]
            });
            let blockHash = await Block.sendBlock(sendParams);
            console.log(blockHash);
            // data: "0x42966c6800000000000000000000000000000000000000000000000000000000000003e8"
            let blockReceiptawait = await Block.getBlockState(blockHash);
            while (!blockReceiptawait.block_state.is_stable) {
                sleep.msleep(100)
                blockReceiptawait = await Block.getBlockState(blockHash);
            }
            let afterTransfer = 0;
            let afterTotalSupply = 0;
            afterTransfer = await callTest.call(callParams1);
            afterTransfer = afterTransfer[0].split(": ")[1];
            afterTotalSupply = await callTest.call(callParams2);
            afterTotalSupply = afterTotalSupply[0].split(": ")[1];
            //console.log(beforeTransfer, afterTransfer, beforeTotalSupply, afterTotalSupply);
            assert.equal('1000', beforeTransfer - afterTransfer);
            assert.equal('1000', BigNumber(beforeTotalSupply).minus(afterTotalSupply));
        }).timeout(10000000);

        it("测试合约销毁授权token的功能，授权1000wei的token幷销毁", async () => {
            let beforeTotalSupply = 0;
            let callParams1 = await encode.encodeParams({
                to: contractAddress,
                functionName: "totalSupply"
            });
            beforeTotalSupply = await callTest.call(callParams1);
            beforeTotalSupply = beforeTotalSupply[0].split(": ")[1];
            let sendParams1 = await encode.encodeParams({
                to: contractAddress,
                functionName: "approve",
                args: [account2, "1000"]
            });
            let blockHash = await Block.sendBlock(sendParams1);
            console.log(blockHash);
            // data: "0x095ea7b3cfb6f9f487421f5e1fc34426223acd0071d321923722ce7c8a99a18e1e07793d00000000000000000000000000000000000000000000000000000000000003e8"
            let blockReceiptawait = await Block.getBlockState(blockHash);
            while (!blockReceiptawait.block_state.is_stable) {
                sleep.msleep(100)
                blockReceiptawait = await Block.getBlockState(blockHash);
            }
            let beforeTransfer = 0;
            let callParams2 = await encode.encodeParams({
                to: contractAddress,
                functionName: "allowance",
                args: [account1, account2]
            });
            beforeTransfer = await callTest.call(callParams2);
            beforeTransfer = beforeTransfer[0].split(": ")[1];
            let sendParams2 = await encode.encodeParams({
                from: account2,
                to: contractAddress,
                functionName: "burnFrom",
                args: [account1, "1000"]
            });
            blockHash = await Block.sendBlock(sendParams2);
            console.log(blockHash);
            // data: "0x79cc6790edf4f4eeb522c68e79804fb0d81ae82241c96ef30738918c2ab3e4b1bc8905c100000000000000000000000000000000000000000000000000000000000003e8"
            blockReceiptawait = await Block.getBlockState(blockHash);
            while (!blockReceiptawait.block_state.is_stable) {
                sleep.msleep(100)
                blockReceiptawait = await Block.getBlockState(blockHash);
            }
            let afterTransfer = 0;
            afterTransfer = await callTest.call(callParams2);
            afterTransfer = afterTransfer[0].split(": ")[1];
            let afterTotalSupply = 0;
            afterTotalSupply = await callTest.call(callParams1);
            afterTotalSupply = afterTotalSupply[0].split(": ")[1];
            //console.log(beforeTransfer, afterTransfer, beforeTotalSupply, afterTotalSupply);
            assert.equal('1000', beforeTransfer - afterTransfer);
            assert.equal('1000', BigNumber(beforeTotalSupply).minus(afterTotalSupply));
        }).timeout(10000000);

        it("测试合约所有者更改的方法，验证更改后，会将所有者改回去", async () => {
            let sendParams1 = await encode.encodeParams({
                to: contractAddress,
                functionName: "transferOwnership",
                args: [account2]
            });
            let blockHash = await Block.sendBlock(sendParams1);
            // data: "0xf2fde38bcfb6f9f487421f5e1fc34426223acd0071d321923722ce7c8a99a18e1e07793d"
            let blockReceiptawait = await Block.getBlockState(blockHash);
            while (!blockReceiptawait.block_state.is_stable) {
                sleep.msleep(100)
                blockReceiptawait = await Block.getBlockState(blockHash);
            }
            let callParams = await encode.encodeParams({
                to: contractAddress,
                functionName: "owner"
            });
            let newOwner = await callTest.call(callParams);
            newOwner = newOwner[0].split(": ")[1];
            assert.equal(account2, newOwner);
            let sendParams2 = await encode.encodeParams({
                from: account2,
                to: contractAddress,
                functionName: "transferOwnership",
                args: [account1]
            });
            let hash = await Block.sendBlock(sendParams2);
            let hashReceiptawait = await Block.getBlockState(hash);
            while (!hashReceiptawait.block_state.is_stable) {
                sleep.msleep(100)
                hashReceiptawait = await Block.getBlockState(hash);
            }
            //console.log(hash);
            // data: "0xf2fde38bedf4f4eeb522c68e79804fb0d81ae82241c96ef30738918c2ab3e4b1bc8905c1"
        }).timeout(10000000);

        it("测试合约冻结账号功能，测试完成后会解冻", async () => {
            let callParams = await encode.encodeParams({
                to: contractAddress,
                functionName: "frozenAccount",
                args: [account2]
            });
            //console.log(callParams);
            let beforeAccount = await callTest.call(callParams)
            beforeAccount = beforeAccount[0].split(": ")[1];
            let sendParams1 = await encode.encodeParams({
                to: contractAddress,
                functionName: "freezeAccount",
                args: [account2, "1"]
            });
            //console.log(sendParams1);
            let blockHash = await Block.sendBlock(sendParams1);
            let blockReceiptawait = await Block.getBlockState(blockHash);
            while (!blockReceiptawait.block_state.is_stable) {
                sleep.msleep(100)
                blockReceiptawait = await Block.getBlockState(blockHash);
            }
            let afterAccount = await callTest.call(callParams)
            afterAccount = afterAccount[0].split(": ")[1];
            //console.log(beforeAccount, afterAccount)
            assert.equal('false', beforeAccount);
            assert.equal('true', afterAccount);
            let sendParams2 = await encode.encodeParams({
                to: contractAddress,
                functionName: "freezeAccount",
                args: [account2]
            });
            //console.log(sendParams2);
            Block.sendBlock(sendParams2);
            // data:"0xe724529ccfb6f9f487421f5e1fc34426223acd0071d321923722ce7c8a99a18e1e07793d0000000000000000000000000000000000000000000000000000000000000000"
        }).timeout(10000000);

        it("部署mapping合约", async () => {
            let ret = await czr.request.sendBlock({
                "from": account1,
                "to": "",
                "amount": "0",
                "password": "12345678",
                "gas": 6000000,
                "gas_price": "50000000000000",
                "data": "608060405234801561001057600080fd5b5061054b806100206000396000f3fe608060405234801561001057600080fd5b506004361061005d577c0100000000000000000000000000000000000000000000000000000000600035046388f992b181146100625780638f4ffcb11461011a578063ad20b776146101d5575b600080fd5b6101086004803603602081101561007857600080fd5b81019060208101813564010000000081111561009357600080fd5b8201836020820111156100a557600080fd5b803590602001918460018302840111640100000000831117156100c757600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295506101f2945050505050565b60408051918252519081900360200190f35b6101d36004803603608081101561013057600080fd5b8135916020810135916040820135919081019060808101606082013564010000000081111561015e57600080fd5b82018360208201111561017057600080fd5b8035906020019184600183028401116401000000008311171561019257600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092955061025a945050505050565b005b6101d3600480360360208110156101eb57600080fd5b5035610515565b60006001826040518082805190602001908083835b602083106102265780518252601f199092019160209182019101610207565b51815160209384036101000a6000190180199092169116179052920194855250604051938490030190922054949350505050565b600054331461026857600080fd5b6000548214801561027a575080516020145b80156102865750600083115b80156103575750826001826040518082805190602001908083835b602083106102c05780518252601f1990920191602091820191016102a1565b51815160209384036101000a60001901801990921691161790529201948552506040519384900381018420548651950194600194879450925082918401908083835b602083106103215780518252601f199092019160209182019101610302565b6001836020036101000a038019825116818451168082178552505050505050905001915050908152602001604051809103902054105b151561036257600080fd5b600254604080517f23b872dd000000000000000000000000000000000000000000000000000000008152600481018790523060248201526044810186905290516323b872dd916064808201926020929091908290030181600087803b1580156103ca57600080fd5b505af11580156103de573d6000803e3d6000fd5b505050506040513d60208110156103f457600080fd5b505060405181518491600191849190819060208401908083835b6020831061042d5780518252601f19909201916020918201910161040e565b51815160209384036101000a6000190180199092169116179052920194855250604080519485900382018520805496909601909555838101899052429484018590526060808552865190850152855188957f94fcee0b7b95ac21ec59ec2c5b2e99e75c909351baf99e93cd97e713d820627b958895508b945090929091829160808301919087019080838360005b838110156104d35781810151838201526020016104bb565b50505050905090810190601f1680156105005780820380516001836020036101000a031916815260200191505b5094505050505060405180910390a250505050565b600081905560025556fea165627a7a72305820680d0373e106d0be1d457e458f21906c6a9d951b6178b2494650f73d67578c4d0029"
            })
            // let data = await encode.encodeParams({
            //     functionName: "constructor",
            //     args: ["1000000000000000000000000000", "canonChain", "CZR"]
            // });
            // let blockHash = await Block.sendBlock(data);
            console.log(ret.hash);
            let blockReceiptawait = await Block.getBlockState(ret.hash);
            while (!blockReceiptawait.block_state.is_stable) {
                sleep.msleep(100)
                blockReceiptawait = await Block.getBlockState(blockHash);
            }
            mappingContractAddress = blockReceiptawait.block_state.stable_content.contract_account
            console.log("mappingContractAddress:" + mappingContractAddress)
            let sendParams1 = await encode.encodeParams({
                to: mappingContractAddress,
                functionName: "setCZRAddress",
                args: [contractAddress]
            });
            let blockHash = await Block.sendBlock(sendParams1);
            let blockReceiptawait1 = await Block.getBlockState(blockHash);
            while (!blockReceiptawait1.block_state.is_stable) {
                sleep.msleep(100)
                blockReceiptawait1 = await Block.getBlockState(blockHash);
            }
            assert.ok(mappingContractAddress.substr(0, 3) === "czr")
        }).timeout(100000);

        it("测试合约approveAndCall", async () => {
            let callParams1 = await encode.encodeParams({
                from: account1,
                to: contractAddress,
                functionName: "balanceOf",
                args: [account1]
            });
            let beforeTransfer1 = await callTest.call(callParams1);
            beforeTransfer1 = beforeTransfer1[0].split(": ")[1];

            let callParams2 = await encode.encodeParams({
                from: account1,
                to: contractAddress,
                functionName: "balanceOf",
                args: [mappingContractAddress]
            });
            let beforeTransfer2 = await callTest.call(callParams2);
            beforeTransfer2 = beforeTransfer2[0].split(": ")[1];
            let sendParams = await encode.encodeParams({
                to: contractAddress,
                functionName: "approveAndCall",
                args: [mappingContractAddress, "1000", "0x1111111111111111111111111111111111111111111111111111111111111111"]
            });
            let blockHash = await Block.sendBlock(sendParams);
            let blockReceiptawait = await Block.getBlockState(blockHash);
            while (!blockReceiptawait.block_state.is_stable) {
                sleep.msleep(100)
                blockReceiptawait = await Block.getBlockState(blockHash);
            }
            let afterTransfer1 = await callTest.call(callParams1);
            afterTransfer1 = afterTransfer1[0].split(": ")[1];
            let afterTransfer2 = await callTest.call(callParams2);
            afterTransfer2 = afterTransfer2[0].split(": ")[1];
            // console.log(beforeTransfer1,afterTransfer1);
            // console.log(beforeTransfer2,afterTransfer2);
            // assert.equal('1000', beforeTransfer-afterTransfer);
            assert.equal('1000', BigNumber(beforeTransfer1).minus(afterTransfer1).toString());
            assert.equal('1000', afterTransfer2 - beforeTransfer2);
        }).timeout(10000000);
    });

    describe("测试test1合约",()=>{

        it('部署test1合约', async ()=>{
            let data = await encode1.encodeParams({
                functionName: "constructor"
            });
            let blockHash=await Block1.sendBlock(data);
            let blockReceiptawait = await getBlock1.getBlockState(blockHash);
            contractAddress = blockReceiptawait.block_state.stable_content.contract_account;
            console.log(contractAddress);
        }).timeout(1000000);

        it("测试bool初始值和修改值",async ()=>{
            let callParams = await encode1.encodeParams({
                to: contractAddress,
                functionName: "boolVariable"
            });
            let beforeBoolVariable = await getBlock1.call(callParams);
            let sendParams = await encode1.encodeParams({
                to: contractAddress,
                functionName: "setBoolVariable",
                args: ["1"]
                // args: [true]
            });
            let blockHash = await Block1.sendBlock(sendParams);
            await getBlock1.getBlockState(blockHash);
            let afterBoolVariable = await getBlock1.call(callParams);
            assert.equal('false', beforeBoolVariable);
            assert.equal('true', afterBoolVariable);
        }).timeout(1000000);

        it("测试整型初始值和修改值",async ()=>{
            let callParams1 = await encode1.encodeParams({
                to: contractAddress,
                functionName: "intVariable"
            });
            let callParams2 = await encode1.encodeParams({
                to: contractAddress,
                functionName: "uintVariable"
            });
            let beforeIntVariable = await getBlock1.call(callParams1);
            let beforeUintVariable = await getBlock1.call(callParams2);
            let sendParams1 = await encode1.encodeParams({
                to: contractAddress,
                functionName: "setIntVariable",
                args: ["10"]
            });
            let sendParams2 = await encode1.encodeParams({
                to: contractAddress,
                functionName: "setUintVariable",
                args: ["10"]
            });
            let blockHash1 = await Block1.sendBlock(sendParams1);
            let blockHash2 = await Block1.sendBlock(sendParams2);
            await getBlock1.getBlockState(blockHash1);
            await getBlock1.getBlockState(blockHash2);
            let afterIntVariable = await getBlock1.call(callParams1);
            let afterUintVariable = await getBlock1.call(callParams2);
            assert.equal('0', beforeIntVariable);
            assert.equal('0', beforeUintVariable);
            assert.equal('10', afterIntVariable);
            assert.equal('10', afterUintVariable);
        }).timeout(1000000);

        it("测试地址类型初始值和修改值",async ()=>{
            let callParams= await encode1.encodeParams({
                to: contractAddress,
                functionName: "addressVariable"
            });
            let beforeAddressVariable = await getBlock1.call(callParams);
            let sendParams = await encode1.encodeParams({
                to: contractAddress,
                functionName: "setAddressVariable",
                args: [account1]
            });
            let blockHash = await Block1.sendBlock(sendParams);
            await getBlock1.getBlockState(blockHash);
            let afterAddressVariable = await getBlock1.call(callParams);
            assert.equal('czr_2wkBET2rRgE8pahuaczxKbmv7ciehqsne57F9gtzf1PVdr2VP3', beforeAddressVariable);
            assert.equal(account1, afterAddressVariable);
        }).timeout(100000);

        it("地址类型成员变量测试",async ()=>{
            let sendParams1 = await encode1.encodeParams({
                to: contractAddress,
                functionName: "payMoneyToA",
                amount:"10"
            });
            let blockHash1 = await Block1.sendBlock(sendParams1);
            await getBlock1.getBlockState(blockHash1);
            let callParams= await encode1.encodeParams({
                to: contractAddress,
                functionName: "getBalance"
            });
            let beforeBalance = await getBlock1.call(callParams);
            let sendParams2 = await encode1.encodeParams({
                to: contractAddress,
                functionName: "testBalanceAndTransfer"
            });
            let blockHash2 = await Block1.sendBlock(sendParams2);
            await getBlock1.getBlockState(blockHash2);
            let afterBalance = await getBlock1.call(callParams);
            assert.equal('10', beforeBalance);
            assert.equal('0', afterBalance);
        }).timeout(1000000);

        it("字节类型初始值和修改值",async ()=>{
            let callParams= await encode1.encodeParams({
                to: contractAddress,
                functionName: "bytesVariable"
            });
            let beforeBytesVariable = await getBlock1.call(callParams);
            let sendParams = await encode1.encodeParams({
                to: contractAddress,
                functionName: "setBytesVariable",
                args: ["0x10"]
            });
            let blockHash = await Block1.sendBlock(sendParams);
            await getBlock1.getBlockState(blockHash);
            let afyerBytesVariable = await getBlock1.call(callParams);
            assert.equal('0x', beforeBytesVariable);
            assert.equal('0x10', afyerBytesVariable);
        }).timeout(1000000);

        it("测试有理数、字符串类型、字节类型字面常量",async ()=>{
            let callParams1= await encode1.encodeParams({
                to: contractAddress,
                functionName: "uintConstant"
            });
            let callParams2= await encode1.encodeParams({
                to: contractAddress,
                functionName: "stringConstant"
            });
            let callParams3= await encode1.encodeParams({
                to: contractAddress,
                functionName: "bytesConstant"
            });
            let uintConstant = await getBlock1.call(callParams1);
            let stringConstant = await getBlock1.call(callParams2);
            let bytesConstant = await getBlock1.call(callParams3);
            assert.equal('10', uintConstant);
            assert.equal('10', stringConstant);
            assert.equal('0x10', bytesConstant);
        }).timeout(1000000);

        it("测试memory和storage",async ()=>{
            let callParams= await encode1.encodeParams({
                to: contractAddress,
                functionName: "getXArray"
            });
            let beforeXArray = await getBlock1.call(callParams);
            let sendParams = await encode1.encodeParams({
                to: contractAddress,
                functionName: "memoryAndStorage",
                args: [["1","2","3"]]
            });
            let blockHash = await Block1.sendBlock(sendParams);
            await getBlock1.getBlockState(blockHash);
            let afterXArray = await getBlock1.call(callParams);
            assert.equal("", beforeXArray.join());
            assert.equal("1,2,3", afterXArray.join());
        }).timeout(1000000);

        it("测试数组成员",async ()=>{
            let callParams= await encode1.encodeParams({
                to: contractAddress,
                functionName: "getArrayLength"
            });
            let beforeArrayLength = await getBlock1.call(callParams);
            let sendParams = await encode1.encodeParams({
                to: contractAddress,
                functionName: "arrayTest"
            });
            let blockHash = await Block1.sendBlock(sendParams);
            await getBlock1.getBlockState(blockHash);
            let afterArrayLength = await getBlock1.call(callParams);
            assert.equal("3", beforeArrayLength);
            assert.equal("4", afterArrayLength);
        }).timeout(1000000);

        it("测试结构体",async ()=>{
            let sendParams = await encode1.encodeParams({
                to: contractAddress,
                functionName: "setStruct"
            });
            let blockHash = await Block1.sendBlock(sendParams);
            await getBlock1.getBlockState(blockHash);
            let callParams= await encode1.encodeParams({
                to: contractAddress,
                functionName: "getStruct"
            });
            let returnStruct = await getBlock1.call(callParams);
            assert.equal("10,10", returnStruct.join());
        }).timeout(1000000)

        it("测试映射",async ()=>{
            let sendParams = await encode1.encodeParams({
                to: contractAddress,
                functionName: "setMapping"
            });
            let blockHash = await Block1.sendBlock(sendParams);
            await getBlock1.getBlockState(blockHash);
            let callParams= await encode1.encodeParams({
                to: contractAddress,
                functionName: "getMapping"
            });
            let returnMapping = await getBlock1.call(callParams);
            assert.equal("1", returnMapping);
        }).timeout(1000000)

        it("测试LValues运算符",async ()=>{
            let callParams= await encode1.encodeParams({
                to: contractAddress,
                functionName: "testLValues"
            });
            let returnTestLValues = await getBlock1.call(callParams);
            assert.equal("2", returnTestLValues);
        }).timeout(1000000)

        it("测试地址字面量",async ()=>{
            let callParams= await encode1.encodeParams({
                to: contractAddress,
                functionName: "addressConstant"
            });
            let returnAddressConstant = await getBlock1.call(callParams);
            console.log(returnAddressConstant);
            assert.equal("czr_2wkBET2rRgE8pahuaczxKbmv7ciehqsne57F9gtzf1PVdr2VP3", returnAddressConstant);
        }).timeout(1000000)
    });
    describe("测试合约test2", () => {

        it("创建账号account2，并转入5个CZR", async () => {
            account2 = await Block2.creatAccount();
            console.log("account2:" + account2);
            let beforeAmount = await getBlock2.getaccountBalance(account2);
            let blockHash = await Block2.sendBlock({
                to: account2,
                amount: "5000000000000000000"
            });
            console.log(blockHash);
            await getBlock2.getBlockState(blockHash);
            let afterAmount = await getBlock2.getaccountBalance(account2);
            assert.equal('5000000000000000000', (afterAmount - beforeAmount))
        }).timeout(1000000);

        it("部署test2合约", async () => {
            let data = await encode2.encodeParams({
                from: account2,
                functionName: "constructor"
            });
            let blockHash = await Block2.sendBlock(data);
            let blockReceiptawait = await getBlock2.getBlockState(blockHash);
            contractAddress = blockReceiptawait.block_state.stable_content.contract_account;
            console.log(contractAddress);
        }).timeout(100000);

        it("测试czr的货币单位", async () => {
            let callParams = await encode2.encodeParams({
                to: contractAddress,
                functionName: "getCZR"
            });
            let CZRValue = await getBlock2.call(callParams);
            assert.equal("1,1000000000000,1000000000000000,1000000000000000000", CZRValue.join());
        }).timeout(100000);

        it("测试智能合约时间单位", async () => {
            let callParams = await encode2.encodeParams({
                to: contractAddress,
                functionName: "getTime"
            });
            let TimeValue = await getBlock2.call(callParams);
            assert.equal("1,60,3600,86400,604800", TimeValue.join());
        }).timeout(100000);

        it("测试智能合约ABI编码函数", async () => {
            let callParams = await encode2.encodeParams({
                to: contractAddress,
                functionName: "getAbi"
            });
            let AbiValue = await getBlock2.call(callParams);
            assert.equal("0x000000000000000000000000000000000000000000000000000000000000000a,0x000000000000000000000000000000000000000000000000000000000000000a,0x0000000a,0x0000000a", AbiValue.join());
        }).timeout(100000);

        it("测试智能合密码学函数",async ()=>{
            let callParams = await encode2.encodeParams({
                to: contractAddress,
                functionName: "getCryptographicFunctions"
            });
            let CryptographicFunctionsValue = await getBlock2.call(callParams);
            // console.log(CryptographicFunctionsValue);
            assert.equal("0xc65a7bb8d6351c1cf70c95a316cc6a92839c986682d98bc35f958f4883f9d2a8,0x81b04ae4944e1704a65bc3a57b6fc3b06a6b923e3c558d611f6a854b5539ec13,0x093d56c4206b252daeeb32d59ee414db1bd243e5", CryptographicFunctionsValue.join());
            // assert.equal("0xc65a7bb8d6351c1cf70c95a316cc6a92839c986682d98bc35f958f4883f9d2a8", CryptographicFunctionsValue.join());
        }).timeout(100000);

        it("测试合约的this", async () => {
            let callParams = await encode2.encodeParams({
                to: contractAddress,
                functionName: "getThis"
            });
            let thisAddress = await getBlock2.call(callParams);
            assert.equal(contractAddress, thisAddress);
        }).timeout(100000);

        it("测试合约的getAddAndMul", async () => {
            let callParams = await encode2.encodeParams({
                to: contractAddress,
                functionName: "getAddAndMul"
            });
            let AddAndMul = await getBlock2.call(callParams);
            assert.equal("1,1", AddAndMul.join());
        }).timeout(100000);

        it("测试合约的assert", async () => {
            let sendParams1 = await encode2.encodeParams({
                from: account2,
                to: contractAddress,
                functionName: "testAssert",
                args: ["0"]
            });
            let blockHash1 = await Block2.sendBlock(sendParams1);
            console.log(blockHash1);
            let blockReceiptawait1 = await getBlock2.getBlockState(blockHash1);
            let sendParams2 = await encode2.encodeParams({
                from: account2,
                to: contractAddress,
                functionName: "testAssert",
                args: ["1"]
            });
            let blockHash2 = await Block2.sendBlock(sendParams2);
            console.log(blockHash2);
            let blockReceiptawait2 = await getBlock2.getBlockState(blockHash2);
            assert.equal("3", blockReceiptawait1.block_state.stable_content.status);
            assert.equal("0", blockReceiptawait2.block_state.stable_content.status);
        }).timeout(100000);

        it("测试合约的require", async () => {
            let sendParams1 = await encode2.encodeParams({
                from: account2,
                to: contractAddress,
                functionName: "testRequire",
                args: ["0"]
            });
            let blockHash1 = await Block2.sendBlock(sendParams1);
            let blockReceiptawait1 = await getBlock2.getBlockState(blockHash1);
            let sendParams2 = await encode2.encodeParams({
                from: account2,
                to: contractAddress,
                functionName: "testRequire",
                args: ["1"]
            });
            let blockHash2 = await Block2.sendBlock(sendParams2);
            let blockReceiptawait2 = await getBlock2.getBlockState(blockHash2);
            assert.equal("3", blockReceiptawait1.block_state.stable_content.status);
            assert.equal("0", blockReceiptawait2.block_state.stable_content.status);
        }).timeout(100000);

        it("测试合约的revert", async () => {
            let sendParams = await encode2.encodeParams({
                from: account2,
                to: contractAddress,
                functionName: "testRevert"
            });
            let blockHash = await Block2.sendBlock(sendParams);
            let blockReceiptawait = await getBlock2.getBlockState(blockHash);
            assert.equal("3", blockReceiptawait.block_state.stable_content.status);
        }).timeout(100000);

        it('测试合约的getBlockhash', async () => {
            let status = await getBlock2.getStatus()
            // console.log(status)
            let mci=status.last_stable_mci.toString()
            // console.log(mci);
            let callParams = await encode2.encodeParams({
                to: contractAddress,
                functionName: "getBlockhash",
                args: [mci],
                mci: mci
            });
            let block = await getBlock2.call(callParams);
            // console.log(block)
            let blockReceiptawait=await getBlock2.getBlockState(block[0].substr(2))
            assert.equal(blockReceiptawait.block_state.stable_content.mci, mci);
            assert.equal(account1, block[1]);
            assert.equal(callParams.data, block[2].substr(2));
            assert.equal(callParams.data.substring(0,8), block[3].substr(2));
            assert.equal(blockReceiptawait.block_state.stable_content.mc_timestamp, block[4]);
            assert.equal("0", block[5]);
            assert.equal(account1, block[6]);
            assert.equal(mci, block[7]);
        }).timeout(100000);

        it('测试合约的getGasleft', async () => {
            let callParams = await encode2.encodeParams({
                to: contractAddress,
                functionName: "getGasleft"
            });
            let gasleft = await getBlock2.call(callParams);
            assert.equal("7978517", gasleft.toString());
        }).timeout(100000);

        it('测试合约的setGasleft', async () => {
            let sendParams = await encode2.encodeParams({
                from: account2,
                to: contractAddress,
                functionName: "setGasleft"
            });
            let blockHash = await Block2.sendBlock(sendParams);
            // console.log(blockHash);
            await getBlock2.getBlockState(blockHash);
            let callParams = await encode2.encodeParams({
                to: contractAddress,
                functionName: "a"
            });
            let gasleft = await getBlock2.call(callParams);
            // console.log(gasleft);
            assert.equal("1978497", gasleft.toString());
        }).timeout(100000);

        it('测试合约的setGasprice', async () => {
            let sendParams = await encode2.encodeParams({
                from: account2,
                to: contractAddress,
                functionName: "setGasprice"
            });
            let blockHash = await Block2.sendBlock(sendParams);
            console.log(blockHash);
            await getBlock2.getBlockState(blockHash);
            let callParams = await encode2.encodeParams({
                to: contractAddress,
                functionName: "a"
            });
            let gasprice = await getBlock2.call(callParams);
            assert.equal("1000000000",gasprice );
        }).timeout(100000);

        it('测试合约的msg.value', async () => {
            let sendParams1 = await encode2.encodeParams({
                from: account2,
                to: contractAddress,
                functionName: "testMsgValue",
                amount: '2'
            });
            let blockHash1 = await Block2.sendBlock(sendParams1);
            let blockReceiptawait1 = await getBlock2.getBlockState(blockHash1);
            let sendParams2 = await encode2.encodeParams({
                from: account2,
                to: contractAddress,
                functionName: "testMsgValue",
                amount: '1'
            });
            let blockHash2 = await Block2.sendBlock(sendParams2);
            let blockReceiptawait2 = await getBlock2.getBlockState(blockHash2);
            assert.equal("3", blockReceiptawait1.block_state.stable_content.status);
            assert.equal("0", blockReceiptawait2.block_state.stable_content.status);
        }).timeout(100000);
    });

    describe("测试合约test3",async ()=> {

        it("创建账号account2，并转入5个CZR", async () => {
            account2 = await Block3.creatAccount();
            console.log("account2:" + account2)
            let beforeAmount = await getBlock3.getaccountBalance(account2);
            let blockHash = await Block3.sendBlock({
                to: account2,
                amount: "5000000000000000000"
            });
            await getBlock3.getBlockState(blockHash);
            let afterAmount = await getBlock3.getaccountBalance(account2);
            assert.equal('5000000000000000000', (afterAmount - beforeAmount))
        }).timeout(1000000);

        it("创建合约Test3", async () => {
            let beforeAccount2Amount = await getBlock3.getaccountBalance(account2);
            let data = await encode3.encodeParams({
                from: account2,
                functionName: "constructor",
            });
            let blockHash = await Block3.sendBlock(data);
            let blockReceiptawait = await getBlock3.getBlockState(blockHash);
            contractAddress = blockReceiptawait.block_state.stable_content.contract_account;
        }).timeout(1000000);

        it("测试合约if和else", async () => {
            let sendParams1 = await encode3.encodeParams({
                from: account2,
                to: contractAddress,
                contractName: "Test3",
                functionName: "testIfElse",
                args: ["1"]
            });
            let blockHash1 = await Block3.sendBlock(sendParams1);
            await getBlock3.getBlockState(blockHash1);
            let callParams = await encode3.encodeParams({
                from: account2,
                to: contractAddress,
                contractName: "Test3",
                functionName: "a"
            });
            let a1 = await getBlock3.call(callParams);
            let sendParams2 = await encode3.encodeParams({
                from: account2,
                to: contractAddress,
                contractName: "Test3",
                functionName: "testIfElse",
                args: ["2"]
            });
            let blockHash2 = await Block3.sendBlock(sendParams2);
            await getBlock3.getBlockState(blockHash2);
            let a2 = await getBlock3.call(callParams);
            assert.equal("1", a1)
            assert.equal("0", a2)
        }).timeout(1000000);

        it("测试合约for",async ()=>{
            let sendParams = await encode3.encodeParams({
                from: account2,
                to: contractAddress,
                contractName: "Test3",
                functionName: "testFor"
            });
            let blockHash = await Block3.sendBlock(sendParams);
            await getBlock3.getBlockState(blockHash);
            let callParams = await encode3.encodeParams({
                from: account2,
                to: contractAddress,
                contractName: "Test3",
                functionName: "a"
            });
            let a = await getBlock3.call(callParams);
            assert.equal("2",a)
        }).timeout(1000000);

        it("测试合约while",async ()=>{
            let sendParams = await encode3.encodeParams({
                from: account2,
                to: contractAddress,
                contractName: "Test3",
                functionName: "testWhile"
            });
            let blockHash = await Block3.sendBlock(sendParams);
            await getBlock3.getBlockState(blockHash);
            let callParams = await encode3.encodeParams({
                from: account2,
                to: contractAddress,
                contractName: "Test3",
                functionName: "a"
            });
            let a = await getBlock3.call(callParams);
            assert.equal("5",a)
        }).timeout(1000000);

        it("测试合约do和while",async ()=>{
            let sendParams = await encode3.encodeParams({
                from: account2,
                to: contractAddress,
                contractName: "Test3",
                functionName: "testDoWhile"
            });
            let blockHash = await Block3.sendBlock(sendParams);
            await getBlock3.getBlockState(blockHash);
            let callParams = await encode3.encodeParams({
                from: account2,
                to: contractAddress,
                contractName: "Test3",
                functionName: "a"
            });
            let a = await getBlock3.call(callParams);
            assert.equal("6",a)
        }).timeout(1000000);

        it("测试合约break",async ()=>{
            let sendParams = await encode3.encodeParams({
                from: account2,
                to: contractAddress,
                contractName: "Test3",
                functionName: "testBreak"
            });
            let blockHash = await Block3.sendBlock(sendParams);
            await getBlock3.getBlockState(blockHash);
            let callParams = await encode3.encodeParams({
                from: account2,
                to: contractAddress,
                contractName: "Test3",
                functionName: "a"
            });
            let a = await getBlock3.call(callParams);
            assert.equal("2",a)
        }).timeout(1000000);

        it("测试合约Continue",async ()=>{
            let sendParams = await encode3.encodeParams({
                from: account2,
                to: contractAddress,
                contractName: "Test3",
                functionName: "testContinue"
            });
            let blockHash = await Block3.sendBlock(sendParams);
            await getBlock3.getBlockState(blockHash);
            let callParams = await encode3.encodeParams({
                from: account2,
                to: contractAddress,
                contractName: "Test3",
                functionName: "a"
            });
            let a = await getBlock3.call(callParams);
            assert.equal("5",a)
        }).timeout(1000000);

        it("测试合约外部函数调用内部函数",async ()=>{
            let sendParams = await encode3.encodeParams({
                from: account2,
                to: contractAddress,
                contractName: "Test3",
                functionName: "testExternalFunction"
            });
            let blockHash = await Block3.sendBlock(sendParams);
            await getBlock3.getBlockState(blockHash);
            let callParams = await encode3.encodeParams({
                from: account2,
                to: contractAddress,
                contractName: "Test3",
                functionName: "a"
            });
            let a = await getBlock3.call(callParams);
            assert.equal("6",a)
        }).timeout(1000000);

        it("测试合约内部函数",async ()=>{
            assert.equal(undefined,compile3.methodBytecode.Test3MethodBytecode["testInternalFunction"])
        }).timeout(1000000);
    });

    describe("测试合约test4", async () => {

        it("创建账号account2，并转入5个CZR", async () => {
            account2 = await Block4.creatAccount();
            console.log("account2:" + account2)
            let beforeAmount = await getBlock4.getaccountBalance(account2);
            let blockHash = await Block4.sendBlock({
                to: account2,
                amount: "5000000000000000000"
            });
            await getBlock4.getBlockState(blockHash);
            let afterAmount = await getBlock4.getaccountBalance(account2);
            assert.equal('5000000000000000000', (afterAmount - beforeAmount))
        }).timeout(1000000);

        it("创建合约Test4part1", async () => {
            let data = await encode4.encodeParams({
                from: account2,
                contractName: "Test4part1",
                functionName: "constructor",
            });
            let blockHash = await Block4.sendBlock(data);
            let blockReceiptawait = await getBlock4.getBlockState(blockHash);
            test4part1ContractAddress = blockReceiptawait.block_state.stable_content.contract_account;
        }).timeout(1000000);

        it("测试合约可见性", async () => {
            let callParams1 = await encode4.encodeParams({
                from: account2,
                to: test4part1ContractAddress,
                contractName: "Test4part1",
                functionName: "testExternal"
            });
            let a1 = await getBlock4.call(callParams1);
            let callParams2 = await encode4.encodeParams({
                from: account2,
                to: test4part1ContractAddress,
                contractName: "Test4part1",
                functionName: "testPublic"
            });
            let a2 = await getBlock4.call(callParams2);
            assert.equal("1", a1)
            assert.equal("1", a2)
            assert.equal(undefined, compile4.methodBytecode.Test4part1MethodBytecode["testInternal"])
            assert.equal(undefined, compile4.methodBytecode.Test4part1MethodBytecode["testPrivate"])
        }).timeout(1000000);

        it("创建合约Test4part2", async () => {
            let data = await encode4.encodeParams({
                from: account2,
                contractName: "Test4part2",
                functionName: "constructor",
            });
            let blockHash = await Block4.sendBlock(data);
            let blockReceiptawait = await getBlock4.getBlockState(blockHash);
            test4part2ContractAddress = blockReceiptawait.block_state.stable_content.contract_account;
        }).timeout(1000000);

        it("测试合约创建合约的可见性", async () => {
            let callParams1 = await encode4.encodeParams({
                from: account2,
                to: test4part2ContractAddress,
                contractName: "Test4part2",
                functionName: "getTest4part1TestExternal"
            });
            let a1 = await getBlock4.call(callParams1);
            let callParams2 = await encode4.encodeParams({
                from: account2,
                to: test4part2ContractAddress,
                contractName: "Test4part2",
                functionName: "getTest4part1TestPublic"
            });
            let a2 = await getBlock4.call(callParams2);
            assert.equal("1", a1)
            assert.equal("1", a2)
            assert.equal(undefined, compile4.methodBytecode.Test4part2MethodBytecode["testInternal"])
            assert.equal(undefined, compile4.methodBytecode.Test4part2MethodBytecode["testPrivate"])
        }).timeout(1000000);

        it("创建合约Test4part3", async () => {
            let data = await encode4.encodeParams({
                from: account2,
                contractName: "Test4part3",
                functionName: "constructor",
            });
            let blockHash = await Block4.sendBlock(data);
            let blockReceiptawait = await getBlock4.getBlockState(blockHash);
            test4part3ContractAddress = blockReceiptawait.block_state.stable_content.contract_account;
        }).timeout(1000000);

        it("测试合约继承的可见性", async () => {
            let callParams1 = await encode4.encodeParams({
                from: account2,
                to: test4part3ContractAddress,
                contractName: "Test4part3",
                functionName: "getTest4part1TestInternal"
            });
            let a1 = await getBlock4.call(callParams1);
            let callParams2 = await encode4.encodeParams({
                from: account2,
                to: test4part3ContractAddress,
                contractName: "Test4part3",
                functionName: "testExternal"
            });
            let a2 = await getBlock4.call(callParams2);
            let callParams3 = await encode4.encodeParams({
                from: account2,
                to: test4part3ContractAddress,
                contractName: "Test4part3",
                functionName: "testPublic"
            });
            let a3 = await getBlock4.call(callParams3);
            assert.equal("1", a1)
            assert.equal("1", a2)
            assert.equal("1", a3)
            assert.equal(undefined, compile4.methodBytecode.Test4part2MethodBytecode["testPrivate"])
        }).timeout(1000000);

        it("创建合约Test4part8", async () => {
            let data = await encode4.encodeParams({
                from: account2,
                contractName: "Test4part8",
                functionName: "constructor",
            });
            let blockHash = await Block4.sendBlock(data);
            let blockReceiptawait = await getBlock4.getBlockState(blockHash);
            test4part8ContractAddress = blockReceiptawait.block_state.stable_content.contract_account;
        }).timeout(1000000);

        it("测试合约继承的派生重载", async () => {
            let sendParams1 = await encode4.encodeParams({
                from: account2,
                to: test4part8ContractAddress,
                contractName: "Test4part8",
                functionName: "kill"
            });
            let blockHash1 = await Block4.sendBlock(sendParams1);
            let blockReceiptawait1 = await getBlock4.getBlockState(blockHash1);
            // console.log(blockReceiptawait1.block_state.stable_content.log);
            assert.equal("2", blockReceiptawait1.block_state.stable_content.log.length)
            assert.equal("0000000000000000000000000000000000000000000000000000000000000007", blockReceiptawait1.block_state.stable_content.log[0].data)
            assert.equal("0000000000000000000000000000000000000000000000000000000000000006", blockReceiptawait1.block_state.stable_content.log[1].data)
        }).timeout(1000000);

        it("创建合约Test4partModifier2", async () => {
            let data = await encode4.encodeParams({
                from: account2,
                contractName: "Test4partModifier2",
                functionName: "constructor",
            });
            let blockHash = await Block4.sendBlock(data);
            let blockReceiptawait = await getBlock4.getBlockState(blockHash);
            Test4partModifier2ContractAddress = blockReceiptawait.block_state.stable_content.contract_account;
        }).timeout(1000000);

        it("测试合约修饰器的继承性", async () => {
            let sendParams1 = await encode4.encodeParams({
                from: account1,
                to: Test4partModifier2ContractAddress,
                contractName: "Test4partModifier2",
                functionName: "close"
            });
            let blockHash1 = await Block4.sendBlock(sendParams1);
            let blockReceiptawait1 = await getBlock4.getBlockState(blockHash1);
            let sendParams2 = await encode4.encodeParams({
                from: account2,
                to: Test4partModifier2ContractAddress,
                contractName: "Test4partModifier2",
                functionName: "close"
            });
            let blockHash2 = await Block4.sendBlock(sendParams2);
            let blockReceiptawait2 = await getBlock4.getBlockState(blockHash2);
            assert.equal("3", blockReceiptawait1.block_state.stable_content.status);
            assert.equal("0", blockReceiptawait2.block_state.stable_content.status);
        }).timeout(1000000);

        it("创建合约Test4partModifier4", async () => {
            let data = await encode4.encodeParams({
                from: account2,
                contractName: "Test4partModifier4",
                functionName: "constructor",
                args: ["1"]
            });
            let blockHash = await Block4.sendBlock(data);
            let blockReceiptawait = await getBlock4.getBlockState(blockHash);
            Test4partModifier4ContractAddress = blockReceiptawait.block_state.stable_content.contract_account;
        }).timeout(1000000);

        it("测试合约修饰器的多重继承性和传参", async () => {
            let sendParams1 = await encode4.encodeParams({
                from: account2,
                to: Test4partModifier4ContractAddress,
                contractName: "Test4partModifier4",
                functionName: "register"
            });
            let blockHash1 = await Block4.sendBlock(sendParams1);
            let blockReceiptawait1 = await getBlock4.getBlockState(blockHash1);
            let sendParams2 = await encode4.encodeParams({
                from: account2,
                to: Test4partModifier4ContractAddress,
                contractName: "Test4partModifier4",
                amount: "1",
                functionName: "register"
            });
            let blockHash2 = await Block4.sendBlock(sendParams2);
            let blockReceiptawait2 = await getBlock4.getBlockState(blockHash2);
            let sendParams3 = await encode4.encodeParams({
                from: account1,
                to: Test4partModifier4ContractAddress,
                contractName: "Test4partModifier4",
                functionName: "changePrice",
                args: ["2"]
            });
            let blockHash3 = await Block4.sendBlock(sendParams3);
            let blockReceiptawait3 = await getBlock4.getBlockState(blockHash3);
            let sendParams4 = await encode4.encodeParams({
                from: account2,
                to: Test4partModifier4ContractAddress,
                contractName: "Test4partModifier4",
                functionName: "changePrice",
                args: ["2"]
            });
            let blockHash4 = await Block4.sendBlock(sendParams4);
            let blockReceiptawait4 = await getBlock4.getBlockState(blockHash4);
            assert.equal("3", blockReceiptawait1.block_state.stable_content.status);
            assert.equal("0", blockReceiptawait2.block_state.stable_content.status);
            assert.equal("3", blockReceiptawait3.block_state.stable_content.status);
            assert.equal("0", blockReceiptawait4.block_state.stable_content.status);
        }).timeout(1000000);

        it("创建合约Test4partModifier5", async () => {
            let data = await encode4.encodeParams({
                from: account2,
                contractName: "Test4partModifier5",
                functionName: "constructor"
            });
            let blockHash = await Block4.sendBlock(data);
            let blockReceiptawait = await getBlock4.getBlockState(blockHash);
            Test4partModifier5ContractAddress = blockReceiptawait.block_state.stable_content.contract_account;
        }).timeout(1000000);

        it("测试合约修饰器内部参数改变", async () => {
            let sendParams = await encode4.encodeParams({
                from: account2,
                to: Test4partModifier5ContractAddress,
                contractName: "Test4partModifier5",
                functionName: "f"
            });
            let blockHash = await Block4.sendBlock(sendParams);
            // console.log(blockHash);
            let blockReceiptawait = await getBlock4.getBlockState(blockHash);
            assert.equal("0", blockReceiptawait.block_state.stable_content.status);
        }).timeout(1000000);

        it("创建合约Test4partFallBack1", async () => {
            let data = await encode4.encodeParams({
                from: account2,
                contractName: "Test4partFallBack1",
                amount:"100",
                functionName: "constructor"
            });
            let blockHash = await Block4.sendBlock(data);
            let blockReceiptawait = await getBlock4.getBlockState(blockHash);
            Test4partFallBack1ContractAddress = blockReceiptawait.block_state.stable_content.contract_account;
        }).timeout(1000000);

        it("测试合约创建时输入金额是否到账", async () => {
            let callParams1 = await encode4.encodeParams({
                from: account2,
                to: Test4partFallBack1ContractAddress,
                contractName: "Test4partFallBack1",
                functionName: "getBalance"
            });
            let Test4partFallBack1Money = await getBlock4.call(callParams1);
            assert.equal("100", Test4partFallBack1Money);
        }).timeout(1000000);

        it("创建合约Test4partEvents", async () => {
            let data = await encode4.encodeParams({
                from: account2,
                contractName: "Test4partEvents",
                functionName: "constructor",
            });
            // console.log(data);
            let blockHash = await Block4.sendBlock(data);
            let blockReceiptawait = await getBlock4.getBlockState(blockHash);
            test4partEventsContractAddress = blockReceiptawait.block_state.stable_content.contract_account;
            console.log("test4partEventsContractAddress:"+test4partEventsContractAddress);
        }).timeout(1000000);

        it("测试合约事件", async () => {
            let sendParams1 = await encode4.encodeParams({
                from: account2,
                to: test4partEventsContractAddress,
                amount:"1",
                contractName: "Test4partEvents",
                functionName: "events1",
                args:["10"]
            });
            let blockHash1 = await Block4.sendBlock(sendParams1);
            let blockReceiptawait1 = await getBlock4.getBlockState(blockHash1);
            // console.log(blockReceiptawait1.block_state.stable_content.log);
            let sendParams2 = await encode4.encodeParams({
                from: account2,
                to: test4partEventsContractAddress,
                amount:"2",
                contractName: "Test4partEvents",
                functionName: "events2"
            });
            let blockHash2 = await Block4.sendBlock(sendParams2);
            let blockReceiptawait2 = await getBlock4.getBlockState(blockHash2);
            // console.log(blockReceiptawait2.block_state.stable_content.log);
            assert.equal("0000000000000000000000000000000000000000000000000000000000000001", blockReceiptawait1.block_state.stable_content.log[0].data);
            assert.equal("0000000000000000000000000000000000000000000000000000000000000002", blockReceiptawait2.block_state.stable_content.log[0].data);
            assert.equal(getBlock4.getHexCzrAddress(account2), blockReceiptawait1.block_state.stable_content.log[0].topics[1].toUpperCase());
            assert.equal(getBlock4.getHexCzrAddress(account2), blockReceiptawait2.block_state.stable_content.log[0].topics[1].toUpperCase());
            assert.equal("000000000000000000000000000000000000000000000000000000000000000a", blockReceiptawait1.block_state.stable_content.log[0].topics[2]);
            assert.equal("0000000000000000000000000000000000000000000000000000000000420042", blockReceiptawait2.block_state.stable_content.log[0].topics[2]);
        }).timeout(1000000);

        it("创建合约Test4partAbstractContracts2", async () => {
            let data = await encode4.encodeParams({
                from: account2,
                contractName: "Test4partAbstractContracts2",
                functionName: "constructor",
            });
            // console.log(data);
            let blockHash = await Block4.sendBlock(data);
            let blockReceiptawait = await getBlock4.getBlockState(blockHash);
            test4partAbstractContracts2ContractAddress = blockReceiptawait.block_state.stable_content.contract_account;
            console.log("test4partAbstractContracts2ContractAddress:"+test4partAbstractContracts2ContractAddress);
        }).timeout(1000000);

        it("测试合约抽象合约和接口", async () => {
            let callParams1 = await encode4.encodeParams({
                from: account2,
                to: test4partAbstractContracts2ContractAddress,
                contractName: "Test4partAbstractContracts2",
                functionName: "utterance"
            });
            let test4partAbstractContracts2A = await getBlock4.call(callParams1);
            // console.log(test4partAbstractContracts2A);
            let callParams2 = await encode4.encodeParams({
                from: account2,
                to: test4partAbstractContracts2ContractAddress,
                contractName: "Test4partAbstractContracts2",
                functionName: "testInterface",
                args:[test4part1ContractAddress]
            });
            let test4partAbstractContracts2B = await getBlock4.call(callParams2);
            // console.log(test4partAbstractContracts2B);
            assert.equal("0x6d69616f77000000000000000000000000000000000000000000000000000000", test4partAbstractContracts2A);
            assert.equal("1", test4partAbstractContracts2B);
        }).timeout(1000000);

        it("创建合约Test4partLibrary2", async () => {
            let data1 = await encode4.encodeParams({
                from: account2,
                contractName: "Test4partLibrary2",
                functionName: "constructor",
            });
            // console.log(data1);
            if (data1.data.indexOf("__$") !== "-1") {
                let data2 = await encode4.encodeParams({
                    from: account2,
                    contractName: "Test4partLibrary1",
                    functionName: "constructor",
                });
                let blockHash2 = await Block4.sendBlock(data2);
                let blockReceiptawait2 = await getBlock4.getBlockState(blockHash2);
                test4partLibrary1ContractAddress = blockReceiptawait2.block_state.stable_content.contract_account;
                console.log("test4partLibrary1ContractAddress:" + test4partLibrary1ContractAddress);
                const fir = data1.data.indexOf("__$")
                const sec = data1.data.indexOf("$__")
                const data1fir = data1.data.substring(0, fir - 1) + "f"
                const data1sec = data1.data.substring(sec + 3)
                let res = test4partLibrary1ContractAddress.split("_")
                let bytecode = bs58check.decode(res[1])
                const test4partLibrary1ContractAddressHex = bytecode.toString("hex").substring(2).toUpperCase()
                // console.log(test4partLibrary1ContractAddressHex);
                data1.data = data1fir + test4partLibrary1ContractAddressHex + data1sec
                // console.log(data1);
            }
            let blockHash1 = await Block4.sendBlock(data1);
            let blockReceiptawait1 = await getBlock4.getBlockState(blockHash1);
            test4partLibrary2ContractAddress = blockReceiptawait1.block_state.stable_content.contract_account;
            console.log("test4partLibrary2ContractAddress:" + test4partLibrary2ContractAddress);
        }).timeout(1000000);

        it("测试合约Library调用", async () => {
            let sendParams1 = await encode4.encodeParams({
                from: account2,
                to: test4partLibrary2ContractAddress,
                contractName: "Test4partLibrary2",
                functionName: "register",
                args:["1"]
            });
            // console.log(sendParams1);
            let blockHash1 = await Block4.sendBlock(sendParams1);
            let blockReceiptawait1 = await getBlock4.getBlockState(blockHash1);
            let blockHash2 = await Block4.sendBlock(sendParams1);
            let blockReceiptawait2 = await getBlock4.getBlockState(blockHash2);
            // console.log(blockHash1,blockHash2);
            assert.equal("0", blockReceiptawait1.block_state.stable_content.status);
            assert.equal("3", blockReceiptawait2.block_state.stable_content.status);
        }).timeout(1000000);

        it("创建合约Test4partUsingFor", async () => {
            let data1 = await encode4.encodeParams({
                from: account2,
                contractName: "Test4partUsingFor",
                functionName: "constructor",
            });
            // console.log(data1);
            if (data1.data.indexOf("__$") !== "-1") {
                let data2 = await encode4.encodeParams({
                    from: account2,
                    contractName: "Test4partLibrary1",
                    functionName: "constructor",
                });
                let blockHash2 = await Block4.sendBlock(data2);
                let blockReceiptawait2 = await getBlock4.getBlockState(blockHash2);
                test4partLibrary1ContractAddress = blockReceiptawait2.block_state.stable_content.contract_account;
                // console.log("test4partLibrary1ContractAddress:" + test4partLibrary1ContractAddress);
                const fir = data1.data.indexOf("__$")
                const sec = data1.data.indexOf("$__")
                // const data1fir = data1.data.substring(0, fir - 1) + "f"
                const data1fir = data1.data.substring(0, fir)
                const data1sec = data1.data.substring(sec + 3)
                let res = test4partLibrary1ContractAddress.split("_")
                let bytecode = bs58check.decode(res[1])
                const test4partLibrary1ContractAddressHex = bytecode.toString("hex").substring(2).toUpperCase()
                // console.log(test4partLibrary1ContractAddressHex);
                data1.data = data1fir + test4partLibrary1ContractAddressHex + data1sec
                // console.log(data1);
            }
            let blockHash1 = await Block4.sendBlock(data1);
            let blockReceiptawait1 = await getBlock4.getBlockState(blockHash1);
            Test4partUsingForContractAddress = blockReceiptawait1.block_state.stable_content.contract_account;
            console.log("Test4partUsingForContractAddress:" + Test4partUsingForContractAddress);
        }).timeout(1000000);

        it("测试合约Library调用", async () => {
            let sendParams = await encode4.encodeParams({
                from: account2,
                to: Test4partUsingForContractAddress,
                contractName: "Test4partUsingFor",
                functionName: "register",
                args: ["1"]
            });
            // console.log(sendParams);
            let blockHash1 = await Block4.sendBlock(sendParams);
            let blockReceiptawait1 = await getBlock4.getBlockState(blockHash1);
            let blockHash2 = await Block4.sendBlock(sendParams);
            let blockReceiptawait2 = await getBlock4.getBlockState(blockHash2);
            // console.log(blockHash1, blockHash2);
            assert.equal("0", blockReceiptawait1.block_state.stable_content.status);
            assert.equal("3", blockReceiptawait2.block_state.stable_content.status);
        }).timeout(1000000);
    });

    describe("测试testAddressAndKill合约", () => {

        it('创建account2账号', async ()=> {
            account2 = await Block5.creatAccount();
            console.log("account2:" + account2)
            let beforeAmount = await getBlock5.getaccountBalance(account2);
            let blockHash = await Block5.sendBlock({
                to: account2,
                amount: "3000000000000000000000"
            });
            await getBlock5.getBlockState(blockHash);
            let afterAmount = await getBlock5.getaccountBalance(account2);
            assert.equal('3000000000000000000000', (afterAmount - beforeAmount))
        }).timeout(1000000);

        it("创建合约", async () => {
            let data = await encode5.encodeParams({
                from:account2,
                functionName: "constructor",
                amount: "1000000000000000000000"
            });
            let blockHash = await Block5.sendBlock(data);
            let blockReceiptawait = await getBlock5.getBlockState(blockHash);
            contractAddress = blockReceiptawait.block_state.stable_content.contract_account;
            console.log(contractAddress);
        }).timeout(1000000);

        it("测试SetA方法", async () => {
            let callParams = await encode5.encodeParams({
                to: contractAddress,
                functionName: "a"
            });
            let beforeA = await getBlock5.call(callParams);
            let sendParams = await encode5.encodeParams({
                from: account2,
                to: contractAddress,
                functionName: "setA"
            });
            let blockHash = await Block5.sendBlock(sendParams);
            await getBlock5.getBlockState(blockHash);
            let afterA = await getBlock5.call(callParams);
            assert.equal('1', afterA - beforeA);
        }).timeout(1000000);

        it("测试kill方法是否生效", async () => {
            let beforContractAmount = await getBlock5.getaccountBalance(contractAddress)
            let beforFronAddressAmount = await getBlock5.getaccountBalance(account2)
            let sendParams = await encode5.encodeParams({
                from: account2,
                to: contractAddress,
                functionName: "kill"
            });
            let blockHash = await Block.sendBlock(sendParams);
            await getBlock5.getBlockState(blockHash);
            let gasPrice = await getBlock5.getBlock(blockHash)
            let usedGas = await getBlock5.getBlockState(blockHash)
            let gas = usedGas.block_state.stable_content.gas_used * gasPrice.block.content.gas_price
            // console.log(gas);
            let afterContractAmount = await getBlock5.getaccountBalance(contractAddress)
            let afterFronAddressAmount = await getBlock5.getaccountBalance(account2)
            let callParams = await encode5.encodeParams({
                to: contractAddress,
                functionName: "a"
            });
            let afterA = await getBlock5.call(callParams);
            assert.equal('1000000000000000000000', BigNumber(beforContractAmount).minus(afterContractAmount).toString());
            assert.equal(BigNumber("1000000000000000000000").minus(gas).toString() , BigNumber(afterFronAddressAmount).minus(beforFronAddressAmount).toString());
            assert.equal("0", afterA);
        }).timeout(1000000);

        it("测试SetA方法", async () => {
            let callParams = await encode5.encodeParams({
                to: contractAddress,
                functionName: "a"
            });
            let beforeA = await getBlock5.call(callParams);
            let sendParams = await encode5.encodeParams({
                from: account2,
                to: contractAddress,
                functionName: "setA"
            });
            let blockHash = await Block5.sendBlock(sendParams);
            await getBlock5.getBlockState(blockHash);
            let afterA = await getBlock5.call(callParams);
            assert.equal('0', beforeA);
            assert.equal('0', afterA);
        }).timeout(1000000);
    });

    describe("测试合约FactoryModel", () => {
        it("创建账号account2，并转入5个CZR", async () => {
            account2 = await Block6.creatAccount();
            console.log("account2:" + account2)
            let beforeAmount = await getBlock6.getaccountBalance(account2);
            let blockHash = await Block6.sendBlock({
                to: account2,
                amount: "5000000000000000000"
            });
            await getBlock6.getBlockState(blockHash);
            let afterAmount = await getBlock6.getaccountBalance(account2);
            assert.equal('5000000000000000000', (afterAmount - beforeAmount))
        }).timeout(1000000);

        it("创建合约A，并转入1.5个CZR", async () => {
            let beforeAccount2Amount = await getBlock6.getaccountBalance(account2);
            let data = await encode6.encodeParams({
                from: account2,
                functionName: "constructor",
                amount: "1500000000000000000"
            });
            let blockHash = await Block6.sendBlock(data);
            console.log(blockHash);
            let blockReceiptawait = await getBlock6.getBlockState(blockHash);
            AContractAddress = blockReceiptawait.block_state.stable_content.contract_account;
            let AContractAmount = await getBlock6.getaccountBalance(AContractAddress);
            let afterAccount2Amount = await getBlock6.getaccountBalance(account2);
            let gas = await getBlock6.getGas(blockHash)
            let tracts = await getBlock6.getBlockTraces(blockHash)
            let blockState=await getBlock6.getBlockState(blockHash)

            console.log("以太坊交易gasUsed：1621913","标准链交易gasUsed："+blockState.block_state.stable_content.gas_used)
            assert.equal('1500000000000000000', AContractAmount)
            assert.equal(1 * '1500000000000000000' + gas, beforeAccount2Amount - afterAccount2Amount)
            assert.equal("1", tracts.block_traces[0].type)
            assert.equal("0", tracts.block_traces[0].subtraces)
            assert.equal(account2, tracts.block_traces[0].action.from)
            //===============================================================================
            assert.equal("1500000000000000000",  tracts.block_traces[0].action.amount)
            //console.log(tracts.block_traces[0].action)
            assert.equal(AContractAddress, tracts.block_traces[0].result.contract_account)
            assert.equal([].toString(), tracts.block_traces[0].trace_address.toString())
            console.log("以太坊交易tracts的gasUsed：659538","标准链交易tracts的gasUsed："+tracts.block_traces[0].result.gas_used)
        }).timeout(1000000);

        it('执行合约A中的创建合约C的方法，并从A合约中转入C合约0.3CZR', async () => {
            let sendParams = await encode6.encodeParams({
                from: account2,
                to: AContractAddress,
                contractName: "A",
                functionName: "creatC"
            });
            let blockHash = await Block6.sendBlock(sendParams);
            await getBlock6.getBlockState(blockHash);
            let callParams = await encode6.encodeParams({
                from: account2,
                to: AContractAddress,
                contractName: "A",
                functionName: "getCAddress"
            });
            // console.log(callParams);
            CContractAddress = await getBlock6.call(callParams);
            console.log("CContractAddress:"+CContractAddress);
            let CContractAmount = await getBlock6.getaccountBalance(CContractAddress);
            let tracts = await getBlock6.getBlockTraces(blockHash)
            let blockState=await getBlock6.getBlockState(blockHash)
            console.log("以太坊交易gasUsed：252529","标准链交易gasUsed："+blockState.block_state.stable_content.gas_used)
            assert.equal('300000000000000000', CContractAmount)
            assert.equal("0", tracts.block_traces[0].type)
            assert.equal("2", tracts.block_traces[0].subtraces)
            assert.equal("call", tracts.block_traces[0].action.call_type)
            assert.equal(account2, tracts.block_traces[0].action.from)
            assert.equal("0", tracts.block_traces[0].action.amount)
            assert.equal(AContractAddress, tracts.block_traces[0].action.to)
            assert.equal([].toString(), tracts.block_traces[0].trace_address.toString())
            assert.equal("3284f168".toUpperCase(), tracts.block_traces[0].action.data)
            console.log("以太坊交易tracts的gasUsed：188533","标准链交易tracts的gasUsed："+tracts.block_traces[0].result.gas_used)

            assert.equal("1", tracts.block_traces[1].type)
            assert.equal("0", tracts.block_traces[1].subtraces)
            //========================================================================
            assert.equal("0", tracts.block_traces[1].action.amount)
            //console.log(tracts.block_traces[1].action.amount)
            assert.equal(CContractAddress, tracts.block_traces[1].result.contract_account)
            assert.equal([0].toString(), tracts.block_traces[1].trace_address.toString())
            console.log("以太坊交易tracts的gasUsed：127785","标准链交易tracts的gasUsed："+tracts.block_traces[1].result.gas_used)

            assert.equal("0", tracts.block_traces[2].type)
            assert.equal("0", tracts.block_traces[2].subtraces)
            assert.equal("call", tracts.block_traces[2].action.call_type)
            assert.equal(AContractAddress, tracts.block_traces[2].action.from)
            assert.equal("300000000000000000", tracts.block_traces[2].action.amount)
            assert.equal(CContractAddress, tracts.block_traces[2].action.to)
            assert.equal([1].toString(), tracts.block_traces[2].trace_address.toString())
            assert.equal("".toUpperCase(), tracts.block_traces[2].action.data)
            console.log("以太坊交易tracts的gasUsed：40","标准链交易tracts的gasUsed："+tracts.block_traces[2].result.gas_used)

        }).timeout(1000000);

        it('执行合约A中的创建合约B的方法，并从A合约中转入B合约1.2CZR', async () => {
            let sendParams = await encode6.encodeParams({
                from: account2,
                to: AContractAddress,
                contractName: "A",
                functionName: "creatB"
            });
            let blockHash = await Block6.sendBlock(sendParams);
            // console.log(blockHash);
            await getBlock6.getBlockState(blockHash);
            let callParams = await encode6.encodeParams({
                from: account2,
                to: AContractAddress,
                contractName: "A",
                functionName: "getBAddress"
            });
            // console.log(callParams);
            BContractAddress = await getBlock6.call(callParams);
            console.log("BContractAddress:"+BContractAddress);
            let BContractAmount = await getBlock6.getaccountBalance(BContractAddress);
            let tracts = await getBlock6.getBlockTraces(blockHash)
            let blockState=await getBlock6.getBlockState(blockHash)
            console.log("以太坊交易gasUsed：474316","标准链交易gasUsed："+blockState.block_state.stable_content.gas_used)
            assert.equal('1200000000000000000', BContractAmount)
            assert.equal("0", tracts.block_traces[0].type)
            assert.equal("3", tracts.block_traces[0].subtraces)
            assert.equal("call", tracts.block_traces[0].action.call_type)
            assert.equal(account2, tracts.block_traces[0].action.from)
            assert.equal("0", tracts.block_traces[0].action.amount)
            assert.equal(AContractAddress, tracts.block_traces[0].action.to)
            assert.equal([].toString(), tracts.block_traces[0].trace_address.toString())
            assert.equal("a6a2d286".toUpperCase(), tracts.block_traces[0].action.data)
            console.log("以太坊交易tracts的gasUsed：309052","标准链交易tracts的gasUsed："+tracts.block_traces[0].result.gas_used)

            assert.equal("0", tracts.block_traces[1].type)
            assert.equal("0", tracts.block_traces[1].subtraces)
            assert.equal("call", tracts.block_traces[1].action.call_type)
            assert.equal(AContractAddress, tracts.block_traces[1].action.from)
            assert.equal("0", tracts.block_traces[1].action.amount)
            assert.equal(account2, tracts.block_traces[1].action.to)
            assert.equal([0].toString(), tracts.block_traces[1].trace_address.toString())
            assert.equal("".toUpperCase(), tracts.block_traces[1].action.data)
            console.log("以太坊交易tracts的gasUsed：0","标准链交易tracts的gasUsed："+tracts.block_traces[1].result.gas_used)

            assert.equal("1", tracts.block_traces[2].type)
            assert.equal("0", tracts.block_traces[2].subtraces)
            //====================================================================
            assert.equal("0", tracts.block_traces[2].action.amount)
            //console.log(tracts.block_traces[2].action.amount)
            assert.equal(BContractAddress, tracts.block_traces[2].result.contract_account)
            assert.equal([1].toString(), tracts.block_traces[2].trace_address.toString())
            console.log("以太坊交易tracts的gasUsed：246934","标准链交易tracts的gasUsed："+tracts.block_traces[2].result.gas_used)

            assert.equal("0", tracts.block_traces[3].type)
            assert.equal("0", tracts.block_traces[3].subtraces)
            assert.equal("call", tracts.block_traces[3].action.call_type)
            assert.equal(AContractAddress, tracts.block_traces[3].action.from)
            assert.equal("1200000000000000000", tracts.block_traces[3].action.amount)
            assert.equal(BContractAddress, tracts.block_traces[3].action.to)
            assert.equal([2].toString(), tracts.block_traces[3].trace_address.toString())
            assert.equal("".toUpperCase(), tracts.block_traces[3].action.data)
            console.log("以太坊交易tracts的gasUsed：40","标准链交易tracts的gasUsed："+tracts.block_traces[3].result.gas_used)
        }).timeout(1000000);

        it('执行合约A中setB1,从B中转出0.2CZR给from账号', async () => {
            let beforeBContractAmount = await getBlock6.getaccountBalance(BContractAddress);
            let sendParams = await encode6.encodeParams({
                from: account2,
                to: AContractAddress,
                contractName: "A",
                functionName: "setB1"
            });
            // console.log(sendParams);
            let blockHash = await Block6.sendBlock(sendParams);
            await getBlock6.getBlockState(blockHash);
            let afterBContractAmount = await getBlock6.getaccountBalance(BContractAddress);
            let tracts = await getBlock6.getBlockTraces(blockHash)
            let blockState=await getBlock6.getBlockState(blockHash)
            console.log("以太坊交易gasUsed：46253","标准链交易gasUsed："+blockState.block_state.stable_content.gas_used)
            assert.equal('200000000000000000', beforeBContractAmount - afterBContractAmount)
            assert.equal("0", tracts.block_traces[0].type)
            assert.equal("2", tracts.block_traces[0].subtraces)
            assert.equal("call", tracts.block_traces[0].action.call_type)
            assert.equal(account2, tracts.block_traces[0].action.from)
            assert.equal("0", tracts.block_traces[0].action.amount)
            assert.equal(AContractAddress, tracts.block_traces[0].action.to)
            assert.equal([].toString(), tracts.block_traces[0].trace_address.toString())
            assert.equal("05942236".toUpperCase(), tracts.block_traces[0].action.data)
            console.log("以太坊交易tracts的gasUsed：25009","标准链交易tracts的gasUsed："+tracts.block_traces[0].result.gas_used)

            assert.equal("0", tracts.block_traces[1].type)
            assert.equal("1", tracts.block_traces[1].subtraces)
            assert.equal("call", tracts.block_traces[1].action.call_type)
            assert.equal(AContractAddress, tracts.block_traces[1].action.from)
            assert.equal("0", tracts.block_traces[1].action.amount)
            assert.equal(BContractAddress, tracts.block_traces[1].action.to)
            assert.equal([0].toString(), tracts.block_traces[1].trace_address.toString())
            assert.equal("0b6f48a5".toUpperCase(), tracts.block_traces[1].action.data)
            console.log("以太坊交易tracts的gasUsed：7975","标准链交易tracts的gasUsed："+tracts.block_traces[1].result.gas_used)

            assert.equal("0", tracts.block_traces[2].type)
            assert.equal("0", tracts.block_traces[2].subtraces)
            assert.equal("call", tracts.block_traces[2].action.call_type)
            assert.equal(BContractAddress, tracts.block_traces[2].action.from)
            assert.equal("100000000000000000", tracts.block_traces[2].action.amount)
            assert.equal(account2, tracts.block_traces[2].action.to)
            assert.equal([0,0].toString(), tracts.block_traces[2].trace_address.toString())
            assert.equal("".toUpperCase(), tracts.block_traces[2].action.data)
            console.log("以太坊交易tracts的gasUsed：0","标准链交易tracts的gasUsed："+tracts.block_traces[2].result.gas_used)

            assert.equal("0", tracts.block_traces[3].type)
            assert.equal("1", tracts.block_traces[3].subtraces)
            assert.equal("call", tracts.block_traces[3].action.call_type)
            assert.equal(AContractAddress, tracts.block_traces[3].action.from)
            assert.equal("0", tracts.block_traces[3].action.amount)
            assert.equal(BContractAddress, tracts.block_traces[3].action.to)
            assert.equal([1].toString(), tracts.block_traces[3].trace_address.toString())
            assert.equal("0b6f48a5".toUpperCase(), tracts.block_traces[3].action.data)
            console.log("以太坊交易tracts的gasUsed：7975","标准链交易tracts的gasUsed："+tracts.block_traces[3].result.gas_used)

            assert.equal("0", tracts.block_traces[4].type)
            assert.equal("0", tracts.block_traces[4].subtraces)
            assert.equal("call", tracts.block_traces[4].action.call_type)
            assert.equal(BContractAddress, tracts.block_traces[4].action.from)
            assert.equal("100000000000000000", tracts.block_traces[4].action.amount)
            assert.equal(account2, tracts.block_traces[4].action.to)
            assert.equal([1,0].toString(), tracts.block_traces[4].trace_address.toString())
            assert.equal("".toUpperCase(), tracts.block_traces[4].action.data)
            console.log("以太坊交易tracts的gasUsed：0","标准链交易tracts的gasUsed："+tracts.block_traces[4].result.gas_used)
        }).timeout(1000000);

        it('执行合约A中setB2,从B中转出0.5CZR给from账号', async () => {
            let beforeBContractAmount = await getBlock6.getaccountBalance(BContractAddress);
            let sendParams = await encode6.encodeParams({
                from: account2,
                to: AContractAddress,
                contractName: "A",
                functionName: "setB2"
            });
            // console.log(sendParams);
            let blockHash = await Block6.sendBlock(sendParams);
            await getBlock6.getBlockState(blockHash);
            let afterBContractAmount = await getBlock6.getaccountBalance(BContractAddress);
            let tracts = await getBlock6.getBlockTraces(blockHash)
            let blockState=await getBlock6.getBlockState(blockHash)
            console.log("以太坊交易gasUsed：71480","标准链交易gasUsed："+blockState.block_state.stable_content.gas_used)
            assert.equal('500000000000000000', beforeBContractAmount - afterBContractAmount)
            assert.equal("0", tracts.block_traces[0].type)
            assert.equal("3", tracts.block_traces[0].subtraces)
            assert.equal("call", tracts.block_traces[0].action.call_type)
            assert.equal(account2, tracts.block_traces[0].action.from)
            assert.equal("0", tracts.block_traces[0].action.amount)
            assert.equal(AContractAddress, tracts.block_traces[0].action.to)
            assert.equal([].toString(), tracts.block_traces[0].trace_address.toString())
            assert.equal("d78ca67f".toUpperCase(), tracts.block_traces[0].action.data)
            console.log("以太坊交易tracts的gasUsed：50566","标准链交易tracts的gasUsed："+tracts.block_traces[0].result.gas_used)

            assert.equal("0", tracts.block_traces[1].type)
            assert.equal("3", tracts.block_traces[1].subtraces)
            assert.equal("call", tracts.block_traces[1].action.call_type)
            assert.equal(AContractAddress, tracts.block_traces[1].action.from)
            assert.equal("0", tracts.block_traces[1].action.amount)
            assert.equal(BContractAddress, tracts.block_traces[1].action.to)
            assert.equal([0].toString(), tracts.block_traces[1].trace_address.toString())
            assert.equal("3e424fd7".toUpperCase(), tracts.block_traces[1].action.data)
            console.log("以太坊交易tracts的gasUsed：23498","标准链交易tracts的gasUsed："+tracts.block_traces[1].result.gas_used)

            assert.equal("0", tracts.block_traces[2].type)
            assert.equal("0", tracts.block_traces[2].subtraces)
            assert.equal("call", tracts.block_traces[2].action.call_type)
            assert.equal(BContractAddress, tracts.block_traces[2].action.from)
            assert.equal("100000000000000000", tracts.block_traces[2].action.amount)
            assert.equal(account2, tracts.block_traces[2].action.to)
            assert.equal([0,0].toString(), tracts.block_traces[2].trace_address.toString())
            assert.equal("".toUpperCase(), tracts.block_traces[2].action.data)
            console.log("以太坊交易tracts的gasUsed：0","标准链交易tracts的gasUsed："+tracts.block_traces[2].result.gas_used)

            assert.equal("0", tracts.block_traces[3].type)
            assert.equal("0", tracts.block_traces[3].subtraces)
            assert.equal("call", tracts.block_traces[3].action.call_type)
            assert.equal(BContractAddress, tracts.block_traces[3].action.from)
            assert.equal("100000000000000000", tracts.block_traces[3].action.amount)
            assert.equal(account2, tracts.block_traces[3].action.to)
            assert.equal([0,1].toString(), tracts.block_traces[3].trace_address.toString())
            assert.equal("".toUpperCase(), tracts.block_traces[3].action.data)
            console.log("以太坊交易tracts的gasUsed：0","标准链交易tracts的gasUsed："+tracts.block_traces[3].result.gas_used)

            assert.equal("0", tracts.block_traces[4].type)
            assert.equal("0", tracts.block_traces[4].subtraces)
            assert.equal("call", tracts.block_traces[4].action.call_type)
            assert.equal(BContractAddress, tracts.block_traces[4].action.from)
            assert.equal("100000000000000000", tracts.block_traces[4].action.amount)
            assert.equal(account2, tracts.block_traces[4].action.to)
            assert.equal([0,2].toString(), tracts.block_traces[4].trace_address.toString())
            assert.equal("".toUpperCase(), tracts.block_traces[4].action.data)
            console.log("以太坊交易tracts的gasUsed：0","标准链交易tracts的gasUsed："+tracts.block_traces[4].result.gas_used)

            assert.equal("0", tracts.block_traces[5].type)
            assert.equal("1", tracts.block_traces[5].subtraces)
            assert.equal("call", tracts.block_traces[5].action.call_type)
            assert.equal(AContractAddress, tracts.block_traces[5].action.from)
            assert.equal("0", tracts.block_traces[5].action.amount)
            assert.equal(BContractAddress, tracts.block_traces[5].action.to)
            assert.equal([1].toString(), tracts.block_traces[5].trace_address.toString())
            assert.equal("0b6f48a5".toUpperCase(), tracts.block_traces[5].action.data)
            console.log("以太坊交易tracts的gasUsed：7975","标准链交易tracts的gasUsed："+tracts.block_traces[5].result.gas_used)

            assert.equal("0", tracts.block_traces[6].type)
            assert.equal("0", tracts.block_traces[6].subtraces)
            assert.equal("call", tracts.block_traces[6].action.call_type)
            assert.equal(BContractAddress, tracts.block_traces[6].action.from)
            assert.equal("100000000000000000", tracts.block_traces[6].action.amount)
            assert.equal(account2, tracts.block_traces[6].action.to)
            assert.equal([1,0].toString(), tracts.block_traces[6].trace_address.toString())
            assert.equal("".toUpperCase(), tracts.block_traces[6].action.data)
            console.log("以太坊交易tracts的gasUsed：0","标准链交易tracts的gasUsed："+tracts.block_traces[6].result.gas_used)

            assert.equal("0", tracts.block_traces[7].type)
            assert.equal("1", tracts.block_traces[7].subtraces)
            assert.equal("call", tracts.block_traces[7].action.call_type)
            assert.equal(AContractAddress, tracts.block_traces[7].action.from)
            assert.equal("0", tracts.block_traces[7].action.amount)
            assert.equal(BContractAddress, tracts.block_traces[7].action.to)
            assert.equal([2].toString(), tracts.block_traces[7].trace_address.toString())
            assert.equal("0b6f48a5".toUpperCase(), tracts.block_traces[7].action.data)
            console.log("以太坊交易tracts的gasUsed：7975","标准链交易tracts的gasUsed："+tracts.block_traces[7].result.gas_used)

            assert.equal("0", tracts.block_traces[8].type)
            assert.equal("0", tracts.block_traces[8].subtraces)
            assert.equal("call", tracts.block_traces[8].action.call_type)
            assert.equal(BContractAddress, tracts.block_traces[8].action.from)
            assert.equal("100000000000000000", tracts.block_traces[8].action.amount)
            assert.equal(account2, tracts.block_traces[8].action.to)
            assert.equal([2,0].toString(), tracts.block_traces[8].trace_address.toString())
            assert.equal("".toUpperCase(), tracts.block_traces[8].action.data)
            console.log("以太坊交易tracts的gasUsed：0","标准链交易tracts的gasUsed："+tracts.block_traces[8].result.gas_used)
        }).timeout(1000000);

        it('执行合约A中setB3,从B中转出0.2CZR给from账号，从C中转出0.3CZR给from账号', async () => {
            let beforeBContractAmount = await getBlock6.getaccountBalance(BContractAddress);
            let beforeCContractAmount = await getBlock6.getaccountBalance(CContractAddress);
            let sendParams = await encode6.encodeParams({
                from: account2,
                to: AContractAddress,
                contractName: "A",
                functionName: "setB3"
            });
            // console.log(sendParams);
            let blockHash = await Block6.sendBlock(sendParams);
            await getBlock6.getBlockState(blockHash);
            let afterBContractAmount = await getBlock6.getaccountBalance(BContractAddress);
            let afterCContractAmount = await getBlock6.getaccountBalance(CContractAddress);
            let tracts = await getBlock6.getBlockTraces(blockHash)
            let blockState=await getBlock6.getBlockState(blockHash)
            console.log("以太坊交易gasUsed：93886","标准链交易gasUsed："+blockState.block_state.stable_content.gas_used)
            assert.equal('200000000000000000', beforeBContractAmount - afterBContractAmount)
            assert.equal('300000000000000000', beforeCContractAmount - afterCContractAmount)
            assert.equal("0", tracts.block_traces[0].type)
            assert.equal("2", tracts.block_traces[0].subtraces)
            assert.equal("call", tracts.block_traces[0].action.call_type)
            assert.equal(account2, tracts.block_traces[0].action.from)
            assert.equal("0", tracts.block_traces[0].action.amount)
            assert.equal(AContractAddress, tracts.block_traces[0].action.to)
            assert.equal([].toString(), tracts.block_traces[0].trace_address.toString())
            assert.equal("4be77545".toUpperCase(), tracts.block_traces[0].action.data)
            console.log("以太坊交易tracts的gasUsed：72821","标准链交易tracts的gasUsed："+tracts.block_traces[0].result.gas_used)

            assert.equal("0", tracts.block_traces[1].type)
            assert.equal("3", tracts.block_traces[1].subtraces)
            assert.equal("call", tracts.block_traces[1].action.call_type)
            assert.equal(AContractAddress, tracts.block_traces[1].action.from)
            assert.equal("0", tracts.block_traces[1].action.amount)
            assert.equal(BContractAddress, tracts.block_traces[1].action.to)
            assert.equal([0].toString(), tracts.block_traces[1].trace_address.toString())
            assert.equal("ac461dbd".toUpperCase(), tracts.block_traces[1].action.data)
            console.log("以太坊交易tracts的gasUsed：55788","标准链交易tracts的gasUsed："+tracts.block_traces[1].result.gas_used)

            assert.equal("0", tracts.block_traces[2].type)
            assert.equal("0", tracts.block_traces[2].subtraces)
            assert.equal("call", tracts.block_traces[2].action.call_type)
            assert.equal(BContractAddress, tracts.block_traces[2].action.from)
            assert.equal("100000000000000000", tracts.block_traces[2].action.amount)
            assert.equal(account2, tracts.block_traces[2].action.to)
            assert.equal([0,0].toString(), tracts.block_traces[2].trace_address.toString())
            assert.equal("".toUpperCase(), tracts.block_traces[2].action.data)
            console.log("以太坊交易tracts的gasUsed：0","标准链交易tracts的gasUsed："+tracts.block_traces[2].result.gas_used)

            assert.equal("0", tracts.block_traces[3].type)
            assert.equal("2", tracts.block_traces[3].subtraces)
            assert.equal("call", tracts.block_traces[3].action.call_type)
            assert.equal(BContractAddress, tracts.block_traces[3].action.from)
            assert.equal("0", tracts.block_traces[3].action.amount)
            assert.equal(CContractAddress, tracts.block_traces[3].action.to)
            assert.equal([0,1].toString(), tracts.block_traces[3].trace_address.toString())
            assert.equal("0b6f48a5".toUpperCase(), tracts.block_traces[3].action.data)
            console.log("以太坊交易tracts的gasUsed：15510","标准链交易tracts的gasUsed："+tracts.block_traces[3].result.gas_used)

            assert.equal("0", tracts.block_traces[4].type)
            assert.equal("0", tracts.block_traces[4].subtraces)
            assert.equal("call", tracts.block_traces[4].action.call_type)
            assert.equal(CContractAddress, tracts.block_traces[4].action.from)
            assert.equal("100000000000000000", tracts.block_traces[4].action.amount)
            assert.equal(account2, tracts.block_traces[4].action.to)
            assert.equal([0,1,0].toString(), tracts.block_traces[4].trace_address.toString())
            assert.equal("".toUpperCase(), tracts.block_traces[4].action.data)
            console.log("以太坊交易tracts的gasUsed：0","标准链交易tracts的gasUsed："+tracts.block_traces[4].result.gas_used)

            assert.equal("0", tracts.block_traces[5].type)
            assert.equal("0", tracts.block_traces[5].subtraces)
            assert.equal("call", tracts.block_traces[5].action.call_type)
            assert.equal(CContractAddress, tracts.block_traces[5].action.from)
            assert.equal("100000000000000000", tracts.block_traces[5].action.amount)
            assert.equal(account2, tracts.block_traces[5].action.to)
            assert.equal([0,1,1].toString(), tracts.block_traces[5].trace_address.toString())
            assert.equal("".toUpperCase(), tracts.block_traces[5].action.data)
            console.log("以太坊交易tracts的gasUsed：0","标准链交易tracts的gasUsed："+tracts.block_traces[5].result.gas_used)

            assert.equal("0", tracts.block_traces[6].type)
            assert.equal("1", tracts.block_traces[6].subtraces)
            assert.equal("call", tracts.block_traces[6].action.call_type)
            assert.equal(BContractAddress, tracts.block_traces[6].action.from)
            assert.equal("0", tracts.block_traces[6].action.amount)
            assert.equal(CContractAddress, tracts.block_traces[6].action.to)
            assert.equal([0,2].toString(), tracts.block_traces[6].trace_address.toString())
            assert.equal("3e424fd7".toUpperCase(), tracts.block_traces[6].action.data)
            console.log("以太坊交易tracts的gasUsed：7861","标准链交易tracts的gasUsed："+tracts.block_traces[6].result.gas_used)

            assert.equal("0", tracts.block_traces[7].type)
            assert.equal("0", tracts.block_traces[7].subtraces)
            assert.equal("call", tracts.block_traces[7].action.call_type)
            assert.equal(CContractAddress, tracts.block_traces[7].action.from)
            assert.equal("100000000000000000", tracts.block_traces[7].action.amount)
            assert.equal(account2, tracts.block_traces[7].action.to)
            assert.equal([0,2,0].toString(), tracts.block_traces[7].trace_address.toString())
            assert.equal("".toUpperCase(), tracts.block_traces[7].action.data)
            console.log("以太坊交易tracts的gasUsed：0","标准链交易tracts的gasUsed："+tracts.block_traces[7].result.gas_used)

            assert.equal("0", tracts.block_traces[8].type)
            assert.equal("1", tracts.block_traces[8].subtraces)
            assert.equal("call", tracts.block_traces[8].action.call_type)
            assert.equal(AContractAddress, tracts.block_traces[8].action.from)
            assert.equal("0", tracts.block_traces[8].action.amount)
            assert.equal(BContractAddress, tracts.block_traces[8].action.to)
            assert.equal([1].toString(), tracts.block_traces[8].trace_address.toString())
            assert.equal("0b6f48a5".toUpperCase(), tracts.block_traces[8].action.data)
            console.log("以太坊交易tracts的gasUsed：7975","标准链交易tracts的gasUsed："+tracts.block_traces[8].result.gas_used)

            assert.equal("0", tracts.block_traces[9].type)
            assert.equal("0", tracts.block_traces[9].subtraces)
            assert.equal("call", tracts.block_traces[9].action.call_type)
            assert.equal(BContractAddress, tracts.block_traces[9].action.from)
            assert.equal("100000000000000000", tracts.block_traces[9].action.amount)
            assert.equal(account2, tracts.block_traces[9].action.to)
            assert.equal([1,0].toString(), tracts.block_traces[9].trace_address.toString())
            assert.equal("".toUpperCase(), tracts.block_traces[9].action.data)
            console.log("以太坊交易tracts的gasUsed：0","标准链交易tracts的gasUsed："+tracts.block_traces[9].result.gas_used)
        }).timeout(1000000);

        it('测试合约B的setA方法，在kill调用之前', async () => {
            let callParams = await encode6.encodeParams({
                from: account2,
                to: BContractAddress,
                contractName: "B",
                functionName: "a"
            });
            let beforeA = await getBlock6.call(callParams);
            let sendParams = await encode6.encodeParams({
                from: account2,
                to: BContractAddress,
                contractName: "B",
                functionName: "setA"
            });
            let blockHash = await Block6.sendBlock(sendParams);
            await getBlock6.getBlockState(blockHash);
            let afterA = await getBlock6.call(callParams);
            let tracts = await getBlock6.getBlockTraces(blockHash)
            let blockState=await getBlock6.getBlockState(blockHash)
            console.log("以太坊交易gasUsed：41721","标准链交易gasUsed："+blockState.block_state.stable_content.gas_used)
            assert.equal("call", tracts.block_traces[0].action.call_type)
            assert.equal('1', afterA - beforeA);
            assert.equal("0", tracts.block_traces[0].type)
            assert.equal("0", tracts.block_traces[0].subtraces)
            assert.equal(account2, tracts.block_traces[0].action.from)
            assert.equal("0", tracts.block_traces[0].action.amount)
            assert.equal(BContractAddress, tracts.block_traces[0].action.to)
            assert.equal([].toString(), tracts.block_traces[0].trace_address.toString())
            assert.equal("1FC376F7".toUpperCase(), tracts.block_traces[0].action.data)
            console.log("以太坊交易tracts的gasUsed：41766","标准链交易tracts的gasUsed："+tracts.block_traces[0].result.gas_used)
        }).timeout(1000000);

        it('执行合约B中kill,从B中转出0.3CZR给from账号', async () => {
            let beforeAccount2Amount = await getBlock6.getaccountBalance(account2);
            let beforeBContractAmount = await getBlock6.getaccountBalance(BContractAddress);
            let sendParams = await encode6.encodeParams({
                from: account2,
                to: BContractAddress,
                contractName: "B",
                functionName: "kill"
            });
            // console.log(sendParams);
            let blockHash = await Block6.sendBlock(sendParams);
            console.log(blockHash);
            await getBlock6.getBlockState(blockHash);
            let afterBContractAmount = await getBlock6.getaccountBalance(BContractAddress);
            let afterAccount2Amount = await getBlock6.getaccountBalance(account2);
            let gas = await getBlock6.getGas(blockHash)
            let tracts = await getBlock6.getBlockTraces(blockHash)
            let blockState=await getBlock6.getBlockState(blockHash)
            console.log("以太坊交易gasUsed：13221","标准链交易gasUsed："+blockState.block_state.stable_content.gas_used)
            assert.equal('300000000000000000', beforeBContractAmount - afterBContractAmount)
            assert.equal(BigNumber(gas).minus(300000000000000000).toString(), BigNumber(beforeAccount2Amount).minus(afterAccount2Amount))
            assert.equal("0", tracts.block_traces[0].type)
            assert.equal("1", tracts.block_traces[0].subtraces)
            assert.equal("call", tracts.block_traces[0].action.call_type)
            assert.equal(account2, tracts.block_traces[0].action.from)
            assert.equal("0", tracts.block_traces[0].action.amount)
            assert.equal(BContractAddress, tracts.block_traces[0].action.to)
            assert.equal([].toString(), tracts.block_traces[0].trace_address.toString())
            assert.equal("41c0e1b5".toUpperCase(), tracts.block_traces[0].action.data)
            console.log("以太坊交易tracts的gasUsed：5227","标准链交易tracts的gasUsed："+tracts.block_traces[0].result.gas_used)

            assert.equal("2", tracts.block_traces[1].type)
            assert.equal("0", tracts.block_traces[1].subtraces)
            assert.equal(BContractAddress, tracts.block_traces[1].action.contract_account)
            assert.equal("300000000000000000", tracts.block_traces[1].action.balance)
            assert.equal(account2, tracts.block_traces[1].action.refund_account)
            assert.equal([0].toString(), tracts.block_traces[1].trace_address.toString())
        }).timeout(1000000);

        it("测试合约B的SetA方法，在kill调用之后", async () => {
            let callParams = await encode6.encodeParams({
                to: BContractAddress,
                contractName: "B",
                functionName: "a"
            });
            let beforeA = await getBlock6.call(callParams);
            let sendParams = await encode6.encodeParams({
                from: account2,
                to: BContractAddress,
                contractName: "B",
                functionName: "setA"
            });
            let blockHash = await Block6.sendBlock(sendParams);
            console.log(blockHash);
            await getBlock6.getBlockState(blockHash);
            let afterA = await getBlock6.call(callParams);
            let tracts = await getBlock6.getBlockTraces(blockHash)
            let blockState=await getBlock6.getBlockState(blockHash)
            console.log("以太坊交易gasUsed：21272","标准链交易gasUsed："+blockState.block_state.stable_content.gas_used)
            assert.equal('0', beforeA);
            assert.equal('0', afterA);
            assert.equal("0", tracts.block_traces[0].type)
            assert.equal("0", tracts.block_traces[0].subtraces)
            assert.equal("call", tracts.block_traces[0].action.call_type)
            assert.equal(account2, tracts.block_traces[0].action.from)
            assert.equal("0", tracts.block_traces[0].action.amount)
            assert.equal(BContractAddress, tracts.block_traces[0].action.to)
            assert.equal([].toString(), tracts.block_traces[0].trace_address.toString())
            assert.equal("1FC376F7".toUpperCase(), tracts.block_traces[0].action.data)
            console.log("以太坊交易tracts的gasUsed：21272","标准链交易tracts的gasUsed："+tracts.block_traces[0].result.gas_used)
        }).timeout(1000000);
    });

    describe("测试合约pekka", async () => {
        it("创建账号account2，account3，account4，并分别转入5个CZR", async () => {
            account2 = await Block7.creatAccount();
            account3 = await Block7.creatAccount();
            account4 = await Block7.creatAccount();
            account5 = await Block7.creatAccount();
            console.log("account2:" + account2)
            console.log("account3:" + account3)
            console.log("account4:" + account4)
            console.log("account5:" + account5)
            let beforeAmount1 = await getBlock7.getaccountBalance(account2);
            let beforeAmount2 = await getBlock7.getaccountBalance(account3);
            let beforeAmount3 = await getBlock7.getaccountBalance(account4);
            let blockHash1 = await Block7.sendBlock({
                to: account2,
                amount: "1000000000000000000000"
            });

            let blockHash2 = await Block7.sendBlock({
                to: account3,
                amount: "1000000000000000000000"
            });

            let blockHash3 = await Block7.sendBlock({
                to: account4,
                amount: "1000000000000000000000"
            });
            await getBlock7.getBlockState(blockHash1);
            await getBlock7.getBlockState(blockHash2);
            await getBlock7.getBlockState(blockHash3);
            let afterAmount1 = await getBlock7.getaccountBalance(account2);
            let afterAmount2 = await getBlock7.getaccountBalance(account3);
            let afterAmount3 = await getBlock7.getaccountBalance(account4);
            assert.equal('1000000000000000000000', (afterAmount1 - beforeAmount1))
            assert.equal('1000000000000000000000', (afterAmount2 - beforeAmount2))
            assert.equal('1000000000000000000000', (afterAmount3 - beforeAmount3))
        }).timeout(1000000);

        it("创建合约centralContract,并设置收益账号", async () => {
            let data = await encode7.encodeParams({
                from: account2,
                contractName: "CentralContract",
                functionName: "constructor",
            });
            let blockHash1 = await Block7.sendBlock(data);
            console.log(blockHash1);
            let blockReceiptawait1 = await getBlock7.getBlockState(blockHash1);
            centralContractContractAddress = blockReceiptawait1.block_state.stable_content.contract_account;
            console.log("中心合约地址：" + centralContractContractAddress);
            let sendParams = await encode7.encodeParams({
                from: account2,
                to: centralContractContractAddress,
                contractName: "CentralContract",
                functionName: "reviseCommissionAddress",
                args: [account5]
            });
            let blockHash2 = await Block7.sendBlock(sendParams);
            console.log(blockHash2);
            await getBlock7.getBlockState(blockHash2);
            console.log("收益账号：" + account5);
        }).timeout(1000000);

        it("创建合约machineContract", async () => {
            let sendParams = await encode7.encodeParams({
                from: account3,
                to: centralContractContractAddress,
                contractName: "CentralContract",
                functionName: "createMachine",
                amount: "500000000000000000",
                args: ["1080959682287648768", "1", "1", "1", "1", "1", "100000000000000000"]
            });
            let blockHash = await Block7.sendBlock(sendParams);
            console.log(blockHash);
            await getBlock7.getBlockState(blockHash);
            let callParams1 = await encode7.encodeParams({
                from: account3,
                to: centralContractContractAddress,
                contractName: "CentralContract",
                functionName: "getMachineContracts"
            });
            let machineContracts = await getBlock7.call(callParams1);
            // console.log(machineContracts);
            machineContractContractAddress1 = machineContracts;
            console.log("设备合约1的地址：" + machineContractContractAddress1);
            let callParams2 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress1,
                contractName: "MachineContract",
                functionName: "getBalance"
            });
            let machineContractBalance = await getBlock7.call(callParams2);
            let callParams3 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress1,
                contractName: "MachineContract",
                functionName: "getDisputedTime"
            });
            let disputedTime = await getBlock7.call(callParams3);
            let callParams4 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress1,
                contractName: "MachineContract",
                functionName: "getInit"
            });
            let init = await getBlock7.call(callParams4);
            let callParams5 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress1,
                contractName: "MachineContract",
                functionName: "getMachineParameters"
            });
            let machineParameters = await getBlock7.call(callParams5);
            let callParams6 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress1,
                contractName: "MachineContract",
                functionName: "getTaskContractAddress"
            });
            let taskContractAddress = await getBlock7.call(callParams6);
            assert.equal('500000000000000000', machineContractBalance)
            assert.equal('0', disputedTime)
            assert.equal(account3 + ',1080959682287648768', init.join())
            assert.equal('1,1,1,1,1,100000000000000000', machineParameters.join())
            assert.equal('czr_2wkBET2rRgE8pahuaczxKbmv7ciehqsne57F9gtzf1PVdr2VP3', taskContractAddress)
        }).timeout(1000000);

        it("创建合约taskContract", async () => {
            let sendParams = await encode7.encodeParams({
                from: account4,
                to: centralContractContractAddress,
                contractName: "CentralContract",
                functionName: "createTask",
                amount: "500000000000000000",
                args: ["f6360a4b20c799677d00db1d8e9450a60af71fa0", machineContractContractAddress1]
            });
            let blockHash = await Block7.sendBlock(sendParams);
            await getBlock7.getBlockState(blockHash);
            let callParams = await encode7.encodeParams({
                from: account4,
                to: centralContractContractAddress,
                contractName: "CentralContract",
                functionName: "getTaskContracts"
            });
            let taskContracts = await getBlock7.call(callParams);
            taskContractContractAddress1 = taskContracts;
            console.log("任务合约1的地址：" + taskContractContractAddress1);
            let callParams2 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress1,
                contractName: "TaskContract",
                functionName: "getBalance"
            });
            let taskContractBalance = await getBlock7.call(callParams2);
            let callParams3 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress1,
                contractName: "TaskContract",
                functionName: "getInit"
            });
            let init = await getBlock7.call(callParams3);
            let callParams4 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress1,
                contractName: "TaskContract",
                functionName: "getRegister"
            });
            let register = await getBlock7.call(callParams4);
            let callParams5 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress1,
                contractName: "TaskContract",
                functionName: "getResultInformation"
            });
            let resultInformation = await getBlock7.call(callParams5);
            let callParams6 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress1,
                contractName: "MachineContract",
                functionName: "getTaskContractAddress"
            });
            let taskContractAddress = await getBlock7.call(callParams6);
            assert.equal('500000000000000000', taskContractBalance)
            assert.equal(account4 + ',f6360a4b20c799677d00db1d8e9450a60af71fa0,false', init.join())
            assert.equal(account3 + ',' + machineContractContractAddress1 + ",100000000000000000", register.join())
            assert.equal(',0,0,0,0', resultInformation.join())
            assert.equal(taskContracts, taskContractAddress)
        }).timeout(1000000);

        it("执行合约setRunTimeAndResultFilesDigitalAbstract", async () => {
            let beforeAmount = await getBlock7.getaccountBalance(account4);
            let sendParams = await encode7.encodeParams({
                from: account2,
                to: centralContractContractAddress,
                contractName: "CentralContract",
                functionName: "setRunTimeAndResultFilesDigitalAbstract",
                args: ["f6360a4b20c799677d00db1d8e9450a60af71fa0", machineContractContractAddress1, taskContractContractAddress1, "60"]
            });
            let blockHash = await Block7.sendBlock(sendParams);
            console.log(blockHash)
            await getBlock7.getBlockState(blockHash);
            let callParams1 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress1,
                contractName: "TaskContract",
                functionName: "getBalance"
            });
            let taskContractBalance = await getBlock7.call(callParams1);
            let callParams2 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress1,
                contractName: "TaskContract",
                functionName: "getInit"
            });
            let init = await getBlock7.call(callParams2);
            let callParams3 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress1,
                contractName: "TaskContract",
                functionName: "getResultInformation"
            });
            let resultInformation = await getBlock7.call(callParams3);
            let callParams4 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress1,
                contractName: "MachineContract",
                functionName: "getTaskContractAddress"
            });
            let taskContractAddress = await getBlock7.call(callParams4);
            let afterAmount = await getBlock7.getaccountBalance(account4);
            // console.log(afterAmount,beforeAmount);
            assert.equal('200000000000000000', taskContractBalance)
            assert.equal(account4 + ',f6360a4b20c799677d00db1d8e9450a60af71fa0,true', init.join())
            assert.equal("f6360a4b20c799677d00db1d8e9450a60af71fa0,60," + resultInformation[2] + ",200000000000000000,300000000000000000", resultInformation.join())
            assert.equal("czr_2wkBET2rRgE8pahuaczxKbmv7ciehqsne57F9gtzf1PVdr2VP3", taskContractAddress)
            assert.equal("300000000000000000", BigNumber(afterAmount).minus(beforeAmount).toString())
        }).timeout(1000000);

        it("执行合约centralDeleteMachineContract", async () => {
            let beforeAmount1 = await getBlock7.getaccountBalance(account3);
            let beforeAmount2 = await getBlock7.getaccountBalance(account5);
            let callParams1 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress1,
                contractName: "MachineContract",
                functionName: "getDisputedTime"
            });
            let disputedTime = await getBlock7.call(callParams1);
            sleep.msleep(disputedTime * 1000)
            let sendParams = await encode7.encodeParams({
                from: account2,
                to: centralContractContractAddress,
                contractName: "CentralContract",
                functionName: "centralDeleteMachineContract",
                args: ["1080959682287648768", machineContractContractAddress1]
            });
            let blockHash = await Block7.sendBlock(sendParams);
            await getBlock7.getBlockState(blockHash);
            let callParams2 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress1,
                contractName: "MachineContract",
                functionName: "getBalance"
            });
            let machineContractBalance = await getBlock7.call(callParams2);
            disputedTime = await getBlock7.call(callParams1);
            let callParams3 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress1,
                contractName: "TaskContract",
                functionName: "getBalance"
            });
            let taskContractBalance = await getBlock7.call(callParams3);
            let afterAmount1 = await getBlock7.getaccountBalance(account3);
            let afterAmount2 = await getBlock7.getaccountBalance(account5);
            // console.log(beforeAmount,afterAmount);
            assert.equal('0', machineContractBalance)
            assert.equal('0', disputedTime)
            assert.equal("0", taskContractBalance)
            // assert.equal("700000000000000000", BigNumber(afterAmount).subtract(beforeAmount))
            assert.equal("680000000000000000", afterAmount1-beforeAmount1)
            assert.equal("20000000000000000", afterAmount2-beforeAmount2)
        }).timeout(1000000);

        it("创建合约machineContract", async () => {
            let sendParams = await encode7.encodeParams({
                from: account3,
                to: centralContractContractAddress,
                contractName: "CentralContract",
                functionName: "createMachine",
                amount: "500000000000000000",
                args: ["1080959682287648769", "1", "1", "1", "1", "1", "100000000000000000"]
            });
            let blockHash = await Block7.sendBlock(sendParams);
            console.log(blockHash);
            await getBlock7.getBlockState(blockHash);
            let callParams1 = await encode7.encodeParams({
                from: account3,
                to: centralContractContractAddress,
                contractName: "CentralContract",
                functionName: "getMachineContracts"
            });
            let machineContracts = await getBlock7.call(callParams1);
            // console.log(machineContracts);
            machineContractContractAddress2 = machineContracts.split(",")[1];
            console.log("设备合约2的地址：" + machineContractContractAddress2);
            let callParams2 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress2,
                contractName: "MachineContract",
                functionName: "getBalance"
            });
            let machineContractBalance = await getBlock7.call(callParams2);
            let callParams3 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress2,
                contractName: "MachineContract",
                functionName: "getDisputedTime"
            });
            let disputedTime = await getBlock7.call(callParams3);
            let callParams4 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress2,
                contractName: "MachineContract",
                functionName: "getInit"
            });
            let init = await getBlock7.call(callParams4);
            let callParams5 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress2,
                contractName: "MachineContract",
                functionName: "getMachineParameters"
            });
            let machineParameters = await getBlock7.call(callParams5);
            let callParams6 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress2,
                contractName: "MachineContract",
                functionName: "getTaskContractAddress"
            });
            let taskContractAddress = await getBlock7.call(callParams6);
            assert.equal('500000000000000000', machineContractBalance)
            assert.equal('0', disputedTime)
            assert.equal(account3 + ',1080959682287648769', init.join())
            assert.equal('1,1,1,1,1,100000000000000000', machineParameters.join())
            assert.equal('czr_2wkBET2rRgE8pahuaczxKbmv7ciehqsne57F9gtzf1PVdr2VP3', taskContractAddress)
        }).timeout(1000000);

        it("创建合约deleteMachineContract", async () => {
            let beforeAmount1 = await getBlock7.getaccountBalance(account3);
            let beforeAmount2 = await getBlock7.getaccountBalance(account5);
            let sendParams = await encode7.encodeParams({
                from: account3,
                to: centralContractContractAddress,
                contractName: "CentralContract",
                functionName: "deleteMachineContract",
                args: ["1080959682287648769", machineContractContractAddress2]
            });
            // console.log(sendParams);
            let blockHash = await Block7.sendBlock(sendParams);
            console.log(blockHash);
            let blockReceiptawait=await getBlock7.getBlockState(blockHash);
            let callParams2 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress2,
                contractName: "MachineContract",
                functionName: "getBalance"
            });
            let machineContractBalance = await getBlock7.call(callParams2);
            let afterAmount1 = await getBlock7.getaccountBalance(account3);
            let afterAmount2 = await getBlock7.getaccountBalance(account5);
            // console.log(blockReceiptawait.block_state.stable_content.gas_used);
            let gas=BigNumber(blockReceiptawait.block_state.stable_content.gas_used).mult(50000000000000).toString()
            // console.log(beforeAmount,afterAmount,gas);
            assert.equal('0', machineContractBalance)
            assert.equal(BigNumber(500000000000000000).minus(gas).toString(), BigNumber(afterAmount1).minus(beforeAmount1).toString())
            assert.equal("0", BigNumber(afterAmount2).minus(beforeAmount2).toString())
        }).timeout(1000000)

        it("创建合约machineContract", async () => {
            let sendParams = await encode7.encodeParams({
                from: account3,
                to: centralContractContractAddress,
                contractName: "CentralContract",
                functionName: "createMachine",
                amount: "500000000000000000",
                args: ["1080959682287648768", "1", "1", "1", "1", "1", "100000000000000000"]
            });
            let blockHash = await Block7.sendBlock(sendParams);
            console.log(blockHash);
            await getBlock7.getBlockState(blockHash);
            let callParams1 = await encode7.encodeParams({
                from: account3,
                to: centralContractContractAddress,
                contractName: "CentralContract",
                functionName: "getMachineContracts"
            });
            let machineContracts = await getBlock7.call(callParams1);
            machineContractContractAddress3 = machineContracts.split(",")[2];
            console.log("设备合约3的地址：" + machineContractContractAddress3);
            let callParams2 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress3,
                contractName: "MachineContract",
                functionName: "getBalance"
            });
            let machineContractBalance = await getBlock7.call(callParams2);
            let callParams3 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress3,
                contractName: "MachineContract",
                functionName: "getDisputedTime"
            });
            let disputedTime = await getBlock7.call(callParams3);
            let callParams4 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress3,
                contractName: "MachineContract",
                functionName: "getInit"
            });
            let init = await getBlock7.call(callParams4);
            let callParams5 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress3,
                contractName: "MachineContract",
                functionName: "getMachineParameters"
            });
            let machineParameters = await getBlock7.call(callParams5);
            let callParams6 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress3,
                contractName: "MachineContract",
                functionName: "getTaskContractAddress"
            });
            let taskContractAddress = await getBlock7.call(callParams6);
            assert.equal('500000000000000000', machineContractBalance)
            assert.equal('0', disputedTime)
            assert.equal(account3 + ',1080959682287648768', init.join())
            assert.equal('1,1,1,1,1,100000000000000000', machineParameters.join())
            assert.equal('czr_2wkBET2rRgE8pahuaczxKbmv7ciehqsne57F9gtzf1PVdr2VP3', taskContractAddress)
        }).timeout(1000000);

        it("创建合约taskContract", async () => {
            let sendParams = await encode7.encodeParams({
                from: account4,
                to: centralContractContractAddress,
                contractName: "CentralContract",
                functionName: "createTask",
                amount: "500000000000000000",
                args: ["f6360a4b20c799677d00db1d8e9450a60af71fa0", machineContractContractAddress3]
            });
            let blockHash = await Block7.sendBlock(sendParams);
            await getBlock7.getBlockState(blockHash);
            let callParams = await encode7.encodeParams({
                from: account4,
                to: centralContractContractAddress,
                contractName: "CentralContract",
                functionName: "getTaskContracts"
            });
            let taskContracts = await getBlock7.call(callParams);
            taskContractContractAddress2 = taskContracts.split(",")[1];
            console.log("任务合约2的地址：" + taskContractContractAddress2);
            let callParams2 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress2,
                contractName: "TaskContract",
                functionName: "getBalance"
            });
            let taskContractBalance = await getBlock7.call(callParams2);
            let callParams3 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress2,
                contractName: "TaskContract",
                functionName: "getInit"
            });
            let init = await getBlock7.call(callParams3);
            let callParams4 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress2,
                contractName: "TaskContract",
                functionName: "getRegister"
            });
            let register = await getBlock7.call(callParams4);
            let callParams5 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress2,
                contractName: "TaskContract",
                functionName: "getResultInformation"
            });
            let resultInformation = await getBlock7.call(callParams5);
            let callParams6 = await encode7.encodeParams({
                from: account3,
                to: taskContractContractAddress2,
                contractName: "MachineContract",
                functionName: "getTaskContractAddress"
            });
            let taskContractAddress = await getBlock7.call(callParams6);
            assert.equal('500000000000000000', taskContractBalance)
            assert.equal(account4 + ',f6360a4b20c799677d00db1d8e9450a60af71fa0,false', init.join())
            assert.equal(account3 + ',' + machineContractContractAddress3 + ",100000000000000000", register.join())
            assert.equal(',0,0,0,0', resultInformation.join())
            assert.equal("czr_2wkBET2rRgE8pahuaczxKbmv7ciehqsne57F9gtzf1PVdr2VP3", taskContractAddress)
        }).timeout(1000000);

        it("执行合约centralDeleteMachineContract,带时间的", async () => {
            let beforeAmount1 = await getBlock7.getaccountBalance(account3);
            let beforeAmount2 = await getBlock7.getaccountBalance(account4);
            let beforeAmount3 = await getBlock7.getaccountBalance(account5);
            let callParams1 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress3,
                contractName: "MachineContract",
                functionName: "getDisputedTime"
            });
            let disputedTime = await getBlock7.call(callParams1);
            // sleep.msleep(disputedTime * 1000)
            let sendParams = await encode7.encodeParams({
                from: account2,
                to: centralContractContractAddress,
                contractName: "CentralContract",
                functionName: "centralDeleteMachineContract",
                args: ["1080959682287648768", machineContractContractAddress3,"60"]
            });
            let blockHash = await Block7.sendBlock(sendParams);
            await getBlock7.getBlockState(blockHash);
            console.log(blockHash);
            let callParams2 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress1,
                contractName: "MachineContract",
                functionName: "getBalance"
            });
            let machineContractBalance = await getBlock7.call(callParams2);
            // console.log(machineContractBalance);
            disputedTime = await getBlock7.call(callParams1);
            let callParams3 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress2,
                contractName: "TaskContract",
                functionName: "getBalance"
            });
            let taskContractBalance = await getBlock7.call(callParams3);
            let callParams4= await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress2,
                contractName: "TaskContract",
                functionName: "getInit"
            });
            let init = await getBlock7.call(callParams4);
            let callParams5 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress2,
                contractName: "TaskContract",
                functionName: "getResultInformation"
            });
            let resultInformation = await getBlock7.call(callParams5);
            let callParams6 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress1,
                contractName: "MachineContract",
                functionName: "getTaskContractAddress"
            });
            let taskContractAddress = await getBlock7.call(callParams6);
            let afterAmount1 = await getBlock7.getaccountBalance(account3);
            let afterAmount2 = await getBlock7.getaccountBalance(account4);
            let afterAmount3 = await getBlock7.getaccountBalance(account5);
            // console.log(beforeAmount,afterAmount);
            assert.equal('0', machineContractBalance)
            assert.equal('0', disputedTime)
            assert.equal("0", taskContractBalance)
            assert.equal("680000000000000000", BigNumber(afterAmount1).subtract(beforeAmount1).toString())
            assert.equal(account4 + ',f6360a4b20c799677d00db1d8e9450a60af71fa0,true', init.join())
            assert.equal("Machine hosting time has arrived!,60," + resultInformation[2] + ",200000000000000000,300000000000000000", resultInformation.join())
            assert.equal("czr_2wkBET2rRgE8pahuaczxKbmv7ciehqsne57F9gtzf1PVdr2VP3", taskContractAddress)
            assert.equal("300000000000000000", BigNumber(afterAmount2).minus(beforeAmount2).toString())
            assert.equal("20000000000000000", BigNumber(afterAmount3).minus(beforeAmount3).toString())
            // assert.equal("680000000000000000", afterAmount-beforeAmount)
        }).timeout(1000000);

        it("创建合约machineContract", async () => {
            let sendParams = await encode7.encodeParams({
                from: account3,
                to: centralContractContractAddress,
                contractName: "CentralContract",
                functionName: "createMachine",
                amount: "500000000000000000",
                args: ["1080959682287648768", "1", "1", "1", "1", "1", "100000000000000000"]
            });
            let blockHash = await Block7.sendBlock(sendParams);
            console.log(blockHash);
            await getBlock7.getBlockState(blockHash);
            let callParams1 = await encode7.encodeParams({
                from: account3,
                to: centralContractContractAddress,
                contractName: "CentralContract",
                functionName: "getMachineContracts"
            });
            let machineContracts = await getBlock7.call(callParams1);
            machineContractContractAddress4 = machineContracts.split(",")[3];
            console.log("设备合约4的地址：" + machineContractContractAddress4);
            let callParams2 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress4,
                contractName: "MachineContract",
                functionName: "getBalance"
            });
            let machineContractBalance = await getBlock7.call(callParams2);
            let callParams3 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress4,
                contractName: "MachineContract",
                functionName: "getDisputedTime"
            });
            let disputedTime = await getBlock7.call(callParams3);
            let callParams4 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress4,
                contractName: "MachineContract",
                functionName: "getInit"
            });
            let init = await getBlock7.call(callParams4);
            let callParams5 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress4,
                contractName: "MachineContract",
                functionName: "getMachineParameters"
            });
            let machineParameters = await getBlock7.call(callParams5);
            let callParams6 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress4,
                contractName: "MachineContract",
                functionName: "getTaskContractAddress"
            });
            let taskContractAddress = await getBlock7.call(callParams6);
            assert.equal('500000000000000000', machineContractBalance)
            assert.equal('0', disputedTime)
            assert.equal(account3 + ',1080959682287648768', init.join())
            assert.equal('1,1,1,1,1,100000000000000000', machineParameters.join())
            assert.equal('czr_2wkBET2rRgE8pahuaczxKbmv7ciehqsne57F9gtzf1PVdr2VP3', taskContractAddress)
        }).timeout(1000000);

        it("创建合约taskContract", async () => {
            let sendParams = await encode7.encodeParams({
                from: account4,
                to: centralContractContractAddress,
                contractName: "CentralContract",
                functionName: "createTask",
                amount: "500000000000000000",
                args: ["", machineContractContractAddress4]
            });
            let blockHash = await Block7.sendBlock(sendParams);
            await getBlock7.getBlockState(blockHash);
            let callParams = await encode7.encodeParams({
                from: account4,
                to: centralContractContractAddress,
                contractName: "CentralContract",
                functionName: "getTaskContracts"
            });
            let taskContracts = await getBlock7.call(callParams);
            taskContractContractAddress3 = taskContracts.split(",")[2];
            console.log("任务合约3的地址：" + taskContractContractAddress3);
            let callParams2 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress3,
                contractName: "TaskContract",
                functionName: "getBalance"
            });
            let taskContractBalance = await getBlock7.call(callParams2);
            let callParams3 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress3,
                contractName: "TaskContract",
                functionName: "getInit"
            });
            let init = await getBlock7.call(callParams3);
            let callParams4 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress3,
                contractName: "TaskContract",
                functionName: "getRegister"
            });
            let register = await getBlock7.call(callParams4);
            let callParams5 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress3,
                contractName: "TaskContract",
                functionName: "getResultInformation"
            });
            let resultInformation = await getBlock7.call(callParams5);
            assert.equal('500000000000000000', taskContractBalance)
            assert.equal(account4 + ',no-autoPY,false', init.join())
            assert.equal(account3 + ',' + machineContractContractAddress4 + ",100000000000000000", register.join())
            assert.equal(',0,0,0,0', resultInformation.join())
        }).timeout(1000000);

        it("执行合约setRunTimeAndResultFilesDigitalAbstract,no-autoPY", async () => {
            let beforeAmount = await getBlock7.getaccountBalance(account4);
            let sendParams = await encode7.encodeParams({
                from: account2,
                to: centralContractContractAddress,
                contractName: "CentralContract",
                functionName: "setRunTimeAndResultFilesDigitalAbstract",
                args: ["no-autopy", machineContractContractAddress4, taskContractContractAddress3, "60"]
            });
            let blockHash = await Block7.sendBlock(sendParams);
            await getBlock7.getBlockState(blockHash);
            let callParams1 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress3,
                contractName: "TaskContract",
                functionName: "getBalance"
            });
            let taskContractBalance = await getBlock7.call(callParams1);
            let callParams2 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress3,
                contractName: "TaskContract",
                functionName: "getInit"
            });
            let init = await getBlock7.call(callParams2);
            let callParams3 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress3,
                contractName: "TaskContract",
                functionName: "getResultInformation"
            });
            let resultInformation = await getBlock7.call(callParams3);
            let callParams4 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress4,
                contractName: "MachineContract",
                functionName: "getTaskContractAddress"
            });
            let taskContractAddress = await getBlock7.call(callParams4);
            let afterAmount = await getBlock7.getaccountBalance(account4);
            // console.log(afterAmount,beforeAmount);
            assert.equal('200000000000000000', taskContractBalance)
            assert.equal(account4 + ',no-autoPY,true', init.join())
            assert.equal("no-autopy,60," + resultInformation[2] + ",200000000000000000,300000000000000000", resultInformation.join())
            assert.equal("czr_2wkBET2rRgE8pahuaczxKbmv7ciehqsne57F9gtzf1PVdr2VP3", taskContractAddress)
            assert.equal("300000000000000000", BigNumber(afterAmount).minus(beforeAmount).toString())
        }).timeout(1000000);

        it("创建合约taskContract", async () => {
            let sendParams = await encode7.encodeParams({
                from: account4,
                to: centralContractContractAddress,
                contractName: "CentralContract",
                functionName: "createTask",
                amount: "500000000000000000",
                args: ["f6360a4b20c799677d00db1d8e9450a60af71fa0", machineContractContractAddress4]
            });
            let blockHash = await Block7.sendBlock(sendParams);
            await getBlock7.getBlockState(blockHash);
            let callParams = await encode7.encodeParams({
                from: account4,
                to: centralContractContractAddress,
                contractName: "CentralContract",
                functionName: "getTaskContracts"
            });
            let taskContracts = await getBlock7.call(callParams);
            taskContractContractAddress4 = taskContracts.split(",")[3];
            console.log("任务合约4的地址：" + taskContractContractAddress4);
            let callParams2 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress4,
                contractName: "TaskContract",
                functionName: "getBalance"
            });
            let taskContractBalance = await getBlock7.call(callParams2);
            let callParams3 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress4,
                contractName: "TaskContract",
                functionName: "getInit"
            });
            let init = await getBlock7.call(callParams3);
            let callParams4 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress4,
                contractName: "TaskContract",
                functionName: "getRegister"
            });
            let register = await getBlock7.call(callParams4);
            let callParams5 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress4,
                contractName: "TaskContract",
                functionName: "getResultInformation"
            });
            let resultInformation = await getBlock7.call(callParams5);
            assert.equal('500000000000000000', taskContractBalance)
            assert.equal(account4 + ',f6360a4b20c799677d00db1d8e9450a60af71fa0,false', init.join())
            assert.equal(account3 + ',' + machineContractContractAddress4 + ",100000000000000000", register.join())
            assert.equal(',0,0,0,0', resultInformation.join())
        }).timeout(1000000);

        it("执行合约setRunTimeAndResultFilesDigitalAbstract", async () => {
            let beforeAmount = await getBlock7.getaccountBalance(account4);
            let sendParams = await encode7.encodeParams({
                from: account2,
                to: centralContractContractAddress,
                contractName: "CentralContract",
                functionName: "setRunTimeAndResultFilesDigitalAbstract",
                args: ["f6360a4b20c799677d00db1d8e9450a60af71fa0", machineContractContractAddress4, taskContractContractAddress4, "60"]
            });
            let blockHash = await Block7.sendBlock(sendParams);
            await getBlock7.getBlockState(blockHash);
            let callParams1 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress4,
                contractName: "TaskContract",
                functionName: "getBalance"
            });
            let taskContractBalance = await getBlock7.call(callParams1);
            let callParams2 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress4,
                contractName: "TaskContract",
                functionName: "getInit"
            });
            let init = await getBlock7.call(callParams2);
            let callParams3 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress4,
                contractName: "TaskContract",
                functionName: "getResultInformation"
            });
            let resultInformation = await getBlock7.call(callParams3);
            let callParams4 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress4,
                contractName: "MachineContract",
                functionName: "getTaskContractAddress"
            });
            let taskContractAddress = await getBlock7.call(callParams4);
            let afterAmount = await getBlock7.getaccountBalance(account4);
            // console.log(afterAmount,beforeAmount);
            assert.equal('200000000000000000', taskContractBalance)
            assert.equal(account4 + ',f6360a4b20c799677d00db1d8e9450a60af71fa0,true', init.join())
            assert.equal("f6360a4b20c799677d00db1d8e9450a60af71fa0,60," + resultInformation[2] + ",200000000000000000,300000000000000000", resultInformation.join())
            assert.equal("czr_2wkBET2rRgE8pahuaczxKbmv7ciehqsne57F9gtzf1PVdr2VP3", taskContractAddress)
            assert.equal("300000000000000000", BigNumber(afterAmount).minus(beforeAmount).toString())
        }).timeout(1000000);

        it("创建合约taskContract", async () => {
            let sendParams = await encode7.encodeParams({
                from: account4,
                to: centralContractContractAddress,
                contractName: "CentralContract",
                functionName: "createTask",
                amount: "500000000000000000",
                args: ["", machineContractContractAddress4]
            });
            let blockHash = await Block7.sendBlock(sendParams);
            await getBlock7.getBlockState(blockHash);
            let callParams = await encode7.encodeParams({
                from: account4,
                to: centralContractContractAddress,
                contractName: "CentralContract",
                functionName: "getTaskContracts"
            });
            let taskContracts = await getBlock7.call(callParams);
            taskContractContractAddress5 = taskContracts.split(",")[4];
            console.log("任务合约5的地址：" + taskContractContractAddress5);
            let callParams2 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress5,
                contractName: "TaskContract",
                functionName: "getBalance"
            });
            let taskContractBalance = await getBlock7.call(callParams2);
            let callParams3 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress5,
                contractName: "TaskContract",
                functionName: "getInit"
            });
            let init = await getBlock7.call(callParams3);
            let callParams4 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress5,
                contractName: "TaskContract",
                functionName: "getRegister"
            });
            let register = await getBlock7.call(callParams4);
            let callParams5 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress5,
                contractName: "TaskContract",
                functionName: "getResultInformation"
            });
            let resultInformation = await getBlock7.call(callParams5);
            assert.equal('500000000000000000', taskContractBalance)
            assert.equal(account4 + ',no-autoPY,false', init.join())
            assert.equal(account3 + ',' + machineContractContractAddress4 + ",100000000000000000", register.join())
            assert.equal(',0,0,0,0', resultInformation.join())
        }).timeout(1000000);

        it("执行合约setRunTimeAndResultFilesDigitalAbstract,no-autoPY", async () => {
            let beforeAmount = await getBlock7.getaccountBalance(account4);
            let sendParams = await encode7.encodeParams({
                from: account2,
                to: centralContractContractAddress,
                contractName: "CentralContract",
                functionName: "setRunTimeAndResultFilesDigitalAbstract",
                args: ["no-autopy", machineContractContractAddress4, taskContractContractAddress5, "60"]
            });
            let blockHash = await Block7.sendBlock(sendParams);
            await getBlock7.getBlockState(blockHash);
            let callParams1 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress5,
                contractName: "TaskContract",
                functionName: "getBalance"
            });
            let taskContractBalance = await getBlock7.call(callParams1);
            let callParams2 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress5,
                contractName: "TaskContract",
                functionName: "getInit"
            });
            let init = await getBlock7.call(callParams2);
            let callParams3 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress5,
                contractName: "TaskContract",
                functionName: "getResultInformation"
            });
            let resultInformation = await getBlock7.call(callParams3);
            let callParams4 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress4,
                contractName: "MachineContract",
                functionName: "getTaskContractAddress"
            });
            let taskContractAddress = await getBlock7.call(callParams4);
            let afterAmount = await getBlock7.getaccountBalance(account4);
            // console.log(afterAmount,beforeAmount);
            assert.equal('200000000000000000', taskContractBalance)
            assert.equal(account4 + ',no-autoPY,true', init.join())
            assert.equal("no-autopy,60," + resultInformation[2] + ",200000000000000000,300000000000000000", resultInformation.join())
            assert.equal("czr_2wkBET2rRgE8pahuaczxKbmv7ciehqsne57F9gtzf1PVdr2VP3", taskContractAddress)
            assert.equal("300000000000000000", BigNumber(afterAmount).minus(beforeAmount).toString())
        }).timeout(1000000);

        it("创建合约taskContract", async () => {
            let sendParams = await encode7.encodeParams({
                from: account4,
                to: centralContractContractAddress,
                contractName: "CentralContract",
                functionName: "createTask",
                amount: "500000000000000000",
                args: ["f6360a4b20c799677d00db1d8e9450a60af71fa0", machineContractContractAddress4]
            });
            let blockHash = await Block7.sendBlock(sendParams);
            await getBlock7.getBlockState(blockHash);
            let callParams = await encode7.encodeParams({
                from: account4,
                to: centralContractContractAddress,
                contractName: "CentralContract",
                functionName: "getTaskContracts"
            });
            let taskContracts = await getBlock7.call(callParams);
            taskContractContractAddress6 = taskContracts.split(",")[5];
            console.log("任务合约6的地址：" + taskContractContractAddress6);
            let callParams2 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress6,
                contractName: "TaskContract",
                functionName: "getBalance"
            });
            let taskContractBalance = await getBlock7.call(callParams2);
            let callParams3 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress6,
                contractName: "TaskContract",
                functionName: "getInit"
            });
            let init = await getBlock7.call(callParams3);
            let callParams4 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress6,
                contractName: "TaskContract",
                functionName: "getRegister"
            });
            let register = await getBlock7.call(callParams4);
            let callParams5 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress6,
                contractName: "TaskContract",
                functionName: "getResultInformation"
            });
            let resultInformation = await getBlock7.call(callParams5);
            assert.equal('500000000000000000', taskContractBalance)
            assert.equal(account4 + ',f6360a4b20c799677d00db1d8e9450a60af71fa0,false', init.join())
            assert.equal(account3 + ',' + machineContractContractAddress4 + ",100000000000000000", register.join())
            assert.equal(',0,0,0,0', resultInformation.join())
        }).timeout(1000000);

        it("执行合约TaskEnd", async () => {
            let beforeAmount = await getBlock7.getaccountBalance(account4);
            let sendParams = await encode7.encodeParams({
                from: account2,
                to: centralContractContractAddress,
                contractName: "CentralContract",
                functionName: "taskEnd",
                args: [taskContractContractAddress6, machineContractContractAddress4, "5"]
            });
            let blockHash = await Block7.sendBlock(sendParams);
            await getBlock7.getBlockState(blockHash);
            let callParams1 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress6,
                contractName: "TaskContract",
                functionName: "getBalance"
            });
            let taskContractBalance = await getBlock7.call(callParams1);
            let callParams2 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress6,
                contractName: "TaskContract",
                functionName: "getInit"
            });
            let init = await getBlock7.call(callParams2);
            let callParams3 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress6,
                contractName: "TaskContract",
                functionName: "getResultInformation"
            });
            let resultInformation = await getBlock7.call(callParams3);
            let callParams4 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress4,
                contractName: "MachineContract",
                functionName: "getTaskContractAddress"
            });
            let taskContractAddress = await getBlock7.call(callParams4);
            let afterAmount = await getBlock7.getaccountBalance(account4);
            // console.log(afterAmount,beforeAmount);
            assert.equal('250000000000000000', taskContractBalance)
            assert.equal(account4 + ',f6360a4b20c799677d00db1d8e9450a60af71fa0,true', init.join())
            assert.equal("Task terminated, no digit summary!,1," + resultInformation[2] + ",250000000000000000,250000000000000000", resultInformation.join())
            assert.equal("czr_2wkBET2rRgE8pahuaczxKbmv7ciehqsne57F9gtzf1PVdr2VP3", taskContractAddress)
            assert.equal("250000000000000000", BigNumber(afterAmount).minus(beforeAmount).toString())
        }).timeout(1000000);

        it("执行合约centralDeleteMachineContract", async () => {
            let beforeAmount = await getBlock7.getaccountBalance(account3);
            let beforeAmount2 = await getBlock7.getaccountBalance(account5);
            //console.log("c1Start",Date.now());
            let callParams1 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress4,
                contractName: "MachineContract",
                functionName: "getDisputedTime"
            });
            let disputedTime = await getBlock7.call(callParams1);
            //console.log("c1Stop",Date.now());
            sleep.msleep(disputedTime * 1000);
            //console.log("s1Start",Date.now());
            let sendParams = await encode7.encodeParams({
                from: account2,
                to: centralContractContractAddress,
                contractName: "CentralContract",
                functionName: "centralDeleteMachineContract",
                args: ["1080959682287648768", machineContractContractAddress4]
            });
            let blockHash = await Block7.sendBlock(sendParams);
            await getBlock7.getBlockState(blockHash);
            // console.log("s1Stop",Date.now());
            // console.log(blockHash);
            // console.log("c2Start",Date.now());
            let callParams2 = await encode7.encodeParams({
                from: account3,
                to: machineContractContractAddress4,
                contractName: "MachineContract",
                functionName: "getBalance"
            });
            let machineContractBalance = await getBlock7.call(callParams2);
            //console.log("c2Stop",Date.now());
            disputedTime = await getBlock7.call(callParams1);
            //console.log("c3Start",Date.now());
            let callParams3 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress3,
                contractName: "TaskContract",
                functionName: "getBalance"
            });
            let taskContractBalance1 = await getBlock7.call(callParams3);
            //console.log("c3Stop",Date.now());
            //console.log("c4Start",Date.now());
            let callParams4 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress4,
                contractName: "TaskContract",
                functionName: "getBalance"
            });
            let taskContractBalance2 = await getBlock7.call(callParams4);
            //console.log("c4Stop",Date.now());
            //console.log("c5Start",Date.now());
            let callParams5 = await encode7.encodeParams({
                from: account4,
                to: taskContractContractAddress5,
                contractName: "TaskContract",
                functionName: "getBalance"
            });
            let taskContractBalance3 = await getBlock7.call(callParams5);
            //console.log("c5Stop",Date.now());
            let afterAmount = await getBlock7.getaccountBalance(account3);
            let afterAmount2 = await getBlock7.getaccountBalance(account5);
            // console.log(beforeAmount,afterAmount);
            assert.equal('0', machineContractBalance);
            assert.equal('0', disputedTime);
            assert.equal("0", taskContractBalance1);
            assert.equal("0", taskContractBalance2);
            assert.equal("0", taskContractBalance3);
            // assert.equal("700000000000000000", BigNumber(afterAmount).subtract(beforeAmount))
            assert.equal("1265000000000000000", BigNumber(afterAmount).subtract(beforeAmount).toString())
            assert.equal("85000000000000000", BigNumber(afterAmount2).subtract(beforeAmount2).toString())
        }).timeout(1000000);

    });

});
