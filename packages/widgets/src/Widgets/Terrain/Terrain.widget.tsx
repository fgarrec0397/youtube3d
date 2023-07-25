import {
    createGameWidget,
    GameEditableWidget,
    GameOptionsFieldTypes,
    GameRigidBody,
} from "@granity/engine";
import { FC } from "react";

export type TerrainProps = GameEditableWidget & {
    translateXOnPlay: boolean;
    color: string;
};

type OwnProps = TerrainProps;

const Terrain: FC<OwnProps> = ({ color }) => {
    return (
        <GameRigidBody type="fixed">
            <mesh>
                <planeBufferGeometry />
                <meshStandardMaterial color={color} />
            </mesh>
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
