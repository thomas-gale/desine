import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Spinner } from "../../components/elements/Spinner";
import { CADViewer } from "../../components/viewer/CADViewer";
import { useWrapIpfsGateway } from "../../hooks/useWrapIpfsGateway";

const Mint = (): JSX.Element => {
  const router = useRouter();
  const { cid } = router.query;

  const [step, setStep] = useState<"model" | "metadata" | "mint">("model");

  if (!cid) {
    return <div />;
  }
  return (
    <div className="h-full flex flex-col space-y-4">
      <ul className="steps bg-base-200 p-4">
        <li
          className="step step-primary hover:text-primary cursor-pointer"
          onClick={() => setStep("model")}
        >
          Review Model
        </li>
        <li
          className="step step-primary hover:text-primary cursor-pointer"
          onClick={() => setStep("metadata")}
        >
          Define Metadata
        </li>
        <li
          className="step step-primary hover:text-primary cursor-pointer"
          onClick={() => setStep("mint")}
        >
          Mint ERC1155 NFT
        </li>
      </ul>
      <div className="flex flex-col flex-grow p-4 space-y-2 rounded-xl bg-dark">
        {step === "model" && (
          <>
            <h2 className=" break-words">
              Model: <b>{cid}</b>
            </h2>
            <CADViewer stepURL={cid as string} />
          </>
        )}
      </div>
    </div>
  );
};

export default Mint;
