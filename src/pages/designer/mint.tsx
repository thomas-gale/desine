import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { DesineToken__factory } from "../../../typechain-types";

import { Button } from "../../components/elements/Button";
import { DesineCard } from "../../components/elements/DesineCard";
import { CADViewer } from "../../components/viewer/CADViewer";
import { Metadata } from "../../types/Metadata";
import { config } from "../../env/config";
import { useDesineContractInteraction } from "../../hooks/useDesineContractInteraction";

const Mint = (): JSX.Element => {
  const router = useRouter();
  const { cid: query_cid, metacid: query_metacid } = router.query;

  // State of the minting workflow
  const [step, setStep] = useState<"upload" | "model" | "metadata" | "mint">(
    "upload"
  );
  const stepIndex = useMemo(() => {
    switch (step) {
      case "upload":
        return 1;
      case "model":
        return 2;
      case "metadata":
        return 3;
      case "mint":
        return 4;
    }
  }, [step]);

  // State of the minting workflow definition
  const [cid, setCid] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [render, setRender] = useState("");
  const [metadataCid, setMetadataCid] = useState("");

  // Util for creating metadata JSON payload that user can then upload to IPFS
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

  // Checking which CIDs we have from url params, if so, we can skip the appropriate step
  useEffect(() => {
    if (!!query_cid && !!query_metacid) {
      setCid(query_cid as string);
      setMetadataCid(query_metacid as string);
      setStep("mint");
    } else if (!!query_cid) {
      setCid(query_cid as string);
      setStep("model");
    }
  }, [query_cid, query_metacid]);

  const [previewCardMetadataLoaded, setPreviewCardMetadataLoaded] =
    useState(false);

  // Minting code.
  const { mint, canMint, isCidMintedStatus } = useDesineContractInteraction(
    cid,
    metadataCid,
    previewCardMetadataLoaded
  );

  return (
    <div className="h-full flex flex-col">
      <ul className="steps bg-base-200 p-4">
        <li
          className={`step step-primary ${step == "upload" && "font-black"} `}
        >
          IPFS Storage Upload
        </li>
        <li
          className={`step ${stepIndex > 1 && "step-primary"} ${
            step == "model" && "font-black"
          } `}
        >
          Review Model
        </li>
        <li
          className={`step ${stepIndex > 2 && "step-primary"}  ${
            step == "metadata" && "font-black"
          } `}
        >
          Define Metadata
        </li>
        <li
          className={`step ${stepIndex > 3 && "step-primary"}  ${
            step == "mint" && "font-black"
          } `}
        >
          Preview and Mint ERC1155 NFT
        </li>
      </ul>
      <div>
        {isCidMintedStatus === "disconnected" && (
          <div className="p-2">
            <div className="alert alert-warning">
              <p>Please connect wallet to check if CID is already minted</p>
            </div>
          </div>
        )}
        {isCidMintedStatus === "checking" && (
          <div className="p-2">
            <div className="alert alert-info">
              <p>Checking if CID is already minted...</p>
            </div>
          </div>
        )}
        {isCidMintedStatus === "notMinted" && (
          <div className="p-2">
            <div className="alert alert-success">
              <p>This CID has not been minted yet!</p>
            </div>
          </div>
        )}
        {isCidMintedStatus === "minted" && (
          <div className="p-2">
            <div className="alert alert-error">
              <p>This CID has already been minted</p>
            </div>
          </div>
        )}
        {isCidMintedStatus === "error" && (
          <div className="p-2">
            <div className="alert alert-error">
              <p>
                Something when wrong when checking if the CID was already minted
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col flex-grow p-4 space-y-2 rounded-xl">
        {step === "upload" && (
          <>
            <p>
              Pin your .step/stp file with a provider or self pin (we recommend
              you use multiple options for redundancy)
            </p>
            <div className="h-full flex items-center justify-center">
              <div className="flex flow-row flex-wrap items-center justify-center">
                <Button
                  className="m-2"
                  href="https://nft.storage/"
                  external={true}
                  iconSize="2em"
                >
                  <h1>nft.storage</h1>
                </Button>
                <Button
                  className="m-2"
                  href="https://pinata.cloud/"
                  external={true}
                  iconSize="2em"
                >
                  <h1>pinata.cloud</h1>
                </Button>
                <Button
                  className="m-2"
                  href="https://web3.storage/"
                  external={true}
                  iconSize="2em"
                >
                  <h1>web3.storage</h1>
                </Button>
                <div>
                  <h2>
                    Or an alternate IPFS storage solution of your choosing!
                  </h2>
                </div>
              </div>
            </div>
            <div className="flex flex-col pt-4 space-y-2">
              <input
                type="text"
                placeholder={
                  !!cid
                    ? cid
                    : "Paste .step CID from your provider (e.g. QmXe... or bafy...)"
                }
                className="input input-bordered input-primary bg-neutral w-full"
                onChange={(e) => setCid(e.target.value)}
              />
              <div className="flex flex-row justify-center space-x-2">
                <Button
                  onClick={() => setCid(config.samples.cids[0])}
                  external={false}
                >
                  <h3>Test CID 0</h3>
                </Button>
                <Button
                  onClick={() => setCid(config.samples.cids[1])}
                  external={false}
                >
                  <h3>Test CID 1</h3>
                </Button>
              </div>
            </div>
            <Button
              className="no-animation"
              onClick={() => {
                if (!!cid) {
                  router.push(
                    `/designer/mint?cid=${cid}&metacid=${metadataCid}`,
                    undefined,
                    {
                      shallow: true,
                    }
                  );
                  setStep("model");
                }
              }}
              disabled={!cid || cid.length === 0}
              external={false}
            >
              Next
            </Button>
          </>
        )}
        {step === "model" && (
          <>
            <h2 className=" break-words">
              Model CID: <b>{cid}</b>
            </h2>
            <CADViewer stepURL={cid as string} />
            <div className="flex flex-row space-x-2">
              <Button
                className="no-animation flex-grow"
                onClick={() => setStep("upload")}
                external={false}
              >
                Previous
              </Button>
              <Button
                className="no-animation flex-grow"
                onClick={() => setStep("metadata")}
                external={false}
              >
                Next
              </Button>
            </div>
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
                placeholder="Render image CID"
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
                placeholder={
                  !!metadataCid
                    ? metadataCid
                    : "Paste metadata.json CID from your provider (e.g. QmXe... or bafy...)"
                }
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
                onClick={() => {
                  if (!!metadataCid) {
                    router.push(
                      `/designer/mint?cid=${cid}&metacid=${metadataCid}`,
                      undefined,
                      {
                        shallow: true,
                      }
                    );
                    setStep("mint");
                  }
                }}
                disabled={!metadataCid || metadataCid.length === 0}
                external={false}
              >
                Next
              </Button>
            </div>
          </>
        )}
        {step === "mint" && (
          <>
            <h4 className=" break-words">
              Model CID: <b>{cid}</b>
            </h4>
            <h4 className=" break-words">
              Metadata CID: <b>{metadataCid}</b>
            </h4>
            <div className="flex h-full p-8 items-center justify-center">
              <DesineCard
                cadCid={cid as string}
                metadataCid={metadataCid}
                onLoading={() => setPreviewCardMetadataLoaded(false)}
                onSuccessfullyLoaded={() => setPreviewCardMetadataLoaded(true)}
              />
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
                onClick={() => mint()}
                disabled={!canMint}
                external={false}
              >
                {canMint ? "Mint" : "Not able to Mint"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Mint;
