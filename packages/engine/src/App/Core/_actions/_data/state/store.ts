import editorReducer, { EditorState } from "@engine/App/Editor/_actions/_data/state/editorReducer";
import gameReducer, { GameState } from "@engine/App/Game/_actions/_data/state/gameReducer";
import scenesReducer, { ScenesState } from "@engine/App/Scenes/_actions/_data/state/scenesReducer";
import uiReducer, { UIState } from "@engine/App/UI/_actions/_data/state/uiReducer";
import widgetsInfoReducer, {
    WidgetsInfoState,
} from "@engine/App/Widgets/_actions/_data/state/widgetsInfoReducer";
import { configureStore, Slice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AnyAction, combineReducers, Reducer, ReducersMapObject, Store } from "redux";

import coreReducer, { CoreState } from "./coreReducer";

export interface State {
    core: CoreState;
    editor: EditorState;
    widgets: WidgetsInfoState;
    scenes: ScenesState;
    game: GameState;
    ui: UIState;
}

type MyAction = AnyAction;

export type ReducerManager = {
    getReducer: () => ReducersMapObject<State, MyAction>;
    add: <NewReducerState>(
        key: string,
        reducer: ReducersMapObject<NewReducerState, MyAction>
    ) => void;
    addIn: <NewReducerState>(key: string, subKey: keyof NewReducerState, reducer: Slice) => void;
    remove: (key: keyof State) => void;
};

export type InjectableStore = Store<State, MyAction> & {
    reducerManager?: ReducerManager;
    asyncReducers?: any;
};

/**
 * Mapping of State properties to their reducers
 */
const staticReducers: ReducersMapObject<State, MyAction> = {
    core: coreReducer,
    editor: editorReducer,
    widgets: widgetsInfoReducer,
    scenes: scenesReducer,
    game: gameReducer,
    ui: uiReducer,
};

export function initStore() {
    const store: InjectableStore = configureStore({
        reducer: staticReducers,
    });

    store.asyncReducers = {};

    const createReducerManager = (initialReducers: ReducersMapObject<State, MyAction>) => {
        const reducers = { ...initialReducers };

        const getReducer = () => reducers;

        /**
         * Add a root reducer
         *
         * @param key Key of the root reducer
         * @param reducer The reducer to add
         */
        const add = <NewReducerState>(
            key: string,
            reducer: ReducersMapObject<NewReducerState, MyAction>
        ) => {
            if (!key || (reducers as any)[key]) {
                return;
            }

            store.asyncReducers[key] = reducer;

            (reducers as any)[key] = reducer;

            store.replaceReducer(createReducer(reducers, staticReducers));
        };

        /**
         * Add a reducer inside a root reducer
         *
         * @param key Key of the root reducer
         * @param subKey Key of the root reducer's reducer
         * @param reducer The reducer to add
         */
        const addIn = <NewReducerState>(
            key: string,
            subKey: keyof NewReducerState,
            reducer: Slice
        ) => {
            const rootReducer = reducers[key as keyof State];

            if (!rootReducer) {
                const newReducer: ReducersMapObject<unknown, any> = {
                    [subKey]: reducer.reducer,
                };

                store.asyncReducers[key] = newReducer;

                (reducers as any)[key] = combineReducers(newReducer);
                store.replaceReducer(createReducer(reducers, staticReducers));

                return;
            }

            store.asyncReducers[key][subKey] = reducer.reducer;

            (reducers as any)[key] = combineReducers(store.asyncReducers[key]);
            store.replaceReducer(createReducer(reducers, staticReducers));
        };

        /**
         * Removes a reducer by its given key
         *
         * @param key The reducer's key to remove
         */
        const remove = (key: keyof State) => {
            if (!key || !reducers[key]) {
                return;
            }

            delete reducers[key];
            store.replaceReducer(createReducer(reducers, staticReducers));
        };

        return {
            getReducer,
            add,
            addIn,
            remove,
        };
    };

    store.reducerManager = createReducerManager(staticReducers);

    return store;
}

export const store = initStore();

/**
 * Combines two given reducers together.
 */
function createReducer<
    R1 extends ReducersMapObject<any, any> | Reducer<any, any>,
    R2 extends ReducersMapObject<any, any> | Reducer<any, any>
>(reducer1?: R1, reducer2?: R2): Reducer<any, any> {
    return combineReducers({
        ...reducer1,
        ...reducer2,
    });
}

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/* Use throughout your app instead of plain `useDispatch` and `useSelector` */
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
