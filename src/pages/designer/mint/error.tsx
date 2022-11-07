import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";

const MintError = (): JSX.Element => {
  const router = useRouter();

  return (
    <div className="h-full flex flex-col p-4 space-y-4">
      <div className="flex flex-col h-full p-4 space-y-2 rounded-xl bg-dark">
        <h2 className="text-light">
          Unsupported / malformed CID.
        </h2>
      </div>
    </div>
  );
};

export default MintError;

