import {
    createGameWidget,
    GameEditableWidget,
    GameOptionsFieldTypes,
    GameRigidBody,
} from "@granity/engine";
import { CuboidCollider, MeshCollider, RapierCollider, RigidBodyRefType } from "@granity/physics";
import { useAnimations, useGLTF, useHelper } from "@granity/three/drei";
import { FC, MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import { Group, LoopOnce, Mesh, Object3D, RectAreaLight } from "three";
import { GLTF, RectAreaLightHelper } from "three-stdlib";

export type HubProps = GameEditableWidget & {
    model3D: string;
};

type GLTFResult = GLTF & {
    nodes: {
        Cube014: THREE.Mesh;
        Cube015: THREE.Mesh;
        Cube016: THREE.Mesh;
        Mesh: THREE.Mesh;
        Mesh_1: THREE.Mesh;
        Cylinder: THREE.Mesh;
        Cube017: THREE.Mesh;
        Cube059: THREE.Mesh;
        Cube059_1: THREE.Mesh;
        Cube019: THREE.Mesh;
        Cube020: THREE.Mesh;
        Cube007: THREE.Mesh;
        Cube007_1: THREE.Mesh;
        Cube022: THREE.Mesh;
        Cube023: THREE.Mesh;
        Cube024: THREE.Mesh;
        Neon002: THREE.Mesh;
        Neon003: THREE.Mesh;
        Cube025: THREE.Mesh;
        Cube026: THREE.Mesh;
        Cube027: THREE.Mesh;
        Cube028: THREE.Mesh;
        Cube029: THREE.Mesh;
        Cube030: THREE.Mesh;
        Cube031: THREE.Mesh;
        Cube032: THREE.Mesh;
        Cube033: THREE.Mesh;
        Cube034: THREE.Mesh;
        Cube035: THREE.Mesh;
    };
    materials: {
        ["Marble.010"]: THREE.MeshStandardMaterial;
        ["Marble.011"]: THREE.MeshStandardMaterial;
        ["Marble.012"]: THREE.MeshStandardMaterial;
        ["01 - Default"]: THREE.MeshStandardMaterial;
        Marble: THREE.MeshStandardMaterial;
        ["Material.002"]: THREE.MeshStandardMaterial;
        ["Glowing red"]: THREE.MeshStandardMaterial;
        ["Marble.003"]: THREE.MeshStandardMaterial;
        ["Marble.013"]: THREE.MeshStandardMaterial;
        ["Glowing red.001"]: THREE.MeshStandardMaterial;
        ["Marble.014"]: THREE.MeshStandardMaterial;
        ["Marble.015"]: THREE.MeshStandardMaterial;
        ["Neon.002"]: THREE.MeshStandardMaterial;
        ["Neon.003"]: THREE.MeshStandardMaterial;
        ["Marble.016"]: THREE.MeshStandardMaterial;
        ["Plain.001"]: THREE.MeshStandardMaterial;
        ["Marble.017"]: THREE.MeshStandardMaterial;
        ["Marble.018"]: THREE.MeshStandardMaterial;
        ["black concrete.001"]: THREE.MeshStandardMaterial;
        ["black concrete.009"]: THREE.MeshStandardMaterial;
        ["black concrete.010"]: THREE.MeshStandardMaterial;
        ["black concrete.011"]: THREE.MeshStandardMaterial;
        ["black concrete.012"]: THREE.MeshStandardMaterial;
        ["black concrete.013"]: THREE.MeshStandardMaterial;
        ["Marble.019"]: THREE.MeshStandardMaterial;
    };
};

const Hub: FC<HubProps> = ({ model3D }) => {
    const group = useRef<Group>(null);
    const doorRef = useRef<Object3D>();
    const cylinderRef = useRef<Object3D>();
    const spotlightRef = useRef<Object3D>();
    const spotlightRef2 = useRef<Object3D>();
    const rectAreaLightRef = useRef<RectAreaLight>(null);
    const rectAreaLightRef2 = useRef<RectAreaLight>(null);
    const doorColliderRef = useRef<RapierCollider>(null);
    const { nodes, materials, animations } = useGLTF(model3D) as GLTFResult;
    const { actions, mixer } = useAnimations(animations, group);
    const [isDoorOpen, setIsDoorOpen] = useState(false);

    const doorAnimation = actions.DoorAction;

    useHelper(
        rectAreaLightRef as unknown as MutableRefObject<Object3D<Event>>,
        RectAreaLightHelper
    );

    useHelper(
        rectAreaLightRef2 as unknown as MutableRefObject<Object3D<Event>>,
        RectAreaLightHelper
    );

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
        <>
            <spotLight
                name="Point"
                intensity={0.5}
                angle={0.888}
                penumbra={1}
                decay={2}
                distance={100}
                position={[33.937, 15.617, 55.805]}
                rotation={[-0.568, 0.839, -0.486]}
            >
                <group position={[0, 0, -1]} />
            </spotLight>
            <spotLight
                name="Point001_1"
                intensity={0.5}
                angle={0.888}
                penumbra={1}
                decay={2}
                distance={100}
                position={[-33.792, 15.617, 58.636]}
                rotation={[-0.38, -0.457, -0.698]}
            >
                <group position={[0, 0, -1]} />
            </spotLight>
            <spotLight
                name="Point002_1"
                intensity={0.5}
                angle={0.888}
                penumbra={1}
                decay={2}
                position={[-11.791, 15.617, 22.175]}
                target={spotlightRef2.current}
            >
                <mesh ref={spotlightRef2} position={[-5, 0, 10]} />
            </spotLight>
            <spotLight
                name="Point003_1"
                intensity={0.5}
                penumbra={1}
                decay={2}
                position={[18.935, 15.617, 17.633]}
                target={spotlightRef.current}
            >
                <mesh ref={spotlightRef} position={[0, 0, 10]} />
            </spotLight>
            <spotLight
                name="Point004_1"
                intensity={1}
                angle={0.487}
                penumbra={1}
                decay={2}
                distance={40}
                position={[0.615, 15.617, 65.369 - 13.859]}
                rotation={[-1.586, 0.007, 1.28]}
                target={cylinderRef.current}
            >
                <group position={[0, 0, -1]} />
            </spotLight>
            <spotLight
                name="Point005_1"
                intensity={1}
                angle={1}
                penumbra={1}
                decay={2}
                distance={40}
                position={[0.615, 15.617, 65.369 - 13.859 - 20]}
                rotation={[-1.586, 0.007, 1.28]}
                target={doorRef.current}
            >
                <group position={[0, 0, -1]} />
            </spotLight>
            <rectAreaLight
                ref={rectAreaLightRef2}
                width={15}
                height={5}
                intensity={5}
                position={[-24.029, 8.43, 36.2 - 13.859]}
                rotation={[-Math.PI / 2, 0, 0]}
            />
            <rectAreaLight
                ref={rectAreaLightRef}
                width={15}
                height={5}
                intensity={5}
                position={[19.306, 8.43, 36.2 - 13.859]}
                rotation={[-Math.PI / 2, 0, 0]}
            />
            <GameRigidBody type="fixed" colliders={false}>
                <group ref={group}>
                    <group name="Scene">
                        <MeshCollider type="trimesh">
                            <mesh
                                name="Cube014"
                                geometry={nodes.Cube014.geometry}
                                material={materials["Marble.010"]}
                                position={[0.179, -10.514, 38.299]}
                                rotation={[Math.PI / 2, 0, 0]}
                                scale={[1.562, 1.289, 349.822]}
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
                                castShadow
                            />
                        </MeshCollider>
                        {/* <CuboidCollider
                        ref={doorColliderRef}
                        args={[4.046, 3.957, 1]}
                        position={[-0.199, 3.91, 16.544]}
                    /> */}
                        <group
                            name="Door"
                            position={[0.407, 4.033, 17.965]}
                            rotation={[Math.PI / 2, 0, 0]}
                            scale={[0.006, 0.003, 0.009]}
                        >
                            <mesh
                                name="Mesh"
                                geometry={nodes.Mesh.geometry}
                                // material={materials["01 - Default"]}
                            >
                                <meshStandardMaterial {...materials["01 - Default"]} />
                                {/* <meshBasicMaterial mat/> */}
                            </mesh>
                            <mesh
                                ref={doorRef.current}
                                name="Mesh_1"
                                geometry={nodes.Mesh_1.geometry}
                                material={materials.Marble}
                            />
                        </group>
                        {/* <mesh
                        name="Cube017"
                        geometry={nodes.Cube017.geometry}
                        material={nodes.Cube017.material}
                        position={[-0.199, 3.91, 16.544]}
                        scale={[4.046, 3.957, 1]}
                    /> */}
                        <MeshCollider type="trimesh">
                            <mesh
                                ref={cylinderRef}
                                name="Cylinder"
                                geometry={nodes.Cylinder.geometry}
                                material={materials["Material.002"]}
                                position={[-0.142, -11.196, 52.246]}
                            />
                        </MeshCollider>
                        <mesh
                            name="Cube017"
                            geometry={nodes.Cube017.geometry}
                            material={materials.Marble}
                            position={[-24.625, 0.439, 18.398]}
                        />
                        <group name="Cube018" position={[-22.733, 0.439, 26.231]}>
                            <mesh name="Cube059" geometry={nodes.Cube059.geometry}>
                                <meshStandardMaterial
                                    color="#ff0000"
                                    emissive="#F79292"
                                    emissiveIntensity={2}
                                    toneMapped={false}
                                />
                            </mesh>
                            <mesh
                                name="Cube059_1"
                                geometry={nodes.Cube059_1.geometry}
                                material={materials.Marble}
                            />
                        </group>
                        <mesh
                            name="Cube019"
                            geometry={nodes.Cube019.geometry}
                            material={materials["Marble.003"]}
                            position={[0.413, 19.004, 38.517]}
                            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                            scale={[-21.804, -37.699, -0.339]}
                        />
                        <mesh
                            name="Cube020"
                            geometry={nodes.Cube020.geometry}
                            material={materials["Marble.013"]}
                            position={[-36.938, 9.328, 38.412]}
                            rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
                            scale={[-9.368, -22.057, -0.379]}
                        />
                        <group
                            name="Cube021"
                            position={[22.869, 0.439, 26.231]}
                            rotation={[-Math.PI, 0, 0]}
                            scale={-1}
                        >
                            <mesh name="Cube007" geometry={nodes.Cube007.geometry}>
                                <meshStandardMaterial
                                    color="#ff0000"
                                    emissive="#F79292"
                                    emissiveIntensity={2}
                                    toneMapped={false}
                                />
                            </mesh>
                            <mesh
                                name="Cube007_1"
                                geometry={nodes.Cube007_1.geometry}
                                material={materials["Marble.014"]}
                            />
                        </group>
                        <mesh
                            name="Cube022"
                            geometry={nodes.Cube022.geometry}
                            material={materials["Marble.014"]}
                            position={[24.761, 0.439, 18.398]}
                            rotation={[-Math.PI, 0, 0]}
                            scale={-1}
                        />

                        <mesh
                            name="Cube023"
                            geometry={nodes.Cube023.geometry}
                            material={materials["Marble.015"]}
                            position={[37.153, 9.328, 38.412]}
                            rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
                            scale={[-9.368, -22.057, -0.379]}
                        />
                        <mesh
                            name="Cube024"
                            geometry={nodes.Cube024.geometry}
                            material={materials.Marble}
                            position={[-21.702, 8.97, 35.821 - 13.859]}
                            scale={[1.144, 1, 1]}
                        />
                        <mesh
                            name="Neon002"
                            geometry={nodes.Neon002.geometry}
                            material={materials["Neon.002"]}
                            position={[3.346, 7.289, 24.857 - 13.859]}
                            rotation={[-Math.PI / 2, 0, -Math.PI]}
                            scale={[-0.066, -5.961, -0.065]}
                        />
                        <mesh
                            name="Neon003"
                            geometry={nodes.Neon003.geometry}
                            material={materials["Neon.003"]}
                            position={[-3.619, 7.289, 24.857 - 13.859]}
                            rotation={[-Math.PI / 2, 0, -Math.PI]}
                            scale={[-0.066, -5.961, -0.065]}
                        />
                        <MeshCollider type="cuboid">
                            <mesh
                                name="Cube025"
                                geometry={nodes.Cube025.geometry}
                                material={materials["Marble.016"]}
                                position={[-4.896, 3.708, 24.859 - 13.859]}
                                rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                                scale={[1, 0.36, 40.262]}
                            />
                        </MeshCollider>
                        <MeshCollider type="cuboid">
                            <mesh
                                name="Cube026"
                                geometry={nodes.Cube026.geometry}
                                material={materials["Plain.001"]}
                                position={[0, 7.377, 24.859 - 13.859]}
                                rotation={[Math.PI / 2, 0, 0]}
                                scale={[1, 0.36, 1]}
                            />
                        </MeshCollider>
                        <MeshCollider type="cuboid">
                            <mesh
                                name="Cube027"
                                geometry={nodes.Cube027.geometry}
                                material={materials["Marble.017"]}
                                position={[-0.304, 0, 24.859 - 13.859]}
                                rotation={[Math.PI / 2, 0, 0]}
                                scale={[1, 0.36, 1]}
                            />
                        </MeshCollider>
                        <MeshCollider type="cuboid">
                            <mesh
                                name="Cube028"
                                geometry={nodes.Cube028.geometry}
                                material={materials["Marble.018"]}
                                position={[4.616, 3.708, 24.859 - 13.859]}
                                rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                                scale={[1, 0.36, 40.262]}
                            />
                        </MeshCollider>
                        <mesh
                            name="Cube029"
                            geometry={nodes.Cube029.geometry}
                            material={materials["black concrete.001"]}
                            position={[-30.04, 13.285, 31.221 - 13.859]}
                            rotation={[0, Math.PI / 2, 0]}
                            scale={2.193}
                        />
                        <mesh
                            name="Cube030"
                            geometry={nodes.Cube030.geometry}
                            material={materials["black concrete.009"]}
                            position={[-21.492, 13.285, 31.221 - 13.859]}
                            rotation={[0, Math.PI / 2, 0]}
                            scale={2.193}
                        />
                        <mesh
                            name="Cube031"
                            geometry={nodes.Cube031.geometry}
                            material={materials["black concrete.010"]}
                            position={[-12.945, 13.285, 31.221 - 13.859]}
                            rotation={[0, Math.PI / 2, 0]}
                            scale={2.193}
                        />
                        <mesh
                            name="Cube032"
                            geometry={nodes.Cube032.geometry}
                            material={materials["black concrete.011"]}
                            position={[30.39, 13.285, 31.221 - 13.859]}
                            rotation={[0, Math.PI / 2, 0]}
                            scale={2.193}
                        />
                        <mesh
                            name="Cube033"
                            geometry={nodes.Cube033.geometry}
                            material={materials["black concrete.012"]}
                            position={[21.843, 13.285, 31.221 - 13.859]}
                            rotation={[0, Math.PI / 2, 0]}
                            scale={2.193}
                        />
                        <mesh
                            name="Cube034"
                            geometry={nodes.Cube034.geometry}
                            material={materials["black concrete.013"]}
                            position={[13.295, 13.285, 31.221 - 13.859]}
                            rotation={[0, Math.PI / 2, 0]}
                            scale={2.193}
                        />
                        <mesh
                            name="Cube035"
                            geometry={nodes.Cube035.geometry}
                            material={materials["Marble.019"]}
                            position={[21.633, 8.97, 35.821 - 13.859]}
                            scale={[1.144, 1, 1]}
                        />
                    </group>
                </group>
            </GameRigidBody>
        </>
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
