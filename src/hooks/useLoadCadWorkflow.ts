import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  MeshingPostMessageEvent,
  MeshRequest,
} from "../workers/meshing.worker";

const STEP = "Step";
const MESH = "Mesh";
const OBJECT = "Object";
const READY = "Ready";

export const useLoadCadWorkflow = (stepURL: string) => {
  const meshingWorkerRef = useRef<Worker>();
  const [stepModel, setStepModel] = useState<Uint8Array | null>(null);
  const [meshedModel, setMeshedModel] = useState<any | null>(null);
  const object = useRef<THREE.Object3D>(null!);
  const [loadingState, setLoadingState] = useState<
    typeof STEP | typeof MESH | typeof OBJECT | typeof READY
  >(STEP);

  // 1. Download the step model
  useEffect(() => {
    if (loadingState !== STEP || !stepURL) return;
    (async () => {
      console.log(`1. CADViewer: downloading step ${stepURL}...`);
      let response = await fetch(stepURL);
      let buffer = await response.arrayBuffer();
      let fileBuffer = new Uint8Array(buffer);
      setStepModel(fileBuffer);
      setLoadingState(MESH);
      console.log("1. CADViewer: downloaded step!");
    })();
  }, [stepURL, loadingState]);

  // 2.1 Create worker and configure handlers
  useEffect(() => {
    console.log("Creating meshing web worker...");
    meshingWorkerRef.current = new Worker(
      new URL("../workers/meshing.worker", import.meta.url)
    );
    meshingWorkerRef.current.addEventListener(
      "message",
      (event: MeshingPostMessageEvent) => {
        console.log("2.1 Receiving meshing post event data, storing result...");
        setMeshedModel(event.data);
        setLoadingState(OBJECT);
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
    if (loadingState !== MESH) return;
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
  }, [stepModel, loadingState]);

  // 3. Hook to convert mesh into three.js geometry
  useEffect(() => {
    if (loadingState !== OBJECT || !meshedModel || !meshedModel.meshes) return;
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
      setLoadingState(READY);
      console.log("3. CADViewer: built three.js geometries!");
    })();
  }, [meshedModel]);

  // 4. Hook to center the camera on the loaded object
  useEffect(() => {
    if (loadingState !== READY) return;
    console.log("Centering camera TODO...");
  }, [loadingState]);

  return {
    object,
    loadingState,
  };
};
