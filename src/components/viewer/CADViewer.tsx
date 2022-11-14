import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { Spinner } from "../elements/Spinner";
import {
  MESH,
  OBJECT,
  STEP,
  useLoadCadWorkflow,
} from "../../hooks/useLoadCadWorkflow";
import { config } from "../../env/config";

export interface CADViewerProps {
  stepURL: string;
}

// Attribution: https://github.com/kovacsv/occt-import-js
export const CADViewer = ({ stepURL }: CADViewerProps) => {
  const { object, loadingState } = useLoadCadWorkflow(stepURL);

  return (
    <Canvas>
      <OrbitControls dampingFactor={1} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <object3D ref={object} position={[0, 0, 0]} scale={[0.01, 0.01, 0.01]} />
      {loadingState !== "Ready" && (
        <Html center>
          <div className="flex flex-row items-center p-2 space-x-8">
            <div className="h-32 w-32">
              <Spinner />
            </div>
            <div className="flex flex-col space-y-2">
              {loadingState === STEP && (
                <h3 className="text-light">
                  Downloading .step from IPFS via configured gateway...
                </h3>
              )}
              {loadingState === MESH && (
                <h3 className="text-light">
                  Converting .step to mesh with{" "}
                  <a href={config.links.openCascade}>OpenCascade</a> ...
                </h3>
              )}
              {loadingState === OBJECT && (
                <h3 className="text-light">
                  Building three.js primitive from mesh...
                </h3>
              )}
              <h4 className="text-light">
                <i>Running locally within your browser</i>
              </h4>
            </div>
          </div>
        </Html>
      )}
    </Canvas>
  );
};
