import { GameRigidBody } from "@granity/engine";
import { Vector3Array } from "@granity/helpers";
import { CuboidCollider, MeshCollider } from "@granity/physics";
import { Box3, Mesh, Vector3 } from "@granity/three";
import { useCubeTexture, useGLTF, useHelper, useTexture } from "@granity/three/drei";
import { FC, MutableRefObject, Suspense, useEffect, useMemo, useRef, useState } from "react";
import THREE, { DoubleSide, Object3D, RectAreaLight } from "three";
import { GLTF, RectAreaLightHelper } from "three-stdlib";

import extractVideoIdFromUrl from "../_actions/utilities/extractYoutubeVideoIdFromUrl";
import YoutubeVideoPlayer from "./YoutubeVideoPlayer";

export type CinemaChunkProps = {
    cinemaModel3D: string;
    index: number;
    thumbnails?: string[];
    videoUrl: string;
    position?: Vector3Array;
};

type GLTFResult = GLTF & {
    nodes: {
        Cube012: THREE.Mesh;
        Cube011: THREE.Mesh;
        Cube013: THREE.Mesh;
        collision_enter: THREE.Mesh;
        Cube: THREE.Mesh;
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
        ["Marble.004"]: THREE.MeshStandardMaterial;
        ["black concrete"]: THREE.MeshStandardMaterial;
        ["black concrete.002"]: THREE.MeshStandardMaterial;
        Plain: THREE.MeshStandardMaterial;
        Marble: THREE.MeshStandardMaterial;
        ["Plain black"]: THREE.MeshStandardMaterial;
        ["Black concrete"]: THREE.MeshStandardMaterial;
        ["black concrete"]: THREE.MeshStandardMaterial;
        Neon: THREE.MeshStandardMaterial;
        ["Neon.001"]: THREE.MeshStandardMaterial;
    };
};

const CinemaChunk: FC<CinemaChunkProps> = ({ cinemaModel3D, index, videoUrl, thumbnails }) => {
    const { nodes, materials } = useGLTF(cinemaModel3D) as GLTFResult;
    const ref = useRef<Mesh>(null);
    const lightRef = useRef<RectAreaLight>(null);
    const [size, setSize] = useState<Vector3>(new Vector3());
    const [videoId, setVideoId] = useState<string | undefined>();
    const [showYoutubeVideo, setShowYoutubeVideo] = useState(false);
    const [thumnailURL, setThumnailURL] = useState<string>();
    console.log(thumbnails?.[0], "thumbnails?.[0]");

    // const texture = useTexture(`https://cors-anywhere.herokuapp.com/${thumbnails?.[0]}` || "");
    const texture = useTexture(
        `https://cors-anywhere.herokuapp.com/https://i.ytimg.com/vi/yhB3BgJyGl8/hqdefault.jpg` || ""
    );
    // texture.flipY = false;
    // texture.rotation = 1;
    // const envMap = useCubeTexture(["0.jpg"], { path: "https://i.ytimg.com/vi/yhB3BgJyGl8/" });
    // const thumbnail = `https://i.ytimg.com/vi/yhB3BgJyGl8/0.jpg`
    // console.log(envMap, "envMap");

    useHelper(lightRef as unknown as MutableRefObject<Object3D<Event>>, RectAreaLightHelper);

    const isOdd = useMemo(() => {
        return index % 2 !== 0;
    }, [index]);

    useEffect(() => {
        const youtubeVideoId = extractVideoIdFromUrl(videoUrl);
        setThumnailURL(`https://i.ytimg.com/vi/${youtubeVideoId}/`);
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
                    <rectAreaLight
                        ref={lightRef}
                        width={5}
                        height={15}
                        intensity={5}
                        position={[0, 7.3, 0]}
                        rotation={[-Math.PI / 2, 0, 0]}
                    />
                    <MeshCollider type="cuboid">
                        <mesh
                            geometry={nodes.Cube012.geometry}
                            material={materials["Marble.004"]}
                            position={[-4.896, 3.708, 0]}
                            rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                            scale={[1, 1, 40.262]}
                        />
                    </MeshCollider>
                    {isOdd && (
                        <>
                            <MeshCollider type="cuboid">
                                <mesh
                                    geometry={nodes.Cube011.geometry}
                                    material={materials["black concrete"]}
                                    position={[-3.717, 3.673, -16.906]}
                                    rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                                />
                            </MeshCollider>
                            <MeshCollider type="cuboid">
                                <mesh
                                    geometry={nodes.Cube013.geometry}
                                    material={materials["black concrete.002"]}
                                    position={[3.514, 3.673, -16.906]}
                                    rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                                />
                            </MeshCollider>
                        </>
                    )}
                    <CuboidCollider
                        args={[1, 4.581, 3.845]}
                        position={[33.1, 4.273, -12.792]}
                        rotation={[-Math.PI, 0, -Math.PI]}
                        name="video-trigger"
                        sensor
                        onIntersectionEnter={({ other }) => {
                            if (other.rigidBodyObject?.name === "player") {
                                setShowYoutubeVideo(true);
                            }
                        }}
                    >
                        {/* <mesh geometry={nodes.collision_enter.geometry} scale={[1, 4.581, 3.845]}>
                            <meshStandardMaterial color="blue" />
                        </mesh> */}
                    </CuboidCollider>
                    <CuboidCollider
                        args={[1, 4.581, 3.845]}
                        position={[31.1, 4.273, -12.792]}
                        rotation={[-Math.PI, 0, -Math.PI]}
                        name="video-trigger"
                        sensor
                        onIntersectionEnter={({ other }) => {
                            if (other.rigidBodyObject?.name === "player") {
                                setShowYoutubeVideo(false);
                            }
                        }}
                    >
                        {/* <mesh geometry={nodes.collision_enter.geometry} scale={[1, 4.581, 3.845]}>
                            <meshStandardMaterial color="red" />
                        </mesh> */}
                    </CuboidCollider>
                    <MeshCollider type="trimesh">
                        <mesh
                            geometry={nodes.Cube.geometry}
                            material={materials.Marble}
                            position={[21.836, 8.459, -6.753]}
                        />
                    </MeshCollider>
                    <MeshCollider type="cuboid">
                        <mesh
                            ref={ref}
                            geometry={nodes.Cube002.geometry}
                            material={materials.Marble}
                            position={[-0.304, 0, 0]}
                            rotation={[Math.PI / 2, 0, 0]}
                        />
                    </MeshCollider>
                    <MeshCollider type="cuboid">
                        <mesh
                            geometry={nodes.Cube004.geometry}
                            material={materials.Plain}
                            position={[0, 7.377, 0]}
                            rotation={[Math.PI / 2, 0, 0]}
                        />
                    </MeshCollider>
                    <MeshCollider type="trimesh">
                        <mesh
                            geometry={nodes.Cube005.geometry}
                            material={materials.Marble}
                            position={[4.617, 9.36, 0]}
                            rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
                            scale={[-1, -1, -40.426]}
                        />
                    </MeshCollider>
                    <MeshCollider type="cuboid">
                        <mesh
                            geometry={nodes.Cube006.geometry}
                            material={materials["Black concrete"]}
                            position={[51.298, 9.36, 0]}
                            rotation={[0, -Math.PI / 2, 0]}
                            scale={[22, 20, 0.03]}
                        >
                            <YoutubeVideoPlayer
                                videoId={videoId}
                                position={[0, 0.04, 2.5]}
                                canVideoPlay={showYoutubeVideo}
                            />
                        </mesh>
                    </MeshCollider>
                    <CuboidCollider
                        args={[24.003, 16.641, 0.03]}
                        position={[27.722, -0.0001, 0]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        name="room-floor"
                        onCollisionExit={({ other }) => {
                            if (other.rigidBodyObject?.name === "player") {
                                setShowYoutubeVideo(false);
                            }
                        }}
                    >
                        <mesh
                            geometry={nodes.Cube007.geometry}
                            material={materials.Marble}
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
                    />
                    <mesh
                        geometry={nodes.Cube009.geometry}
                        material={materials.Marble}
                        position={[27.557, 9.328, 16.619]}
                        rotation={[Math.PI, 0, Math.PI / 2]}
                        scale={[9.368, 23.816, 0.03]}
                    />
                    <mesh
                        geometry={nodes.Cube010.geometry}
                        material={materials["Plain black"]}
                        position={[27.722, 18.701, 0.164]}
                        rotation={[Math.PI / 2, 0, -Math.PI]}
                        scale={[-1, -1, -10.203]}
                    />
                    <MeshCollider type="trimesh">
                        <mesh
                            geometry={nodes.stairs.geometry}
                            material={materials.Marble}
                            position={[21.291, 1.721, 6.26]}
                            scale={[1, 1, 0.815]}
                        />
                    </MeshCollider>
                    <mesh
                        geometry={nodes.Cube003.geometry}
                        material={materials["black concrete"]}
                        position={[51.162, 10.214, 0]}
                        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                        scale={0.568}
                    />

                    <mesh
                        geometry={nodes.Cube001.geometry}
                        // material={materials["black concrete"]}
                        position={[3.354, 3.827, -9.275]}
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={[1, 2, 4]}
                    >
                        <meshStandardMaterial map={texture} side={DoubleSide} />
                    </mesh>
                    {/* <mesh
                        geometry={nodes.Neon.geometry}
                        // material={materials.Neon}
                        position={[-3.619, 7.289, -0.006]}
                        rotation={[-Math.PI / 2, 0, -Math.PI]}
                        scale={[-0.066, -16.558, -0.065]}
                    >
                        <meshStandardMaterial
                            color="#F79292"
                            emissive="#F79292"
                            emissiveIntensity={10}
                            toneMapped={false}
                        />
                    </mesh>
                    <mesh
                        geometry={nodes.Neon001.geometry}
                        // material={materials["Neon.001"]}
                        position={[3.346, 7.289, -0.006]}
                        rotation={[-Math.PI / 2, 0, -Math.PI]}
                        scale={[-0.066, -16.558, -0.065]}
                    >
                        <meshStandardMaterial
                            color="#F79292"
                            emissive="#F79292"
                            emissiveIntensity={10}
                            toneMapped={false}
                        />
                    </mesh> */}
                </group>
            </Suspense>
        </GameRigidBody>
    );
};

export default CinemaChunk;
