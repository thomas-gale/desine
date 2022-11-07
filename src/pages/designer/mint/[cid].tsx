import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";

// A two step component that allows the user to first select an IPFS storage provider and then allows them to supply the hash to the webapp.
const Mint = (): JSX.Element => {
  const router = useRouter();
  const { cid } = router.query;

  return (
    <div className="h-full flex flex-col p-4 space-y-4">
      <div className="flex flex-col h-full p-4 space-y-2 rounded-xl bg-dark">
        <h2 className="text-light">
          Minting workflow for <b>{cid}</b>
        </h2>
        <h3 className="text-light">
          1. Checking that this CiD is valid and is not already minted.
        </h3>
        <h3 className="text-light">2. Loading file into CAD viewer.</h3>
        <h3 className="text-light">
          3. Provide UI for minting a new CAD NFT for this CiD.
        </h3>
      </div>
    </div>
  );
};

export default Mint;
