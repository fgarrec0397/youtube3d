import { useGameInit } from "@granity/engine";

import useWidgetStarter from "./useVideosLinksUI";

export default () => {
    const { makeThisWidgetAlive } = useWidgetStarter();

    useGameInit(() => {
        makeThisWidgetAlive();
    });
};
