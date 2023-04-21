// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "https://github.com/chiru-labs/ERC721A/blob/main/contracts/ERC721A.sol";

contract erc721Demo is ERC721A{
    ERC721A private erc721AAddress;

    mapping(address => uint256) numOfTokens;

    constructor(string memory _name, string memory _symbol) ERC721A(_name, _symbol) {        
    }

    function mintbatch (uint256 quantity) external {
        require(quantity <=5 , "Batch size exceeded!");
        numOfTokens[msg.sender] += quantity;
        _mint(msg.sender, quantity);

    }

    function getMintedNFT() external view returns(uint256[] memory){
        uint256 num = numOfTokens[msg.sender];
        uint256[] memory ownedNFT = new uint256[](num);
        uint256 lastindex = _nextTokenId();
        uint256 ownedCount = 0;
        for(uint256 i=0; i<lastindex; i++){
            if(ownerOf(i) == msg.sender){
                ownedNFT[ownedCount] = i;
                ownedCount++;
            }
        }
        return ownedNFT;
    }

}