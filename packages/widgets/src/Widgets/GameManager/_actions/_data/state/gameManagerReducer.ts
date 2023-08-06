import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GameManagerState {
    pointerLockEnable: boolean;
    videosLinks: string[];
}

const initialState: GameManagerState = {
    pointerLockEnable: true,
    videosLinks: ["https://www.youtube.com/watch?v=fuhE6PYnRMc&t=8s&ab_channel=MrBeast"],
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
    },
});

export const { setPointerLockEnable, setVideosLinks } = gameManagerSlice.actions;

export default gameManagerSlice;
