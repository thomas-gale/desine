import { useCallback } from "react";
import { useAppSelector } from "./state";

export const useWrapIpfsGateway = () => {
  const ipfsGatewayPrefix = useAppSelector(
    (state) => state.config.ipfsGatewayPrefix
  );
  const ipfsGatewaySuffix = useAppSelector(
    (state) => state.config.ipfsGatewaySuffix
  );

  return useCallback(
    (ipfsHash: string) => {
      return ipfsGatewayPrefix + ipfsHash + ipfsGatewaySuffix;
    },
    [ipfsGatewayPrefix, ipfsGatewaySuffix]
  );
};
