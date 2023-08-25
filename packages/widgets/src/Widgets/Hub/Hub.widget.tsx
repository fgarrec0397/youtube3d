import {
    createGameWidget,
    GameEditableWidget,
    GameOptionsFieldTypes,
    GameRigidBody,
    useGameInit,
} from "@granity/engine";
import { useGLTF } from "@granity/three/drei";
import { FC, useEffect, useRef } from "react";
import { AnimationAction, Group, LoopOnce } from "three";
import { GLTF } from "three-stdlib";

import { useAnimations } from "./useAnimations";

export type HubProps = GameEditableWidget & {
    model3D?: string;
};

type GLTFResult = GLTF & {
    nodes: {
        Cube014: THREE.Mesh;
        Cube015: THREE.Mesh;
        Cube016: THREE.Mesh;
        Cube017: THREE.Mesh;
    };
    materials: {
        ["Marble.010"]: THREE.MeshStandardMaterial;
        ["Marble.011"]: THREE.MeshStandardMaterial;
        ["Marble.012"]: THREE.MeshStandardMaterial;
    };
};

type ActionName = "Cube.017Action";
type GLTFActions = Record<ActionName, AnimationAction>;

const Hub: FC<HubProps> = ({ model3D }) => {
    const group = useRef<Group>();
    const { nodes, materials, animations } = useGLTF(model3D) as GLTFResult;
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        // actions.
        console.log(group, "group");
        if (!actions["Cube.017Action"]) {
            return;
        }
        actions["Cube.017Action"].setLoop(LoopOnce, 1);
        actions["Cube.017Action"].clampWhenFinished = true;
        actions["Cube.017Action"].play();
        actions["Cube.017Action"].play();
        console.log(actions["Cube.017Action"], "actions");
        console.log(animations, "animations");
    });

    return (
        <GameRigidBody type="fixed">
            <group ref={group} dispose={null}>
                <group name="Scene">
                    <mesh
                        name="Cube014"
                        geometry={nodes.Cube014.geometry}
                        material={materials["Marble.010"]}
                        position={[0.179, 0.009, 38.299]}
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={[1.562, 1.289, 1]}
                    />
                    <mesh
                        name="Cube015"
                        geometry={nodes.Cube015.geometry}
                        material={materials["Marble.011"]}
                        position={[0.413, 9.328, 59.773]}
                        rotation={[Math.PI, 0, Math.PI / 2]}
                        scale={[9.368, 37.699, 0.03]}
                    />
                    <mesh
                        name="Cube016"
                        geometry={nodes.Cube016.geometry}
                        material={materials["Marble.012"]}
                        position={[0.413, 9.328, 16.967]}
                        rotation={[Math.PI, 0, Math.PI / 2]}
                        scale={[9.368, 37.699, 0.348]}
                    />
                    <mesh
                        name="Cube017"
                        geometry={nodes.Cube017.geometry}
                        material={nodes.Cube017.material}
                        position={[-0.199, 3.91, 16.544]}
                        scale={[4.046, 3.957, 1]}
                    />
                </group>
            </group>
        </GameRigidBody>
    );
};

export const widget = createGameWidget({
    component: Hub,
    reducer: null,
    name: "Hub",
    options: [
        {
            name: "model3D",
            displayName: "3D Model",
            fieldType: GameOptionsFieldTypes.File,
            defaultValue: "",
        },
    ],
});
