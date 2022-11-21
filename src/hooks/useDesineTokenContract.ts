import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { BigNumber, ethers } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DesineToken__factory } from "../../typechain-types";
import { config } from "../env/config";

export type DesineTokenContractMintingStatus =
  | "idle"
  | "disconnected"
  | "checking"
  | "minted"
  | "notMinted"
  | "error";

export const useDesineTokenContract = () => {
  const { account, library: provider, active } = useWeb3React<Web3Provider>();
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(
    null
  );
  useEffect(() => {
    (async () => {
      if (!provider) return;
      // MetaMask requires requesting permission to connect users accounts
      await provider.send("eth_requestAccounts", []);

      // The MetaMask plugin also allows signing transactions to
      // send ether and pay to change state within the blockchain.
      // For this, you need the account signer...
      setSigner(provider.getSigner());
    })();
  }, [provider]);

  const desineTokenContract = useMemo(() => {
    if (!signer) return null;
    return DesineToken__factory.connect(
      config.settings.desineTokenAddress,
      signer
    );
  }, [signer]);

  return { active, provider, account, signer, desineTokenContract };
};

export const useDesineTokenContractForBrowsing = () => {
  const { active, desineTokenContract } = useDesineTokenContract();
  // List of all the minted NFTs TODO - check scaling properties of this (will we need to paginate?)
  const [mintedTokenIds, setMintedTokenIds] = useState<BigNumber[]>([]);
  useEffect(() => {
    (async () => {
      if (!desineTokenContract) return;
      setMintedTokenIds(await desineTokenContract.getTokenIds());
    })();
  }, [desineTokenContract]);

  return { active, mintedTokenIds };
};

export const useDesineTokenContractForMinting = (
  cid: string,
  metadataCid: string,
  previewCardMetadataLoaded: boolean
) => {
  const { active, provider, account, signer, desineTokenContract } =
    useDesineTokenContract();

  // Checking if the user has already minted the NFT
  const [isCidMintedStatus, setIsCidMintedStatus] =
    useState<DesineTokenContractMintingStatus>("idle");
  const [checkedCid, setCheckedCid] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      if (!cid) {
        setIsCidMintedStatus("idle");
        setCheckedCid(null);
        return;
      }
      if (!active || !provider || !account || !desineTokenContract) {
        setIsCidMintedStatus("disconnected");
        setCheckedCid(null);
        return;
      }

      if (isCidMintedStatus === "checking" || cid === checkedCid) return;
      setIsCidMintedStatus("checking");
      setCheckedCid(cid);

      try {
        const isMinted = await desineTokenContract.isCidAlreadyMinted(cid);
        if (isMinted) {
          setIsCidMintedStatus("minted");
        } else {
          setIsCidMintedStatus("notMinted");
        }
      } catch (error) {
        console.error(error);
        setIsCidMintedStatus("error");
      }
    })();
  }, [
    isCidMintedStatus,
    cid,
    checkedCid,
    active,
    provider,
    account,
    desineTokenContract,
  ]);

  // Combined status to determine if the user can mint the NFT
  const canMint = useMemo(
    () =>
      previewCardMetadataLoaded &&
      cid &&
      metadataCid &&
      account &&
      provider &&
      active &&
      isCidMintedStatus === "notMinted",
    [
      previewCardMetadataLoaded,
      cid,
      metadataCid,
      account,
      provider,
      active,
      isCidMintedStatus,
    ]
  );

  // Main Minting function
  const mint = useCallback(async () => {
    if (!canMint || !provider || !account || !signer || !desineTokenContract)
      return;
    try {
      await desineTokenContract.mint(cid, metadataCid);
    } catch (error) {
      console.error(error);
    }
  }, [
    canMint,
    cid,
    metadataCid,
    active,
    provider,
    account,
    signer,
    desineTokenContract,
  ]);

  return { isCidMintedStatus, mint, canMint };
};