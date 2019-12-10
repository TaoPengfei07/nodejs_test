pragma solidity >=0.4.0 <0.7.0;

//library GetCode {
//    function at(address _addr) public view returns (bytes memory o_code) {
//        assembly {
//            let size := extcodesize(_addr)
//            o_code := mload(0x40)
//            mstore(0x40, add(o_code, and(add(add(size, 0x20), 0x1f), not(0x1f))))
//            mstore(o_code, size)
//            extcodecopy(_addr, add(o_code, 0x20), 0, size)
//        }
//    }
//}
//
//library VectorSum {
//    function sumSolidity(uint[] memory _data) public pure returns (uint sum) {
//        for (uint i = 0; i < _data.length; ++i)
//            sum += _data[i];
//    }
//
//    function sumAsm(uint[] memory _data) public pure returns (uint sum) {
//        for (uint i = 0; i < _data.length; ++i) {
//            assembly {
//                sum := add(sum, mload(add(add(_data, 0x20), mul(i, 0x20))))
//            }
//        }
//    }
//
//    function sumPureAsm(uint[] memory _data) public pure returns (uint sum) {
//        assembly {
//            let len := mload(_data)
//
//            let data := add(_data, 0x20)
//
//            for
//            { let end := add(data, mul(len, 0x20)) }
//            lt(data, end)
//            { data := add(data, 0x20) }
//            {
//                sum := add(sum, mload(data))
//            }
//        }
//    }
//}

contract test5{
//    function assembly1() public pure returns(uint a,uint b,uint c,uint d,uint e,uint f){
//        assembly {
//            a:=add(1, 2)
//            b:=sub(2, 1)
//            c:=mul(1, 2)
//            d:=div(3, 2)
//            e:=mod(3, 2)
//            f:=exp(2, 2)
//        }
//    }
//
//    function assembly2() public pure returns(uint8 a,uint b,uint c,uint d,uint e,uint f){
//        assembly {
//            a:=not(1)
//            b:=lt(1, 2)
//            c:=gt(2, 1)
//            d:=slt(sub(1, 3),sub(1, 2))
//            e:=eq(1, 1)
//            f:=iszero(0)
//        }
//    }
//
//    function assembly3() public pure returns(uint8 a,uint8 b,uint8 c,uint8 d,uint8 e,uint8 f,uint8 g,uint8 h,uint8 i){
//        assembly {
//            a:=and(1, 1)
//            b:=or(1, 0)
//            c:=xor(1, 2)
//            d:=byte("1234567890", 2)
//            e:=shl(1, 2)
//            f:=shr(1, 2)
//            g:=sar(1, 2)
//            h:=signextend(2, 3)
//            i:=keccak256(1, 4)
//        }
//    }
//
//    function assembly4(uint x) public view returns (uint b) {
//        assembly {
//            let v := add(x, 1)
//            mstore(0x80, v)
//            {
//                let y := add(sload(v), 1)
//                b := y
//            }
//            b := add(b, v)
//        }
//    }
//
//    function assembly5() public returns(uint8 a,uint8 b,uint8 c,uint8 d,uint8 e,uint8 f,uint8 g,uint8 h,address i,uint j,uint8 k){
//        assembly {
//            a:=pc
//            b:=mload(2)
//            mstore(1, c)
//            mstore8(1,d)
//            e:=sload(1)
//            sstore(1,k)
//            g:=msize
//            h:=gas
//            i:=address
//    j:=balance(a)
//    sstore(1,k)
//    }
//}
//
//function assembly6(address _addr) public view returns(address a,uint b,uint8 d,uint8 e,uint8 g,uint8 h,address i,uint j){
//assembly {
//a:=caller
//b:=callvalue
//d:=calldatasize
//e:=codesize
//g:=extcodesize(_addr)
//h:=returndatasize
//i:=address
//j:=balance(a)
//}
//}
//
//function assembly7() public pure returns(uint8 c){
//assembly {
//c:=calldataload(1)
//}
//}

//function assembly8() public pure returns(uint8 a){
//assembly {
//a:=pc
//}
//}

//    function assembly9() public pure returns(uint a){
//        assembly {
//            a:=codesize
//        }
//    }

    function assembly10(address _addr) public view returns(uint a){
        assembly {
            a:=extcodesize(_addr)
        }
    }

//    function assembly11() public view returns(uint a){
//        assembly {
//            a:=gas
//        }
//    }

}
