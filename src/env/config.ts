export const config = {
  appName: "Desine",
  appVersion: "0.1.0",
  icon: "/favicon-32x32.png",
  description: "Desine is a decentralized CAD Design licensing marketplace",
  github: "https://github.com/thomas-gale/desine",
  settings: {
    defaultIpfsGatewayPrefix: "https://ipfs.io/ipfs/",
    defaultIpfsGatewaySuffix: "",
    desineTokenAddress: "0x7908a8ec43474028bb1bfabdac5e203c2459096e", // This needs to be updated to differentiate for each network type (mainnet, goerli, etc.)
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
      "bafkreibcozf3i4fb55ylwd54quwaxmpca33yjung5hfco2huq54hgs6exm"
    ]
  },
};
