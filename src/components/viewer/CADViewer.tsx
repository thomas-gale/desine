import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import occtimportjs from "occt-import-js";

function Box(props: ThreeElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  useFrame((state, delta) => (ref.current.rotation.x += 0.01));
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

export interface CADViewerProps {
  stepURL: string;
}

export const CADViewer = ({ stepURL }: CADViewerProps) => {
  const object = useRef<THREE.Object3D>(null!);

  useEffect(() => {
    (async () => {
      console.log("CADViewer: about to load URL: ", stepURL);
      const occt = await occtimportjs();

      // download step file
      let response = await fetch(stepURL);
      let buffer = await response.arrayBuffer();

      // read the imported step file
      let fileBuffer = new Uint8Array(buffer);
      let result = occt.ReadStepFile(fileBuffer, null);

      // process the geometries of the result
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
