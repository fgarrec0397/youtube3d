import { createGameWidget, GameEditableWidget } from "@granity/engine";
import { FC } from "react";

export type CinemaProps = GameEditableWidget;

const Cinema: FC<CinemaProps> = () => {
    return (
        <mesh position={[0, 0, 0]}>
            <boxGeometry />
            <meshStandardMaterial color="pink" />
        </mesh>
    );
};

export const widget = createGameWidget({
    component: Cinema,
    reducer: null,
    name: "Cinema",
});
