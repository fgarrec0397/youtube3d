import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { setIsGamePaused, setIsGameReady } from "../state/gameReducer";

export default () => {
    const dispatch = useDispatch();

    const dispatchSetIsGamePaused = useCallback(
        (value: boolean) => {
            dispatch(setIsGamePaused(value));
        },
        [dispatch]
    );

    const dispatchSetIsGameReady = useCallback(
        (value: boolean) => {
            dispatch(setIsGameReady(value));
        },
        [dispatch]
    );

    return {
        dispatchSetIsGamePaused,
        dispatchSetIsGameReady,
    };
};
