import {
    createGameWidget,
    GameEditableWidget,
    GameOptionsFieldTypes,
    GameRigidBody,
} from "@granity/engine";
import { CuboidCollider } from "@granity/physics";
import { FC } from "react";

export type TerrainProps = GameEditableWidget & {
    translateXOnPlay: boolean;
    color: string;
};

type OwnProps = TerrainProps;

const Terrain: FC<OwnProps> = ({ color }) => {
    return (
        <GameRigidBody type="fixed" colliders={false}>
            <mesh>
                <planeBufferGeometry />
                <meshStandardMaterial color={color} />
            </mesh>
            <CuboidCollider args={[1000, 2, 1000]} position={[0, -2, 0]} />
        </GameRigidBody>
    );
};

export const widget = createGameWidget({
    component: Terrain,
    reducer: null,
    name: "Terrain",
    options: [
        {
            name: "color",
            displayName: "Color",
            fieldType: GameOptionsFieldTypes.Text,
            defaultValue: "white",
        },
    ],
});
