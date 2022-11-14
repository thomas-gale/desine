import { useCallback, useMemo } from "react";
import { config } from "../env/config";
import { useAppSelector } from "./state";
import { useLocalStorage } from "./useLocalStorage";

// Due to issues with next.js pre-rendering, we need to check for a loaded state (as opposed to just checking for the existence of the value)
export const useWrapIpfsGateway = (ipfsHash: string): [string, boolean] => {
  const [ipfsGatewayPrefix, ipfsGatewayPrefixLoaded] = useLocalStorage(
    "ipfsGatewayPrefix",
    config.settings.defaultIpfsGatewayPrefix
  );
  const [ipfsGatewaySuffix, ipfsGatewaySuffixLoaded] = useLocalStorage(
    "ipfsGatewaySuffix",
    config.settings.defaultIpfsGatewaySuffix
  );
  return useMemo(
    () => [
      ipfsGatewayPrefix + ipfsHash + ipfsGatewaySuffix,
      ipfsGatewayPrefixLoaded && ipfsGatewaySuffixLoaded,
    ],
    [
      ipfsHash,
      ipfsGatewayPrefix,
      ipfsGatewaySuffix,
      ipfsGatewayPrefixLoaded,
      ipfsGatewaySuffixLoaded,
    ]
  );
};
