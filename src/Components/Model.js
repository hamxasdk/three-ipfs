import React from "react";
import { useGLTF } from "@react-three/drei";
export const Model = (props) => {
  const { scene } = useGLTF("../huracan_eagletm.glb");
  return <primitive object={scene} scale={1.3} />;
};
