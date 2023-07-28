import {
    createGameWidget,
    GameEditableWidget,
    GameRigidBody,
    helpersTypes,
    useCreateCamera,
    useEditor,
    useGameUpdate,
    useInputs,
} from "@granity/engine";
import { RAPIER, RigidBodyRefType, usePhysics } from "@granity/physics";
import { PerspectiveCamera, Vector3 } from "@granity/three";
import { PointerLockControls } from "@granity/three/drei";
import { FC, Ref, useRef, useState } from "react";

export type PlayerProps = GameEditableWidget;

const SPEED = 5;
const direction = new Vector3();
const frontVector = new Vector3();
const sideVector = new Vector3();

const Player: FC<PlayerProps> = ({ position }, ref) => {
    const { camera, cameraRef } = useCreateCamera("widgetCamera", [0, 0, 0], ref!, true);
    const rigidbodyRef = useRef<RigidBodyRefType>(null);
    const [movementDirection, setMovementDirection] = useState({
        forward: 0,
        backward: 0,
        right: 0,
        left: 0,
    });
    const [isJumpPressed, setIsJumpPressed] = useState(false);
    const { isGamePreview, isGame, isEditor } = useEditor();
    const physics = usePhysics();

    const updateDirection = (key: keyof typeof movementDirection, value: 0 | 1) => {
        setMovementDirection((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    useInputs((input) => {
        if (input.forwardDown) {
            updateDirection("forward", 1);
        }

        if (input.forwardUp) {
            updateDirection("forward", 0);
        }

        if (input.rightDown) {
            updateDirection("right", 1);
        }

        if (input.rightUp) {
            updateDirection("right", 0);
        }

        if (input.backwardDown) {
            updateDirection("backward", 1);
        }

        if (input.backwardUp) {
            updateDirection("backward", 0);
        }

        if (input.leftDown) {
            updateDirection("left", 1);
        }

        if (input.leftUp) {
            updateDirection("left", 0);
        }

        if (input.jump) {
            setIsJumpPressed(true);
        } else {
            setIsJumpPressed(false);
        }
    }, []);

    useGameUpdate(() => {
        if (isEditor) {
            return;
        }

        if (!rigidbodyRef.current) {
            return;
        }

        const velocity = rigidbodyRef.current.linvel();

        frontVector.set(0, 0, movementDirection.backward - movementDirection.forward);
        sideVector.set(movementDirection.left - movementDirection.right, 0, 0);

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camera.rotation);

        rigidbodyRef.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z }, true);

        // // jumping
        const world = physics.world.raw();
        const ray = world.castRay(
            new RAPIER.Ray(rigidbodyRef.current.translation(), { x: 0, y: -1, z: 0 }),
            undefined as unknown as number, // setting a number does not work or allows infinite jump
            true
        );

        const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.75;

        if (isJumpPressed && grounded) rigidbodyRef.current.setLinvel({ x: 0, y: 5, z: 0 }, true);
    });

    return (
        <>
            <GameRigidBody
                ref={rigidbodyRef}
                colliders="trimesh"
                mass={1}
                type="dynamic"
                key={position.toString()}
                enabledRotations={[false, false, false]}
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
