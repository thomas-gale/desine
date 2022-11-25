/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useRouter } from "next/router";
import { config } from "../../env/config";
import { Button } from "./Button";
import { Identity } from "../web3/Identity";
import { MdOpenInNew, MdOutlineSettings } from "react-icons/md";
import { FaGithub, FaQuestionCircle } from "react-icons/fa";

export const TopNav = (): JSX.Element => {
  const router = useRouter();

  return (
    <div className="bg-base-300 w-full flex flex-row flex-wrap items-center p-2 shadow-md">
      <div className="flex flex-row flex-wrap items-center">
        <Button
          className="mx-2 bg-base-300 border-base-300"
          href="/"
          external={false}
        >
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
          <div className="flex flex-row space-x-2 items-center">
            <FaQuestionCircle />
            <p>About</p>
          </div>
        </Button>
        <Button className="mx-2" href="/settings" external={false}>
          <div className="flex flex-row space-x-2 items-center">
            <MdOutlineSettings />
            <p>Settings</p>
          </div>
        </Button>
        <Button className="mx-2" href={`https://testnets.opensea.io/assets?search[query]=${config.settings.desineTokenAddress}`} external={true}>
          <div className="flex flex-row space-x-2 items-center">
            <p>OpenSea</p>
          </div>
        </Button>
        <Button className="mx-2" href={config.github} external={true}>
          <div className="flex flex-row space-x-2 items-center">
            <FaGithub />
            <p>GitHub</p>
          </div>
        </Button>
      </div>
      <div className="flex-grow" />
      <Identity />
    </div>
  );
};
