export const config = {
  appName: "Dedes",
  icon: "favicon-32x32.png",
  description: "Dedes is a decentralized CAD Design licensing marketplace",
  github: "https://github.com/thomas-gale/dedes",
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
