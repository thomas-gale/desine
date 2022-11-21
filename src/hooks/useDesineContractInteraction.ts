import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useCallback, useMemo } from "react";
import { DesineToken__factory } from "../../typechain-types";
import { config } from "../env/config";

export const useDesineContractInteraction = (
  cid: string,
  metadataCid: string,
  previewCardMetadataLoaded: boolean
) => {
  const {
    account,
    connector,
    library: provider,
    active,
  } = useWeb3React<Web3Provider>();

  const canMint = useMemo(
    () =>
      previewCardMetadataLoaded &&
      cid &&
      metadataCid &&
      account &&
      provider &&
      active,
    [previewCardMetadataLoaded, cid, metadataCid, account, provider, active]
  );

  const mint = useCallback(async () => {
    if (!canMint || !provider || !account) return;

    // Ethers code
    console.log("About to use ethers.js to mint NFT");

    console.log("Using account: ", account);

    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    console.log(provider);

    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner();

    // Look up the current block number
    console.log(await provider.getBlockNumber());

    // Get balance of account
    console.log(
      "%s ETH",
      ethers.utils.formatEther(await provider.getBalance(account))
    );

    const desineTokenContract = DesineToken__factory.connect(
      config.settings.desineTokenAddress,
      signer
    );
    console.log(desineTokenContract);
    console.log(
      "Number of Tokens: ",
      await desineTokenContract.getNumberTokenIds()
    );

    try {
      await desineTokenContract.mint(cid, metadataCid);
    } catch (error) {
      console.log(error);
    }
  }, [canMint, cid, metadataCid, connector, active, provider, account]);

  return { mint, canMint };
};
