import { createGameWidget, GameEditableWidget, GameOptionsFieldTypes } from "@granity/engine";
import { FC } from "react";

import useGameManager from "../GameManager/_actions/hooks/useGameManager";
import CinemaChunk from "./Components/CinemaChunk";

export type CinemaProps = GameEditableWidget & {
    model3D: string;
};

const Cinema: FC<CinemaProps> = ({ model3D }) => {
    const { videosLinks } = useGameManager();
    const videos = videosLinks?.length
        ? videosLinks
        : ["https://www.youtube.com/watch?v=fuhE6PYnRMc&t=8s&ab_channel=MrBeast"];

    return (
        <>
            <fog attach="fog" color="#ffffff" near={1} far={2} />
            {videos?.map((x, index) => (
                <CinemaChunk key={x} videoUrl={x} index={index} cinemaModel3D={model3D} />
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
