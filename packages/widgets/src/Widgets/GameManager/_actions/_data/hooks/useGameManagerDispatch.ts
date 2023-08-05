import { useAppDispatch } from "@granity/engine";

import { setPointerLockEnable } from "../state/gameManagerReducer";

export default () => {
    const dispatch = useAppDispatch();

    const dispatchSetPointerLockEnable = (value: boolean) => {
        dispatch(setPointerLockEnable(value));
    };

    return {
        dispatchSetPointerLockEnable,
    };
};
