import React, { useEffect, useState } from "react";
import { Button } from "../elements/Button";
import { MdWarning, MdOutlineCheckCircle, MdError } from "react-icons/md";

import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { Web3Provider } from "@ethersproject/providers";
import { truncateEthAddress } from "../../helpers/web3/truncateEthAddress";

export const injected = new InjectedConnector({
  supportedChainIds: [1337], // Main: 1, Goerli: 5, Localhost: 1337
});

export const Identity = (): JSX.Element => {
  const { connector, activate, deactivate, account, error } =
    useWeb3React<Web3Provider>();

  // Attempt to auto-connect to wallet
  useEffect(() => {
    (async () => {
      if (activate && injected) {
        activate(injected);
      }
    })();
  }, [activate, injected]);

  return (
    <div className="m-2 flex flex-row items-center space-x-2">
      <div className="">
        {error ? (
          <div className="flex flex-row items-center space-x-2">
            <MdError />
            <p>Error</p>
          </div>
        ) : connector ? (
          <div className="flex flex-row items-center space-x-2">
            <MdOutlineCheckCircle />
            <p>Connected</p>
          </div>
        ) : (
          <div className="flex flex-row items-center space-x-2">
            <MdWarning />
            <p>Disconnected</p>
          </div>
        )}
      </div>
      {!connector && (
        <Button
          className="mx-2"
          onClick={async (): Promise<void> => activate(injected)}
          external={false}
        >
          Connect Wallet
        </Button>
      )}
      {connector && (
        <Button
          className="mx-2"
          onClick={async (): Promise<void> => deactivate()}
          external={false}
        >
          Unlink {truncateEthAddress(account ?? "")}
        </Button>
      )}
    </div>
  );
};
