import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CinemaState {
    widgetStarterMessage: string;
}

const initialState: CinemaState = {
    widgetStarterMessage: "",
};

export const cinemaSlice = createSlice({
    name: "widgetStarter",
    initialState,
    reducers: {
        addYourWidgetAction: (state, action: PayloadAction<string>) => {
            state.widgetStarterMessage = action.payload;
        },
    },
});

export const { addYourWidgetAction } = cinemaSlice.actions;

export default cinemaSlice;
