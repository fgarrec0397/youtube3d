import {
    createGameWidget,
    GameEditableWidget,
    GameOptionsFieldTypes,
    GameRigidBody,
} from "@granity/engine";
import { useGLTF } from "@granity/three/drei";
import { FC } from "react";
import { GLTF } from "three-stdlib";

export type CinemaProps = GameEditableWidget & {
    model3D: string;
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

const Cinema: FC<CinemaProps> = ({ model3D }) => {
    const { nodes, materials } = useGLTF(model3D) as GLTFResult;

    return (
        <GameRigidBody type="fixed">
            <group dispose={null}>
                <group
                    position={[3.696, 3.708, 0]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    scale={[3.721, 9.711, 0.03]}
                >
                    <mesh geometry={nodes.Cube_1.geometry} material={materials.Material} />
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
                    geometry={nodes.Cube003.geometry}
                    material={nodes.Cube003.material}
                    position={[4.394, 1.585, -2.194]}
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

export const widget = createGameWidget({
    component: Cinema,
    reducer: null,
    name: "Cinema",
    options: [
        {
            name: "model3D",
            displayName: "3D Model",
            fieldType: GameOptionsFieldTypes.File,
            defaultValue: "",
        },
    ],
});
