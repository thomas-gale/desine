import { config } from "./config";

export const getNetworkName = (): string => {
  switch (config.settings.ethNetworkId) {
    case 1:
      return "mainnet";
    case 5:
      return "goerli";
    case 1337:
      return "localhost";
    default:
      return `unknown (${config.settings.ethNetworkId})`;
  }
};
