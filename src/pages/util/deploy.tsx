import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { DesineToken__factory } from "../../../typechain-types";
import { Button } from "../../components/elements/Button";
import { config } from "../../env/config";
import { getNetworkName } from "../../env/getNetworkName";

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
        <p>
          Warning! This utility page is reserved for <b>desine</b>
          developers (do not do this unless you want to spend a bunch of ETH for
          no good reason!)
        </p>
      </div>
      <div className="alert alert-info">
        <p>
          Currently Deployed DesineTokenContract Address (configured for this
          website): <b>{config.settings.desineTokenAddress}</b> on network:{" "}
          <b>{getNetworkName()}</b> (id: <b>{config.settings.ethNetworkId}</b>)
        </p>
      </div>
      <Button
        className={`${!signer && "btn-disabled"}`}
        onClick={() => deploy()}
        external={false}
      >
        Deploy DesineToken.sol Contract on {getNetworkName()}
      </Button>
      {!!deployedDesineTokenContractAddress && (
        <div className="alert alert-success">
          <p>
            New DesineTokenContract Address{" "}
            <b>{deployedDesineTokenContractAddress}</b> (you will need to update
            environment variable <i>NEXT_PUBLIC_DESINE_TOKEN_ADDRESS</i> on next
            page build)
          </p>
        </div>
      )}
    </div>
  );
};

export default Deploy;
