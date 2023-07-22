import { store } from "@granity/engine";
import { TypedUseSelectorHook, useSelector } from "react-redux";

type AppState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default () => {
    return useAppSelector((state) => {
        return state.features;
    });
};
