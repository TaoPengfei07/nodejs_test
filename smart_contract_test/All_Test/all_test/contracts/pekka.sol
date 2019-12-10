pragma solidity ^0.5.4;

//中心合约
contract CentralContract{

    //中心合约创建者地址
    address payable private centralContractCreatorAddress=msg.sender;

    //收取佣金账户
    address payable public commissionAddress;

    //设备合约对象
    MachineContract machineContract;

    //任务合约对象
    TaskContract taskContract;

    //设备合约数组
    address[] private machineContracts;

    //任务合约数组
    address[] private taskContracts;

    //项目锁
    address private projectLock=msg.sender;

    //设备合约ID集合
    mapping(string=>address) private machineIDMap;

    //设备合约集合
    mapping(address=>address[]) private machineContractMap;

    //任务合约集合
    mapping(address=>address[]) private taskContractMap;

    //匹配结果集合
    mapping(address=>address) private matchingResults;

    //匹配记录
    mapping(address=>address[]) private matchingRecord;

    //机器ID对应的机器地址集合
    mapping(string=>address[]) private machineIDFromMachine;

    //匹配状态
    mapping(address=>bool) private matchingState;

    //账号总收益
    mapping(address=>uint) private cumulativeIncome;

    //机器总收益
    mapping(string=>uint) private matchingIDCumulativeIncome;

    //创建设备合约地址事件
    event MachineContractAddress(address machineContractAddresslog);

    //创建任务合约地址事件
    event TaskContractAddress(address taskContractAddresslog);

    //创建设备合约
    function createMachine(
        string memory _machineID,
        uint _cpuCore,
        uint _RAM,
        uint _disk,
        uint _gpuCount,
        uint _gpuRam,
        uint _unitPrice
    )public payable{
        require(
            machineIDMap[_machineID]==address(0)
            &&msg.value>0
            &&projectLock==centralContractCreatorAddress
        );
        machineContract=new MachineContract(
            msg.sender,
            address(this),
            centralContractCreatorAddress,
            _machineID,
            _cpuCore,
            _RAM,
            _disk,
            _gpuCount,
            _gpuRam,
            _unitPrice
        );
        machineContract=MachineContract(machineContract);
        machineIDMap[_machineID]=msg.sender;
        machineContractMap[msg.sender].push(address(machineContract));
        machineContracts.push(address(machineContract));
        machineContract.payDeposit.value(msg.value).gas(800)();
        matchingState[address(machineContract)]=true;
        machineIDFromMachine[_machineID].push(address(machineContract));

        emit MachineContractAddress(address(machineContract));
    }

    //创建任务合约幷匹配设备合约
    function createTask(
        string memory _taskFilesDigitalabstract,
        address _machineContractAddress
    )public payable{
        require(
            msg.value>0
            &&matchingResults[_machineContractAddress]==address(0)
            &&_machineContractAddress!=address(0)
            &&matchingState[_machineContractAddress]==true
            &&projectLock==centralContractCreatorAddress
            &&commissionAddress!=address(0)
        );
        taskContract=new TaskContract(msg.sender,address(this),centralContractCreatorAddress,_taskFilesDigitalabstract,commissionAddress);
        taskContract=TaskContract(taskContract);
        machineContract=MachineContract(_machineContractAddress);
        taskContractMap[msg.sender].push(address(taskContract));
        taskContracts.push(address(taskContract));
        taskContract.PayBounty.value(msg.value).gas(800)();
        (,,,,,uint machineUnitPrice)=machineContract.getMachineParameters();
        require(taskContract.getBalance()>0);
        (address payable _machineContractCreatorAddress,)=machineContract.getInit();
        taskContract.registrationMachine(_machineContractCreatorAddress,_machineContractAddress,machineUnitPrice);
        machineContract.setTaskContractAddress(address(taskContract));
        matchingResults[_machineContractAddress]=address(taskContract);
        matchingRecord[_machineContractAddress].push(address(taskContract));

        emit TaskContractAddress(address(taskContract));
    }

    //设置运行时间和结果文件数字摘要
    function setRunTimeAndResultFilesDigitalAbstract(
        string memory _resultFilesDigitalabstract,
        address _machineContractAddress,
        address _taskContractAddress,
        uint _runTime
    ) public OnlyCentralContractCreatorCanCall{
        taskContract=TaskContract(_taskContractAddress);
        machineContract=MachineContract(_machineContractAddress);
        (,,,,,uint machineUnitPrice)=machineContract.getMachineParameters();
        require(
            keccak256(abi.encodePacked(_resultFilesDigitalabstract))!=keccak256(abi.encodePacked())
            &&_machineContractAddress!=address(0)
            &&_taskContractAddress!=address(0)
            &&_runTime>0
            &&matchingResults[_machineContractAddress]==_taskContractAddress
        &&taskContract.getBalance()/machineUnitPrice*60>=_runTime
        );
        machineContract.setDisputedTime(3);
        machineContract.setTaskContractAddress(address(0));
        taskContract.setRunTimeAndResultFilesDigitalAbstract(_resultFilesDigitalabstract,_runTime);
        matchingResults[_machineContractAddress]=address(0);
    }

    //结束任务
    function taskEnd(address _taskContractAddress,address _machineContractAddress,uint8 _userBountyRatio) public OnlyCentralContractCreatorCanCall{
        require(
            matchingResults[_machineContractAddress]==_taskContractAddress
        &&_userBountyRatio>=0
        &&_userBountyRatio<=10
        );
        taskContract=TaskContract(_taskContractAddress);
        taskContract.taskEnd(_userBountyRatio);
        machineContract=MachineContract(_machineContractAddress);
        machineContract.setTaskContractAddress(address(0));
        matchingResults[_machineContractAddress]=address(0);
    }

    //停用设备合约（没匹配任务时）
    function deleteMachineContract(string memory _machineID,address _machineContractAddress) public{
        require(matchingResults[_machineContractAddress]==address(0)&&machineIDMap[_machineID]==msg.sender);
        machineContract=MachineContract(_machineContractAddress);
        machineContract.extractDeposit();
        matchingState[_machineContractAddress]=false;
        machineIDMap[_machineID]=address(0);
        (address _centralContractCreatorAddress,)=machineContract.getInit();

        if(matchingRecord[_machineContractAddress].length!=0){
            for(uint i=0;i<matchingRecord[_machineContractAddress].length;i++){
                taskContract=TaskContract(matchingRecord[_machineContractAddress][i]);
                (,,,uint _profit,)=taskContract.getResultInformation();
                taskContract.drawMachineBounty();
                bookKeeping(_centralContractCreatorAddress,_profit);
                matchingIDCumulativeIncome[_machineID]+=_profit;
            }
        }
    }

    //中心服务停用设备合约
    function centralDeleteMachineContract(string memory _machineID,address _machineContractAddress,uint _runTime) public OnlyCentralContractCreatorCanCall{
        machineContract=MachineContract(_machineContractAddress);
        (address _centralContractCreatorAddress,)=machineContract.getInit();
        if(matchingResults[_machineContractAddress]==address(0)){
            require(matchingResults[_machineContractAddress]==address(0));
            machineContract.endTaskExtractDeposit(machineContract.getBalance(),0);
            matchingState[_machineContractAddress]=false;
            machineIDMap[_machineID]=address(0);

            if(matchingRecord[_machineContractAddress].length!=0){
                for(uint i=0;i<matchingRecord[_machineContractAddress].length;i++){
                    taskContract=TaskContract(matchingRecord[_machineContractAddress][i]);
                    (,,,uint _profit1,)=taskContract.getResultInformation();
                    taskContract.drawMachineBounty();
                    bookKeeping(_centralContractCreatorAddress,_profit1);
                    matchingIDCumulativeIncome[_machineID]+=_profit1;
                }
            }
        }else{
            require(matchingResults[_machineContractAddress]!=address(0)&&_runTime!=0);
            address _taskContractAddress=matchingResults[_machineContractAddress];
            taskContract=TaskContract(_taskContractAddress);
            (,,,,,uint machineUnitPrice)=machineContract.getMachineParameters();
            require(taskContract.getBalance()/machineUnitPrice*60>=_runTime);
            machineContract.setTaskContractAddress(address(0));
            taskContract.setRunTimeAndResultFilesDigitalAbstract("Machine hosting time has arrived!",_runTime);
            matchingResults[_machineContractAddress]=address(0);

            machineContract.endTaskExtractDeposit(machineContract.getBalance(),0);
            matchingState[_machineContractAddress]=false;
            machineIDMap[_machineID]=address(0);

            if(matchingRecord[_machineContractAddress].length!=0){
                for(uint j=0;j<matchingRecord[_machineContractAddress].length;j++){
                    taskContract=TaskContract(matchingRecord[_machineContractAddress][j]);
                    (,,,uint _profit2,)=taskContract.getResultInformation();
                    taskContract.drawMachineBounty();
                    bookKeeping(_centralContractCreatorAddress,_profit2);
                    matchingIDCumulativeIncome[_machineID]+=_profit2;
                }
            }
        }
    }

    function reviseCommissionAddress(address payable _commissionAddress) public OnlyCentralContractCreatorCanCall{
        commissionAddress=_commissionAddress;
    }

    function FreezeProject() public OnlyCentralContractCreatorCanCall{
        projectLock=address(0);
    }

    //获取设备合约数组
    function getMachineContracts()public view returns(address[] memory){
        return machineContracts;
    }

    //获取设备ID归属
    function getMachineIDMap(string memory _machineID) public view returns(address){
        return machineIDMap[_machineID];
    }

    //获取指定账户地址创建的所有设备合约
    function getMachineContractMap(address _machineContractCreatorAddress) public view returns(address[] memory){
        return machineContractMap[_machineContractCreatorAddress];
    }

    //获取指定账户地址创建的所有任务合约
    function getTaskContractMap() public view returns(address[] memory){
        return taskContractMap[msg.sender];
    }

    //获取任务合约数组
    function getTaskContracts() public view returns(address[] memory){
        return taskContracts;
    }

    //获取设备合约状态
    function getmatchingState(address _machineContractAddress) public view returns(bool){
        return matchingState[_machineContractAddress];
    }

    //记账（记录收益）
    function bookKeeping(address _machineContractCreatorAddress,uint _profit) public {
        cumulativeIncome[_machineContractCreatorAddress]+=_profit;
    }

    //查看指定账号收益
    function getProfit(address _machineContractCreatorAddress) public view returns(uint){
        return cumulativeIncome[_machineContractCreatorAddress];
    }

    //查看匹配记录
    function getMatchingRecord(address _machineContractAddress) public view returns(address[] memory){
        return matchingRecord[_machineContractAddress];
    }

    //查看机器ID对应的机器地址集合
    function getMatchingIDFromMatching(string memory _machineID) public view returns(address[] memory){
        return machineIDFromMachine[_machineID];
    }

    //查看当前匹配信息
    function getMatchingResults(address _machineContractAddress) public view returns(address){
        return matchingResults[_machineContractAddress];
    }

    //查看机器总收益
    function getMatchingIDCumulativeIncome(string memory _machineID) public view returns(uint){
        return matchingIDCumulativeIncome[_machineID];
    }

    //中心合约创建者权限
    modifier OnlyCentralContractCreatorCanCall(){
        require(msg.sender==centralContractCreatorAddress);
        _;
    }
}


//设备合约
contract MachineContract{

    //任务合约地址
    address private taskContractAddress;

    //确认结果时间
    uint private disputedTime;

    //中心合约对象
    CentralContract centralContract;

    //任务合约对象
    TaskContract taskContract;

    //返回押金金额事件
    event ReturnDeposit(uint Depositlog);

    event ReturnPayDeposit(uint Deposit);

    //初始化结构体对象
    Init init;

    //设备参数结构体对象
    MachineParameters machineParameters;

    //初始化结构体
    struct Init {
        address payable machineContractCreatorAddress;
        address centralContractAddress;
        address payable centralContractCreatorAddress;
        string machineID;
    }

    //设备参数结构体
    struct MachineParameters{
        uint cpuCore;
        uint RAM;
        uint disk;
        uint gpuCount;
        uint gpuRam;
        uint unitPrice;
    }

    //构造函数
    constructor(
        address payable _machineContractCreatorAddress,
        address _centralContractAddress,
        address payable _centralContractCreatorAddress,
        string memory _machineID,
        uint _cpuCore,
        uint _RAM,
        uint _disk,
        uint _gpuCount,
        uint _gpuRam,
        uint _unitPrice
    ) public{
        init= Init( _machineContractCreatorAddress,_centralContractAddress,_centralContractCreatorAddress,_machineID);
        machineParameters=MachineParameters(_cpuCore,_RAM,_disk,_gpuCount,_gpuRam,_unitPrice);
    }

    //向合约付钱
    function payDeposit() payable public {
        require(msg.value>0);
        emit ReturnPayDeposit(msg.value);
    }

    //设置任务合约地址
    function setTaskContractAddress(address _taskContractAddress) public OnlyCentralContractCanCall{
        taskContractAddress=_taskContractAddress;
    }

    //设置确认结果事件
    function setDisputedTime(uint _disputedTime) public OnlyCentralContractCanCall{
        require(_disputedTime>0);
        if(now+_disputedTime>disputedTime){
            disputedTime=now+_disputedTime;
        }
    }

    //提取押金
    function extractDeposit() public OnlyCentralContractCanCall{
        require(taskContractAddress==address(0));
        require(now-disputedTime>=0);
        emit ReturnDeposit(address(this).balance);
        init.machineContractCreatorAddress.transfer(address(this).balance);
    }

    //结束任务提取押金（需要中心服务分配押金）
    function endTaskExtractDeposit(uint _machineBounty,uint _surplusBounty) public OnlyCentralContractCanCall{
        require(_machineBounty+_surplusBounty==address(this).balance);
        require(now-disputedTime>=0);
        taskContract=TaskContract(taskContractAddress);
        //emit ReturnMMDeposit(_machineBounty);
        //emit ReturnUserDeposit(_surplusBounty);
        if(_machineBounty!=0){
            init.machineContractCreatorAddress.transfer(_machineBounty);
        }
        if(_surplusBounty!=0){
            (address payable taskContractCreatorAddress,,)=taskContract.getInit();
            taskContractCreatorAddress.transfer(_surplusBounty);
        }
    }

    //获取剩余确认时间
    function getDisputedTime() public view returns(uint){
        if(now<disputedTime){
            return disputedTime-now;
        }else{
            return 0;
        }
    }

    //获取匹配上的任务合约地址
    function getTaskContractAddress() public view returns(address) {
        return taskContractAddress;
    }

    //获取初始信息（设备ID）
    function getInit() public view returns(address payable,string memory){
        return (
        init.machineContractCreatorAddress,
        init.machineID
        );
    }

    //查看设备合约参数
    function getMachineParameters() public view returns(uint,uint,uint,uint,uint,uint){
        return(
        machineParameters.cpuCore,
        machineParameters.RAM,
        machineParameters.disk,
        machineParameters.gpuCount,
        machineParameters.gpuRam,
        machineParameters.unitPrice
        );
    }

    //查询合约余额
    function getBalance() public view returns(uint){
        return address(this).balance;
    }

    //处罚
    function punish(uint _money) public OnlyCentralContractCreatorCanCall{
        require(_money>0);
        init.centralContractCreatorAddress.transfer(_money);
    }

    //设备合约创建者权限
    modifier OnlyMachineContractCreatorCanCall(){
        require(msg.sender==init.machineContractCreatorAddress);
        _;
    }

    //中心合约创建者权限
    modifier OnlyCentralContractCreatorCanCall(){
        require(msg.sender==init.centralContractCreatorAddress);
        _;
    }

    //中心合约权限
    modifier OnlyCentralContractCanCall(){
        require(msg.sender==init.centralContractAddress);
        _;
    }

}


//任务合约
contract TaskContract{

    //结果锁
    address private resultLock;

    //初始化结构体对象
    Init init;

    //注册结构体对象
    Register register;

    //结果信息结构体对象
    ResultInformation resultInformation;

    //提取设备赏金金额事件
    event DMachineBounty(uint DrawMachineBountylog);

    //提取剩余赏金金额事件
    event DSurplusBounty(uint DrawSurplusBountylog);

    event ReturnPayBounty(uint Bounty);

    //初始化结构体
    struct Init{
        address payable taskContractCreatorAddress;
        address centralContractAddress;
        address centralContractCreatorAddress;
        string taskFilesDigitalabstract;
        bool taskState;
        address payable commissionAddress;
    }

    //注册结构体
    struct Register{
        address payable machineContractCreatorAddress;
        address machineContractAddress;
        uint machineUnitPrice;
    }

    //结果信息结构体
    struct ResultInformation{
        string resultFilesDigitalAbstract;
        uint runTime;
        uint waitingConfirmationTime;
        uint machineBounty;
        uint surplusBounty;
    }

    //构造函数
    constructor(
        address payable _taskContractCreatorAddress,
        address _centralContractAddress,
        address _centralContractCreatorAddress,
        string memory _taskFilesDigitalabstract,
        address payable _commissionAddress
    ) public{
        if(keccak256(abi.encodePacked(_taskFilesDigitalabstract))!=keccak256(abi.encodePacked())){
            init=Init(_taskContractCreatorAddress,_centralContractAddress,_centralContractCreatorAddress,_taskFilesDigitalabstract,false,_commissionAddress);
        }else{
            init=Init(_taskContractCreatorAddress,_centralContractAddress,_centralContractCreatorAddress,"no-autoPY",false,_commissionAddress);
        }

        resultLock=address(0);
    }

    //向合约付钱
    function PayBounty() payable public{
        require(msg.value>0&&!init.taskState);
        emit ReturnPayBounty(msg.value);
    }

    //注册设备
    function registrationMachine(address payable _machineContractCreatorAddress,address _machineContractAddress,uint _machineUnitPrice) public OnlyCentralContractCanCall{
        require(init.taskState==false&&register.machineContractCreatorAddress==address(0));
        register=Register(_machineContractCreatorAddress,_machineContractAddress,_machineUnitPrice);
    }

    //设置运行时间和结果文件数字摘要
    function setRunTimeAndResultFilesDigitalAbstract(string memory _resultFilesDigitalAbstract,uint _runTime) public OnlyCentralContractCanCall{
        require(resultLock==address(0)&&init.taskState==false&&register.machineContractCreatorAddress!=address(0));
        uint _machineBounty=((_runTime/60)+1)*register.machineUnitPrice;
        uint _surplusBounty=address(this).balance-_machineBounty;
        if(keccak256(abi.encodePacked(_resultFilesDigitalAbstract))==keccak256(abi.encodePacked("Machine hosting time has arrived!"))){
            resultInformation=ResultInformation(_resultFilesDigitalAbstract,_runTime,0,_machineBounty,_surplusBounty);
        }else{
            resultInformation=ResultInformation(_resultFilesDigitalAbstract,_runTime,now+3,_machineBounty,_surplusBounty);
        }
        init.taskState=true;
        resultLock=init.taskContractCreatorAddress;

        if(_surplusBounty!=0){
            init.taskContractCreatorAddress.transfer(_surplusBounty);
            emit DSurplusBounty(_surplusBounty);
        }
    }

    //提取赏金
    function drawMachineBounty() public OnlyCentralContractCanCall{
        require (
            register.machineContractCreatorAddress!=address(0)
            &&now>=resultInformation.waitingConfirmationTime
            &&keccak256(abi.encodePacked(resultInformation.resultFilesDigitalAbstract))!=keccak256(abi.encodePacked())
            &&resultInformation.runTime!=0
        );
        if(resultInformation.machineBounty!=0){
            uint commission=resultInformation.machineBounty/10;
            init.commissionAddress.transfer(commission);
            register.machineContractCreatorAddress.transfer(resultInformation.machineBounty-commission);
            emit DMachineBounty(resultInformation.machineBounty);
        }

    }

    //删除任务（在没有被匹配前可用）
    function deleteTask() public OnlyTaskContractCreatorCanCall{
        require(register.machineContractCreatorAddress==address(0));
        init.taskContractCreatorAddress.transfer(address(this).balance);
        init.taskState=true;
    }

    //终止结束任务（任务运行中可用）
    function taskEnd(uint _userBountyRatio) public OnlyCentralContractCanCall{
        require(_userBountyRatio>=0&&_userBountyRatio<=10);
        uint _surplusBounty;
        uint _machineBounty;
        if(_userBountyRatio==0){
            _surplusBounty=0;
            _machineBounty=address(this).balance;
        }else if(_userBountyRatio==10){
            _surplusBounty=address(this).balance;
            _machineBounty=0;
        }else{
            _surplusBounty=address(this).balance/10*_userBountyRatio;
            _machineBounty=address(this).balance-_surplusBounty;
        }

        require(_surplusBounty+_machineBounty==address(this).balance);
        resultInformation=ResultInformation("Task terminated, no digit summary!",1,0,_machineBounty,_surplusBounty);
        if(_surplusBounty!=0){
            init.taskContractCreatorAddress.transfer(_surplusBounty);
        }
        init.taskState=true;
    }

    //获取初始结构体信息（任务合约创建者地址、任务文件数字摘要）
    function getInit() public view returns(address payable,string memory,bool){
        return (
        init.taskContractCreatorAddress,
        init.taskFilesDigitalabstract,
        init.taskState
        );
    }

    //获取注册结构体信息（设备合约创建者地址、设备合约地址）
    function getRegister() public view returns(address,address,uint){
        return (register.machineContractCreatorAddress,register.machineContractAddress,register.machineUnitPrice);
    }

    //获取结果信息结构体信息（结果文件数字再要、运行时间、等待确认时间、设备提供方应得赏金、用户方剩余赏金）
    function getResultInformation() public view returns(string memory,uint,uint,uint,uint){
        if(resultInformation.waitingConfirmationTime>now){
            return (
            resultInformation.resultFilesDigitalAbstract,
            resultInformation.runTime,
            resultInformation.waitingConfirmationTime-now,
            resultInformation.machineBounty,
            resultInformation.surplusBounty
            );
        }else{
            return (
            resultInformation.resultFilesDigitalAbstract,
            resultInformation.runTime,
            0,
            resultInformation.machineBounty,
            resultInformation.surplusBounty
            );
        }
    }

    //获取合约余额
    function getBalance() public view returns(uint){
        return address(this).balance;
    }

    //任务合约创建者权限
    modifier OnlyTaskContractCreatorCanCall(){
        require(msg.sender==init.taskContractCreatorAddress);
        _;
    }

    //设备合约创建者权限
    modifier OnlyMachineContractCreatorAddressCanCall(){
        require(msg.sender==register.machineContractCreatorAddress);
        _;
    }

    //中心合约创建者权限
    modifier OnlyCentralContractCreatorCanCall(){
        require(msg.sender==init.centralContractCreatorAddress);
        _;
    }

    //中心合约权限
    modifier OnlyCentralContractCanCall(){
        require(msg.sender==init.centralContractAddress);
        _;
    }

}
