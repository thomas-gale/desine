import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { DesineToken__factory } from "../../typechain-types";
import { Button } from "../components/elements/Button";
import { config } from "../env/config";

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

  const [
    deployedDesineTokenContractAddress,
    setDeployedDesineTokenContractAddress,
  ] = useState<string | null>(null);

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
    setDeployedDesineTokenContractAddress(deployedDesineTokenContract.address);
  }, [signer]);

  return (
    <div className="flex flex-col p-4 space-y-2">
      <div className="alert alert-warning">
        Warning! This utility page is reserved for desine.io/desine.eth
        developers (don't do this unless you want to spend a bunch of ETH for no
        good reason!)
      </div>
      <div className="alert alert-info">
        Deployed DesineTokenContract Address (configured for this current
        website): {config.settings.desineTokenAddress}
      </div>
      <Button
        className={`${!signer && "btn-disabled"}`}
        onClick={() => deploy()}
        external={false}
      >
        Deploy DesineToken.sol Contract
      </Button>
      {!!deployedDesineTokenContractAddress && (
        <div className="alert alert-success">
          New DesineTokenContract Address (you will need to update
          <i>config.settings.desineTokenAddress</i> on next page build):{" "}
          {deployedDesineTokenContractAddress}
        </div>
      )}
    </div>
  );
};

export default Deploy;
