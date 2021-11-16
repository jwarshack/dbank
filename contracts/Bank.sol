//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "./Token.sol";

contract Bank {

    Token private token;

    mapping(address => uint256) public ethBalance;
    mapping(address => uint256) public depositStart;
    mapping(address => bool) public isDeposited;

    event Deposit(
        address indexed user,
        uint256 etherAmount,
        uint256 timeStart
    );

    event Withdraw(
        address indexed user,
        uint256 etherAmount,
        uint depositTime,
        uint256 interest

    );
    constructor(Token _token) {
        token = _token;

    }

    function deposit() public payable {
        require(isDeposited[msg.sender] == false, "Deposit already active");
        require(msg.value >= 1e16, "Must be greater than or equal to 0.01 ETH");
        ethBalance[msg.sender] += msg.value;
        depositStart[msg.sender] += block.timestamp;

        isDeposited[msg.sender] = true;

        emit Deposit(msg.sender, msg.value, block.timestamp);

    }

    function widthraw() public payable {
        require(isDeposited[msg.sender] == true, 'Deposit must be active');
        uint256 userBalance = ethBalance[msg.sender];

        uint256 depositTime = block.timestamp - depositStart[msg.sender];
        uint256 interestPerSec = 31668017 * (userBalance / 1e16);
        uint256 interest = interestPerSec * depositTime;


        payable(msg.sender).transfer(userBalance);
        token.mint(msg.sender, interest);

        depositStart[msg.sender] = 0;
        ethBalance[msg.sender] = 0;
        isDeposited[msg.sender] = false;

        emit Withdraw(msg.sender, userBalance, depositTime, interest);
    }

    function deposit() public payable {
        /* 
            Some other code...
        */

        emit Deposit(msg.sender, msg.value, block.timestamp);
    }


}
