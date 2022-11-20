// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";

contract DesineToken is ERC1155, Ownable {
    // TODO Add token id array and count (for enumeration)
    mapping(uint256 => string) private _cids;
    mapping(uint256 => string) private _metadata_cids;

    constructor() ERC1155("") {
        console.log("Constructing DesineToken contract");
    }

    function mint(string memory cid, string memory metadata_cid)
        public
        onlyOwner
    {
        console.log(
            "Attempting to minting DesineToken for owner %s: cid: %s, metadata_cid",
            msg.sender,
            cid,
            metadata_cid
        );
        // Check if the token already exists and revert if so.
        uint256 tokenId = uint256(keccak256(abi.encodePacked(cid)));
        console.log("Computed token id", tokenId);
        _cids[tokenId] = cid;
        _metadata_cids[tokenId] = metadata_cid;
        // TODO Add token id to array and increment count (for enumeration)
        _mint(msg.sender, tokenId, 1, "");
    }
}
