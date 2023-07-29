import { createGameWidget, GameEditableWidget, GameOptionsFieldTypes } from "@granity/engine";
import { FC } from "react";

import CinemaChunk from "./Components/CinemaChunk";

export type CinemaProps = GameEditableWidget & {
    model3D: string;
};

const Cinema: FC<CinemaProps> = ({ model3D }) => {
    const myTestArray = [1, 2, 3];

    return (
        <>
            {myTestArray.map((x) => (
                <CinemaChunk key={x} index={x} cinemaModel3D={model3D} />
            ))}
        </>
    );
};

export const widget = createGameWidget({
    component: Cinema,
    reducer: null,
    name: "Cinema",
    options: [
        {
            name: "model3D",
            displayName: "3D Model",
            fieldType: GameOptionsFieldTypes.File,
            defaultValue: "",
        },
    ],
});
