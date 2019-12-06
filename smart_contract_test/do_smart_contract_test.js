(async () => {
    let shell = require('shelljs');
    let rpc = require('json-rpc-cli');
    let process = require('process');
    let pro = require('child_process');
    
	pro.exec('(canonchain --daemon --rpc --rpc_control --network=4 --data_path=smart_contract_test --witness --witness_account=smart_contract_test/czr_3tiy2jgoUENkszPjrHjQGfmopqwV5m9BcEh2Grb1zDYgSGnBF7.json --password=123 &)',function (error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        }
        console.log(stdout);
    });
    function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
    await sleep(1000 * 0.3);

    const options = {
        host: "127.0.0.1",
        port: 8765
    };
    let client = new rpc.Client(options);

    function asyncfunc(opt) {
        return new Promise((resolve, reject) => {
            client.call(opt,
                function (err, res) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res)
                    }
                }
            );
        })
    }
    process.on('unhandledRejection', (reason, promise) => {
        console.log('Unhandled Rejection at:', reason.stack || reason)
    });

    let opt = {
        "action": "account_import",
        "json": "{\"account\":\"czr_33EuccjKjcZgwbHYp8eLhoFiaKGARVigZojeHzySD9fQ1ysd7u\",\"kdf_salt\":\"774DDE2B6D01D6A2B000BB42F8118E2C\",\"iv\":\"5EF469016DB117B4437FB46D37BFA925\",\"ciphertext\":\"2B9567F4184B4D0A4AD9D5A3BF94805662B562167AFBEC575B06C23F708F0CA0\"}"
    };

    let res = await asyncfunc(opt);
    console.log(res);

    let opt1 = {
        "action": "account_import",
        "json": "{\"account\":\"czr_35vDkfSth7N1WFjh9MT7NZekYGdu6ihLSMmmGjCwBPSHTm5QWi\",\"kdf_salt\":\"EE77309E8A04EDF777BBE7246AE15DDC\",\"iv\":\"F1C2EE0F24EEE85EECD5E538A4601C41\",\"ciphertext\":\"22C6DB6AA029C2D3CF7D546EC9B2DC99D90E744A507FEE390F81A0C50E324C4B\"}"
    };
    let res1 = await asyncfunc(opt1);
    console.log(res1);

    let opt2 = {
        "action": "send_block",
        "from": "czr_33EuccjKjcZgwbHYp8eLhoFiaKGARVigZojeHzySD9fQ1ysd7u",
        "to": "czr_35vDkfSth7N1WFjh9MT7NZekYGdu6ihLSMmmGjCwBPSHTm5QWi",
        "amount": "100000000000000000000000",
        "password": "12345678",
        "gas": "21000",
        "gas_price": "1000000000",
        "data": ""
    };
    let res2 = await asyncfunc(opt2);
    let json_hash = res2.hash;
    console.log(res2);

    let opt3 = {
        "action": "block_state",
        "hash": json_hash
    };
    while (true) {
        await sleep(1000 * 0.3);
        let res3 = await asyncfunc(opt3);
        let obj_status = res3.block_state.stable_content.status;
        if (obj_status !== 0){
            continue
        }
        break
    }

    let opt4 = {
        "action": "account_balance",
        "account": "czr_35vDkfSth7N1WFjh9MT7NZekYGdu6ihLSMmmGjCwBPSHTm5QWi"
    };
    let res4 = await asyncfunc(opt4);
    console.log(res4);
    
})();



