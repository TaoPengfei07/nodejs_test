pragma solidity >=0.4.0 <0.7.0;

contract Test2 {

    uint public a;

    function getCZR() public pure returns (uint, uint, uint, uint){
        return (1 wei, 1 szabo, 1 finney, 1 ether);
    }

    function getTime() public pure returns (uint, uint, uint, uint, uint){
        return (1 seconds, 1 minutes, 1 hours, 1 days, 1 weeks);
    }

    function getAbi() public pure returns (bytes memory, bytes memory, bytes memory, bytes memory){
        return (abi.encode(10), abi.encodePacked(uint(10)), abi.encodeWithSelector(0x0000000a), abi.encodeWithSelector(0x0000000a));
    }

    function testAssert(uint _test) public pure returns (bool){
        assert(_test == 1);
        return true;
    }

    function testRequire(uint _test) public pure returns (bool){
        require(_test == 1);
        return true;
    }

    function testRevert() public pure returns (bool){
        revert();
        return true;
    }

    function getAddAndMul() public pure returns (uint, uint){
        return (addmod(1, 2, 2), mulmod(1, 3, 2));
    }

    function getCryptographicFunctions() public pure returns (bytes32, bytes32, bytes20){
        return (keccak256(abi.encode(10)), sha256(abi.encode(10)), ripemd160(abi.encode(10)));
    }

    function getThis() public view returns (address){
        return address(this);
    }

    function kill() public {
        selfdestruct(msg.sender);
    }

    function getBlockhash(uint _mci) public view returns (bytes32, address, bytes memory, bytes4, uint, uint, address, uint){
        return (blockhash(_mci), msg.sender, msg.data, msg.sig, now, tx.gasprice, tx.origin, block.number);
    }

    function getGasleft() public view returns (uint){
        return gasleft();
    }

    function setGasleft() public{
        a=gasleft();
    }

    function setGasprice() public{
        a=tx.gasprice;
    }

    function testMsgValue() public payable {
        require(msg.value == 1);
    }
}
