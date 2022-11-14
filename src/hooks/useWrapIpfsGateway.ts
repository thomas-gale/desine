import { useCallback } from "react";
import { config } from "../env/config";
import { useAppSelector } from "./state";
import { useLocalStorage } from "./useLocalStorage";

export const useWrapIpfsGateway = () => {
  const [ipfsGatewayPrefix] = useLocalStorage(
    "ipfsGatewayPrefix",
    config.settings.defaultIpfsGatewayPrefix
  );
  const [ipfsGatewaySuffix] = useLocalStorage(
    "ipfsGatewaySuffix",
    config.settings.defaultIpfsGatewaySuffix
  );
  return useCallback(
    (ipfsHash: string) => {
      return ipfsGatewayPrefix + ipfsHash + ipfsGatewaySuffix;
    },
    [ipfsGatewayPrefix, ipfsGatewaySuffix]
  );
};
