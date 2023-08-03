import { GameRigidBody } from "@granity/engine";
import { Vector3Array } from "@granity/helpers";
import { CuboidCollider, MeshCollider } from "@granity/physics";
import { Box3, Mesh, Vector3 } from "@granity/three";
import {
    BakeShadows,
    Effects,
    MeshReflectorMaterial,
    useGLTF,
    useHelper,
} from "@granity/three/drei";
import { extend, Object3DNode, RectAreaLightProps } from "@granity/three/fiber";
import { FC, MutableRefObject, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { DirectionalLight, DirectionalLightHelper, Object3D, RectAreaLight } from "three";
import { GLTF, RectAreaLightHelper, UnrealBloomPass } from "three-stdlib";

import extractVideoIdFromUrl from "../_actions/utilities/extractYoutubeVideoIdFromUrl";
import MeshesMaterial from "./MeshesMaterial";
import YoutubeVideoPlayer from "./YoutubeVideoPlayer";

extend({ UnrealBloomPass });

declare module "@granity/three/fiber" {
    interface ThreeElements {
        unrealBloomPass: Object3DNode<UnrealBloomPass, typeof UnrealBloomPass>;
    }
}

export type CinemaChunkProps = {
    cinemaModel3D: string;
    index: number;
    videoUrl: string;
    position?: Vector3Array;
};

type GLTFResult = GLTF & {
    nodes: {
        Cube002: THREE.Mesh;
        Cube001: THREE.Mesh;
        Cube004: THREE.Mesh;
        Cube005: THREE.Mesh;
        Cube006: THREE.Mesh;
        Cube007: THREE.Mesh;
        Cube008: THREE.Mesh;
        Cube009: THREE.Mesh;
        Cube010: THREE.Mesh;
        stairs: THREE.Mesh;
        Cube003: THREE.Mesh;
        Neon: THREE.Mesh;
        Neon001: THREE.Mesh;
    };
    materials: {
        Plain: THREE.MeshStandardMaterial;
        Marble: THREE.MeshStandardMaterial;
        ["Plain black"]: THREE.MeshStandardMaterial;
        ["Black concrete"]: THREE.MeshStandardMaterial;
        ["black concrete"]: THREE.MeshStandardMaterial;
        Neon: THREE.MeshStandardMaterial;
        ["Neon.001"]: THREE.MeshStandardMaterial;
    };
};

const CinemaChunk: FC<CinemaChunkProps> = ({ cinemaModel3D, index, videoUrl }) => {
    const { nodes, materials } = useGLTF(cinemaModel3D) as GLTFResult;
    const ref = useRef<Mesh>(null);
    const floorRef = useRef<Mesh>(null);
    const lightRef = useRef<RectAreaLight>(null);
    const lightRef2 = useRef<DirectionalLight>(null);
    const [size, setSize] = useState<Vector3>(new Vector3());
    const [videoId, setVideoId] = useState<string | undefined>();
    const [showYoutubeVideo, setShowYoutubeVideo] = useState(false);

    useHelper(lightRef as unknown as MutableRefObject<Object3D<Event>>, RectAreaLightHelper);
    // useHelper(lightRef2 as unknown as MutableRefObject<Object3D<Event>>, DirectionalLightHelper);

    const isOdd = useMemo(() => {
        return index % 2 !== 0;
    }, [index]);

    useEffect(() => {
        const youtubeVideoId = extractVideoIdFromUrl(videoUrl);
        setVideoId(youtubeVideoId);
    }, [videoId, videoUrl]);

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
            position={[!isOdd ? -0.28 : 0, 0, index * size.z - 0.1]}
            rotation={[0, isOdd ? 0 : Math.PI, 0]}
        >
            <Suspense>
                <group dispose={null}>
                    <Effects disableGamma>
                        <unrealBloomPass threshold={1} strength={1.0} radius={0.5} />
                    </Effects>
                    <rectAreaLight
                        ref={lightRef}
                        width={5}
                        height={15}
                        intensity={5}
                        position={[0, 7.3, 0]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        castShadow
                        receiveShadow
                    />
                    <MeshCollider type="cuboid">
                        <mesh
                            geometry={nodes.Cube002.geometry}
                            material={materials.Plain}
                            position={[-0.304, 0, 0]}
                            rotation={[Math.PI / 2, 0, 0]}
                            castShadow
                            receiveShadow
                        />
                    </MeshCollider>
                    <MeshCollider type="cuboid">
                        <mesh
                            ref={ref}
                            geometry={nodes.Cube001.geometry}
                            material={materials.Marble}
                            position={[-3.704, 3.708, 0]}
                            rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                            castShadow
                            receiveShadow
                        />
                    </MeshCollider>
                    <MeshCollider type="cuboid">
                        <mesh
                            geometry={nodes.Cube004.geometry}
                            material={materials["Plain black"]}
                            position={[0, 7.377, 0]}
                            rotation={[Math.PI / 2, 0, 0]}
                            castShadow
                            receiveShadow
                        />
                    </MeshCollider>
                    <MeshCollider type="trimesh">
                        <mesh
                            geometry={nodes.Cube005.geometry}
                            material={materials.Marble}
                            position={[4.617, 9.36, 0]}
                            rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
                            scale={[-1, -1, -40.426]}
                            castShadow
                            receiveShadow
                        />
                    </MeshCollider>
                    <MeshCollider type="cuboid">
                        <mesh
                            geometry={nodes.Cube006.geometry}
                            material={materials["Black concrete"]}
                            position={[51.298, 9.36, 0]}
                            rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                            castShadow
                            receiveShadow
                        >
                            <YoutubeVideoPlayer
                                videoId={videoId}
                                position={[0, 0, 1.5]}
                                canVideoPlay={showYoutubeVideo}
                            />
                        </mesh>
                    </MeshCollider>
                    <CuboidCollider
                        args={[24.003, 16.641, 0.03]}
                        position={[27.722, -0.0001, 0]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        name="room-floor"
                        onCollisionEnter={({ other }) => {
                            if (other.rigidBodyObject?.name === "player") {
                                setShowYoutubeVideo(true);
                            }
                        }}
                        onCollisionExit={({ other }) => {
                            if (other.rigidBodyObject?.name === "player") {
                                setShowYoutubeVideo(false);
                            }
                        }}
                    >
                        <mesh
                            geometry={nodes.Cube007.geometry}
                            material={materials.Marble}
                            // position={[27.615, 0.009, 0]}
                            // rotation={[Math.PI / 2, 0, 0]}
                            scale={[1.009, 1, 1]}
                            castShadow
                            receiveShadow
                        />
                    </CuboidCollider>
                    <mesh
                        geometry={nodes.Cube008.geometry}
                        material={materials.Marble}
                        position={[27.69, 9.187, -16.527]}
                        rotation={[Math.PI, 0, Math.PI / 2]}
                        scale={[9.368, 23.816, 0.03]}
                        castShadow
                        receiveShadow
                    />
                    <mesh
                        geometry={nodes.Cube009.geometry}
                        material={materials.Marble}
                        position={[27.557, 9.328, 16.619]}
                        rotation={[Math.PI, 0, Math.PI / 2]}
                        scale={[9.368, 23.816, 0.03]}
                        castShadow
                        receiveShadow
                    />
                    <mesh
                        geometry={nodes.Cube010.geometry}
                        material={materials["Plain black"]}
                        position={[27.722, 18.701, -0.016]}
                        rotation={[Math.PI / 2, 0, -Math.PI]}
                        scale={[-1, -1, -10.203]}
                        castShadow
                        receiveShadow
                    />
                    <mesh
                        geometry={nodes.stairs.geometry}
                        material={materials.Marble}
                        position={[21.291, 1.721, 3.731]}
                        castShadow
                        receiveShadow
                    />
                    <mesh
                        geometry={nodes.Cube003.geometry}
                        material={materials["black concrete"]}
                        position={[51.162, 10.214, 0]}
                        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                        scale={0.568}
                        castShadow
                        receiveShadow
                    />
                    <mesh
                        geometry={nodes.Neon.geometry}
                        material={materials.Neon}
                        position={[-3.619, 7.289, -0.006]}
                        rotation={[-Math.PI / 2, 0, -Math.PI]}
                        scale={[-0.066, -16.558, -0.065]}
                        castShadow
                        receiveShadow
                    />
                    <mesh
                        geometry={nodes.Neon001.geometry}
                        material={materials["Neon.001"]}
                        position={[3.346, 7.289, -0.006]}
                        rotation={[-Math.PI / 2, 0, -Math.PI]}
                        scale={[-0.066, -16.558, -0.065]}
                        castShadow
                        receiveShadow
                    />
                </group>
            </Suspense>
        </GameRigidBody>
    );
};

export default CinemaChunk;
