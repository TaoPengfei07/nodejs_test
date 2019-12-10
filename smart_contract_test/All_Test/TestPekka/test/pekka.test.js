const assert = require('assert');
const getBlock = require('../../all_test/utils/getBlock7');
const Block = require('../../all_test/utils/send7');
const BigNumber = require('big-number');
const encode = require('../../all_test/utils/encode7')
const sleep = require('sleep')
const compile = require('../../all_test/compile7')
const bs58check = require("bs58check");

//let account1 = "czr_33EuccjKjcZgwbHYp8eLhoFiaKGARVigZojeHzySD9fQ1ysd7u"
let account1 = "czr_35vDkfSth7N1WFjh9MT7NZekYGdu6ihLSMmmGjCwBPSHTm5QWi"
let account2 = "";
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
		console.log("c1Start",Date.now())
        let callParams1 = await encode7.encodeParams({
            from: account3,
            to: machineContractContractAddress4,
            contractName: "MachineContract",
            functionName: "getDisputedTime"
        });
        let disputedTime = await getBlock7.call(callParams1);
		console.log("c1Stop",Date.now())
        sleep.msleep(disputedTime * 1000)
		console.log("s1Start",Date.now())
        let sendParams = await encode7.encodeParams({
            from: account2,
            to: centralContractContractAddress,
            contractName: "CentralContract",
            functionName: "centralDeleteMachineContract",
            args: ["1080959682287648768", machineContractContractAddress4]
        });
        let blockHash = await Block7.sendBlock(sendParams);
        await getBlock7.getBlockState(blockHash);
		console.log("s1Stop",Date.now())
        console.log(blockHash);
		console.log("c2Start",Date.now())
        let callParams2 = await encode7.encodeParams({
            from: account3,
            to: machineContractContractAddress4,
            contractName: "MachineContract",
            functionName: "getBalance"
        });
        let machineContractBalance = await getBlock7.call(callParams2);
		console.log("c2Stop",Date.now())
        disputedTime = await getBlock7.call(callParams1);
		console.log("c3Start",Date.now())
        let callParams3 = await encode7.encodeParams({
            from: account4,
            to: taskContractContractAddress3,
            contractName: "TaskContract",
            functionName: "getBalance"
        });
        let taskContractBalance1 = await getBlock7.call(callParams3);
		console.log("c3Stop",Date.now())
		console.log("c4Start",Date.now())
        let callParams4 = await encode7.encodeParams({
            from: account4,
            to: taskContractContractAddress4,
            contractName: "TaskContract",
            functionName: "getBalance"
        });
        let taskContractBalance2 = await getBlock7.call(callParams4);
		console.log("c4Stop",Date.now())
		console.log("c5Start",Date.now())
        let callParams5 = await encode7.encodeParams({
            from: account4,
            to: taskContractContractAddress5,
            contractName: "TaskContract",
            functionName: "getBalance"
        });
        let taskContractBalance3 = await getBlock7.call(callParams5);
		console.log("c5Stop",Date.now())
        let afterAmount = await getBlock7.getaccountBalance(account3);
        let afterAmount2 = await getBlock7.getaccountBalance(account5);
        // console.log(beforeAmount,afterAmount);
        assert.equal('0', machineContractBalance)
        assert.equal('0', disputedTime)
        assert.equal("0", taskContractBalance1)
        assert.equal("0", taskContractBalance2)
        assert.equal("0", taskContractBalance3)
        // assert.equal("700000000000000000", BigNumber(afterAmount).subtract(beforeAmount))
        assert.equal("1265000000000000000", BigNumber(afterAmount).subtract(beforeAmount).toString())
        assert.equal("85000000000000000", BigNumber(afterAmount2).subtract(beforeAmount2).toString())
    }).timeout(1000000);

})