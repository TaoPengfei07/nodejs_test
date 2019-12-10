const assert = require('assert');
const getBlock = require('../../all_test/utils/getBlock3');
const Block = require('../../all_test/utils/send3');
const BigNumber = require('big-number');
const encode = require('../../all_test/utils/encode3')
const sleep = require('sleep')
const compile3 = require('../../all_test/compile3')

// let account1 = "czr_33EuccjKjcZgwbHYp8eLhoFiaKGARVigZojeHzySD9fQ1ysd7u"
let account1 = "czr_35vDkfSth7N1WFjh9MT7NZekYGdu6ihLSMmmGjCwBPSHTm5QWi"
let account2 = "";
let contractAddress="";

describe("测试合约test3",async ()=>{

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

    it("测试合约if和else",async ()=>{
        let sendParams1 = await encode3.encodeParams({
            from: account2,
            to: contractAddress,
            contractName: "Test3",
            functionName: "testIfElse",
            args:["1"]
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
            args:["2"]
        });
        let blockHash2 = await Block3.sendBlock(sendParams2);
        await getBlock3.getBlockState(blockHash2);
        let a2 = await getBlock3.call(callParams);
        assert.equal("1",a1)
        assert.equal("0",a2)
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