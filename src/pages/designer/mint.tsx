import { useRouter } from "next/router";
import React, { useCallback, useMemo, useState } from "react";
import { Button } from "../../components/elements/Button";
import { DesineCard } from "../../components/elements/DesineCard";
import { CADViewer } from "../../components/viewer/CADViewer";
import { Metadata } from "../../types/Metadata";

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

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [render, setRender] = useState("");
  const [metadataCid, setMetadataCid] = useState("");

  const getMetadata = useCallback(
    () =>
      JSON.stringify({
        name,
        description,
        image: `ipfs://${render}`,
        // TODO Add external_url once decided on path
        // TODO Add background_color once decided on desine.eth primary theme
        // TODO Add animation_url (generated from render)
      } as Metadata),

    [name, description, render]
  );

  if (!cid) {
    return <div />;
  }
  return (
    <div className="h-full flex flex-col space-y-4">
      <ul className="steps bg-base-200 p-4">
        <li
          className={`step step-primary hover:text-primary ${
            step == "model" && "font-black"
          } cursor-pointer`}
          onClick={() => setStep("model")}
        >
          Review Model
        </li>
        <li
          className={`step ${
            stepIndex >= 1 && "step-primary"
          } hover:text-primary ${
            step == "metadata" && "font-black"
          } cursor-pointer`}
          onClick={() => setStep("metadata")}
        >
          Define Metadata
        </li>
        <li
          className={`step ${
            stepIndex >= 2 && "step-primary"
          } hover:text-primary ${
            step == "mint" && "font-black"
          } cursor-pointer`}
          onClick={() => setStep("mint")}
        >
          Review and Mint ERC1155 NFT
        </li>
      </ul>
      <div className="flex flex-col flex-grow p-4 space-y-2 rounded-xl">
        {step === "model" && (
          <>
            <h2 className=" break-words">
              Model CID: <b>{cid}</b>
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
            <div className="flex flex-col h-full space-y-4 py-2">
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered input-primary bg-neutral max-w-xs"
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                className="textarea textarea-primary bg-neutral flex-grow"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="text"
                placeholder="Render image CiD"
                className="input input-bordered input-primary bg-neutral w-full"
                onChange={(e) => setRender(e.target.value)}
              />
              <Button
                className="no-animation"
                href={URL.createObjectURL(
                  new Blob([getMetadata()], {
                    type: "application/json",
                  })
                )}
                download="metadata.json"
                external={false}
              >
                Generate & Download Metadata JSON
              </Button>
              <h3 className="pt-8">
                Now upload this JSON file to your IPFS storage provider{" "}
                <i>(sorry this is a bit painful)</i>
              </h3>
              <input
                type="text"
                placeholder="Paste Metadata JSON CiD"
                className="input input-bordered input-primary bg-neutral w-full"
                onChange={(e) => setMetadataCid(e.target.value)}
              />
            </div>

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
            <h2 className=" break-words">
              Metadata CID: <b>{metadataCid}</b>
            </h2>
            <div className="flex h-full p-8 items-center justify-center">
              <DesineCard cadCid={cid as string} metadataCid={metadataCid} />
            </div>
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
