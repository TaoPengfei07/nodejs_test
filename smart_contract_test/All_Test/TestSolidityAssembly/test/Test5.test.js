const assert = require('assert');
const getBlock = require('../utils/getBlock');
const Block = require('../utils/send');
const BigNumber = require('big-number');
const encode = require('../utils/encode')
const sleep = require('sleep')
const compile = require('../compile')
const bs58check = require("bs58check");

let account1 = "czr_33EuccjKjcZgwbHYp8eLhoFiaKGARVigZojeHzySD9fQ1ysd7u"
let account2 = "";
let GetCodeContractAddress = "";
let VectorSumContractAddress = "";
let test5ContractAddress = "";


describe("测试合约test4", async () => {
    it("创建账号account2，并转入5个CZR", async () => {
        account2 = await Block.creatAccount();
        console.log("account2:" + account2)
        let beforeAmount = await getBlock.getaccountBalance(account2);
        let blockHash = await Block.sendBlock({
            to: account2,
            amount: "5000000000000000000"
        });
        await getBlock.getBlockState(blockHash);
        let afterAmount = await getBlock.getaccountBalance(account2);
        assert.equal('5000000000000000000', (afterAmount - beforeAmount))
    }).timeout(1000000);

    // it("创建合约GetCode", async () => {
    //     let data = await encode.encodeParams({
    //         from: account2,
    //         contractName: "GetCode",
    //         functionName: "constructor",
    //     });
    //     let blockHash = await Block.sendBlock(data);
    //     let blockReceiptawait = await getBlock.getBlockState(blockHash);
    //     GetCodeContractAddress = blockReceiptawait.block_state.stable_content.contract_address;
    //     console.log("GetCodeContractAddress:"+GetCodeContractAddress);
    // }).timeout(1000000);
    //
    // it("测试GetCode合约", async () => {
    //     let callParams = await encode.encodeParams({
    //         from: account2,
    //         to: GetCodeContractAddress,
    //         contractName: "GetCode",
    //         functionName: "at",
    //         args:[GetCodeContractAddress]
    //     });
    //     let code1 = await getBlock.call(callParams);
    //     // console.log(code1.substring(9).toUpperCase());
    //     let code2 = await getBlock.getAccountCode(GetCodeContractAddress)
    //     // console.log(code2);
    //     assert.equal(code2, code1.substring(9).toUpperCase())
    // }).timeout(1000000);
    //
    // it("创建合约VectorSum", async () => {
    //     let data = await encode.encodeParams({
    //         from: account2,
    //         contractName: "VectorSum",
    //         functionName: "constructor",
    //     });
    //     let blockHash = await Block.sendBlock(data);
    //     let blockReceiptawait = await getBlock.getBlockState(blockHash);
    //     VectorSumContractAddress = blockReceiptawait.block_state.stable_content.contract_address;
    //     console.log("VectorSumContractAddress:"+VectorSumContractAddress);
    // }).timeout(1000000);
    //
    // it("测试VectorSum合约", async () => {
    //     let callParams1 = await encode.encodeParams({
    //         from: account2,
    //         to: VectorSumContractAddress,
    //         contractName: "VectorSum",
    //         functionName: "sumSolidity",
    //         args:[["1","2","3"]]
    //     });
    //     let a1 = await getBlock.call(callParams1);
    //     let callParams2 = await encode.encodeParams({
    //         from: account2,
    //         to: VectorSumContractAddress,
    //         contractName: "VectorSum",
    //         functionName: "sumAsm",
    //         args:[["1","2","3"]]
    //     });
    //     let a2 = await getBlock.call(callParams2);
    //     let callParams3 = await encode.encodeParams({
    //         from: account2,
    //         to: VectorSumContractAddress,
    //         contractName: "VectorSum",
    //         functionName: "sumPureAsm",
    //         args:[["1","2","3"]]
    //     });
    //     let a3 = await getBlock.call(callParams3);
    //     // console.log(a1,a2,a3);
    //     assert.equal("sum 6", a1)
    //     assert.equal("sum 6", a2)
    //     assert.equal("sum 6", a3)
    // }).timeout(1000000);

    it("创建合约test5", async () => {
        let data = await encode.encodeParams({
            from: account2,
            contractName: "Test5",
            functionName: "constructor",
        });
        let blockHash = await Block.sendBlock(data);
        let blockReceiptawait = await getBlock.getBlockState(blockHash);
        test5ContractAddress = blockReceiptawait.block_state.stable_content.contract_address;
        console.log("test5ContractAddress:"+test5ContractAddress);
    }).timeout(1000000);

    // it("测试assembly1", async () => {
    //     let callParams = await encode.encodeParams({
    //         from: account2,
    //         to: test5ContractAddress,
    //         contractName: "Test5",
    //         functionName: "assembly1"
    //     });
    //     let assembly1 = await getBlock.call(callParams);
    //     console.log(assembly1);
    //     assert.equal("a 3,b 1,c 2,d 1,e 1,f 4", assembly1.join())
    // }).timeout(1000000);
    //
    // it("测试assembly2", async () => {
    //     let callParams = await encode.encodeParams({
    //         from: account2,
    //         to: test5ContractAddress,
    //         contractName: "Test5",
    //         functionName: "assembly2"
    //     });
    //     let assembly2= await getBlock.call(callParams);
    //     console.log(assembly2);
    //     assert.equal("a 254,b 1,c 1,d 1,e 1,f 1", assembly2.join())
    // }).timeout(1000000);
    //
    // it("测试assembly3", async () => {
    //     let callParams = await encode.encodeParams({
    //         from: account2,
    //         to: test5ContractAddress,
    //         contractName: "Test5",
    //         functionName: "assembly3"
    //     });
    //     let assembly3= await getBlock.call(callParams);
    //     console.log(assembly3);
    //     assert.equal("a 1,b 1,c 3,d 0,e 4,f 1,g 1,h 3,i 76", assembly3.join())
    // }).timeout(1000000);
    //
    // it("测试assembly4", async () => {
    //     let callParams = await encode.encodeParams({
    //         from: account2,
    //         to: test5ContractAddress,
    //         contractName: "Test5",
    //         functionName: "assembly4",
    //         args:["3"]
    //     });
    //     let assembly4= await getBlock.call(callParams);
    //     console.log(assembly4);
    //     assert.equal("b 5", assembly4)
    // }).timeout(1000000);
    //
    // it("测试assembly5", async () => {
    //     let callParams = await encode.encodeParams({
    //         from: account2,
    //         to: test5ContractAddress,
    //         contractName: "Test5",
    //         functionName: "assembly5"
    //     });
    //     let assembly5= await getBlock.call(callParams);
    //     console.log(assembly5);
    //     assert.equal("a 105,b 0,c 0,d 0,e 0,f 0,g 96,h 4,i "+test5ContractAddress+",j 0,k 0", assembly5.join())
    // }).timeout(1000000);
    //
    // it("测试assembly6", async () => {
    //     let callParams = await encode.encodeParams({
    //         from: account2,
    //         to: test5ContractAddress,
    //         contractName: "Test5",
    //         functionName: "assembly6",
    //         args:[test5ContractAddress]
    //     });
    //     let assembly6= await getBlock.call(callParams);
    //     console.log(assembly6);
    //     assert.equal("a "+account2+",b 0,d 36,e 221,g 221,h 0,i "+test5ContractAddress+",j 4999298571000000000", assembly6.join())
    // }).timeout(1000000);
    //
    // it("测试assembly7", async () => {
    //     let callParams = await encode.encodeParams({
    //         from: account2,
    //         to: test5ContractAddress,
    //         contractName: "Test5",
    //         functionName: "assembly7"
    //     });
    //     let assembly6= await getBlock.call(callParams);
    //     console.log(assembly6);
    //     assert.equal("c 0", assembly6)
    // }).timeout(1000000);

    // it("测试assembly8", async () => {
    //     let callParams = await encode.encodeParams({
    //         from: account2,
    //         to: test5ContractAddress,
    //         contractName: "Test5",
    //         functionName: "assembly8"
    //     });
    //     let assembly6= await getBlock.call(callParams);
    //     console.log(assembly6);
    //     assert.equal("a 104", assembly6)
    // }).timeout(1000000);

    // it("测试assembly9", async () => {
    //     let callParams = await encode.encodeParams({
    //         from: account2,
    //         to: test5ContractAddress,
    //         contractName: "Test5",
    //         functionName: "assembly9"
    //     });
    //     let assembly6= await getBlock.call(callParams);
    //     console.log(assembly6);
    //     assert.equal("a 145", assembly6)
    // }).timeout(1000000);

    // it("测试assembly10", async () => {
    //     let callParams = await encode.encodeParams({
    //         from: account2,
    //         to: test5ContractAddress,
    //         contractName: "Test5",
    //         functionName: "assembly10",
    //         args:["czr_3yUHhktuaxLx6JiAkGoikyM96nwEaUfqTrjYWgVzHG1aCyR2MP"]
    //     });
    //     let assembly6= await getBlock.call(callParams);
    //     console.log(assembly6);
    //     assert.equal("a 145", assembly6)
    // }).timeout(1000000);

    // it("测试assembly11", async () => {
    //     let callParams = await encode.encodeParams({
    //         from: account2,
    //         to: test5ContractAddress,
    //         contractName: "Test5",
    //         functionName: "assembly11"
    //     });
    //     let assembly6= await getBlock.call(callParams);
    //     console.log(assembly6);
    //     assert.equal("a 0", assembly6)
    // }).timeout(1000000);
    //
    // it("测试assembly11", async () => {
    //     let callParams = await encode.encodeParams({
    //         from: account2,
    //         to: test5ContractAddress,
    //         contractName: "Test5",
    //         functionName: "assembly11"
    //     });
    //     let assembly6= await getBlock.call(callParams);
    //     console.log(assembly6);
    //     assert.equal("a 0", assembly6)
    // }).timeout(1000000);
})