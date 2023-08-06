import { useAppDispatch } from "@granity/engine";

import { setPointerLockEnable, setVideosLinks } from "../state/gameManagerReducer";

export default () => {
    const dispatch = useAppDispatch();

    const dispatchSetPointerLockEnable = (value: boolean) => {
        dispatch(setPointerLockEnable(value));
    };

    const dispatchSetVideosLinks = (value: string[]) => {
        dispatch(setVideosLinks(value));
    };

    return {
        dispatchSetPointerLockEnable,
        dispatchSetVideosLinks,
    };
};
