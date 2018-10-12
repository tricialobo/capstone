// pragma solidity ^0.4.17;

// contract BlockFactory {
//     address[] public deployedBlocks;

// function createBlock(uint bill) public {
//         address newBlock = new fundsTransfer(bill, msg.sender);
//         deployedBlocks.push(newBlock);
//     }

// function getDeployedBlocks() public view returns (address[]) {
//         return deployedBlocks;
//     }
// }


// contract fundsTransfer {
 
// //   uint public minimum;
//   address public manager;
//     function fundsTransfer(uint bill, address creator) public {
//         manager = creator;
//         // minimum = bill;
//     }
// function getContractAddress() constant returns (address) 
// 	{
// 		return this;
// 	}

// mapping(address => uint256) public balance;

// function deposit() payable public {
// //   require(msg.value==minimum);

// }

// function withdraw(address webdev, address grace) payable public {
//    uint toWebdev = address(this).balance*3/4;
//    uint toGrace = address(this).balance*1/4;
//    webdev.transfer(toWebdev);
//    balance[webdev]+=toWebdev;
//   grace.transfer(toGrace);
//    balance[grace] += toGrace;
   
//    }
   
   
//  function getBalance() public view returns (uint256) {
//        return address(this).balance;
//    }
// }

pragma solidity ^0.4.17;

contract BlockFactory {
    address[] public deployedBlocks;

function createBlock() public {
        address newBlock = new fundsTransfer(msg.sender);
        deployedBlocks.push(newBlock);
    }

function getDeployedBlocks() public view returns (address[]) {
        return deployedBlocks;
    }
}


contract fundsTransfer {
 
//   uint public minimum;
  address public manager;
    function fundsTransfer(address creator) public {
        manager = creator;
        // minimum = bill;
    }
function getContractAddress() constant returns (address) 
	{
		return this;
	}

mapping(address => uint256) public balance;

function deposit() payable public {
//   require(msg.value==minimum);

}

function withdraw(address webdev, address grace) payable public {
   uint toWebdev = address(this).balance*3/4;
   uint toGrace = address(this).balance*1/4;
   webdev.transfer(toWebdev);
   balance[webdev]+=toWebdev;
  grace.transfer(toGrace);
   balance[grace] += toGrace;
  // selfdestruct(grace);
   
   }
   
   
 function getBalance() public view returns (uint256) {
       return address(this).balance;
   }
}

