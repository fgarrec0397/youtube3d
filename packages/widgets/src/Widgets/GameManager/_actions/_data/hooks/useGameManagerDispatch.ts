import { useAppDispatch } from "@granity/engine";

import { setCanOpenDoor, setPointerLockEnable, setVideosLinks } from "../state/gameManagerReducer";

export default () => {
    const dispatch = useAppDispatch();

    const dispatchSetPointerLockEnable = (value: boolean) => {
        dispatch(setPointerLockEnable(value));
    };

    const dispatchSetVideosLinks = (value: string[]) => {
        dispatch(setVideosLinks(value));
    };

    const dispatchSetCanOpenDoor = (value: boolean) => {
        dispatch(setCanOpenDoor(value));
    };

    return {
        dispatchSetPointerLockEnable,
        dispatchSetVideosLinks,
        dispatchSetCanOpenDoor,
    };
};
