import useGameManagerDispatch from "./useGameManagerDispatch";
import useGameManagerSelector from "./useGameManagerSelector";

export default () => {
    const { dispatchSetPointerLockEnable } = useGameManagerDispatch();
    const gameManagerSelector = useGameManagerSelector();

    const setPointerLockEnable = (value: boolean) => {
        dispatchSetPointerLockEnable(value);
    };

    return { setPointerLockEnable, pointerLockEnable: gameManagerSelector?.pointerLockEnable };
};
