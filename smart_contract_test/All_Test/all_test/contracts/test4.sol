pragma solidity >=0.4.0 <0.7.0;

contract Test4part1 {

    uint private a=1;

    function testPublic() view public returns(uint){
        return a;
    }

    function testExternal() view external returns(uint){
        return a;
    }

    function testInternal() view internal returns(uint){
        return a;
    }

    function testPrivate() view private returns(uint){
        return a;
    }
}

contract Test4part2{

    Test4part1 test4part1=new Test4part1();

    function getTest4part1TestPublic() view public returns(uint){
        return test4part1.testPublic();
    }

    function getTest4part1TestExternal() view public returns(uint){
        return test4part1.testExternal();
    }

    // function getTest4part1TestInternal() view public returns(uint){
    //     return test4part1.testInternal();
    // }

    // function getTest4part1TestPrivate() view public returns(uint){
    //     return test4part1.testPrivate();
    // }
}

contract Test4part3 is Test4part1{

    function getTest4part1TestInternal() view public returns(uint){
        return testInternal();
    }

    // function getTest4part1TestPrivate() view public returns(uint){
    //     return testPrivate();
    // }
}

contract Test4part4 {
    constructor() public { owner = msg.sender; }
    address payable owner;
}

contract Test4part5 is Test4part4 {
    function kill() public {
        if (msg.sender == owner) selfdestruct(owner);
    }
}

contract Test4part6 is Test4part5 {
    event Deposit(uint a);
    function kill() public {
        emit Deposit(6);
        super.kill();
    }
}

contract Test4part7 is Test4part5 {
    event Deposit(uint a);
    function kill() public {
        emit Deposit(7);
        super.kill();
    }
}

contract Test4part8 is Test4part6, Test4part7 {
}

contract Test4partModifier1{

    address payable owner;

    constructor() public { owner = msg.sender; }

    modifier onlyOwner {
        require(
            msg.sender == owner
        );
        _;
    }
}

contract Test4partModifier2 is Test4partModifier1{
    function close() public onlyOwner {
        selfdestruct(owner);
    }
}

contract Test4partModifier3 {
    modifier costs(uint price) {
        require (msg.value >= price) ;
        _;
    }
}

contract Test4partModifier4 is Test4partModifier3, Test4partModifier1 {
    mapping (address => bool) registeredAddresses;
    uint price;

    constructor(uint initialPrice) public { price = initialPrice; }

    function register() public payable costs(price) {
        registeredAddresses[msg.sender] = true;
    }

    function changePrice(uint _price) public onlyOwner {
        price = _price;
    }
}

contract Test4partModifier5 {
    bool locked;
    modifier noReentrancy() {
        require(!locked);
        locked = true;
        _;
        locked = false;
    }

    function f() public noReentrancy returns (uint) {
        (bool success,) = msg.sender.call("");
        require(success);
        return 7;
    }
}

contract Test4partFallBack1 {

    constructor () public payable{}

    function () external payable{}

    function getBalance() view public returns(uint){
        return address(this).balance;
    }
}

contract Test4partFunctionOverloading1 {
    function f(uint _in) public pure returns (uint out) {
        out = _in;
    }

    function f(uint _in, bool _really) public pure returns (uint out) {
        if (_really)
            out = _in;
    }
}

contract Test4partFunctionOverloading2 {
    function f(uint8 _in) public pure returns (uint8 out) {
        out = _in;
    }

    function f(uint256 _in) public pure returns (uint256 out) {
        out = _in;
    }
}

contract Test4partEvents {

    event Deposit(
        address indexed _from,
        uint indexed _id,
        uint _value
    );

    function events1(uint _a) public payable{
        emit Deposit(msg.sender, _a, msg.value);
    }

    function events2() public payable {
        uint256 _id = 0x420042;
        log3(
            bytes32(msg.value),
            bytes32(0x50cb9fe53daa9737b786ab3646f04d0150dc50ef4e75f59509d83667ad5adb20),
            bytes32(uint256(msg.sender)),
            bytes32(_id)
        );
    }
}



contract Test4partAbstractContracts1 {
    function utterance() view public returns (bytes32);
}

contract Test4partAbstractContracts2 is Test4partAbstractContracts1 {
    function utterance() view public returns (bytes32) { return "miaow"; }

    function testInterface(address _a) view public returns(uint){
        Test4part test4par1=Test4part(_a);
        return test4par1.testPublic();
    }

}

interface Test4part {
    function testPublic() view external returns(uint);
}

library Test4partLibrary1 {

    struct Data { mapping(uint => bool) flags; }

    function insert(Data storage self, uint value)
    public
    returns (bool)
    {
        if (self.flags[value])
            return false; // already there
        self.flags[value] = true;
        return true;
    }

    function remove(Data storage self, uint value)
    public
    returns (bool)
    {
        if (!self.flags[value])
            return false; // not there
        self.flags[value] = false;
        return true;
    }

    function contains(Data storage self, uint value)
    public
    view
    returns (bool)
    {
        return self.flags[value];
    }
}

contract Test4partLibrary2 {
    Test4partLibrary1.Data knownValues;
    function register(uint value) public {
        require(Test4partLibrary1.insert(knownValues, value));
    }
}

contract Test4partUsingFor {
    using Test4partLibrary1 for Test4partLibrary1.Data;
    Test4partLibrary1.Data knownValues;

    function register(uint value) public {
        require(knownValues.insert(value));
    }
}
