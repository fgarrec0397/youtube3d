import { useMemo } from "react";

import useGameManagerDispatch from "./useGameManagerDispatch";
import useGameManagerSelector from "./useGameManagerSelector";

export default () => {
    const { dispatchSetPointerLockEnable, dispatchSetVideosLinks, dispatchSetCanOpenDoor } =
        useGameManagerDispatch();
    const gameManagerSelector = useGameManagerSelector();

    const videosLinks = useMemo<string[]>(() => {
        const stringVideosLinks = localStorage.getItem("videosLinks");

        try {
            if (
                gameManagerSelector?.videosLinks?.length &&
                gameManagerSelector?.videosLinks?.length <= 0
            ) {
                return gameManagerSelector?.videosLinks;
            }

            if (!stringVideosLinks || stringVideosLinks === "") {
                return;
            }
            const parsedVideosLinks = JSON.parse(stringVideosLinks);

            return parsedVideosLinks;
        } catch {
            return [];
        }
    }, [gameManagerSelector?.videosLinks]);

    const setPointerLockEnable = (value: boolean) => {
        dispatchSetPointerLockEnable(value);
    };

    const setVideosLinks = (value: string[]) => {
        dispatchSetVideosLinks(value);
        localStorage.setItem("videosLinks", JSON.stringify(value));
    };

    const setCanOpenDoor = (value: boolean) => {
        dispatchSetCanOpenDoor(value);
    };

    return {
        setPointerLockEnable,
        setVideosLinks,
        pointerLockEnable: gameManagerSelector?.pointerLockEnable,
        videosLinks,
        setCanOpenDoor,
        canOpenDoor: gameManagerSelector?.canOpenDoor,
    };
};
