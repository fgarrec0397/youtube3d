import { createGameWidget } from "@granity/engine";
import { FC } from "react";

import widgetStarterReducer from "./_actions/_data/state/gameManagerReducer";

const GameManager: FC = () => {
    return null;
};

export const widget = createGameWidget({
    component: GameManager,
    reducer: widgetStarterReducer,
    name: "GameManager",
});
