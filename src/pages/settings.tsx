import React, { FormEvent } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Settings = (): JSX.Element => {
  const [ipfsGatewayPrefix, setIpfsGatewayPrefix] = useLocalStorage(
    "ipfsGatewayPrefix",
    "https://ipfs.io/ipfs/"
  );
  const [ipfsGatewaySuffix, setIpfsGatewaySuffix] = useLocalStorage(
    "ipfsGatewaySuffix",
    ""
  );

  return (
    <div className="h-full flex flex-col p-4 space-y-4">
      <div className="flex flex-col h-full p-4 rounded-xl bg-dark space-y-4">
        <div className="flex flex-row items-center space-x-2">
          <h3 className="text-light">IPFS Gateway Prefix</h3>
          <form
            onSubmit={(
              e: FormEvent<HTMLFormElement> & {
                target: { ipfsGatewayPrefix: { value: string } };
              }
            ) => {
              e.preventDefault();
              setIpfsGatewayPrefix(e.target.ipfsGatewayPrefix.value);
            }}
          >
            <input
              type="text"
              name="ipfsGatewayPrefix"
              className="w-full rounded-xl p-4"
            />
          </form>
          <h3 className="text-light">{ipfsGatewayPrefix}</h3>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <h3 className="text-light">IPFS Gateway Suffix</h3>
          <form
            onSubmit={(
              e: FormEvent<HTMLFormElement> & {
                target: { ipsGatewaySuffix: { value: string } };
              }
            ) => {
              e.preventDefault();
              setIpfsGatewaySuffix(e.target.ipsGatewaySuffix.value);
            }}
          >
            <input
              type="text"
              name="ipsGatewaySuffix"
              className="w-full rounded-xl p-4"
            />
          </form>
          <h3 className="text-light">{ipfsGatewaySuffix}</h3>
        </div>
      </div>
    </div>
  );
};

export default Settings;
