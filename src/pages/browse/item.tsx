import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DesineCardFromTokenId } from "../../components/elements/browse/DesineCardFromTokenId";
import { useDesineTokenContractForBrowsing } from "../../hooks/useDesineTokenContract";
import { BigNumber } from "ethers";

const Item = (): JSX.Element => {
  const router = useRouter();
  const { cid } = router.query;

  const {
    active,
    computeDesineTokenId,
    desineTokenContract,
    contractDeployed,
  } = useDesineTokenContractForBrowsing();

  const [tokenId, setTokenId] = useState<BigNumber>();
  useEffect(() => {
    (async () => {
      if (!cid) return;
      setTokenId(await computeDesineTokenId(cid as string));
    })();
  }, [cid, active, contractDeployed]);

  return (
    <>
      {!active && (
        <div className="p-2">
          <div className="alert alert-info">
            Connect your wallet to Inject Web3 Network Provider
          </div>
        </div>
      )}
      {active && !!tokenId && !!desineTokenContract && (
        <div className="flex h-full w-full p-8 items-center justify-center">
          <DesineCardFromTokenId
            noLink={true}
            tokenId={tokenId}
            desineTokenContract={desineTokenContract}
          />
        </div>
      )}
    </>
  );
};

export default Item;
