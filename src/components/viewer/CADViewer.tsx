import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import occtimportjs from "occt-import-js";

export interface CADViewerProps {
  stepURL: string;
}

export const CADViewer = ({ stepURL }: CADViewerProps) => {
  const object = useRef<THREE.Object3D>(null!);

  useEffect(() => {
    (async () => {
      console.log("CADViewer: about to load URL: ", stepURL);
      const occt = await occtimportjs();

      // Step 1: download step file
      console.log("CADViewer: downloading step...");
      let response = await fetch(stepURL);
      let buffer = await response.arrayBuffer();
      let fileBuffer = new Uint8Array(buffer);
      console.log("CADViewer: downloaded step!");

      // read the imported step file
      console.log("CADViewer: meshing step...");
      let result = occt.ReadStepFile(fileBuffer, null);
      console.log("CADViewer: meshed step!");

      // process the geometries of the result
      console.log("CADViewer: building three.js geometries...");
      for (let resultMesh of result.meshes) {
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
      console.log("CADViewer: built three.js geometries!");
    })();
  }, [stepURL]);

  return (
    <Canvas>
      <OrbitControls />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <object3D ref={object} position={[0, 0, 0]} scale={[0.01, 0.01, 0.01]} />
    </Canvas>
  );
};
