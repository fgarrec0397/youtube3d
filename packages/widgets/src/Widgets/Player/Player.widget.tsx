import {
    createGameWidget,
    GameEditableWidget,
    GameRigidBody,
    helpersTypes,
    useCreateCamera,
    useEditor,
    useGameUpdate,
} from "@granity/engine";
import { unSerializeVector3 } from "@granity/helpers";
import { CapsuleCollider, RigidBody, RigidBodyRefType, usePhysics } from "@granity/physics";
import { PerspectiveCamera } from "@granity/three";
import { PointerLockControls } from "@granity/three/drei";
import { useThree } from "@granity/three/fiber";
import { FC, Ref, useEffect, useRef } from "react";
import * as THREE from "three";

export type PlayerProps = GameEditableWidget;

const SPEED = 5;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const rotation = new THREE.Vector3();

const Player: FC<PlayerProps> = ({ position }, ref) => {
    const { camera, cameraRef } = useCreateCamera("widgetCamera", [0, 0, 0], ref!, true);
    const rigidbodyRef = useRef<RigidBodyRefType>(null);
    // const axe = useRef();
    const physics = usePhysics();
    const { isGamePreview, isGame } = useEditor();

    useGameUpdate((state) => {
        if (!rigidbodyRef.current) {
            return;
        }

        // const velocity = rigidbodyRef.current.linvel();
        // update camera
        // state.camera.position.set(
        //     rigidbodyRef.current.translation().x,
        //     rigidbodyRef.current.translation().y,
        //     rigidbodyRef.current.translation().z
        // );
        // update axe
        // axe.current.children[0].rotation.x = lerp(
        //     axe.current.children[0].rotation.x,
        //     Math.sin((velocity.length() > 1) * state.clock.elapsedTime * 10) / 6,
        //     0.1
        // );
        // axe.current.rotation.copy(state.camera.rotation);
        // axe.current.position
        //     .copy(state.camera.position)
        //     .add(state.camera.getWorldDirection(rotation).multiplyScalar(1));
        // movement
        // frontVector.set(0, 0, backward - forward);
        // sideVector.set(left - right, 0, 0);
        // direction
        //     .subVectors(frontVector, sideVector)
        //     .normalize()
        //     .multiplyScalar(SPEED)
        //     .applyEuler(state.camera.rotation);
        // rigidbodyRef.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z });
        // // jumping
        // const world = physics.world.raw();
        // const ray = world.castRay(
        //     new RAPIER.Ray(rigidbodyRef.current.translation(), { x: 0, y: -1, z: 0 })
        // );
        // const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.75;
        // if (jump && grounded) ref.current.setLinvel({ x: 0, y: 7.5, z: 0 });
    });

    return (
        <>
            <GameRigidBody
                ref={rigidbodyRef}
                colliders="trimesh"
                mass={1}
                type="dynamic"
                key={position.toString()}
                enabledRotations={[true, false, true]}
            >
                <perspectiveCamera
                    ref={cameraRef as Ref<PerspectiveCamera>}
                    position={[0, 0.7, 0]}
                />
                <PointerLockControls enabled={isGame || isGamePreview} camera={camera} />
                <mesh scale={[0.5, 0.75, 0.5]}>
                    <capsuleGeometry />
                    <meshStandardMaterial color="white" />
                </mesh>
            </GameRigidBody>
        </>
        // {/* <group ref={axe} onPointerMissed={(e) => (axe.current.children[0].rotation.x = -0.5)}>
        //     <Axe position={[0.3, -0.35, 0.5]} />
        // </group> */}
    );
};

export const widget = createGameWidget({
    component: Player,
    hasRef: true,
    reducer: null,
    editorOptions: {
        helper: helpersTypes.CameraHelper,
        gizmo: true,
    },
    name: "Player",
});
