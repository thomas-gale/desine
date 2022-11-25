import React, { useEffect, useState } from "react";
import { Button } from "../elements/Button";
import { MdWarning, MdOutlineCheckCircle, MdError } from "react-icons/md";

import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { Web3Provider } from "@ethersproject/providers";
import { truncateEthAddress } from "../../helpers/web3/truncateEthAddress";
import { config } from "../../env/config";
import { getNetworkName } from "../../env/getNetworkName";

export const injected = new InjectedConnector({
  supportedChainIds: [config.settings.ethNetworkId],
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activate, injected]);

  return (
    <div className="m-2 flex flex-row items-center space-x-2">
      <div className="flex flex-col items-end">
        {error ? (
          <div className="flex flex-row items-center space-x-2">
            <MdError />
            <p>Error - ({error.message})</p>
          </div>
        ) : connector ? (
          <div className="flex flex-row items-center space-x-2">
            <MdOutlineCheckCircle />
            <p>Connected</p>
          </div>
        ) : (
          <>
            <div className="flex flex-row items-center space-x-2">
              <MdWarning />
              <p>Disconnected</p>
            </div>
            <p>
              <b>{getNetworkName()} network only</b>
            </p>
          </>
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
