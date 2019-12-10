const Czr=require('czr')
const czr=new Czr()
const compile=require('./compile')

czr.request.sendBlock({
    "from": "czr_4kYTyZTjRGQoEioCbT8JcKpDaqjJs2ekpxcucTC14SniuNABi6",
    "to": "",
    "amount": '0',
    "password": "12345678",
    "gas": 10000000000000000,
    "gas_price": "10000000",
    "data":compile.contractByteCode
})
    .then(ret => {
        if (ret.code === 0) {
            console.log('request success =>', ret)
            console.log("等待稳定中...");
            getBlock();
            function getBlock(){
                czr.request.getBlock(ret.hash)
                    .then(ret => {
                        if (ret.code === 0) {
                            //console.log('request success =>', ret)
                            if(!ret.block.is_stable){
                                getBlock();
                                return
                            }
                            console.log("已稳定");
                            console.log("blockHash:"+ret.block.hash)
                            czr.request.getBlockReceipt(ret.block.hash).then(ret=>{
                                if(ret.code === 0){
                                    //console.log('request success =>', ret)
                                    console.log("contractAddress:"+ret.contractAddress)
                                }else {
                                    console.log('request failed =>', ret)
                                }
                            })
                        } else {
                            console.log('request failed =>', ret)
                        }
                    })
                    .catch(err => console.log)
            }
        } else {
            console.log('request failed =>', ret)
        }
    })
    .catch(err => console.log)