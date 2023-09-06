import { GameRigidBody } from "@granity/engine";
import { Vector3Array } from "@granity/helpers";
import { CuboidCollider, MeshCollider } from "@granity/physics";
import { Box3, Mesh, Vector3 } from "@granity/three";
import { Html, useGLTF, useHelper } from "@granity/three/drei";
import { FC, MutableRefObject, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { MeshStandardMaterial, Object3D, RectAreaLight } from "three";
import { GLTF, RectAreaLightHelper } from "three-stdlib";

import useCinema from "../_actions/hooks/useCinema";
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
        Cube012: Mesh;
        Cube011: Mesh;
        Cube013: Mesh;
        collision_enter: Mesh;
        Cube: Mesh;
        Cube002: Mesh;
        Cube001: Mesh;
        Cube004: Mesh;
        Cube005: Mesh;
        Cube006: Mesh;
        Cube007: Mesh;
        Cube008: Mesh;
        Cube009: Mesh;
        Cube010: Mesh;
        stairs: Mesh;
        Cube003: Mesh;
        Neon: Mesh;
        Neon001: Mesh;
    };
    materials: {
        ["Marble.004"]: MeshStandardMaterial;
        ["black concrete"]: MeshStandardMaterial;
        ["black concrete.002"]: MeshStandardMaterial;
        Plain: MeshStandardMaterial;
        Marble: MeshStandardMaterial;
        ["Plain black"]: MeshStandardMaterial;
        ["Black concrete"]: MeshStandardMaterial;
        ["black concrete"]: MeshStandardMaterial;
        Neon: MeshStandardMaterial;
        ["Neon.001"]: MeshStandardMaterial;
    };
};

const CinemaChunk: FC<CinemaChunkProps> = ({ cinemaModel3D, index, videoUrl }) => {
    const { nodes, materials } = useGLTF(cinemaModel3D) as GLTFResult;
    const ref = useRef<Mesh>(null);
    const lightRef = useRef<RectAreaLight>(null);
    const [size, setSize] = useState<Vector3>(new Vector3());
    const [videoId, setVideoId] = useState<string | undefined>();
    const [showYoutubeVideo, setShowYoutubeVideo] = useState(false);
    const { canDisplayThumbnails } = useCinema();

    const isOdd = useMemo(() => {
        return index % 2 !== 0;
    }, [index]);

    const offsetPositionCalculator = useMemo(() => {
        if (index === 0 || index === 1) {
            return 0;
        }

        if (isOdd) {
            return (index - 1) / 2;
        }

        return index / 2;
    }, [index, isOdd]);

    useHelper(lightRef as unknown as MutableRefObject<Object3D<Event>>, RectAreaLightHelper);

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
            position={[!isOdd ? -0.28 : 0, 0, offsetPositionCalculator * size.z - 0.1]}
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
                    {/* <MeshCollider type="cuboid">
                        <mesh
                        
                        geometry={nodes.Cube012.geometry}
                            material={materials["Marble.004"]}
                            position={[-4.896, 3.708, 0]}
                            rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                            scale={[1, 1, 40.262]}
                        />
                    </MeshCollider> */}
                    {isOdd && (
                        <>
                            <MeshCollider type="cuboid">
                                <mesh
                                    receiveShadow
                                    castShadow
                                    geometry={nodes.Cube011.geometry}
                                    material={materials["black concrete"]}
                                    position={[-3.717, 3.673, -16.906]}
                                    rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                                />
                            </MeshCollider>
                            <MeshCollider type="cuboid">
                                <mesh
                                    receiveShadow
                                    castShadow
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
                                console.log("should show youtube");

                                setShowYoutubeVideo(true);
                            }
                        }}
                    />
                    <CuboidCollider
                        args={[1, 4.581, 3.845]}
                        position={[18.952, 0.36, -12.94]}
                        scale={[13.404, 0.375, 3.691]}
                        name="video-trigger"
                        sensor
                        onIntersectionEnter={({ other }) => {
                            if (other.rigidBodyObject?.name === "player") {
                                setShowYoutubeVideo(false);
                            }
                        }}
                    />
                    <MeshCollider type="trimesh">
                        <mesh
                            geometry={nodes.Cube.geometry}
                            material={materials.Marble}
                            position={[21.836, 8, -6.753]}
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
                    {/* <MeshCollider type="cuboid"> */}
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
                    {/* </MeshCollider> */}
                    <CuboidCollider
                        args={[24.003, 16.641, 0.03]}
                        position={[27.722, -0.0001, 0]}
                        rotation={[-Math.PI / 2, 0, 0]}
                    >
                        <mesh
                            geometry={nodes.Cube007.geometry}
                            material={materials.Marble}
                            scale={[1.009, 1, 1]}
                            // castShadow
                            // receiveShadow
                        />
                    </CuboidCollider>
                    <MeshCollider type="cuboid">
                        <mesh
                            geometry={nodes.Cube008.geometry}
                            material={materials.Marble}
                            position={[27.69, 9.187, -16.527]}
                            rotation={[Math.PI, 0, Math.PI / 2]}
                            scale={[9.368, 23.816, 0.03]}
                        />
                    </MeshCollider>
                    <MeshCollider type="cuboid">
                        <mesh
                            geometry={nodes.Cube009.geometry}
                            material={materials.Marble}
                            position={[27.557, 9.328, 16.619]}
                            rotation={[Math.PI, 0, Math.PI / 2]}
                            scale={[9.368, 23.816, 0.03]}
                        />
                    </MeshCollider>
                    <MeshCollider type="cuboid">
                        <mesh
                            geometry={nodes.Cube010.geometry}
                            material={materials["Plain black"]}
                            position={[27.722, 18.701, 0.164]}
                            rotation={[Math.PI / 2, 0, -Math.PI]}
                            scale={[-1, -1, -10.203]}
                        />
                    </MeshCollider>
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
                        material={materials["black concrete"]}
                        position={[3.5, 3.827, -8]}
                        scale={[1.7, 1.5, 1.5]}
                    >
                        {canDisplayThumbnails && (
                            <Html
                                occlude
                                distanceFactor={1}
                                transform
                                // position={[-1, 0, 0]}
                                position={[-0.085, 0, 0]}
                                rotation={[0, -Math.PI / 2, 0]}
                                scale={[0.9, 1, 1]}
                            >
                                <img src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`} />
                            </Html>
                        )}
                    </mesh>
                    <mesh
                        geometry={nodes.Neon.geometry}
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
                    </mesh>
                </group>
            </Suspense>
        </GameRigidBody>
    );
};

export default CinemaChunk;
