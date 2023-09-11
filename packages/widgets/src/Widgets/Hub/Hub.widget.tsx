import {
    createGameWidget,
    GameEditableWidget,
    GameOptionsFieldTypes,
    GameRigidBody,
    useGame,
    useGameInit,
    useGameUpdate,
} from "@granity/engine";
import { CuboidCollider, MeshCollider, RapierCollider, RigidBodyRefType } from "@granity/physics";
import { useAnimations, useGLTF, useHelper } from "@granity/three/drei";
import { useLoader } from "@granity/three/fiber";
import { RigidBody } from "@react-three/rapier";
import { FC, MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import {
    AudioListener,
    AudioLoader,
    Group,
    LoopOnce,
    Mesh,
    Object3D,
    PositionalAudio,
    RectAreaLight,
    Vector3,
} from "three";
import { GLTF, RectAreaLightHelper } from "three-stdlib";

import extractVideoIdFromUrl from "../Cinema/_actions/utilities/extractYoutubeVideoIdFromUrl";
import Thumbnail from "../Cinema/Components/Thumnail";
import useGameManager from "../GameManager/_actions/hooks/useGameManager";

export type HubProps = GameEditableWidget & {
    model3D: string;
    elevatorSoundEffect: string;
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
    const buttonRef = useRef<Object3D>();
    const spotlightRef = useRef<Object3D>();
    const spotlightRef2 = useRef<Object3D>();
    const cylinderRBRef = useRef<RigidBodyRefType>(null);
    const rectAreaLightRef = useRef<RectAreaLight>(null);
    const rectAreaLightRef2 = useRef<RectAreaLight>(null);
    const doorColliderRef = useRef<RapierCollider>(null);
    const { nodes, materials, animations } = useGLTF(model3D) as GLTFResult;
    const { actions, mixer } = useAnimations(animations, group);
    const [isElevatorUp, setIsElevatorUp] = useState(false);
    const [isDoorOpen, setIsDoorOpen] = useState(false);
    const [doorAnimationAlreadyPlayed, setDoorAnimationAlreadyPlayed] = useState(false);
    const { videosLinks, canOpenDoor } = useGameManager();
    const { isGameReady } = useGame();

    const videos = videosLinks;
    const doorAnimation = actions.DoorAction;
    const grannyAnimation = actions["Armature|mixamo.com|Layer0"];

    useEffect(() => {
        if (!grannyAnimation) {
            return;
        }
        grannyAnimation.setLoop(LoopOnce, 1);
        grannyAnimation.time = 5;
        grannyAnimation.clampWhenFinished = true;
        grannyAnimation.play();
    }, [grannyAnimation]);

    useGameUpdate(() => {
        if (!isGameReady) {
            return;
        }

        if (cylinderRBRef.current) {
            if (cylinderRBRef.current.translation().y > 13) {
                return setIsElevatorUp(true);
            }

            cylinderRBRef.current.setTranslation(
                new Vector3(
                    cylinderRBRef.current.translation().x,
                    cylinderRBRef.current.translation().y + 0.02,
                    cylinderRBRef.current.translation().z
                ),
                true
            );
        }
    });

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

    const openDoor = useCallback(
        (resetAnimation?: boolean) => {
            if (!doorAnimation) {
                return;
            }

            doorAnimation.setLoop(LoopOnce, 1);
            doorAnimation.clampWhenFinished = true;

            if (resetAnimation) {
                doorAnimation.reset();
            } else {
                doorAnimation.play();
            }

            setDoorAnimationAlreadyPlayed(true);
        },
        [doorAnimation]
    );

    const closeDoor = useCallback(() => {
        if (!doorAnimation) {
            return;
        }

        doorAnimation.time = 0;
        setIsDoorOpen(false);
        doorColliderRef.current?.setSensor(false);
    }, [doorAnimation]);

    useEffect(() => {
        if (canOpenDoor && isElevatorUp) {
            openDoor(doorAnimationAlreadyPlayed);
        } else {
            closeDoor();
        }
    }, [canOpenDoor, closeDoor, doorAnimation, doorAnimationAlreadyPlayed, isElevatorUp, openDoor]);

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
                target={buttonRef.current}
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
                position={[-22.029, 8.43, 36.2 - 13.859]}
                rotation={[-Math.PI / 2, 0, 0]}
            />
            <rectAreaLight
                ref={rectAreaLightRef}
                width={15}
                height={5}
                intensity={5}
                position={[21.306, 8.43, 36.2 - 13.859]}
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
                        <CuboidCollider
                            ref={doorColliderRef}
                            args={[4.046, 3.957, 1]}
                            position={[-0.199, 3.91, 16.544]}
                        />
                        <group
                            name="Door"
                            position={[0.407, 4.033, 17.602]}
                            rotation={[Math.PI / 2, 0, 0]}
                            scale={[0.0056, 0.003, 0.009]}
                        >
                            <mesh
                                name="Mesh"
                                geometry={nodes.Mesh.geometry}
                                material={materials["01 - Default"]}
                            />
                            <mesh
                                ref={doorRef.current}
                                name="Mesh_1"
                                geometry={nodes.Mesh_1.geometry}
                                material={materials.Marble}
                            />
                        </group>
                        <RigidBody ref={cylinderRBRef} type="fixed" colliders="trimesh">
                            <mesh
                                ref={cylinderRef}
                                name="Cylinder"
                                geometry={nodes.Cylinder.geometry}
                                material={materials["Material.002"]}
                                position={[-0.142, -27.4548, 52.246]} // old Y value is -11.196
                            />
                        </RigidBody>
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
                            position={[22.869, 0.356, 26.231]}
                            rotation={[-Math.PI, 0, 0]}
                            scale={-1}
                        >
                            <mesh name="Cube007" geometry={nodes.Cube007_1.geometry}>
                                <meshStandardMaterial
                                    color="#ff0000"
                                    emissive="#F79292"
                                    emissiveIntensity={2}
                                    toneMapped={false}
                                />
                            </mesh>
                            <mesh
                                name="Cube007_2"
                                geometry={nodes.Cube007_2.geometry}
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
                            name="Cube024"
                            geometry={nodes.Cube024.geometry}
                            material={materials["black concrete.003"]}
                            position={[-13.0478, 9.255, 31.221 - 13.859]}
                            rotation={[0, Math.PI / 2, 0]}
                            scale={2.193}
                        >
                            <Thumbnail videoId={extractVideoIdFromUrl(videos[0])} />
                        </mesh>
                        <mesh
                            name="Cube029"
                            geometry={nodes.Cube029.geometry}
                            material={materials["black concrete.004"]}
                            position={[-21.5945, 9.255, 31.221 - 13.859]}
                            rotation={[0, Math.PI / 2, 0]}
                            scale={2.193}
                        >
                            <Thumbnail videoId={extractVideoIdFromUrl(videos[1])} />
                        </mesh>
                        <mesh
                            name="Cube030"
                            geometry={nodes.Cube030.geometry}
                            material={materials["black concrete.005"]}
                            position={[-30.1424, 9.255, 31.221 - 13.859]}
                            rotation={[0, Math.PI / 2, 0]}
                            scale={2.193}
                        >
                            <Thumbnail videoId={extractVideoIdFromUrl(videos[2])} />
                        </mesh>
                        <mesh
                            name="Cube031"
                            geometry={nodes.Cube031.geometry}
                            material={materials["black concrete.006"]}
                            position={[-30.1424, 14.572, 31.221 - 13.859]}
                            rotation={[0, Math.PI / 2, 0]}
                            scale={2.193}
                        >
                            <Thumbnail videoId={extractVideoIdFromUrl(videos[3])} />
                        </mesh>
                        <mesh
                            name="Cube032"
                            geometry={nodes.Cube032.geometry}
                            material={materials["black concrete.011"]}
                            position={[30.39, 14.572, 31.221 - 13.859]}
                            rotation={[0, Math.PI / 2, 0]}
                            scale={2.193}
                        >
                            <Thumbnail videoId={extractVideoIdFromUrl(videos[4])} />
                        </mesh>
                        <mesh
                            name="Cube033"
                            geometry={nodes.Cube033.geometry}
                            material={materials["black concrete.012"]}
                            position={[21.843, 14.572, 31.221 - 13.859]}
                            rotation={[0, Math.PI / 2, 0]}
                            scale={2.193}
                        >
                            <Thumbnail videoId={extractVideoIdFromUrl(videos[5])} />
                        </mesh>
                        <mesh
                            name="Cube034"
                            geometry={nodes.Cube034.geometry}
                            material={materials["black concrete.013"]}
                            position={[13.295, 14.572, 31.221 - 13.859]}
                            rotation={[0, Math.PI / 2, 0]}
                            scale={2.193}
                        >
                            <Thumbnail videoId={extractVideoIdFromUrl(videos[6])} />
                        </mesh>
                        <mesh
                            name="Cube035"
                            geometry={nodes.Cube035.geometry}
                            material={materials["black concrete.007"]}
                            position={[-21.5945, 14.572, 31.221 - 13.859]}
                            rotation={[0, Math.PI / 2, 0]}
                            scale={2.193}
                        >
                            <Thumbnail videoId={extractVideoIdFromUrl(videos[7])} />
                        </mesh>
                        <mesh
                            name="Cube036"
                            geometry={nodes.Cube036.geometry}
                            material={materials["black concrete.008"]}
                            position={[-13.0478, 14.572, 31.221 - 13.859]}
                            rotation={[0, Math.PI / 2, 0]}
                            scale={2.193}
                        >
                            <Thumbnail videoId={extractVideoIdFromUrl(videos[8])} />
                        </mesh>
                        <mesh
                            name="Cube037"
                            geometry={nodes.Cube037.geometry}
                            material={materials["black concrete.014"]}
                            position={[13.295, 9.255, 31.221 - 13.859]}
                            rotation={[0, Math.PI / 2, 0]}
                            scale={2.193}
                        >
                            <Thumbnail videoId={extractVideoIdFromUrl(videos[9])} />
                        </mesh>
                        <mesh
                            name="Cube038"
                            geometry={nodes.Cube038.geometry}
                            material={materials["black concrete.015"]}
                            position={[21.843, 9.255, 31.221 - 13.859]}
                            rotation={[0, Math.PI / 2, 0]}
                            scale={2.193}
                        >
                            <Thumbnail videoId={extractVideoIdFromUrl(videos[10])} />
                        </mesh>
                        <mesh
                            name="Cube039"
                            geometry={nodes.Cube039.geometry}
                            material={materials["black concrete.016"]}
                            position={[30.39, 9.255, 31.221 - 13.859]}
                            rotation={[0, Math.PI / 2, 0]}
                            scale={2.193}
                        >
                            <Thumbnail videoId={extractVideoIdFromUrl(videos[11])} />
                        </mesh>

                        <group
                            name="Armature"
                            position={[17.587, 0, 22.667]}
                            rotation={[Math.PI / 2, 0, 0]}
                            scale={0.019}
                        >
                            <primitive object={nodes.mixamorigHips} />
                            <group name="Fitness_Grandma_BodyGeo">
                                <skinnedMesh
                                    name="Fitness_Grandma_BodyGeo_1"
                                    geometry={nodes.Fitness_Grandma_BodyGeo_1.geometry}
                                    material={materials.Grandma_MAT}
                                    skeleton={nodes.Fitness_Grandma_BodyGeo_1.skeleton}
                                />
                                <skinnedMesh
                                    name="Fitness_Grandma_BodyGeo_2"
                                    geometry={nodes.Fitness_Grandma_BodyGeo_2.geometry}
                                    material={materials.Lens_MAT}
                                    skeleton={nodes.Fitness_Grandma_BodyGeo_2.skeleton}
                                />
                            </group>
                            <skinnedMesh
                                name="Fitness_Grandma_BrowsAnimGeo"
                                geometry={nodes.Fitness_Grandma_BrowsAnimGeo.geometry}
                                material={materials.FitGrandma_Brows_MAT1}
                                skeleton={nodes.Fitness_Grandma_BrowsAnimGeo.skeleton}
                            />
                            <skinnedMesh
                                name="Fitness_Grandma_EyesAnimGeo"
                                geometry={nodes.Fitness_Grandma_EyesAnimGeo.geometry}
                                material={materials.FitGrandma_Eyes_MAT1}
                                skeleton={nodes.Fitness_Grandma_EyesAnimGeo.skeleton}
                            />
                            <skinnedMesh
                                name="Fitness_Grandma_MouthAnimGeo"
                                geometry={nodes.Fitness_Grandma_MouthAnimGeo.geometry}
                                material={materials.FitGrandma_Mouth_MAT1}
                                skeleton={nodes.Fitness_Grandma_MouthAnimGeo.skeleton}
                            />
                        </group>

                        {/* <mesh
                            name="Cube035"
                            geometry={nodes.Cube035.geometry}
                            material={materials["Marble.019"]}
                            position={[21.633, 8.97, 35.821 - 13.859]}
                            scale={[1.144, 1, 1]}
                        /> */}
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
        {
            name: "elevatorSoundEffect",
            displayName: "Elevator sound effect",
            fieldType: GameOptionsFieldTypes.File,
            defaultValue: "",
        },
    ],
});
