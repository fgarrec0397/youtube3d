import { createGameWidget, GameEditableWidget, GameOptionsFieldTypes } from "@granity/engine";
import { FC } from "react";

import CinemaChunk from "./Components/CinemaChunk";

export type CinemaProps = GameEditableWidget & {
    model3D: string;
};

const Cinema: FC<CinemaProps> = ({ model3D }) => {
    const myTestArray = [
        "https://www.youtube.com/watch?v=fuhE6PYnRMc&t=8s&ab_channel=MrBeast",
        "https://www.youtube.com/watch?v=48h57PspBec&t=2s&ab_channel=MrBeast",
        "https://www.youtube.com/watch?v=1WEAJ-DFkHE&ab_channel=MrBeast",
        "https://www.youtube.com/watch?v=UE5AHE2Ypr8&ab_channel=MrBeast",
        "https://www.youtube.com/watch?v=DuQbOQwVaNE&ab_channel=MrBeast",
    ];

    return (
        <>
            <fog attach="fog" color="#ffffff" near={1} far={2} />
            {myTestArray.map((x, index) => (
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
