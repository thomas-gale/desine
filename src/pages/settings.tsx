import React, { FormEvent } from "react";
import { Button } from "../components/elements/Button";
import { config } from "../env/config";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Settings = (): JSX.Element => {
  const [ipfsGatewayPrefix, isIpfsGatewayPrefixLoaded, setIpfsGatewayPrefix] =
    useLocalStorage(
      "ipfsGatewayPrefix",
      config.settings.defaultIpfsGatewayPrefix
    );
  const [ipfsGatewaySuffix, isIpfsGatewaySuffixLoaded, setIpfsGatewaySuffix] =
    useLocalStorage(
      "ipfsGatewaySuffix",
      config.settings.defaultIpfsGatewaySuffix
    );

  if (!isIpfsGatewayPrefixLoaded || !isIpfsGatewaySuffixLoaded) return <div />;
  return (
    <div className="h-full flex flex-col p-4 space-y-4">
      <div className="flex flex-col h-full p-4 rounded-xl bg-dark space-y-4">
        <Button mode="dark" href={config.links.publicGateWayChecker}>
          Public IPFS gateway checker
        </Button>
        <div className="flex flex-col">
          <h4 className="text-light">Current IPFS gateway configuration</h4>
          <h3 className="text-light">
            <b>{ipfsGatewayPrefix}</b>
            <i>{"bafy...sk3m"}</i>
            <b>{ipfsGatewaySuffix}</b>
          </h3>
        </div>
        <div className="flex flex-col">
          <h3 className="text-light">Set IPFS gateway prefix</h3>
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
              placeholder="e.g. https://cloudflare-ipfs.com/ipfs/ or http://localhost:8080/ipfs/"
              className="w-full rounded-xl p-4"
            />
          </form>
        </div>
        <div className="flex flex-col">
          <h3 className="text-light">Set ipfs gateway suffix (can be blank)</h3>
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
              placeholder="e.g. .ipfs.nftstorage.link/"
              className="w-full rounded-xl p-4"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
