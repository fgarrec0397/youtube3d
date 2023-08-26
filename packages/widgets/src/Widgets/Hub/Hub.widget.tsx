import {
    createGameWidget,
    GameEditableWidget,
    GameOptionsFieldTypes,
    GameRigidBody,
} from "@granity/engine";
import { CuboidCollider, MeshCollider, RapierCollider, RigidBodyRefType } from "@granity/physics";
import { useAnimations, useGLTF } from "@granity/three/drei";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Group, LoopOnce } from "three";
import { GLTF } from "three-stdlib";

export type HubProps = GameEditableWidget & {
    model3D: string;
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

const Hub: FC<HubProps> = ({ model3D }) => {
    const group = useRef<Group>(null);
    const doorColliderRef = useRef<RapierCollider>(null);
    const { nodes, materials, animations } = useGLTF(model3D) as GLTFResult;
    const { actions, mixer } = useAnimations(animations, group);
    const [isDoorOpen, setIsDoorOpen] = useState(false);

    const doorAnimation = actions["Cube.017Action"];

    useEffect(() => {
        const finishedCallback = () => {
            setIsDoorOpen(true);

            doorColliderRef.current?.setSensor(true);
        };

        mixer.addEventListener("finished", finishedCallback);

        return () => {
            mixer.removeEventListener("finished", finishedCallback);
        };
    }, [mixer]);

    const openDoor = useCallback(() => {
        if (!doorAnimation) {
            return;
        }

        doorAnimation.setLoop(LoopOnce, 1);
        doorAnimation.clampWhenFinished = true;
        doorAnimation.play();
    }, [doorAnimation]);

    useEffect(() => {
        openDoor();
    }, [doorAnimation, openDoor]);

    return (
        <GameRigidBody type="fixed" colliders={false}>
            <group ref={group}>
                <group name="Scene">
                    <MeshCollider type="cuboid">
                        <mesh
                            name="Cube014"
                            geometry={nodes.Cube014.geometry}
                            material={materials["Marble.010"]}
                            position={[0.179, 0.009, 38.299]}
                            rotation={[Math.PI / 2, 0, 0]}
                            scale={[1.562, 1.289, 1]}
                        />
                    </MeshCollider>
                    <MeshCollider type="cuboid">
                        <mesh
                            name="Cube015"
                            geometry={nodes.Cube015.geometry}
                            material={materials["Marble.011"]}
                            position={[0.413, 9.328, 59.773]}
                            rotation={[Math.PI, 0, Math.PI / 2]}
                            scale={[9.368, 37.699, 0.03]}
                        />
                    </MeshCollider>
                    <MeshCollider type="trimesh">
                        <mesh
                            name="Cube016"
                            geometry={nodes.Cube016.geometry}
                            material={materials["Marble.012"]}
                            position={[0.413, 9.328, 16.967]}
                            rotation={[Math.PI, 0, Math.PI / 2]}
                            scale={[9.368, 37.699, 0.348]}
                        />
                    </MeshCollider>
                    {/* {isDoorOpen ? (
                        <mesh
                            name="Cube017"
                            geometry={nodes.Cube017.geometry}
                            material={nodes.Cube017.material}
                            position={[-0.199, 3.91, 16.544]}
                            scale={[4.046, 3.957, 1]}
                        />
                    ) : ( */}
                    <CuboidCollider
                        ref={doorColliderRef}
                        args={[4.046, 3.957, 1]}
                        position={[-0.199, 3.91, 16.544]}
                    />
                    <mesh
                        name="Cube017"
                        geometry={nodes.Cube017.geometry}
                        material={nodes.Cube017.material}
                        position={[-0.199, 3.91, 16.544]}
                        scale={[4.046, 3.957, 1]}
                    />
                    {/* )} */}
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
