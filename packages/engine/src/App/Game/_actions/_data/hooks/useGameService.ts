import useGameDispatch from "./useGameDispatch";
import useGameSelector from "./useGameSelector";

export default () => {
    const { dispatchSetIsGamePaused, dispatchSetIsGameReady } = useGameDispatch();
    const { isGamePaused, isGameReady } = useGameSelector();

    const updateIsGamePaused = (value: boolean) => {
        dispatchSetIsGamePaused(value);
    };

    const updateIsGameReady = (value: boolean) => {
        dispatchSetIsGameReady(value);
    };

    return {
        isGamePaused,
        isGameReady,
        updateIsGamePaused,
        updateIsGameReady,
    };
};
