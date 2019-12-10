pragma solidity >=0.4.0 <0.7.0;

contract A {
    address public testAddress;

    address payable public account;

    uint public a;

    constructor () public payable{
        account=msg.sender;
    }

    function setA() public {
        a+=1;
    }

    function kill() public{
        selfdestruct(account);
    }
}
