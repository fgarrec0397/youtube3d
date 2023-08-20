import { createGameWidget } from "@granity/engine";
import { FC, useEffect } from "react";

import widgetStarterReducer from "./_actions/_data/state/gameManagerReducer";

const GameManager: FC = () => {
    useEffect(() => {
        console.log("game manager");
    }, []);

    return null;
};

export const widget = createGameWidget({
    component: GameManager,
    reducer: widgetStarterReducer,
    name: "GameManager",
});
