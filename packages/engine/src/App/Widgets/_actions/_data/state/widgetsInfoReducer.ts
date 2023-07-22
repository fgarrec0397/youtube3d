import { clone, pull } from "@granity/helpers";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
    WidgetInfoDictionary,
    WidgetInfoDictionaryItem,
    WidgetInfoValueParameter,
} from "../../widgetsTypes";

export interface WidgetsInfoState {
    byId: WidgetInfoDictionary;
    allIds: string[];
}

export const widgetsInfoInitialState: WidgetsInfoState = {
    byId: {},
    allIds: [],
};

export const widgetsInfoSlice = createSlice({
    name: "widgetsInfo",
    initialState: widgetsInfoInitialState,
    reducers: {
        addWidgetInfoDictionaryItem: <
            WidgetInfoDictionaryItemType extends WidgetInfoDictionaryItem
        >(
            state: WidgetsInfoState,
            action: PayloadAction<WidgetInfoDictionaryItemType>
        ) => {
            const widgetObjectInfo = action.payload;

            state.byId = {
                ...state.byId,
                [widgetObjectInfo.id]: widgetObjectInfo,
            };

            state.allIds.push(widgetObjectInfo.id);
        },
        addBatchWidgetInfoDictionary: (
            state: WidgetsInfoState,
            action: PayloadAction<Required<WidgetInfoDictionary>>
        ) => {
            const newWidgetsDictionary = action.payload;

            state.byId = {
                ...state.byId,
                ...newWidgetsDictionary,
            };

            state.allIds = [...state.allIds, ...Object.keys(newWidgetsDictionary)];
        },
        updateWidgetInfoDictionaryItem: <Value extends WidgetInfoValueParameter>(
            state: WidgetsInfoState,
            action: PayloadAction<{
                widgetId: string;
                value: Value;
            }>
        ) => {
            const { widgetId, value } = action.payload;

            state.byId[widgetId] = {
                ...state.byId[widgetId],
                ...value,
            };
        },
        removeWidgetInfoDictionaryItem: (
            state: WidgetsInfoState,
            action: PayloadAction<string>
        ) => {
            const id = action.payload;
            delete state.byId[id];
            state.allIds = state.allIds.filter((x) => x !== id);
        },
        removeBatchWidgetInfoDictionary: (
            state: WidgetsInfoState,
            action: PayloadAction<string[]>
        ) => {
            const ids = action.payload;
            ids.forEach((x) => delete state.byId[x]);

            const allIds = clone(state.allIds);
            const newAllIds = pull(allIds, ...ids);

            state.allIds = newAllIds;
        },
        overrideWidgetInfoDictionary: (
            state: WidgetsInfoState,
            action: PayloadAction<WidgetInfoDictionary>
        ) => {
            const widgetDictionary = action.payload;

            state.byId = widgetDictionary;

            state.allIds = Object.keys(widgetDictionary);
        },
    },
});

export const {
    addWidgetInfoDictionaryItem,
    addBatchWidgetInfoDictionary,
    updateWidgetInfoDictionaryItem,
    removeWidgetInfoDictionaryItem,
    removeBatchWidgetInfoDictionary,
    overrideWidgetInfoDictionary,
} = widgetsInfoSlice.actions;

export default widgetsInfoSlice.reducer;
