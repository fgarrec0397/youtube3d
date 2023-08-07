import { createGameWidget, GameEditableWidget, GameOptionsFieldTypes } from "@granity/engine";
import { FC, useEffect, useState } from "react";

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
    const [thumbnails, setThumnails] = useState<string[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchThumnails = async () => {
            setIsLoading(true);
            console.log("fetchThumnails");

            const response =
                await fetch(`https://www.googleapis.com/youtube/v3/videos?key=AIzaSyBjo-YMLn-Pd4JveJ63w8uTg4zjw1-rVS0&part=snippet&id=yhB3BgJyGl8
            `);
            const data = await response.json();
            setThumnails([data.items[0].snippet.thumbnails.high.url]);
            setIsLoading(false);
            console.log(response, "response");
            console.log(
                data.items[0].snippet.thumbnails.high.url,
                "data.items[0].snippet.thumbnails.high.url"
            );
            console.log(data, "data");
        };

        fetchThumnails();
    }, []);

    useEffect(() => {
        console.log(thumbnails, "thumbnails");
    }, [thumbnails]);

    if (isLoading || !thumbnails) {
        return null;
    }

    return (
        <>
            <fog attach="fog" color="#ffffff" near={1} far={2} />
            {videos?.map((x, index) => (
                <CinemaChunk
                    key={x}
                    videoUrl={x}
                    thumbnails={thumbnails}
                    index={index}
                    cinemaModel3D={model3D}
                />
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
