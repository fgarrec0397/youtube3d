import { useGameInit } from "@granity/engine";

import useCinema from "./useCinema";

export default () => {
    const { makeThisWidgetAlive } = useCinema();

    useGameInit(() => {
        makeThisWidgetAlive();
    });
};
