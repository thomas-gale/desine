import { BigNumber } from "ethers";
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react";
import { DesineToken } from "../../../../typechain-types";
import { DesineCard } from "../DesineCard";

export interface DesineCardFromTokenIdProps {
  tokenId: BigNumber;
  desineTokenContract: DesineToken;
  noLink?: boolean;
}

export const DesineCardFromTokenId = ({
  tokenId,
  desineTokenContract,
  noLink,
  ...props
}: DesineCardFromTokenIdProps &
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
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
  return <DesineCard noLink={noLink} cadCid={cid} metadataCid={metadataCid} {...props} />;
};
