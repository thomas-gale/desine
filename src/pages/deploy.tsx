import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { DesineToken__factory } from "../../typechain-types";
import { Button } from "../components/elements/Button";

const Deploy = (): JSX.Element => {
  const { library: provider } = useWeb3React<Web3Provider>();
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(
    null
  );
  useEffect(() => {
    (async () => {
      if (!provider) return;
      await provider.send("eth_requestAccounts", []);
      setSigner(provider.getSigner());
    })();
  }, [provider]);

  const deploy = useCallback(async () => {
    if (!signer) return null;
    const desineTokenContractFactory = new ethers.ContractFactory(
      DesineToken__factory.abi,
      DesineToken__factory.bytecode,
      signer
    );
    const deployedDesineTokenContract =
      await desineTokenContractFactory.deploy();
    console.log(
      "DesineTokenContract address:",
      deployedDesineTokenContract.address
    );
  }, [signer]);

  return (
    <div className="p-4">
      <Button onClick={() => deploy()} external={false}>
        Deploy DesineTokenContract
      </Button>
    </div>
  );
};

export default Deploy;
