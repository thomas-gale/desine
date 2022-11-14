import React from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { Spinner } from "../elements/Spinner";
import { useLoadCadWorkflow } from "../../hooks/useLoadCadWorkflow";

export interface CADViewerProps {
  stepURL: string;
}

// Attribution: https://github.com/kovacsv/occt-import-js
export const CADViewer = ({ stepURL }: CADViewerProps) => {
  const { object, loadingState } = useLoadCadWorkflow(stepURL);

  return (
    <Canvas>
      <OrbitControls />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <object3D ref={object} position={[0, 0, 0]} scale={[0.01, 0.01, 0.01]} />
      {loadingState !== "Ready" && (
        <Html center>
          <div className="flex flex-row items-center p-2 space-x-2">
            <Spinner size={16} />
            <h3 className="text-light">Loading {loadingState}...</h3>
          </div>
        </Html>
      )}
    </Canvas>
  );
};
