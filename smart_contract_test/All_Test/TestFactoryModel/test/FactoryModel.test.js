const assert = require('assert');
const getBlock = require('../../all_test/utils/getBlock6');
const Block = require('../../all_test/utils/send6');
const BigNumber = require('big-number');
const encode = require('../../all_test/utils/encode6');
const sleep = require('sleep')

// let account1 = "czr_33EuccjKjcZgwbHYp8eLhoFiaKGARVigZojeHzySD9fQ1ysd7u"
let account1 = "czr_35vDkfSth7N1WFjh9MT7NZekYGdu6ihLSMmmGjCwBPSHTm5QWi"
let account2 = "";
let AContractAddress = "";
let BContractAddress = "";
let CContractAddress = "";

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
})