//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.3;

contract BuyMeACoffee {
    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }
    event NewMemo(address indexed from,uint256 timestamp,string name,string message);
    address payable owner;
    Memo[] memos;

    constructor() {
        owner = payable(msg.sender);
    }
    function getMemos() public view returns(Memo[] memory) {
        return memos;
    }

    function buyCoffee(string calldata _name, string calldata _message) public payable {
        require(msg.value == 3 * 1e15,"coffee price is 0.003 Ether");

        memos.push(Memo({
            from: msg.sender,
            timestamp: block.timestamp,
            name: _name,
            message: _message
        }));
        emit NewMemo(msg.sender, block.timestamp, _name, _message);
    }

    function withdraw(address payable _receiver) public {
        require(address(this).balance > 0,"no money to withdraw");
        bool success = _receiver.send(address(this).balance);
        require(success,"withdraw failed");
    }
}