import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { Button } from "../../components/elements/Button";
import { config } from "../../env/config";

// A two step component that allows the user to first select an IPFS storage provider and then allows them to supply the hash to the webapp.
const Upload = (): JSX.Element => {
  const router = useRouter();

  const [step, setStep] = useState<"upload" | "paste">("upload");

  return (
    <div className="h-full flex flex-col space-y-4">
      <ul className="steps bg-base-200 p-4">
        <li
          className="step step-primary hover:text-primary cursor-pointer"
          onClick={() => setStep("upload")}
        >
          IPFS Storage Upload
        </li>
        <li
          className={`step ${
            step === "paste" && "step-primary"
          } hover:text-primary cursor-pointer`}
          onClick={() => setStep("paste")}
        >
          Paste CiD
        </li>
      </ul>
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
            <Button
              className="no-animation"
              onClick={() => setStep("paste")}
              external={false}
            >
              Next
            </Button>
          </>
        )}
        {step === "paste" && (
          <>
            <div className="h-full flex items-center justify-center space-x-2">
              <div className="flex flex-col w-full space-y-2">
                <form
                  onSubmit={(
                    e: FormEvent<HTMLFormElement> & {
                      target: { cid: { value: string } };
                    }
                  ) => {
                    e.preventDefault();
                    router.push(`/designer/mint?cid=${e.target.cid.value}`);
                  }}
                  className="flex justify-center items-center space-x-2"
                >
                  <input
                    type="text"
                    name="cid"
                    placeholder="Paste QmXe... or bafy... CID from your provider"
                    className="xl:w-3/4 w-full rounded-xl p-4"
                  />
                  <button className="btn" type="submit">
                    Begin Minting!
                  </button>
                </form>
                <div className="flex flex-row justify-center space-x-2">
                  <Button
                    href={`/designer/mint?cid=${config.samples.cids[0]}`}
                    external={false}
                  >
                    <h3>Test CID 0</h3>
                  </Button>
                  <Button
                    href={`/designer/mint?cid=${config.samples.cids[1]}`}
                    external={false}
                  >
                    <h3>Test CID 1</h3>
                  </Button>
                </div>
              </div>
            </div>
            <Button
              className="no-animation"
              onClick={() => setStep("upload")}
              external={false}
            >
              Previous
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Upload;
