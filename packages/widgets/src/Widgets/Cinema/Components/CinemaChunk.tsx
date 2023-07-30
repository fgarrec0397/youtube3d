import { GameRigidBody, useGameInit } from "@granity/engine";
import { Vector3Array } from "@granity/helpers";
import { MeshCollider } from "@granity/physics";
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
        Cube002: THREE.Mesh;
        Cube001: THREE.Mesh;
        Cube003: THREE.Mesh;
        Cube004: THREE.Mesh;
        Cube005: THREE.Mesh;
        Cube006: THREE.Mesh;
        Cube007: THREE.Mesh;
        Plane: THREE.Mesh;
        Cube008: THREE.Mesh;
        Cube009: THREE.Mesh;
        Cube010: THREE.Mesh;
        Cube: THREE.Mesh;
    };
    materials: {
        ["Material.004"]: THREE.MeshStandardMaterial;
        ["Material.005"]: THREE.MeshStandardMaterial;
        ["Material.006"]: THREE.MeshStandardMaterial;
        ["Material.008"]: THREE.MeshStandardMaterial;
        ["Material.009"]: THREE.MeshStandardMaterial;
        ["Material.010"]: THREE.MeshStandardMaterial;
        ["Material.011"]: THREE.MeshStandardMaterial;
        ["Material.012"]: THREE.MeshStandardMaterial;
        ["Material.013"]: THREE.MeshStandardMaterial;
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
        box.getSize(bboxSize);
        setSize(box.getSize(bboxSize));
    }, []);

    return (
        <GameRigidBody
            type="fixed"
            colliders={false}
            position={[0, 0, index * size.z]}
            rotation={[0, isOdd ? 0 : Math.PI, 0]}
        >
            <group dispose={null}>
                <MeshCollider type="cuboid">
                    <mesh
                        geometry={nodes.Cube002.geometry}
                        material={materials["Material.004"]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[3.721, 16.641, 0.03]}
                    />
                </MeshCollider>
                <MeshCollider type="cuboid">
                    <mesh
                        ref={ref}
                        geometry={nodes.Cube001.geometry}
                        material={materials["Material.005"]}
                        position={[-3.704, 3.708, 0]}
                        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                        scale={[3.721, 16.641, 0.03]}
                    />
                </MeshCollider>
                {/* <MeshCollider type="cuboid"> */}
                <mesh
                    geometry={nodes.Cube004.geometry}
                    material={materials["Material.006"]}
                    position={[0, 7.377, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={[3.721, 16.641, 0.03]}
                />
                {/* </MeshCollider> */}
                <MeshCollider type="trimesh">
                    <mesh
                        geometry={nodes.Cube005.geometry}
                        material={materials["Material.008"]}
                        position={[3.709, 9.36, 0]}
                        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                        scale={[9.368, 16.641, 0.03]}
                    />
                </MeshCollider>
                <MeshCollider type="cuboid">
                    <mesh
                        geometry={nodes.Cube006.geometry}
                        material={materials["Material.009"]}
                        position={[51.298, 9.36, 0]}
                        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                        scale={[9.368, 16.641, 0.03]}
                    />
                </MeshCollider>
                <MeshCollider type="cuboid">
                    <mesh
                        geometry={nodes.Cube007.geometry}
                        material={materials["Material.010"]}
                        position={[27.722, -0.0001, 0]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[24.003, 16.641, 0.03]}
                    />
                </MeshCollider>
                <mesh
                    geometry={nodes.Plane.geometry}
                    material={nodes.Plane.material}
                    position={[23.315, 6.912, 16.7]}
                    rotation={[Math.PI / 2, 0, -Math.PI]}
                    scale={[-19.646, -1, -6.876]}
                />
                {/* <MeshCollider type="cuboid"> */}
                <mesh
                    geometry={nodes.Cube008.geometry}
                    material={materials["Material.011"]}
                    position={[27.69, 9.187, -16.527]}
                    rotation={[Math.PI, 0, Math.PI / 2]}
                    scale={[9.368, 23.816, 0.03]}
                />
                {/* </MeshCollider> */}
                {/* <MeshCollider type="cuboid"> */}
                <mesh
                    geometry={nodes.Cube009.geometry}
                    material={materials["Material.012"]}
                    position={[27.557, 9.403, 16.619]}
                    rotation={[Math.PI, 0, Math.PI / 2]}
                    scale={[9.368, 23.816, 0.03]}
                />
                {/* </MeshCollider> */}
                {/* <MeshCollider type="cuboid"> */}
                <mesh
                    geometry={nodes.Cube010.geometry}
                    material={materials["Material.013"]}
                    position={[27.722, 18.701, -0.116]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={[24.003, 16.641, 0.03]}
                />
                {/* </MeshCollider> */}
            </group>
        </GameRigidBody>
    );
};

export default CinemaChunk;
