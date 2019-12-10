const assert = require('assert');
const getBlock = require('../../all_test/utils/getBlock1');
const Block = require('../../all_test/utils/send1');
const BigNumber = require('big-number');
const encode = require('../../all_test/utils/encode1')
const sleep = require('sleep')


// let account1 = "czr_33EuccjKjcZgwbHYp8eLhoFiaKGARVigZojeHzySD9fQ1ysd7u"
let account1 = "czr_35vDkfSth7N1WFjh9MT7NZekYGdu6ihLSMmmGjCwBPSHTm5QWi"
let account2 = "";
let contractAddress = "";

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