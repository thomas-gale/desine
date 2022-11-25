import React from "react";
import { DesineCardFromTokenId } from "../../components/elements/browse/DesineCardFromTokenId";
import { useDesineTokenContractForBrowsing } from "../../hooks/useDesineTokenContract";

const List = (): JSX.Element => {
  const {
    active,
    mintedTokenIds,
    desineTokenContract,
    checkingContractDeployed,
    expectedContractVersionDeployed,
  } = useDesineTokenContractForBrowsing();

  if (checkingContractDeployed || !expectedContractVersionDeployed) {
    return <div />;
  }
  return (
    <div className="flex p-2">
      {!active && (
        <div className="alert alert-info">
          Connect your wallet to Inject Web3 Network Provider
        </div>
      )}
      <div className="flex flex-wrap">
        {active &&
          desineTokenContract &&
          mintedTokenIds.map((tokenId) => (
            <div key={tokenId.toString()} className="max-w-sm max-h-sm p-2">
              <DesineCardFromTokenId
                noLink={false}
                tokenId={tokenId}
                desineTokenContract={desineTokenContract}
              />
            </div>
          ))}
      </div>
      {active && mintedTokenIds.length === 0 && (
        <div className="alert alert-info">No DesineTokens minted yet :(</div>
      )}
    </div>
  );
};

export default List;
