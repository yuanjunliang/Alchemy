// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// import "@openzeppelin/contracts/access/Ownable.sol";

contract AlchemyNFT is ERC721, ERC721Enumerable, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public constant MAX_SUPPLY = 10000;
    mapping(address => bool) hasMint;

    constructor() ERC721("Alchemy", "ALC") {}

    function mint(uint256 _tokenId, string calldata _uri) public {
        require(!hasMint[msg.sender], "Already mint");
        require(_tokenIds.current() <= MAX_SUPPLY, "can not mint more");
        hasMint[msg.sender] = true;
        _safeMint(msg.sender, _tokenId);
        _setTokenURI(_tokenId, _uri);

        _tokenIds.increment();
    }

    function _beforeTokenTransfer(
        address _from,
        address _to,
        uint256 _tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(_from, _to, _tokenId);
    }

    function _burn(uint256 _tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(_tokenId);
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(_tokenId);
    }

    function supportsInterface(bytes4 _interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(_interfaceId);
    }
}
