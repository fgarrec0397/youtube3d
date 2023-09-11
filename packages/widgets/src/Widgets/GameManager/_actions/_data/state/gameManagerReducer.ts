import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GameManagerState {
    pointerLockEnable: boolean;
    videosLinks: string[];
    canOpenDoor: boolean;
}

const initialState: GameManagerState = {
    pointerLockEnable: true,
    videosLinks: [],
    canOpenDoor: false,
};

export const gameManagerSlice = createSlice({
    name: "gameManager",
    initialState,
    reducers: {
        setPointerLockEnable: (
            state,
            action: PayloadAction<GameManagerState["pointerLockEnable"]>
        ) => {
            state.pointerLockEnable = action.payload;
        },
        setVideosLinks: (state, action: PayloadAction<GameManagerState["videosLinks"]>) => {
            state.videosLinks = action.payload;
        },
        setCanOpenDoor: (state, action: PayloadAction<GameManagerState["canOpenDoor"]>) => {
            state.canOpenDoor = action.payload;
        },
    },
});

export const { setPointerLockEnable, setVideosLinks, setCanOpenDoor } = gameManagerSlice.actions;

export default gameManagerSlice;
