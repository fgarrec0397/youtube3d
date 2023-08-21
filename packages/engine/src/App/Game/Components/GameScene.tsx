import useHandleInitScenes from "@engine/App/Scenes/_actions/hooks/useHandleInitScenes";
import { FC, useEffect, useState } from "react";

import { useHandleGameStart } from "../_actions/hooks";
import GamePhysics from "./GamePhysics";
import GameWidgets from "./GameWidgets";

const GameScene: FC = () => {
    const [isGamePhysicsPaused, setIsGamePhysicsPaused] = useState(true);

    useEffect(() => {
        // TODO - Fix that. It ensures the scene is mounted before the physics is applied
        setTimeout(() => {
            setIsGamePhysicsPaused(false);
        }, 1000);
    }, []);

    useHandleInitScenes("publishedScenes");
    useHandleGameStart();

    return (
        <GamePhysics paused={isGamePhysicsPaused}>
            <GameWidgets />
        </GamePhysics>
    );
};

export default GameScene;
