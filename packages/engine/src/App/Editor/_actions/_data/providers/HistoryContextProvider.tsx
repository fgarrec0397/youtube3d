import { HasChildren } from "@granity/helpers";
import { createContext, Dispatch, FC, SetStateAction, useState } from "react";

import { HistoryDictionary, HistoryItem } from "../../editorTypes";

export interface HistoryContextModel {
    historyDictionary: HistoryDictionary;
    setHistoryDictionary: (() => void) | Dispatch<SetStateAction<HistoryDictionary>>;
    currentHistoryItem?: HistoryItem;
    setCurrentHistoryItem: (() => void) | Dispatch<SetStateAction<HistoryItem | undefined>>;
    previousHistoryItem?: HistoryItem;
    setPreviousHistoryItem: (() => void) | Dispatch<SetStateAction<HistoryItem | undefined>>;
    shouldAddHistoryState?: boolean;
    setShouldAddHistoryState: (() => void) | Dispatch<SetStateAction<boolean>>;
}

export const defaultContext: HistoryContextModel = {
    historyDictionary: {},
    setHistoryDictionary: () => {},
    currentHistoryItem: undefined,
    setCurrentHistoryItem: () => {},
    previousHistoryItem: undefined,
    setPreviousHistoryItem: () => {},
    shouldAddHistoryState: true,
    setShouldAddHistoryState: () => {},
};

export const HistoryDictionaryContext = createContext<HistoryContextModel>(defaultContext);

type Props = HasChildren;

const HistoryDictionaryContextProvider: FC<Props> = ({ children }) => {
    const [historyDictionary, setHistoryDictionary] = useState<HistoryDictionary>({});
    const [currentHistoryItem, setCurrentHistoryItem] = useState<HistoryItem>();
    const [previousHistoryItem, setPreviousHistoryItem] = useState<HistoryItem>();
    const [shouldAddHistoryState, setShouldAddHistoryState] = useState(true);

    const providerValue: HistoryContextModel = {
        historyDictionary,
        setHistoryDictionary,
        currentHistoryItem,
        setCurrentHistoryItem,
        previousHistoryItem,
        setPreviousHistoryItem,
        shouldAddHistoryState,
        setShouldAddHistoryState,
    };

    return (
        <HistoryDictionaryContext.Provider value={providerValue}>
            {children}
        </HistoryDictionaryContext.Provider>
    );
};

export default HistoryDictionaryContextProvider;
