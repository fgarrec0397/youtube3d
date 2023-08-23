import { useMemo } from "react";

import useGameManagerDispatch from "./useGameManagerDispatch";
import useGameManagerSelector from "./useGameManagerSelector";

export default () => {
    const { dispatchSetPointerLockEnable, dispatchSetVideosLinks } = useGameManagerDispatch();
    const gameManagerSelector = useGameManagerSelector();

    const videosLinks = useMemo<string[]>(() => {
        const stringVideosLinks = localStorage.getItem("videosLinks");

        try {
            if (!stringVideosLinks || stringVideosLinks === "") {
                return;
            }
            const parsedVideosLinks = JSON.parse(stringVideosLinks);

            return parsedVideosLinks;
        } catch {
            return [];
        }
    }, []);

    const setPointerLockEnable = (value: boolean) => {
        dispatchSetPointerLockEnable(value);
    };

    const setVideosLinks = (value: string[]) => {
        dispatchSetVideosLinks(value);
        localStorage.setItem("videosLinks", JSON.stringify(value));
    };

    return {
        setPointerLockEnable,
        setVideosLinks,
        pointerLockEnable: gameManagerSelector?.pointerLockEnable,
        videosLinks,
    };
};
