import React, { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Loader, OrbitControls } from "@react-three/drei";
import {
  MeshingPostMessageEvent,
  MeshRequest,
} from "../../workers/meshing.worker";
// import occtimportjs from "occt-import-js";

export interface CADViewerProps {
  stepURL: string;
}

// Attribution: https://github.com/kovacsv/occt-import-js
export const CADViewer = ({ stepURL }: CADViewerProps) => {
  const meshingWorkerRef = useRef<Worker>();
  const [stepModel, setStepModel] = useState<Uint8Array | null>(null);
  const [meshedModel, setMeshedModel] = useState<any | null>(null);
  const object = useRef<THREE.Object3D>(null!);

  // 1. Download the step model
  useEffect(() => {
    (async () => {
      console.log("1. CADViewer: downloading step...");
      let response = await fetch(stepURL);
      let buffer = await response.arrayBuffer();
      let fileBuffer = new Uint8Array(buffer);
      console.log("1. CADViewer: downloaded step!");
      setStepModel(fileBuffer);
    })();
  }, [stepURL]);

  // 2.1 Create worker and configure handlers
  useEffect(() => {
    meshingWorkerRef.current = new Worker(
      new URL("../../workers/meshing.worker", import.meta.url)
    );
    meshingWorkerRef.current.addEventListener(
      "message",
      (event: MeshingPostMessageEvent) => {
        console.log("2.1 Receiving meshing post event data, storing result...");
        setMeshedModel(event.data);
        console.log("2.1 Receiving meshing post event data, stored result!");
      }
    );
    return () => {
      console.log("Terminating meshing web worker...");
      meshingWorkerRef.current?.terminate();
    };
  }, []);

  // 2.2 Trigger step->mesh conversion
  useEffect(() => {
    if (stepModel) {
      (async () => {
        console.log(
          "2.1 Posting message to start meshing worker with model..."
        );
        await meshingWorkerRef.current.postMessage({
          stepFile: stepModel,
        } as MeshRequest);
        console.log("2.1 Posted message to start meshing worker with model!");
      })();
    }
  }, [stepModel]);

  // 3. Hook to convert mesh into three.js geometry
  useEffect(() => {
    if (!meshedModel) return;
    (async () => {
      console.log("3. CADViewer: building three.js geometries...");
      for (let resultMesh of meshedModel.meshes) {
        let geometry = new THREE.BufferGeometry();

        geometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(
            resultMesh.attributes.position.array,
            3
          )
        );
        if (resultMesh.attributes.normal) {
          geometry.setAttribute(
            "normal",
            new THREE.Float32BufferAttribute(
              resultMesh.attributes.normal.array,
              3
            )
          );
        }
        const index = Uint32Array.from(resultMesh.index.array);
        geometry.setIndex(new THREE.BufferAttribute(index, 1));

        let material = null;
        if (resultMesh.color) {
          const color = new THREE.Color(
            resultMesh.color[0],
            resultMesh.color[1],
            resultMesh.color[2]
          );
          material = new THREE.MeshPhongMaterial({ color: color });
        } else {
          material = new THREE.MeshPhongMaterial({ color: 0xcccccc });
        }

        const mesh = new THREE.Mesh(geometry, material);
        object.current.add(mesh);
      }
      console.log("3. CADViewer: built three.js geometries!");
    })();
  }, [meshedModel]);

  /*
 <div className="flex flex-row items-center p-2 space-x-2">
          <Spinner />
          <h3 className="text-light">
            (TODO) Checking that this CiD is valid and is not already minted
          </h3>
        </div>
  */

  return (
    <>
      <Canvas>
        <OrbitControls />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <object3D
            ref={object}
            position={[0, 0, 0]}
            scale={[0.01, 0.01, 0.01]}
          />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
};
