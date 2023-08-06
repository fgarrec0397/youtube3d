import useGameManagerDispatch from "./useGameManagerDispatch";
import useGameManagerSelector from "./useGameManagerSelector";

export default () => {
    const { dispatchSetPointerLockEnable, dispatchSetVideosLinks } = useGameManagerDispatch();
    const gameManagerSelector = useGameManagerSelector();

    const setPointerLockEnable = (value: boolean) => {
        dispatchSetPointerLockEnable(value);
    };

    const setVideosLinks = (value: string[]) => {
        dispatchSetVideosLinks(value);
    };

    return {
        setPointerLockEnable,
        setVideosLinks,
        pointerLockEnable: gameManagerSelector?.pointerLockEnable,
        videosLinks: gameManagerSelector?.videosLinks,
    };
};
