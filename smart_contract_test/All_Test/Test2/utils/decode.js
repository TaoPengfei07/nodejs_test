var helper = require('./txHelper');
var AbiCoder = require('./abi-coder');
var bs58check = require("bs58check");

function decodeResponse(response, fnabi) {
    //console.log(response)
    //console.log(fnabi)
    // Only decode if there supposed to be fields
    if (fnabi.outputs && fnabi.outputs.length > 0) {
        try {
            var i;

            var outputTypes = [];
            for (i = 0; i < fnabi.outputs.length; i++) {
                var type = fnabi.outputs[i].type;
                outputTypes.push(type.indexOf('tuple') === 0 ? helper.makeFullTupleTypeDefinition(fnabi.outputs[i]) : type);
            }

            if (response==="0x") response = new Uint8Array(32 * fnabi.outputs.length); // ensuring the data is at least filled by 0 cause `AbiCoder` throws if there's not engouh data
            // decode data
            var abiCoder = new AbiCoder();
            //console.log(outputTypes,response)
            var decodedObj = abiCoder.decode(outputTypes, response);

            // console.log(abiCoder)
            // console.log(decodedObj)

            var json = {};
            for (i = 0; i < outputTypes.length; i++) {
                var name = fnabi.outputs[i].name;
                //console.log(outputTypes[i],decodedObj[i])
                if(outputTypes[i]==="address"){
                    let pub=Buffer.from(decodedObj[i].substr(2), "hex");
                    let version = Buffer.from([0x01]);
                    let v_pub = Buffer.concat([version, pub]);
                    let account = "czr_" + bs58check.encode(v_pub);
                    //console.log(account)
                    json[i] = outputTypes[i] + ': ' + (name ? name + ' ' + account : account );
                }else{
                    json[i] = outputTypes[i] + ': ' + (name ? name + ' ' + decodedObj[i] : decodedObj[i] );
                }
            }
            //console.log(json)
            return json;
        } catch (e) {
            console.log("err")
            return { error: 'Failed to decode output: ' + e };
        }
    }
    return {};
}

module.exports = {
    decodeResponse:decodeResponse
}