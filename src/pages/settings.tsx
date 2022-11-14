import React, { FormEvent, useCallback, useMemo, useState } from "react";
import { Button } from "../components/elements/Button";
import { config } from "../env/config";
import { useClearLocalStorage } from "../hooks/useClearLocalStorage";
import { useGetLocalStorageSize } from "../hooks/useGetLocalStorageSize";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Settings = (): JSX.Element => {
  const [readSeed, setReadSeed] = useState(1);
  const [writeSeed, setWriteSeed] = useState(1);
  const randomReadSeed = useCallback(() => setReadSeed(Math.random()), []);
  const randomWriteSeed = useCallback(() => setWriteSeed(Math.random()), []);

  const [ipfsGatewayPrefix, isIpfsGatewayPrefixLoaded, setIpfsGatewayPrefix] =
    useLocalStorage(
      "ipfsGatewayPrefix",
      config.settings.defaultIpfsGatewayPrefix,
      [readSeed]
    );
  const [ipfsGatewaySuffix, isIpfsGatewaySuffixLoaded, setIpfsGatewaySuffix] =
    useLocalStorage(
      "ipfsGatewaySuffix",
      config.settings.defaultIpfsGatewaySuffix,
      [readSeed]
    );

  const getLocalStorageSize = useGetLocalStorageSize();
  const localStorageSize = useMemo(() => getLocalStorageSize(), [writeSeed]);
  const clearLocalStorage = useClearLocalStorage();
  const clearLocalStorageAndReload = useCallback(() => {
    clearLocalStorage();
    randomReadSeed();
    randomWriteSeed();
  }, [clearLocalStorage, randomReadSeed, randomWriteSeed]);

  if (!isIpfsGatewayPrefixLoaded || !isIpfsGatewaySuffixLoaded) return <div />;
  return (
    <div className="h-full flex flex-col p-4 space-y-4">
      <div className="flex flex-col h-full p-4 rounded-xl bg-dark space-y-4">
        <Button mode="dark" href={config.links.publicGateWayChecker}>
          Public IPFS gateway checker
        </Button>
        <div className="flex flex-col">
          <h4 className="text-light">Current IPFS gateway configuration</h4>
          <h3 className="text-light break-words">
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
              randomWriteSeed();
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
              randomWriteSeed();
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
        <div className="flex flex-col">
          <h3 className="text-light">
            How much data is stored in your browser{" "}
            <i>(on refresh, we will cache default settings)</i>
          </h3>
          <div className="flex flew-row items-center space-x-4">
            <h4 className="text-light">
              <b>{localStorageSize}</b>
            </h4>
            <Button mode="dark" onClick={clearLocalStorageAndReload}>
              Clear local storage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;