var shell = require('shelljs');
const sleep = require('sleep');
let i=0;

shell.cd('../../');
while(true){
    i++;
    testBego();
	console.log("执行第："+i+"次");
    sleep.msleep("1800000")
}

function testBego() {
    // shell.cd('./CRC20-Test')
    // shell.exec("mocha")
    // shell.cd('../Test1')
    // shell.exec("mocha")
    // shell.cd('../Test2')
    // shell.exec("mocha")
    // shell.cd('../Test3')
    // shell.exec("mocha")
    // shell.cd('../Test4')
    // shell.exec("mocha")
    // shell.cd('../TestAddressAndKill')
    // shell.exec("mocha")
    // shell.cd('../TestFactoryModel')
    // shell.exec("mocha")
    // shell.cd('../TestPekka')
    // shell.exec("mocha")
    // shell.cd('../')

    let CRC20Test = shell.cd('./CRC20-Test');
    if(CRC20Test.code !==0){
        console.log("Error 1",CRC20Test);
        return;
    }

    let run_C20mocha = shell.exec('mocha');
    if(run_C20mocha.code !==0){
        console.log('Error 1',run_C20mocha);
        return;
    }

    let test1 = shell.cd('../Test1');
    if(test1.code !==0){
        console.log("Error 1",test1);
        return;
    }

    let run_test1mocha = shell.exec('mocha');
    if(run_test1mocha.code !==0){
        console.log('Error 1',run_test1mocha);
        return;
    }

    let test2 = shell.cd('../Test2');
    if(test2.code !==0){
        console.log("Error 1",test2);
        return;
    }

    let run_test2mocha = shell.exec('mocha');
    if(run_test2mocha.code !==0){
        console.log('Error 1',run_test2mocha);
        return;
    }

    let test3 = shell.cd('../Test3');
    if(test3.code !==0){
        console.log("Error 1",test3);
        return;
    }

    let run_test3mocha = shell.exec('mocha');
    if(run_test3mocha.code !==0){
        console.log('Error 1',run_test3mocha);
        return;
    }

    let test4 = shell.cd('../Test4');
    if(test4.code !==0){
        console.log("Error 1",test4);
        return;
    }

    let run_test4mocha = shell.exec('mocha');
    if(run_test4mocha.code !==0){
        console.log('Error 1',run_test4mocha);
        return;
    }

    let testaddressandkill = shell.cd('../TestAddressAndKill');
    if(testaddressandkill.code !==0){
        console.log("Error 1",testaddressandkill);
        return;
    }

    let run_testaddressandkill = shell.exec('mocha');
    if(run_testaddressandkill.code !==0){
        console.log('Error 1',run_testaddressandkill);
        return;
    }

    let testfactorymodel = shell.cd('../TestFactoryModel');
    if(testfactorymodel.code !==0){
        console.log("Error 1",testfactorymodel);
        return;
    }

    let run_testfactorymodel = shell.exec('mocha');
    if(run_testfactorymodel.code !==0){
        console.log('Error 1',run_testfactorymodel);
        return;
    }

    let testpekka = shell.cd('../TestPekka');
    if(testpekka.code !==0){
        console.log("Error 1",testpekka);
        return;
    }

    let run_testpekka = shell.exec('mocha');
    if(run_testpekka.code !==0){
        console.log('Error 1',run_testpekka);
        return;
    }

    shell.cd('../')

}