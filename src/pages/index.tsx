import { useRouter } from "next/router";
import React from "react";
import { Button } from "../components/elements/Button";

const Index = (): JSX.Element => {
  const router = useRouter();

  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col">
        <Button className="m-2" href="/browse" external={false}>
          <h1>Browse Designs</h1>
        </Button>
        <Button className="m-2" href="/designer/mint" external={false}>
          <h1>Mint New Design</h1>
        </Button>
      </div>
    </div>
  );
};

export default Index;
