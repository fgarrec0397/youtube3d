import { GameRigidBody } from "@granity/engine";
import { Vector3Array } from "@granity/helpers";
import { CuboidCollider, MeshCollider } from "@granity/physics";
import { Box3, Mesh, Vector3 } from "@granity/three";
import { BakeShadows, MeshReflectorMaterial, useGLTF, useHelper } from "@granity/three/drei";
import { RectAreaLightProps } from "@granity/three/fiber";
import { FC, MutableRefObject, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { DirectionalLight, DirectionalLightHelper, Object3D, RectAreaLight } from "three";
import { GLTF, RectAreaLightHelper } from "three-stdlib";

import extractVideoIdFromUrl from "../_actions/utilities/extractYoutubeVideoIdFromUrl";
import MeshesMaterial from "./MeshesMaterial";
import YoutubeVideoPlayer from "./YoutubeVideoPlayer";

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
            position={[0, 0, index * size.z]}
            rotation={[0, isOdd ? 0 : Math.PI, 0]}
        >
            <Suspense>
                <group dispose={null}>
                    {/* <directionalLight
                        ref={lightRef2}
                        intensity={1}
                        position={[0, 7.3, 0]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        target-position={[index, -100, 0]}
                        // target={floorRef.current}
                        shadow-mapSize-width={1024}
                        shadow-mapSize-height={1024}
                        castShadow
                    /> */}
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
                            ref={ref}
                            geometry={nodes.Cube002.geometry}
                            material={materials.Marble}
                            rotation={[Math.PI / 2, 0, 0]}
                        />
                    </MeshCollider>
                    <mesh
                        geometry={nodes.Cube001.geometry}
                        material={materials.Marble}
                        position={[-3.704, 3.708, 0]}
                        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                    />
                    <mesh
                        geometry={nodes.Cube004.geometry}
                        material={materials.Plain}
                        position={[0, 7.377, 0]}
                        rotation={[Math.PI / 2, 0, 0]}
                    />
                    <mesh
                        geometry={nodes.Cube005.geometry}
                        material={materials.Marble}
                        position={[3.709, 9.36, 0]}
                        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                    />
                    <mesh
                        geometry={nodes.Cube006.geometry}
                        material={materials["Material.009"]}
                        position={[51.298, 9.36, 0]}
                        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                        scale={[9.368, 16.641, 0.03]}
                    />
                    <mesh
                        geometry={nodes.Cube007.geometry}
                        material={materials["Material.010"]}
                        position={[27.722, 0.009, 0]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[24.003, 16.641, 0.03]}
                    />
                    <mesh
                        geometry={nodes.Plane.geometry}
                        material={nodes.Plane.material}
                        position={[23.543, 6.912, 16.7]}
                        rotation={[Math.PI / 2, 0, -Math.PI]}
                        scale={[-19.646, -1, -6.876]}
                    />
                    <mesh
                        geometry={nodes.Cube008.geometry}
                        material={materials["Material.011"]}
                        position={[27.69, 9.187, -16.527]}
                        rotation={[Math.PI, 0, Math.PI / 2]}
                        scale={[9.368, 23.816, 0.03]}
                    />
                    <mesh
                        geometry={nodes.Cube009.geometry}
                        material={materials["Material.012"]}
                        position={[27.557, 9.403, 16.619]}
                        rotation={[Math.PI, 0, Math.PI / 2]}
                        scale={[9.368, 23.816, 0.03]}
                    />
                    <mesh
                        geometry={nodes.Cube010.geometry}
                        material={materials["Material.013"]}
                        position={[27.722, 18.701, -0.116]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={[24.003, 16.641, 0.03]}
                    />
                </group>
            </Suspense>
        </GameRigidBody>
    );
};

export default CinemaChunk;
