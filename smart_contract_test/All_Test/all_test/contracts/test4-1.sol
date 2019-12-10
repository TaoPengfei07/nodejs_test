pragma solidity >=0.4.0 <0.7.0;

//contract aaa
//{
//    function b() public
//    {
//        address payable x = 0x1234567890123456789012345678901234567890;
//        x.transfer(100);
//    }
//}

//contract bbb
//{
//    function b() public
//    {
//        address payable x = 0x1234567890123456789012345678901234567890123456789012345678901234;
//        x.transfer(100);
//    }
//}

//contract ccc
//{
//    function b() public
//    {
//        address payable x = address(0x1234567890123456789012345678901234567890);
//        x.transfer(100);
//    }
//}

//contract ddd
//{
//    function b() public
//    {
//        address payable x = address(0x123456789012345678901234567890123456789011);
//        x.transfer(100);
//    }
//}

contract eee
{
    function b() public
    {
        address payable x = address(0x0);
        x.transfer(100);
    }
}