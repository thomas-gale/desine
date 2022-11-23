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
import {
  useDesineTokenContract,
  useDesineTokenContractForMinting,
} from "../../hooks/useDesineTokenContract";
import { IsMintedAlert } from "../../components/elements/design/mint/IsMintedAlert";

const Mint = (): JSX.Element => {
  const router = useRouter();
  const { cid: query_cid, metacid: query_metacid, tx: query_tx } = router.query;

  // State of the minting workflow
  const [step, setStep] = useState<
    "upload" | "model" | "metadata" | "mint" | "transaction"
  >("upload");
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
      case "transaction":
        return 5;
    }
  }, [step]);

  // State of the minting workflow definition
  const [cid, setCid] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [render, setRender] = useState("");
  const [metadataCid, setMetadataCid] = useState("");
  const [txHash, setTxHash] = useState("");

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
    if (!!query_cid && !!query_metacid && !!query_tx) {
      setCid(query_cid as string);
      setMetadataCid(query_metacid as string);
      setTxHash(query_tx as string);
      setStep("transaction");
    } else if (!!query_cid && !!query_metacid) {
      setCid(query_cid as string);
      setMetadataCid(query_metacid as string);
      setStep("mint");
    } else if (!!query_cid) {
      setCid(query_cid as string);
      setStep("model");
    }
  }, [query_cid, query_metacid, query_tx]);

  const [previewCardMetadataLoaded, setPreviewCardMetadataLoaded] =
    useState(false);

  // Minting code.
  const { isCidMintedStatus, mint, canMint, contractDeployed } =
    useDesineTokenContractForMinting(
      cid,
      metadataCid,
      previewCardMetadataLoaded
    );
  const [isMinting, setIsMinting] = useState(false);

  if (!contractDeployed) {
    return <div />;
  }
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
          Preview and Mint
        </li>
        <li
          className={`step ${stepIndex > 4 && "step-primary"}  ${
            step == "transaction" && "font-black"
          } `}
        >
          Transaction Status
        </li>
      </ul>
      {step !== "transaction" && (
        <IsMintedAlert isCidMintedStatus={isCidMintedStatus} />
      )}
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
                className="no-animation flex-1"
                onClick={() => setStep("upload")}
                external={false}
              >
                Previous
              </Button>
              <Button
                className="no-animation flex-1"
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
                Now upload this JSON file to your IPFS storage provider and copy
                CID <i>(sorry this is a bit painful)</i>
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
            <div className="flex flex-row justify-center space-x-2">
              <Button
                onClick={() => setMetadataCid(config.samples.metadataCids[0])}
                external={false}
              >
                <h3>Test Metadata CID 0</h3>
              </Button>
            </div>
            <div className="flex flex-row space-x-2">
              <Button
                className="no-animation flex-1"
                onClick={() => setStep("model")}
                external={false}
              >
                Previous
              </Button>
              <Button
                className="no-animation flex-1"
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
                className="no-animation flex-1"
                onClick={() => setStep("metadata")}
                external={false}
              >
                Previous
              </Button>
              {isMinting || txHash ? (
                <Button
                  className="no-animation flex-1"
                  onClick={() => {
                    setStep("transaction");
                  }}
                  external={false}
                >
                  Next
                </Button>
              ) : (
                <Button
                  className={`no-animation flex-1 ${canMint && "btn-primary"}`}
                  onClick={async () => {
                    setIsMinting(true);
                    const tx = await mint();
                    if (tx) {
                      setTxHash(tx.hash);
                      router.push(
                        `/designer/mint?cid=${cid}&metacid=${metadataCid}&tx=${tx.hash}`,
                        undefined,
                        {
                          shallow: true,
                        }
                      );
                      setStep("transaction");
                    }
                  }}
                  disabled={!canMint || isMinting}
                  external={false}
                >
                  Mint
                </Button>
              )}
            </div>
          </>
        )}
        {step === "transaction" && (
          <>
            <div className="flex h-full">
              <p>
                Transaction: <b>{txHash}</b> (TODO, add ethers refresh check
                code)
              </p>
            </div>
            <div className="flex flex-row space-x-2">
              <Button
                className="no-animation flex-1"
                onClick={() => setStep("mint")}
                external={false}
              >
                Previous
              </Button>
              <Button
                className={`no-animation flex-1 "btn-primary"`}
                href={`/browse/item?cid=${cid}`}
                external={false}
              >
                View
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Mint;
