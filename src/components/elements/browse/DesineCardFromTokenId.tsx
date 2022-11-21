import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { DesineToken } from "../../../../typechain-types";
import { DesineCard } from "../DesineCard";

export interface DesineCardFromTokenIdProps {
  tokenId: BigNumber;
  desineTokenContract: DesineToken;
}

export const DesineCardFromTokenId = ({
  tokenId,
  desineTokenContract,
}: DesineCardFromTokenIdProps) => {
  const [cid, setCid] = useState<string>("");
  const [metadataCid, setMetadataCid] = useState<string>("");

  useEffect(() => {
    (async () => {
      if (!tokenId || !desineTokenContract) return;
      setCid(await desineTokenContract.cids(tokenId));
      setMetadataCid(await desineTokenContract.metadataCids(tokenId));
    })();
  }, [tokenId, desineTokenContract]);

  if (!cid || !metadataCid) {
    return <div />;
  }
  return <DesineCard cadCid={cid} metadataCid={metadataCid} />;
};
