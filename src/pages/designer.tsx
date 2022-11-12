import { useRouter } from "next/router";
import React, { FormEvent } from "react";
import { Button } from "../components/elements/Button";

// A two step component that allows the user to first select an IPFS storage provider and then allows them to supply the hash to the webapp.
const Designer = (): JSX.Element => {
  const router = useRouter();
  return (
    <div className="h-full flex flex-col p-4 space-y-4">
      <div className="flex flex-col h-full p-4 rounded-xl bg-dark">
        <h3 className="text-light">1. Select IPFS Storage Solution</h3>
        <p className="text-light">
          Pin your .step/stp file with a provider or self pin (we recommend you
          use multiple options for redundancy)
        </p>
        <div className="h-full flex items-center justify-center">
          <div className="flex flow-row items-center space-x-4">
            <Button mode="dark" href="https://nft.storage/">
              <h1>nft.storage</h1>
            </Button>
            <Button mode="dark" href="https://pinata.cloud/">
              <h1>pinata.cloud</h1>
            </Button>
            <Button mode="dark" href="https://web3.storage/">
              <h1>web3.storage</h1>
            </Button>
            <div>
              <h2 className="text-light">
                An alternate IPFS storage solution of your choosing...
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-full p-4 rounded-xl bg-dark">
        <h3 className="text-light">2. Paste the CiD (Content Identifier)</h3>
        <div className="h-full flex items-center justify-center">
          <form
            onSubmit={(
              e: FormEvent<HTMLFormElement> & {
                target: { cid: { value: string } };
              }
            ) => {
              e.preventDefault();
              router.push(`/designer/mint?cid=${e.target.cid.value}`);
            }}
            className="w-1/2"
          >
            <input
              type="text"
              name="cid"
              placeholder="QmXe... or bafy..."
              className="w-full rounded-xl p-4"
            />
            <Button
              mode="dark"
              onClick={() =>
                router.push(
                  "/designer/mint?cid=bafybeieexg5qkwawaepzf4echovapg2mn2yidbzt3yg7fej3saib5fv54a"
                )
              }
            >
              Test Sample
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Designer;
