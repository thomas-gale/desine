# dedes
Decentralized computer aided design licensing concept

## TODO
### Storage
#### IPFS (Option 1 is far easier for first prototype)
1. Integrate a mechanism to prompt users to sign up for a decentralized storage provider and cache key in browser
  - nft.storage is a strong contender (which currently free storage on IPFS)

2. Write a small heroki app that has a dedes set of nft.storage keys embedded. 
  - Only upload if user has submitted/signed some form of pre-commitment contract (to prevent abuse of the nft.storage token / other IPFS service tokens in the future)
  - Return the uploaded IPFS key once all is verified.

#### Something with Arweave?

### Viewer
#### Forge Viewer (Autodesk tech & centralized)
#### Use OCCT Import JS (Import various CAD formats and make them renderable in three.js)
- https://jsfiddle.net/kovacsv/rzhq9gxj

### Contract
#### 1. Storing the CAD as NFT
- ERC1155 smart contract with specific URI mapping stored for each token that is the IPFS content address.
- The Dedes smart contract owner can update a field which can modify the gateway URL for viewable platforms (so the user can view their asset on OpenSea for example)

#### 2. Writing a NFT Leasing/Licensing Contract
- Inspiration: https://github.com/degen-vc/contracts-nft

#### 3. Make the licencable design NFTs and contracts discoverable via https://thegraph.com/en/
