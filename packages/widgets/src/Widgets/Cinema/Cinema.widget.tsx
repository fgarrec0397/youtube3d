import {
    createGameWidget,
    GameEditableWidget,
    GameOptionsFieldTypes,
    useGameInit,
} from "@granity/engine";
import { AudioListener, AudioLoader, PositionalAudio } from "@granity/three";
import { useLoader } from "@granity/three/fiber";
import { FC, useRef, useState } from "react";

import useGameManager from "../GameManager/_actions/hooks/useGameManager";
import CinemaChunk from "./Components/CinemaChunk";

export type CinemaProps = GameEditableWidget & {
    model3D: string;
    ambiantSoundEffect: string;
};

const Cinema: FC<CinemaProps> = ({ model3D, ambiantSoundEffect }) => {
    const { videosLinks } = useGameManager();
    const ambiantSoundEffectRef = useRef<PositionalAudio>(null);
    const [listener] = useState(() => new AudioListener());
    const buffer = useLoader(AudioLoader, ambiantSoundEffect || "");
    const videos = videosLinks;

    useGameInit(() => {
        if (!ambiantSoundEffectRef.current) {
            return;
        }

        ambiantSoundEffectRef.current.setBuffer(buffer);
        ambiantSoundEffectRef.current.setRefDistance(1);
        ambiantSoundEffectRef.current.setLoop(true);
        ambiantSoundEffectRef.current.play();
    });

    return (
        <>
            <fog attach="fog" color="#ffffff" near={1} far={2} />
            <positionalAudio ref={ambiantSoundEffectRef} args={[listener]} />
            {videos?.map((x, index) => (
                <CinemaChunk
                    key={`${x}-${index}`}
                    videoUrl={x}
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
        {
            name: "ambiantSoundEffect",
            displayName: "Ambiant sound effect",
            fieldType: GameOptionsFieldTypes.File,
            defaultValue: "",
        },
    ],
});
