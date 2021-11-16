//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {

    address minter;

    constructor() ERC20("ChowToken", "CHOW") {
        minter = msg.sender;

    }

    event MinterChanged(
        address indexed from,
        address to
    );

    function passMinterRole(address dBank) public returns(bool) {
        require(msg.sender == minter, "Only owner can pass minter role");
        minter = dBank;

        emit MinterChanged(msg.sender, dBank);
        return true;
    }

    function mint(address account, uint256 amount) public {
        require(msg.sender == minter, "Msg.sender does not have the minter role");
        _mint(account, amount);
    }

}