import React from "react";

const About = (): JSX.Element => {
  return (
    <div className="m-8">
      <h2 className="mt-2">What is Dedes?</h2>
      <p>
        Dedes is a <b>de</b>centralized computer aided <b>des</b>ign (
        <a href="https://en.wikipedia.org/wiki/Computer-aided_design">CAD</a>)
        licensing application (<a href="https://ethereum.org/en/dapps/">dapp</a>
        {") "}
        built on the <a href="https://ethereum.org/en/">Ethereum</a> blockchain.
      </p>
      <h2 className="mt-2">How does it work?</h2>
      <p>
        Dedes is completely open platform for designers to mint CAD files as non
        fungible tokens{" ("}
        <a href="https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/">
          ERC1155 NFTs
        </a>
        {") "}
        and configure transparent{" "}
        <a href="https://ethereum.org/en/developers/docs/smart-contracts/">
          smart contract
        </a>{" "}
        licensing agreements with consumers/manufacturers of those designs. You
        can also sell your designs as standard NFTs through open platforms such
        as <a href="https://opensea.io/">OpenSea</a>.
      </p>
      <h2 className="mt-2">What do you really mean by decentralized?</h2>
      <p>
        There is no gatekeeper. No platform or company that will eventually
        change it's terms of service behind this tool. You are in{" "}
        <b>complete control</b>, you can even cache a copy of this website which
        is a static webpage that doesn't talk to any server but instead is
        hosted on <a href="https://ipfs.io/">IPFS</a> and served directly from
        your computer via other IPFS nodes (including some that we the
        developers of Dedes are running). You upload your designs to IPFS and
        can verify that they are available for your customers (we will aim to
        also pin your designs once minted, to increase decentralization and
        resiliency). You execute minting contracts locally in your browser,
        communicating directly with the Ethereum blockchain. You can even run
        your own Ethereum node is you so wish!
      </p>
      <h2 className="mt-2">So how do I get started?</h2>
      <h3 className="mt-2">
        <b>I'm a designer</b>
      </h3>
      <ol className="list-decimal list-inside">
        <li>
          Upload you designs to an IPFS pinning service of your choice, we
          recommend <a href="https://pinata.cloud/">Pinata</a>,{" "}
          <a href="https://nft.storage/">NFT.Storage</a> or{" "}
          <a href="https://web3.storage/">web3.storage</a>.
        </li>
        <li>
          Take the the unique and deterministic content hash identity to execute
          the NFT minting transaction. Configure tags and other properties
          associated with your design. Once minted, you will now posses a unique
          and non-fungible token that represents your design.
        </li>
        <li>
          Configure a licensing agreement for your design. You can then execute
          a second ethereum smart contract transaction to define a license for
          your design. This might be part of step two, we haven't decided yet!
        </li>
      </ol>
      <h3 className="mt-2">
        <b>I'm a manufacturer/consumer</b>
        <ol className="list-decimal list-inside">
          <li>Browse OpenSea or inbuilt direct NFT browsing tools</li>
          <li>
            Load the desired Deded NFT into the viewer and execute contract to
            either buy (using OpenSea/Dedes webapp) or License (Dedes webapp).
          </li>
        </ol>
      </h3>
      <h2 className="mt-2">
        But wait! Designs are available for anyone to download from IFPS,
        without paying anything?
      </h2>
      <p>
        Yes, we could have some form of encryption however, it will only create
        complexity without benefit. Anyone could always license your design for
        a short while, download it and then upload in unencrypted form for other
        to use. We feel the true solution will be a social transition whereby we
        will provide embeddable widgets that manufacturers can use to provide
        that this design is either owned or licensed by a particular person or
        company and valid at the point in time. Ultimately we want your
        customers to adopt a <i>"don't trust, verify"</i> approach to using your
        designs and ensuring that the original owner is either getting
        attribution via licensing payments or has been correctly compensated and
        willing sold the design to this manufacturer/consumer. The true solution
        is for purchasers of goods derived from your designs to be able to
        verify directly on the blockchain that the design ownership/license is
        valid at the point of sale.
      </p>
    </div>
  );
};

export default About;
