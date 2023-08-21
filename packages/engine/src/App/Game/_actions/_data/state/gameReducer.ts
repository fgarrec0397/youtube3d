import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type GameState = {
    isGamePaused: boolean;
    isGameReady: boolean;
};

const initialState: GameState = {
    isGamePaused: false,
    isGameReady: false,
};

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setIsGamePaused: (state: GameState, actions: PayloadAction<boolean>) => {
            state.isGamePaused = actions.payload;
        },
        setIsGameReady: (state: GameState, actions: PayloadAction<boolean>) => {
            state.isGameReady = actions.payload;
        },
    },
});

export const { setIsGamePaused, setIsGameReady } = gameSlice.actions;

export default gameSlice.reducer;
