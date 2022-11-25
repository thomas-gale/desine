import React from "react";

const About = (): JSX.Element => {
  return (
    <div className="m-8">
      <h2 className="mt-2">What is Desine?</h2>
      <p>
        Desine is a <b>de</b>centralized computer-aided design (
        <a href="https://en.wikipedia.org/wiki/Computer-aided_design">CAD</a>)
        licensing application (<a href="https://ethereum.org/en/dapps/">dapp</a>
        {") "}
        built on the <a href="https://ethereum.org/en/">Ethereum</a> blockchain.
      </p>
      <h2 className="mt-2">How does it work?</h2>
      <p>
        Desine is a completely open platform for designers to mint CAD files as
        non-fungible tokens{" ("}
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
      <h2 className="mt-2">What do you mean by decentralized?</h2>
      <p>
        There is no gatekeeper. No platform or company will eventually change
        its terms of service behind this tool. You are in{" "}
        <b>complete control</b>, you can even cache a copy of{" "}
        <a href="http://desine.eth.limo/">the Desine web app</a> which is a
        static webpage that does not talk to any server but instead is hosted on{" "}
        <a href="https://ipfs.io/">IPFS</a> and served directly to your computer
        from other IPFS nodes pinning this page (including some that we, the
        developers of Desine, are running). You upload your designs to IPFS
        before minting (we will try to also pin your designs once you have
        successfully minted them minted - to increase decentralization and
        resiliency). You execute minting/licensing contracts locally in your
        browser, communicating directly with the Ethereum blockchain. You can
        even run your own Ethereum node if you so wish!
      </p>
      <h2 className="mt-2">So how do I get started?</h2>
      <h3 className="mt-2">
        <b>I am a designer</b>
      </h3>
      <ol className="list-decimal list-inside">
        <li>
          Upload your designs to an IPFS pinning service of your choice, we
          recommend <a href="https://pinata.cloud/">Pinata</a>,{" "}
          <a href="https://nft.storage/">NFT.Storage</a> or{" "}
          <a href="https://web3.storage/">web3.storage</a>.
        </li>
        <li>
          Take the unique and deterministic{" "}
          <a href="ipns://docs.ipfs.tech/concepts/content-addressing/">
            content identifier
          </a>{" "}
          and paste it into the NFT minting transaction inputs. The minting
          contract will check that that content hash has not already been minted
          by somebody else. You will also configure tags and other properties
          associated with your design. Once minted, you will now possess a
          unique NFT that represents your design.
        </li>
        <li>
          Configure a licensing agreement for your design. You can then execute
          a second Ethereum smart contract transaction to define a license for
          your design. This might be part of step two, we have not decided yet!
        </li>
      </ol>
      <h3 className="mt-2">
        <b>I am a manufacturer/consumer</b>
        <ol className="list-decimal list-inside">
          <li>Browse OpenSea or inbuilt Desine browsing tools</li>
          <li>
            Load the desired desine NFT into the viewer and execute a contract
            to either buy (using OpenSea/Desine web app) or License (Desine web
            app).
          </li>
        </ol>
      </h3>
      <h2 className="mt-2">
        Is not the blockchain expensive (e.g. high gas fees)?
      </h2>
      <p>
        We plan on deploying this application on{" "}
        <a href="https://ethereum.org/en/layer-2/">layer 2s</a> such as{" "}
        <a href="https://zksync.io/">zkSync</a> which will significantly reduce
        the costs of minting and licensing to a few cents.
      </p>
      <h2 className="mt-2">
        But wait! My designs are available, unencrypted for anyone to download
        from IPFS, without paying anything!
      </h2>
      <p>
        Yes. While we could protect your design via some form of encryption,
        unfortunately, it will only create complexity without benefit. Anyone
        could always license your design for a short while, download it and then
        upload it in unencrypted form for others to use. We feel the true
        solution will be a <b>social movement</b> whereby we will provide
        embeddable widgets that manufacturers can use to provide that this
        design is either owned or licensed by a particular person or company and
        valid at the point in time. Ultimately we want end users to adopt a{" "}
        <i>do not trust, verify</i> approach to using your designs and ensuring
        that the original owner is either getting attribution via licensing
        payments or has been correctly compensated and has willing sold the
        design to this manufacturer/consumer. The true solution is for
        purchasers of goods derived from your designs to be able to verify
        directly on the blockchain that the design ownership/license is valid at
        the point of sale. This is how artwork NFTs work.
      </p>
      <h2 className="mt-2">
        Somebody has uploaded (plagiarized) my design(s) to desine, how do I
        stop them?
      </h2>
      <p>
        While, somebody can not mint an exact copy of your design (as the IPFS
        content hash is checked during the minting contract execution), sadly,
        in a trustless non-gatekept ecosystem, copying and derived works/blatant
        copies are very common. We do plan on implementing a means to try and
        contest a work, however, we fear this will lead to some form of
        centralization (which we do not want). OpenSea does have a ban list, we
        could see if there is a way to integrate something similar. We would
        probably require you to post some kind of collateral, and if it is deemed
        that work is not plagiarized, we would take a small fee in payment for
        whoever had to spend time appraised a false claim. However, if the claim
        is upheld, we will take only the gas fee to post a plagiarized warning
        against that desine NFT. Future consumers could be presented with that
        warning and link to your original work in the web app (they can then
        make an informed decision if to license your more original design).
      </p>
    </div>
  );
};

export default About;
