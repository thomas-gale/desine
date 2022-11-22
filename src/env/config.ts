export const config = {
  appName: "Desine",
  appVersion: "0.1.0",
  icon: "/favicon-32x32.png",
  description: "Desine is a decentralized CAD Design licensing marketplace",
  github: "https://github.com/thomas-gale/desine",
  settings: {
    defaultIpfsGatewayPrefix: "https://ipfs.io/ipfs/",
    defaultIpfsGatewaySuffix: "",
    ethNetworkId: parseInt(process.env.NEXT_PUBLIC_ETH_NETWORK_ID as string), // Main: 1, Goerli: 5, Localhost: 1337
    desineTokenAddress: process.env.NEXT_PUBLIC_DESINE_TOKEN_ADDRESS ?? "", // This needs to be updated to differentiate for each network type (mainnet, goerli, etc.)
  },
  links: {
    publicGateWayChecker: "https://ipfs.github.io/public-gateway-checker/",
    openCascade: "https://dev.opencascade.org/",
  },
  samples: {
    cids: [
      "bafybeih6tza23shwxuyjgtt523h64gnlfth3sf56nq7b72k2wv2hy65qsq",
      "bafybeieexg5qkwawaepzf4echovapg2mn2yidbzt3yg7fej3saib5fv54a",
    ],
    metadataCids: [
      "bafkreibcozf3i4fb55ylwd54quwaxmpca33yjung5hfco2huq54hgs6exm",
    ],
  },
};
