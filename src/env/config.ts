export const config = {
  appName: "Desine",
  appVersion: "0.1.0",
  icon: "/favicon-32x32.png",
  description: "Desine is a decentralized CAD Design licensing marketplace",
  github: "https://github.com/thomas-gale/desine",
  settings: {
    defaultIpfsGatewayPrefix: "https://ipfs.io/ipfs/",
    defaultIpfsGatewaySuffix: "",
  },
  ipfs: {
    gateway: {
      exampleDir:
        "https://gateway.pinata.cloud/ipfs/Qmaz3RP6BVNNJVPvEFSRjpXyGx6cxwFHHyJUKtX8Ue4r2b",
      exampleGearboxGltf:
        "https://gateway.pinata.cloud/ipfs/Qmaz3RP6BVNNJVPvEFSRjpXyGx6cxwFHHyJUKtX8Ue4r2b/GearboxAssy.gltf",
    },
  },
  api: {
    forge: {
      viewer: {
        css: "https://developer.api.autodesk.com/modelderivative/v2/viewers/7.79/style.min.css",
        script:
          "https://developer.api.autodesk.com/modelderivative/v2/viewers/7.79/viewer3D.min.js",
      },
    },
  },
};
