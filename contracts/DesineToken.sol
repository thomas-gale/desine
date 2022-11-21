// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

import "hardhat/console.sol";

contract DesineToken is ERC1155 {
    uint256[] public tokenIds;
    mapping(uint256 => string) public cids;
    mapping(uint256 => string) public metadataCids;

    constructor() ERC1155("") {
        console.log("Constructing DesineToken contract");
    }

    function getNumberTokenIds() public view returns (uint256) {
        return tokenIds.length;
    }

    function getTokenIds() public view returns (uint256[] memory) {
        return tokenIds;
    }

    // TODO check if rather than hash, which has probabilistic clash, we could convert cid (base58) to uint256 directly
    function computeTokenId(string memory cid) public pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(cid)));
    }

    function isCidAlreadyMinted(string memory cid) public view returns (bool) {
        uint256 tokenId = computeTokenId(cid);
        return bytes(cids[tokenId]).length == 0;
    }

    function mint(string memory cid, string memory metadataCid) public {
        console.log(
            "DesineToken.mint: minter %s: cid: %s, metadata_cid:",
            msg.sender,
            cid,
            metadataCid
        );

        uint256 tokenId = computeTokenId(cid);
        console.log("Computed uint256 token id:", tokenId);

        // Check if the token already exists and revert if so.
        require(
            bytes(cids[tokenId]).length == 0,
            "DesineToken.mint: token already exists"
        );

        tokenIds.push(tokenId);
        cids[tokenId] = cid;
        metadataCids[tokenId] = metadataCid;
        _mint(msg.sender, tokenId, 1, "");
    }

    function balanceOfCid(address account, string memory cid)
        public
        view
        returns (uint256)
    {
        console.log("DesineToken.balanceOf: account %s, id %s", account, cid);
        return super.balanceOf(account, computeTokenId(cid));
    }
}
