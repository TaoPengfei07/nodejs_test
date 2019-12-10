pragma solidity >=0.4.0 <0.7.0;

contract Test1 {

    bool public boolVariable;

    uint public uintVariable;

    int public intVariable;

    address public addressVariable;

    bytes public bytesVariable;

    address public addressConstant;

    int public uintConstant=10;

    string public stringConstant="10";

    bytes public bytesConstant=hex"10";

    enum ActionChoices { GoLeft, GoRight, GoStraight, SitStill }

    uint[] public x;

    uint[] public array=[1,2,3];

    ActionChoices choice;
    ActionChoices constant defaultChoice = ActionChoices.GoStraight;

    struct StructTest{
        //address structAddress;
        uint structUint;
        string structString;
    }

    mapping (uint=>string) mappingTest;

    StructTest structTest;

    function setGoStraight() public {
        choice = ActionChoices.GoStraight;
    }

    function getChoice() public view returns (ActionChoices) {
        return choice;
    }

    function getDefaultChoice() public pure returns (uint) {
        return uint(defaultChoice);
    }

    function setBoolVariable(bool _boolVariable) public{
        boolVariable=_boolVariable;
    }

    function setUintVariable(uint _uintVariable) public{
        uintVariable=_uintVariable;
    }

    function setIntVariable(int _intVariable) public{
        intVariable=_intVariable;
    }

    function setAddressVariable(address _addressVariable) public{
        addressVariable=_addressVariable;
    }

    function setBytesVariable(bytes memory _bytesVariable) public{
        bytesVariable=_bytesVariable;
    }

    function payMoneyToA() public payable{

    }

    function testBalanceAndTransfer() public{
        if(msg.sender.balance>0){
            msg.sender.transfer(10);
        }
    }

    function memoryAndStorage(uint[] memory memoryArray) public {
        x=memoryArray;
        uint[] memory y=x;
        delete y;
    }

    function arrayTest() public{
        array.push(4);
    }

    function getArrayLength() public view returns(uint){
        return array.length;
    }

    function setStruct() public {
        structTest.structUint=10;
        structTest.structString="10";
    }

    function getStruct() public view returns(uint,string memory){
        return (structTest.structUint,structTest.structString);
    }

    function setMapping() public {
        mappingTest[1]="1";
    }

    function getMapping() public view returns(string memory){
        return mappingTest[1];
    }

    function testLValues() public pure returns(uint){
        uint v=1;
        return v+=1;
    }

    function getBalance() public view returns(uint){
        return address(this).balance;
    }

    function getXArray() public view returns(uint[] memory){
        return x;
    }

}