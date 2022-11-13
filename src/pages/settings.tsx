import React, { FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/state";
import {
  setIpfsGatewayPrefix,
  setIpfsGatewaySuffix,
} from "../state/config/configSlice";

const Settings = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const ipfsGatewayPrefix = useAppSelector(
    (state) => state.config.ipfsGatewayPrefix
  );
  const ipfsGatewaySuffix = useAppSelector(
    (state) => state.config.ipfsGatewaySuffix
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
              dispatch(setIpfsGatewayPrefix(e.target.ipfsGatewayPrefix.value));
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
              dispatch(setIpfsGatewaySuffix(e.target.ipsGatewaySuffix.value));
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
