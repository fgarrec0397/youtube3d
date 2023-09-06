import {
    createGameWidget,
    GameEditableWidget,
    GameOptionsFieldTypes,
    GameRigidBody,
    helpersTypes,
    useCreateCamera,
    useEditor,
    useGameUpdate,
    useInputs,
} from "@granity/engine";
import { isEqual, unSerializeVector3, usePrevious } from "@granity/helpers";
import { RAPIER, RigidBodyRefType, usePhysics } from "@granity/physics";
import {
    AudioListener,
    AudioLoader,
    PerspectiveCamera,
    PositionalAudio,
    Vector3,
} from "@granity/three";
import { PointerLockControlsOverride } from "@granity/three/drei";
import { useLoader } from "@granity/three/fiber";
import { FC, Ref, useCallback, useEffect, useRef, useState } from "react";
import { PointerLockControls as PointerLockControlsImpl } from "three-stdlib";

import useGameManager from "../GameManager/_actions/hooks/useGameManager";
import usePlayer from "./_actions/hooks/usePlayer";

export type PlayerProps = GameEditableWidget & {
    walkSoundEffect?: string;
};

const SPEED = 5;
const direction = new Vector3();
const frontVector = new Vector3();
const sideVector = new Vector3();

const Player: FC<PlayerProps> = ({ position, rotation, walkSoundEffect }, ref) => {
    const { pointerLockEnable, videosLinks } = useGameManager();
    const { canPlayerMove } = usePlayer();
    const { camera, cameraRef } = useCreateCamera("widgetCamera", [0, 0, 0], ref!, true);
    const rigidbodyRef = useRef<RigidBodyRefType>(null);
    const walkSoundEffectRef = useRef<PositionalAudio>(null);
    const [pointerLockRef, setPointerLockRef] = useState<PointerLockControlsImpl | null>(null);
    const [movementDirection, setMovementDirection] = useState({
        forward: 0,
        backward: 0,
        right: 0,
        left: 0,
    });
    const [isEnabled, setIsEnabled] = useState(true);
    const [isJumpPressed, setIsJumpPressed] = useState(false);
    const [listener] = useState(() => new AudioListener());
    const previousVideosLinks = usePrevious(videosLinks);
    const { isGamePreview, isGame, isEditor } = useEditor();
    const physics = usePhysics();

    const buffer = useLoader(AudioLoader, walkSoundEffect || "");

    const updateDirection = (key: keyof typeof movementDirection, value: 0 | 1) => {
        setMovementDirection((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    useEffect(() => {
        if (!pointerLockEnable) {
            pointerLockRef?.unlock();
            setTimeout(() => {
                setIsEnabled(false);
            }, 10);
        }

        if (pointerLockEnable) {
            setIsEnabled(true);

            setTimeout(() => {
                pointerLockRef?.lock();
            }, 10);
        }
    }, [pointerLockEnable, pointerLockRef]);

    useEffect(() => {
        if (!rigidbodyRef.current) {
            return;
        }

        if (!previousVideosLinks) {
            return;
        }

        if (!isEqual(previousVideosLinks, videosLinks)) {
            rigidbodyRef.current?.setTranslation(unSerializeVector3(position), true);
        }
    }, [position, previousVideosLinks, rotation, videosLinks]);

    const playWalkSound = useCallback(() => {
        if (!walkSoundEffectRef.current) {
            return;
        }

        if (!walkSoundEffectRef.current.isPlaying) {
            walkSoundEffectRef.current.setBuffer(buffer);
            walkSoundEffectRef.current.setRefDistance(1);
            walkSoundEffectRef.current.setLoop(true);
            walkSoundEffectRef.current.play();
        }
    }, [buffer]);

    const stopWalkSound = () => {
        if (!walkSoundEffectRef.current) {
            return;
        }

        if (walkSoundEffectRef.current.isPlaying) {
            walkSoundEffectRef.current.stop();
        }
    };

    useEffect(() => {
        if (
            movementDirection.backward +
                movementDirection.forward +
                movementDirection.right +
                movementDirection.left >
            0
        ) {
            return playWalkSound();
        }

        stopWalkSound();
    }, [
        movementDirection.backward,
        movementDirection.forward,
        movementDirection.left,
        movementDirection.right,
        playWalkSound,
    ]);

    useInputs((input) => {
        if (!canPlayerMove) {
            return;
        }

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

        frontVector.set(0, 0, movementDirection.forward - movementDirection.backward);
        sideVector.set(movementDirection.right - movementDirection.left, 0, 0);

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

        if (isJumpPressed && grounded) rigidbodyRef.current.setLinvel({ x: 10, y: 5, z: 0 }, true);
    });

    return (
        <>
            <GameRigidBody
                ref={rigidbodyRef}
                colliders="cuboid"
                type="dynamic"
                name="player"
                key={position.toString()}
                enabledRotations={[false, false, false]}
            >
                <positionalAudio ref={walkSoundEffectRef} args={[listener]} />
                {/* <PositionalAudio ref={walkSoundEffectRef} url={walkSoundEffect} distance={1} loop /> */}
                <perspectiveCamera ref={cameraRef as Ref<PerspectiveCamera>} position={[0, 8, 0]} />

                {isEnabled && (
                    <PointerLockControlsOverride
                        ref={setPointerLockRef}
                        enabled={isGame || isGamePreview}
                        camera={camera}
                    />
                )}
                <mesh scale={[0.5, 1.5, 0.5]}>
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
    options: [
        {
            name: "walkSoundEffect",
            displayName: "Walk Sound Effect",
            fieldType: GameOptionsFieldTypes.File,
            defaultValue: "",
        },
    ],
});
