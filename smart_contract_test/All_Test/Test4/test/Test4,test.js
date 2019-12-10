const assert = require('assert');
const getBlock = require('../../all_test/utils/getBlock4');
const Block = require('../../all_test/utils/send4');
const BigNumber = require('big-number');
const encode = require('../../all_test/utils/encode4')
const sleep = require('sleep')
const compile4 = require('../../all_test/compile4')
const bs58check = require("bs58check");

// let account1 = "czr_33EuccjKjcZgwbHYp8eLhoFiaKGARVigZojeHzySD9fQ1ysd7u"
let account1 = "czr_35vDkfSth7N1WFjh9MT7NZekYGdu6ihLSMmmGjCwBPSHTm5QWi"
let account2 = "";
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
})