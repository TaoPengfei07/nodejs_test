const path = require('path');
const fs = require('fs');
const solc = require('czr-solc');

const srcpath = path.resolve(__dirname,'contracts','CRC20.sol');
const source = fs.readFileSync(srcpath,'utf-8');

// console.log(source)

let input={
    "language":'Solidity',
    "sources":{
        'CRC20.sol':{
            "content":source
        }
    },
    "settings":{
        "optimizer": {
            "enabled": true,
            "runs": 200
        },
        "outputSelection": {
            '*':{
                '': [ 'legacyAST' ],
                '*': [ 'abi', 'metadata', 'devdoc', 'userdoc', 'evm.legacyAssembly', 'evm.bytecode', 'evm.deployedBytecode', 'evm.methodIdentifiers', 'evm.gasEstimates' ]
            }
        }
    }
}
// let input={"language":"Solidity","sources":{"CRC20.sol":{"content":"pragma solidity >=0.4.22 <0.6.0;\r\n\r\ncontract owned {\r\n    address public owner;\r\n\r\n    constructor() public {\r\n        owner = msg.sender;\r\n    }\r\n\r\n    modifier onlyOwner {\r\n        require(msg.sender == owner);\r\n        _;\r\n    }\r\n\r\n    function transferOwnership(address newOwner) onlyOwner public {\r\n        owner = newOwner;\r\n    }\r\n}\r\n\r\ninterface tokenRecipient { function receiveApproval(address _from, uint256 _value, address _token, bytes calldata _extraData) external; }\r\n\r\ncontract TokenERC20 {\r\n    // Public variables of the token\r\n    string public name;\r\n    string public symbol;\r\n    uint8 public decimals = 18;\r\n    // 18 decimals is the strongly suggested default, avoid changing it\r\n    uint256 public totalSupply;\r\n\r\n    // This creates an array with all balances\r\n    mapping (address => uint256) public balanceOf;\r\n    mapping (address => mapping (address => uint256)) public allowance;\r\n\r\n    // This generates a public event on the blockchain that will notify clients\r\n    event Transfer(address indexed from, address indexed to, uint256 value);\r\n    \r\n    // This generates a public event on the blockchain that will notify clients\r\n    event Approval(address indexed _owner, address indexed _spender, uint256 _value);\r\n\r\n    // This notifies clients about the amount burnt\r\n    event Burn(address indexed from, uint256 value);\r\n\r\n    /**\r\n     * Constrctor function\r\n     *\r\n     * Initializes contract with initial supply tokens to the creator of the contract\r\n     */\r\n    constructor(\r\n        uint256 initialSupply,\r\n        string memory tokenName,\r\n        string memory tokenSymbol\r\n    ) public {\r\n        totalSupply = initialSupply * 10 ** uint256(decimals);  // Update total supply with the decimal amount\r\n        balanceOf[msg.sender] = totalSupply;                    // Give the creator all initial tokens\r\n        name = tokenName;                                       // Set the name for display purposes\r\n        symbol = tokenSymbol;                                   // Set the symbol for display purposes\r\n    }\r\n\r\n    /**\r\n     * Internal transfer, only can be called by this contract\r\n     */\r\n    function _transfer(address _from, address _to, uint _value) internal {\r\n        // Prevent transfer to 0x0 address. Use burn() instead\r\n        require(_to != address(0x0));\r\n        // Check if the sender has enough\r\n        require(balanceOf[_from] >= _value);\r\n        // Check for overflows\r\n        require(balanceOf[_to] + _value > balanceOf[_to]);\r\n        // Save this for an assertion in the future\r\n        uint previousBalances = balanceOf[_from] + balanceOf[_to];\r\n        // Subtract from the sender\r\n        balanceOf[_from] -= _value;\r\n        // Add the same to the recipient\r\n        balanceOf[_to] += _value;\r\n        emit Transfer(_from, _to, _value);\r\n        // Asserts are used to use static analysis to find bugs in your code. They should never fail\r\n        assert(balanceOf[_from] + balanceOf[_to] == previousBalances);\r\n    }\r\n\r\n    /**\r\n     * Transfer tokens\r\n     *\r\n     * Send `_value` tokens to `_to` from your account\r\n     *\r\n     * @param _to The address of the recipient\r\n     * @param _value the amount to send\r\n     */\r\n    function transfer(address _to, uint256 _value) public returns (bool success) {\r\n        _transfer(msg.sender, _to, _value);\r\n        return true;\r\n    }\r\n\r\n    /**\r\n     * Transfer tokens from other address\r\n     *\r\n     * Send `_value` tokens to `_to` in behalf of `_from`\r\n     *\r\n     * @param _from The address of the sender\r\n     * @param _to The address of the recipient\r\n     * @param _value the amount to send\r\n     */\r\n    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {\r\n        require(_value <= allowance[_from][msg.sender]);     // Check allowance\r\n        allowance[_from][msg.sender] -= _value;\r\n        _transfer(_from, _to, _value);\r\n        return true;\r\n    }\r\n\r\n    /**\r\n     * Set allowance for other address\r\n     *\r\n     * Allows `_spender` to spend no more than `_value` tokens in your behalf\r\n     *\r\n     * @param _spender The address authorized to spend\r\n     * @param _value the max amount they can spend\r\n     */\r\n    function approve(address _spender, uint256 _value) public\r\n        returns (bool success) {\r\n        allowance[msg.sender][_spender] = _value;\r\n        emit Approval(msg.sender, _spender, _value);\r\n        return true;\r\n    }\r\n\r\n    /**\r\n     * Set allowance for other address and notify\r\n     *\r\n     * Allows `_spender` to spend no more than `_value` tokens in your behalf, and then ping the contract about it\r\n     *\r\n     * @param _spender The address authorized to spend\r\n     * @param _value the max amount they can spend\r\n     * @param _extraData some extra information to send to the approved contract\r\n     */\r\n    function approveAndCall(address _spender, uint256 _value, bytes memory _extraData)\r\n        public\r\n        returns (bool success) {\r\n        tokenRecipient spender = tokenRecipient(_spender);\r\n        if (approve(_spender, _value)) {\r\n            spender.receiveApproval(msg.sender, _value, address(this), _extraData);\r\n            return true;\r\n        }\r\n    }\r\n\r\n    /**\r\n     * Destroy tokens\r\n     *\r\n     * Remove `_value` tokens from the system irreversibly\r\n     *\r\n     * @param _value the amount of money to burn\r\n     */\r\n    function burn(uint256 _value) public returns (bool success) {\r\n        require(balanceOf[msg.sender] >= _value);   // Check if the sender has enough\r\n        balanceOf[msg.sender] -= _value;            // Subtract from the sender\r\n        totalSupply -= _value;                      // Updates totalSupply\r\n        emit Burn(msg.sender, _value);\r\n        return true;\r\n    }\r\n\r\n    /**\r\n     * Destroy tokens from other account\r\n     *\r\n     * Remove `_value` tokens from the system irreversibly on behalf of `_from`.\r\n     *\r\n     * @param _from the address of the sender\r\n     * @param _value the amount of money to burn\r\n     */\r\n    function burnFrom(address _from, uint256 _value) public returns (bool success) {\r\n        require(balanceOf[_from] >= _value);                // Check if the targeted balance is enough\r\n        require(_value <= allowance[_from][msg.sender]);    // Check allowance\r\n        balanceOf[_from] -= _value;                         // Subtract from the targeted balance\r\n        allowance[_from][msg.sender] -= _value;             // Subtract from the sender's allowance\r\n        totalSupply -= _value;                              // Update totalSupply\r\n        emit Burn(_from, _value);\r\n        return true;\r\n    }\r\n}\r\n\r\n/******************************************/\r\n/*       ADVANCED TOKEN STARTS HERE       */\r\n/******************************************/\r\n\r\ncontract MyAdvancedToken is owned, TokenERC20 {\r\n\r\n    uint256 public sellPrice;\r\n    uint256 public buyPrice;\r\n\r\n    mapping (address => bool) public frozenAccount;\r\n\r\n    /* This generates a public event on the blockchain that will notify clients */\r\n    event FrozenFunds(address target, bool frozen);\r\n\r\n    /* Initializes contract with initial supply tokens to the creator of the contract */\r\n    constructor(\r\n        uint256 initialSupply,\r\n        string memory tokenName,\r\n        string memory tokenSymbol\r\n    ) TokenERC20(initialSupply, tokenName, tokenSymbol) public {}\r\n\r\n    /* Internal transfer, only can be called by this contract */\r\n    function _transfer(address _from, address _to, uint _value) internal {\r\n        require (_to != address(0x0));                          // Prevent transfer to 0x0 address. Use burn() instead\r\n        require (balanceOf[_from] >= _value);                   // Check if the sender has enough\r\n        require (balanceOf[_to] + _value >= balanceOf[_to]);    // Check for overflows\r\n        require(!frozenAccount[_from]);                         // Check if sender is frozen\r\n        require(!frozenAccount[_to]);                           // Check if recipient is frozen\r\n        balanceOf[_from] -= _value;                             // Subtract from the sender\r\n        balanceOf[_to] += _value;                               // Add the same to the recipient\r\n        emit Transfer(_from, _to, _value);\r\n    }\r\n\r\n    /// @notice Create `mintedAmount` tokens and send it to `target`\r\n    /// @param target Address to receive the tokens\r\n    /// @param mintedAmount the amount of tokens it will receive\r\n    function mintToken(address target, uint256 mintedAmount) onlyOwner public {\r\n        balanceOf[target] += mintedAmount;\r\n        totalSupply += mintedAmount;\r\n        emit Transfer(address(0), address(this), mintedAmount);\r\n        emit Transfer(address(this), target, mintedAmount);\r\n    }\r\n\r\n    /// @notice `freeze? Prevent | Allow` `target` from sending & receiving tokens\r\n    /// @param target Address to be frozen\r\n    /// @param freeze either to freeze it or not\r\n    function freezeAccount(address target, bool freeze) onlyOwner public {\r\n        frozenAccount[target] = freeze;\r\n        emit FrozenFunds(target, freeze);\r\n    }\r\n\r\n    /// @notice Allow users to buy tokens for `newBuyPrice` eth and sell tokens for `newSellPrice` eth\r\n    /// @param newSellPrice Price the users can sell to the contract\r\n    /// @param newBuyPrice Price users can buy from the contract\r\n    function setPrices(uint256 newSellPrice, uint256 newBuyPrice) onlyOwner public {\r\n        sellPrice = newSellPrice;\r\n        buyPrice = newBuyPrice;\r\n    }\r\n\r\n    /// @notice Buy tokens from contract by sending ether\r\n    function buy() payable public {\r\n        uint amount = msg.value / buyPrice;                 // calculates the amount\r\n        _transfer(address(this), msg.sender, amount);       // makes the transfers\r\n    }\r\n\r\n    /// @notice Sell `amount` tokens to contract\r\n    /// @param amount amount of tokens to be sold\r\n    function sell(uint256 amount) public {\r\n        address myAddress = address(this);\r\n        require(myAddress.balance >= amount * sellPrice);   // checks if the contract has enough ether to buy\r\n        _transfer(msg.sender, address(this), amount);       // makes the transfers\r\n        msg.sender.transfer(amount * sellPrice);            // sends ether to the seller. It's important to do this last to avoid recursion attacks\r\n    }\r\n}"}},"settings":{"optimizer":{"enabled":true,"runs":200},"outputSelection":{"*":{"":["legacyAST"],"*":["abi","metadata","devdoc","userdoc","evm.legacyAssembly","evm.bytecode","evm.deployedBytecode","evm.methodIdentifiers","evm.gasEstimates"]}}}}
// console.log(JSON.stringify(input))

// let output = JSON.parse(solc.compile(JSON.stringify(input)));
let output = JSON.parse(solc.compile(JSON.stringify(input)));

// console.log(output);

// const result = solc.compile(source);

// console.log(output.contracts['CRC20.sol']['MyAdvancedToken']);

let contractByteCode=output.contracts['CRC20.sol']['MyAdvancedToken'].evm.bytecode.object
let CZRMainNetMappingByteCode=output.contracts['CRC20.sol']['CZRMainNetMapping'].evm.bytecode.object
let methodIdentifiers=output.contracts['CRC20.sol']['MyAdvancedToken'].evm.methodIdentifiers
let CZRMainNetMappingmethodIdentifiers=output.contracts['CRC20.sol']['CZRMainNetMapping'].evm.methodIdentifiers
let abi=output.contracts['CRC20.sol']['MyAdvancedToken']['abi']
let CZRMainNetMappingabi=output.contracts['CRC20.sol']['CZRMainNetMapping']['abi']
Object.assign(methodIdentifiers,CZRMainNetMappingmethodIdentifiers)
// console.log(abi.length);
// console.log(CZRMainNetMappingabi);
// abi.concat(CZRMainNetMappingabi)
abi.push(CZRMainNetMappingabi[0])
abi.push(CZRMainNetMappingabi[1])
abi.push(CZRMainNetMappingabi[2])
abi.push(CZRMainNetMappingabi[3])
// console.log(abi.length);

// Object.assign(abi,CZRMainNetMappingabi)

let keys=[];
let values=Object.values(methodIdentifiers)
let methodBytecode={}

for(let k in Object.keys(methodIdentifiers)){
    keys.push(Object.keys(methodIdentifiers)[k].split('(')[0]);
    methodBytecode[keys[k]]=values[k]
}

// console.log(CZRMainNetMappingByteCode,abi,methodBytecode);

module.exports={
    contractByteCode:contractByteCode,
    CZRMainNetMappingByteCode:CZRMainNetMappingByteCode,
    methodBytecode:methodBytecode,
    abi:abi
}

