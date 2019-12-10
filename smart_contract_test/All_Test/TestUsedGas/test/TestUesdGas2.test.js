const assert = require('assert');
const getBlock = require('../utils/getBlock');
const Block = require('../utils/send');
const BigNumber = require('big-number');
const sleep = require('sleep')
const bs58check = require("bs58check");

let account1 = "czr_33EuccjKjcZgwbHYp8eLhoFiaKGARVigZojeHzySD9fQ1ysd7u"
let account2 = "";
let AContractAddress = "";

describe("测试合约testUesdGas2", async () => {

    it("创建账号account2，并转入5个CZR", async () => {
        account2 = await Block.creatAccount();
        console.log("account2:" + account2)
        let beforeAmount = await getBlock.getaccountBalance(account2);
        let blockHash = await Block.sendBlock({
            to: account2,
            amount: "5000000000000000000"
        });
        console.log(blockHash);
        let blockReceiptawait=await getBlock.getBlockState(blockHash);
        let afterAmount = await getBlock.getaccountBalance(account2);
        assert.equal('5000000000000000000', (afterAmount - beforeAmount))
        assert.equal('21000', blockReceiptawait.block_state.stable_content.gas_used)
    }).timeout(1000000);

    it("创建合约A", async () => {
        let blockHash = await Block.sendBlock({
            from: account2,
            data:"608060405234801561001057600080fd5b50610565806100206000396000f3fe608060405234801561001057600080fd5b50600436106100bb576000357c0100000000000000000000000000000000000000000000000000000000900480638a054ac2116100835780638a054ac21461016a57806390427fe01461018c578063a5936e0114610247578063c3da42b814610251578063d1f4ba82146102d4576100bb565b80630dbe671f146100c0578063251f7a63146100de5780633696586c146100e8578063498e6857146101165780634df7e3d014610120575b600080fd5b6100c86102de565b6040518082815260200191505060405180910390f35b6100e66102e4565b005b610114600480360360208110156100fe57600080fd5b81019080803590602001909291905050506102f6565b005b61011e610300565b005b610128610312565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610172610338565b604051808215151515815260200191505060405180910390f35b610245600480360360208110156101a257600080fd5b81019080803590602001906401000000008111156101bf57600080fd5b8201836020820111156101d157600080fd5b803590602001918460018302840111640100000000831117156101f357600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929050505061034b565b005b61024f610365565b005b6102596103b3565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561029957808201518184015260208101905061027e565b50505050905090810190601f1680156102c65780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102dc610451565b005b60005481565b60016000808282540392505081905550565b8060008190555050565b60016000808282540192505081905550565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600360009054906101000a900460ff1681565b8060029080519060200190610361929190610494565b5050565b6040805190810160405280600381526020017f3132330000000000000000000000000000000000000000000000000000000000815250600290805190602001906103b0929190610494565b50565b60028054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104495780601f1061041e57610100808354040283529160200191610449565b820191906000526020600020905b81548152906001019060200180831161042c57829003601f168201915b505050505081565b30600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106104d557805160ff1916838001178555610503565b82800160010185558215610503579182015b828111156105025782518255916020019190600101906104e7565b5b5090506105109190610514565b5090565b61053691905b8082111561053257600081600090555060010161051a565b5090565b9056fea165627a7a723058208729fb58c847639b39878ce6e0f0fb80fca0a8e9edcb396d6f48923ed8e9f9280029"
        });
        let blockReceiptawait = await getBlock.getBlockState(blockHash);
        AContractAddress = blockReceiptawait.block_state.stable_content.contract_address;
        assert.equal('417986', blockReceiptawait.block_state.stable_content.gas_used)
    }).timeout(1000000);

    it("执行setA1", async () => {
        let blockHash = await Block.sendBlock({
            from: account2,
            to:AContractAddress,
            data:"3696586c0000000000000000000000000000000000000000000000000000000000000001"
        });
        let blockReceiptawait = await getBlock.getBlockState(blockHash);
        assert.equal('41756', blockReceiptawait.block_state.stable_content.gas_used)
    }).timeout(1000000);

    it("执行setA2", async () => {
        let blockHash = await Block.sendBlock({
            from: account2,
            to:AContractAddress,
            data:"498e6857"
        });
        let blockReceiptawait = await getBlock.getBlockState(blockHash);
        assert.equal('26721', blockReceiptawait.block_state.stable_content.gas_used)
    }).timeout(1000000);

    it("执行setA3", async () => {
        let blockHash = await Block.sendBlock({
            from: account2,
            to:AContractAddress,
            data:"251f7a63"
        });
        let blockReceiptawait = await getBlock.getBlockState(blockHash);
        assert.equal('26677', blockReceiptawait.block_state.stable_content.gas_used)
    }).timeout(1000000);

    it("执行setB", async () => {
        let blockHash = await Block.sendBlock({
            from: account2,
            to:AContractAddress,
            data:"d1f4ba82"
        });
        let blockReceiptawait = await getBlock.getBlockState(blockHash);
        assert.equal('41775', blockReceiptawait.block_state.stable_content.gas_used)
    }).timeout(1000000);

    it("执行setC1", async () => {
        let blockHash = await Block.sendBlock({
            from: account2,
            to:AContractAddress,
            data:"90427fe0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000013100000000000000000000000000000000000000000000000000000000000000"
        });
        let blockReceiptawait = await getBlock.getBlockState(blockHash);
        assert.equal('42981', blockReceiptawait.block_state.stable_content.gas_used)
    }).timeout(1000000);

    it("执行setC1", async () => {
        let blockHash = await Block.sendBlock({
            from: account2,
            to:AContractAddress,
            data:"a5936e01"
        });
        let blockReceiptawait = await getBlock.getBlockState(blockHash);
        assert.equal('32128', blockReceiptawait.block_state.stable_content.gas_used)
    }).timeout(1000000);

})