import { MeshReflectorMaterial } from "@granity/three/drei";
import { FC } from "react";

const MeshesMaterial: FC = () => {
    return (
        <MeshReflectorMaterial
            mirror={0}
            blur={[400, 100]}
            resolution={1024}
            mixBlur={1}
            mixStrength={15}
            depthScale={1}
            minDepthThreshold={0.85}
            color="#ffffff"
            metalness={0.1}
            roughness={1}
        />
    );
};

export default MeshesMaterial;
