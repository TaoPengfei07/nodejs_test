pragma solidity >=0.4.0 <0.7.0;

contract Test3 {

    uint public a;

    function testIfElse(uint _a) public{
        if(_a==1){
            a+=1;
        }else{
            a-=1;
        }
    }

    function testFor() public{
        for(uint i=0;i<2;i++){
            a+=1;
        }
    }

    function testWhile() public{
        while(a<=4){
            a+=1;
        }
    }

    function testDoWhile() public{
        do{
            a++;
        }
        while(a<=5);
    }

    function testBreak() public{
        while(a>=1){
            if(a==2){
                break;
            }
            a--;
        }
    }

    function testContinue() public{
        for(uint i=0;i<4;i++){
            if(i==2){
                continue;
            }
            a++;
        }
    }

    function testExternalFunction() public{
        testInternalFunction();
    }

    function testInternalFunction() internal{
        a++;
    }
}
