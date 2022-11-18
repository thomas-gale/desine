/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useRouter } from "next/router";
import { config } from "../../env/config";
import { Button } from "./Button";
import { Identity } from "../web3/Identity";
import { MdOpenInNew } from "react-icons/md";

export const TopNav = (): JSX.Element => {
  const router = useRouter();

  return (
    <div className="bg-base-300 w-full flex flex-row flex-wrap items-center p-2 shadow-md">
      <div className="flex flex-row flex-wrap items-center">
        <Button className="mx-2" href="/" external={false}>
          <div className="flex flex-row space-x-2 items-center">
            <img
              src={config.icon}
              height="20em"
              width="20em"
              alt="desine Link Emoji Logo"
            />
            <h2 className="font-bold">{config.appName}</h2>
          </div>
        </Button>
        <Button className="mx-2" href="/about" external={false}>
          About
        </Button>
        <Button className="mx-2" href="/settings" external={false}>
          Settings
        </Button>
        <Button className="mx-2" href={config.github} external={true}>
          Source Code
        </Button>
      </div>
      <div className="flex-grow" />
      <Identity />
    </div>
  );
};
