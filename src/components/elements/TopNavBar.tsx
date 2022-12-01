/* eslint-disable @next/next/no-img-element */
import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { config } from "../../env/config";
import { Button } from "./Button";
import { Identity } from "../web3/Identity";
import { MdOpenInNew, MdOutlineSettings } from "react-icons/md";
import { FaGithub, FaQuestionCircle } from "react-icons/fa";
import { VscListSelection } from "react-icons/vsc";

export const TopNavBar = (): JSX.Element => {
  const router = useRouter();

  const links = useMemo(
    () => (
      <>
        <li tabIndex={0}>
          <Button href="/about" external={false}>
            <div className="flex flex-row space-x-2 items-center">
              <FaQuestionCircle />
              <p>About</p>
            </div>
          </Button>
        </li>
        <li tabIndex={1}>
          <Button href="/settings" external={false}>
            <div className="flex flex-row space-x-2 items-center">
              <MdOutlineSettings />
              <p>Settings</p>
            </div>
          </Button>
        </li>
        <li tabIndex={2}>
          <Button
            href={`https://testnets.opensea.io/assets?search[query]=${config.settings.desineTokenAddress}`}
            external={true}
          >
            <div className="flex flex-row space-x-2 items-center">
              <p>OpenSea</p>
            </div>
          </Button>
        </li>
        <li tabIndex={3}>
          <Button href={config.github} external={true}>
            <div className="flex flex-row space-x-2 items-center">
              <FaGithub />
              <p>GitHub</p>
            </div>
          </Button>
        </li>
      </>
    ),
    []
  );

  return (
    <>
      <div className="navbar bg-base-300 shadow-md">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost xl:hidden">
              <VscListSelection className="h-5 w-5" />
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content p-2 bg-base-200 rounded-box space-y-2"
            >
              {links}
            </ul>
          </div>
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
        </div>
        <div className="navbar-center hidden xl:flex">
          <ul className="menu menu-horizontal p-2 space-x-2">{links}</ul>
        </div>
        <div className="navbar-end">
          <Identity />
        </div>
      </div>
    </>
  );
};
