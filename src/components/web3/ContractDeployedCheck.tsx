import { config } from "../../env/config";
import { getNetworkName } from "../../env/getNetworkName";
import { useDesineTokenContract } from "../../hooks/useDesineTokenContract";

export const ContractDeployedCheck = (): JSX.Element => {
  const { checkingContractDeployed, contractDeployed } =
    useDesineTokenContract();

  return (
    <>
      {!checkingContractDeployed && !contractDeployed && (
        <div className="bg-error p-2">
          <p className="text-neutral">
            Error! DesineTokenContract (
            <b>{config.settings.desineTokenAddress}</b>) not deployed on{" "}
            {getNetworkName()}
          </p>
        </div>
      )}
    </>
  );
};
