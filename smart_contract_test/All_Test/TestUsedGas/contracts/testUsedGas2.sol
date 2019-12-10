pragma solidity >=0.4.0 <0.7.0;

contract A {
    uint public a;
    address public b;
    string public c;
    bool public d;

    function setA1(uint _a) public{
        a=_a;
    }

    function setA2() public{
        a+=1;
    }

    function setA3() public{
        a-=1;
    }

    function setB() public{
        b=address(this);
    }

    function setC1(string memory _c) public{
        c=_c;
    }

    function setC1() public{
        c="123";
    }
}
