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
  const [loading, setLoading] = useState(true);
  const [cid, setCid] = useState<string>("");
  const [metadataCid, setMetadataCid] = useState<string>("");

  useEffect(() => {
    (async () => {
      if (!tokenId || !desineTokenContract) return;
      setCid(await desineTokenContract.cids(tokenId));
      setMetadataCid(await desineTokenContract.metadataCids(tokenId));
      setLoading(false);
    })();
  }, [tokenId, desineTokenContract]);

  if (loading) {
    return <div />;
  }
  if (!cid || !metadataCid) {
    return (
      <div className="alert alert-info">
        <p>This token is not minted yet!</p>
      </div>
    );
  }
  return (
    <DesineCard
      noLink={noLink}
      cadCid={cid}
      metadataCid={metadataCid}
      {...props}
    />
  );
};
