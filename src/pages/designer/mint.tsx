import { useRouter } from "next/router";
import React from "react";
import { Spinner } from "../../components/elements/Spinner";
import { CADViewer } from "../../components/viewer/CADViewer";
import { useWrapIpfsGateway } from "../../hooks/useWrapIpfsGateway";

const Mint = (): JSX.Element => {
  const router = useRouter();
  const { cid } = router.query;

  const wrapIpfsGateway = useWrapIpfsGateway();

  if (!cid) {
    return <div />;
  }
  return (
    <div className="h-full flex flex-col p-4 space-y-4">
      <div className="flex flex-col h-full p-4 space-y-2 rounded-xl bg-dark">
        <h2 className="text-light break-words">
          Minting workflow for <b>{cid}</b>
        </h2>
        <CADViewer stepURL={wrapIpfsGateway(cid as string)} />
        <div className="flex flex-row items-center p-2 space-x-2">
          <Spinner />
          <h3 className="text-light">
            (TODO) Checking that this CiD is valid and is not already minted
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Mint;
