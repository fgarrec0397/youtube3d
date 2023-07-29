import { GameRigidBody } from "@granity/engine";
import { Vector3Array } from "@granity/helpers";
import { Box3, Mesh, Vector3 } from "@granity/three";
import { useGLTF } from "@granity/three/drei";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { GLTF } from "three-stdlib";

export type CinemaChunkProps = {
    cinemaModel3D: string;
    index: number;
    position?: Vector3Array;
};

type GLTFResult = GLTF & {
    nodes: {
        Cube_1: THREE.Mesh;
        Cube_2: THREE.Mesh;
        Cube002: THREE.Mesh;
        Cube001: THREE.Mesh;
        Cube003: THREE.Mesh;
        Cube004: THREE.Mesh;
    };
    materials: {
        Material: THREE.MeshStandardMaterial;
        ["Material.004"]: THREE.MeshStandardMaterial;
        ["Material.005"]: THREE.MeshStandardMaterial;
        ["Material.006"]: THREE.MeshStandardMaterial;
    };
};

const CinemaChunk: FC<CinemaChunkProps> = ({ cinemaModel3D, index }) => {
    const { nodes, materials } = useGLTF(cinemaModel3D) as GLTFResult;
    const ref = useRef<Mesh>(null);
    const [size, setSize] = useState<Vector3>(new Vector3());

    const isOdd = useMemo(() => {
        return index % 2 !== 0;
    }, [index]);

    useEffect(() => {
        if (!ref.current) {
            return;
        }

        const box = new Box3().setFromObject(ref.current);
        const bboxSize = new Vector3(box as unknown as number);

        setSize(box.getSize(bboxSize));
    }, []);

    return (
        <GameRigidBody
            type="fixed"
            position={[0, 0, index * size.z]}
            rotation={[0, isOdd ? 0 : Math.PI, 0]}
        >
            <group dispose={null}>
                <group
                    position={[3.696, 3.708, 0]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    scale={[3.721, 9.711, 0.03]}
                >
                    <mesh
                        ref={ref}
                        geometry={nodes.Cube_1.geometry}
                        material={materials.Material}
                    />
                    <mesh geometry={nodes.Cube_2.geometry} material={materials.Material} />
                </group>
                <mesh
                    geometry={nodes.Cube002.geometry}
                    material={materials["Material.004"]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={[3.721, 9.711, 0.03]}
                />
                <mesh
                    geometry={nodes.Cube001.geometry}
                    material={materials["Material.005"]}
                    position={[-3.704, 3.708, 0]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    scale={[3.721, 9.711, 0.03]}
                />
                <mesh
                    geometry={nodes.Cube004.geometry}
                    material={materials["Material.006"]}
                    position={[0, 7.377, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={[3.721, 9.711, 0.03]}
                />
            </group>
        </GameRigidBody>
    );
};

export default CinemaChunk;
