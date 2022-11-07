/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useRouter } from "next/router";
import { config } from "../../env/config";
import { Button } from "./Button";
import { Identity } from "../web3/Identity";

export const TopNav = (): JSX.Element => {
  const router = useRouter();

  return (
    <div className="bg-black w-full flex flex-row flex-wrap items-center shadow-md">
      <div className="m-2 flex flex-row items-center">
        <div
          className="flex flex-row items-center rounded-xl hover:bg-gray-500 hover:cursor-pointer"
          onClick={async () => router.push("/")}
        >
          <img
            src={config.icon}
            className="ml-2"
            alt="desine Link Emoji Logo"
          />
          <h1 className="mx-2 text-light text-xl font-bold p-4 ">
            {config.appName}
          </h1>
        </div>
        <Button
          mode="dark"
          className="mx-2"
          onClick={async () => router.push("/about")}
        >
          About
        </Button>
        <Button
          mode="dark"
          className="mx-2"
          onClick={async () => router.push(config.github)}
        >
          Source Code
        </Button>
      </div>
      <div className="flex-grow" />
      <Identity />
    </div>
  );
};
