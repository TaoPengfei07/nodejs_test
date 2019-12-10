pragma solidity >=0.4.0 <0.7.0;

contract A {

    address payable public account;

    B b;
    C c;

    constructor () public payable{
        account=msg.sender;
    }

    function creatB() public {
        account.transfer(0);
        b=new B(account,address(c));
        b=B(b);
        address(b).transfer(1200000000000000000);
    }

    function creatC() public{
        c=new C(account);
        c=C(c);
        address(c).transfer(300000000000000000);
    }

    function setB1() public{
        b=B(b);
        b.sendTransfer1();
        b.sendTransfer1();
    }

    function setB2() public{
        b=B(b);
        b.sendTransfer2();
        b.sendTransfer1();
        b.sendTransfer1();
    }

    function setB3() public{
        b=B(b);
        b.sendTransfer3();
        b.sendTransfer1();
    }

    function getBalance() public view returns(uint){
        return address(this).balance;
    }

    function getBAddress() public view returns(address){
        return address(b);
    }

    function getCAddress() public view returns(address){
        return address(c);
    }
}

contract B{

    address payable public account;
    address payable public CAddress;
    uint public a;

    C c;

    constructor (address payable _account,address payable _CAddress) public payable{
        account=_account;
        CAddress=_CAddress;
    }

    function () external payable{}

    function setA() public {
        a+=1;
    }

    function getBalance() public view returns(uint){
        return address(this).balance;
    }

    function sendTransfer1() public{
        account.transfer(100000000000000000);
    }

    function sendTransfer2() public{
        account.transfer(100000000000000000);
        account.transfer(100000000000000000);
        account.transfer(100000000000000000);
    }

    function sendTransfer3() public{
        c=C(CAddress);
        account.transfer(100000000000000000);
        c.sendTransfer1();
        c.sendTransfer2();
    }

    function kill() public{
        selfdestruct(msg.sender);
    }
}

contract C{

    address payable public account;

    function () external payable{}

    constructor (address payable _account) public payable{
        account=_account;
    }

    function sendTransfer1() public{
        account.transfer(100000000000000000);
        account.transfer(100000000000000000);
    }

    function sendTransfer2() public{
        account.transfer(100000000000000000);
    }

    function getBalance() public view returns(uint){
        return address(this).balance;
    }
}
