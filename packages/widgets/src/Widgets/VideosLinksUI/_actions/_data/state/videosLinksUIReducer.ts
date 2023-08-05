import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface VideosLinksUIState {
    widgetStarterMessage: string;
}

const initialState: VideosLinksUIState = {
    widgetStarterMessage: "",
};

export const widgetStarterSlice = createSlice({
    name: "videosLinksUI",
    initialState,
    reducers: {
        addYourWidgetAction: (state, action: PayloadAction<string>) => {
            state.widgetStarterMessage = action.payload;
        },
    },
});

export const { addYourWidgetAction } = widgetStarterSlice.actions;

export default widgetStarterSlice;
