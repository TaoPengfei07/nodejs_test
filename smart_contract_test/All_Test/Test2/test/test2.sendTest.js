const assert = require('assert');
const getBlock = require('../../all_test/utils/getBlock2');
const Block = require('../../all_test/utils/send2');
const BigNumber = require('big-number');
const encode = require('../../all_test/utils/encode2');
const sleep = require('sleep')

// let account1 = "czr_33EuccjKjcZgwbHYp8eLhoFiaKGARVigZojeHzySD9fQ1ysd7u"
let account1 = "czr_35vDkfSth7N1WFjh9MT7NZekYGdu6ihLSMmmGjCwBPSHTm5QWi"
let account2 = "";
let contractAddress = "";

describe("测试合约test2", () => {
    it("创建账号account2，并转入5个CZR", async () => {
        account2 = await Block2.creatAccount();
        console.log("account2:" + account2)
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
})