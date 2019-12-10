const assert = require('assert');
const getBlock5 = require('../../all_test/utils/getBlock5');
const Block5 = require('../../all_test/utils/send5');
const BigNumber = require('big-number');
const encode5 = require('../../all_test/utils/encode5');
const sleep = require('sleep')

// let account1 = "czr_33EuccjKjcZgwbHYp8eLhoFiaKGARVigZojeHzySD9fQ1ysd7u"
let account1 = "czr_35vDkfSth7N1WFjh9MT7NZekYGdu6ihLSMmmGjCwBPSHTm5QWi"
let account2 = "";
let contractAddress = "";

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
        let blockHash = await Block5.sendBlock(sendParams);
        await getBlock5.getBlockState(blockHash);
        let gasPrice = await getBlock5.getBlock(blockHash)
        let usedGas = await getBlock5.getBlockState(blockHash)
        let gas = usedGas.block_state.stable_content.gas_used * gasPrice.Block5.content.gas_price
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
})