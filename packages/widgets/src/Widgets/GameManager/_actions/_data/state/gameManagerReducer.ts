import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GameManagerState {
    pointerLockEnable: boolean;
}

const initialState: GameManagerState = {
    pointerLockEnable: true,
};

export const gameManagerSlice = createSlice({
    name: "gameManager",
    initialState,
    reducers: {
        setPointerLockEnable: (state, action: PayloadAction<boolean>) => {
            state.pointerLockEnable = action.payload;
        },
    },
});

export const { setPointerLockEnable } = gameManagerSlice.actions;

export default gameManagerSlice;
