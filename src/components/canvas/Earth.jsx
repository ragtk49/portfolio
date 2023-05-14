import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Earth = () => {
  const earth = useGLTF('./planet/scene.gltf');
  return (
    <primitive 
    object={earth.scene}
    scale={2.5}
    gl={{preserveDrawingBuffer:true}}
    camera={{
      fov:45,
      near:0.1,
      far:200,
      position:[-4,6,6]
    }}/>
  )
}

const EarthCanvas = () => {
  return(
    <Canvas
      shadows
      frameloop="demand"
      gl={{preserveDrawingBuffer:true}}
      camera={{}}>
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls 
            enableZoom={false}
            autoRotate
            maxPolarAngle={Math.PI/2}
            minPolarAngle={Math.PI/2}/>
            <Earth/>
        </Suspense>
    </Canvas>
  )
}

export default EarthCanvas