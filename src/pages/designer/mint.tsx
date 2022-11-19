import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../../components/elements/Button";
import { Spinner } from "../../components/elements/Spinner";
import { CADViewer } from "../../components/viewer/CADViewer";
import { useWrapIpfsGateway } from "../../hooks/useWrapIpfsGateway";

const Mint = (): JSX.Element => {
  const router = useRouter();
  const { cid } = router.query;

  const [step, setStep] = useState<"model" | "metadata" | "mint">("model");
  const stepIndex = useMemo(() => {
    switch (step) {
      case "model":
        return 0;
      case "metadata":
        return 1;
      case "mint":
        return 2;
    }
  }, [step]);

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
          className={`step ${
            stepIndex >= 1 && "step-primary"
          } hover:text-primary cursor-pointer`}
          onClick={() => setStep("metadata")}
        >
          Define Metadata
        </li>
        <li
          className={`step ${
            stepIndex >= 2 && "step-primary"
          } hover:text-primary cursor-pointer`}
          onClick={() => setStep("mint")}
        >
          Mint ERC1155 NFT
        </li>
      </ul>
      <div className="flex flex-col flex-grow p-4 space-y-2 rounded-xl">
        {step === "model" && (
          <>
            <h2 className=" break-words">
              Model: <b>{cid}</b>
            </h2>
            <CADViewer stepURL={cid as string} />
            <Button
              className="no-animation"
              onClick={() => setStep("metadata")}
              external={false}
            >
              Next
            </Button>
          </>
        )}
        {step === "metadata" && (
          <>
            <h2>Define Metadata</h2>
            <div className="h-full">TODO</div>
            <div className="flex flex-row space-x-2">
              <Button
                className="no-animation flex-grow"
                onClick={() => setStep("model")}
                external={false}
              >
                Previous
              </Button>
              <Button
                className="no-animation flex-grow"
                onClick={() => setStep("mint")}
                external={false}
              >
                Next
              </Button>
            </div>
          </>
        )}
        {step === "mint" && (
          <>
            <h2>Review and confirm Minting</h2>
            <div className="h-full">TODO</div>
            <div className="flex flex-row space-x-2">
              <Button
                className="no-animation flex-grow"
                onClick={() => setStep("metadata")}
                external={false}
              >
                Previous
              </Button>
              <Button
                className="no-animation flex-grow"
                onClick={() =>
                  console.log("TODO: Trigger web3 wallet operation")
                }
                external={false}
              >
                Mint
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Mint;
