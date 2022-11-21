import React from "react";
import { useDesineTokenContractForBrowsing } from "../../hooks/useDesineTokenContract";

const List = (): JSX.Element => {
  const { active, mintedTokenIds } = useDesineTokenContractForBrowsing();

  return (
    <div className="p-2">
      {!active && (
        <div className="alert alert-info">
          Connect your wallet to Inject Web3 Network Provider
        </div>
      )}
      {active &&
        mintedTokenIds.map((tokenId) => (
          <div className="p-2">
            <div className="alert" key={tokenId.toString()}>
              <b>DesineToken</b> uint256 hash of CID: {tokenId.toString()}
            </div>
          </div>
        ))}
      {active && mintedTokenIds.length === 0 && (
        <div className="alert alert-info">No DesineTokens minted yet :(</div>
      )}
    </div>
  );
};

export default List;
