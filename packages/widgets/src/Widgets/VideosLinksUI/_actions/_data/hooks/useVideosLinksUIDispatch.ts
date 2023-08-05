import { useAppDispatch } from "@granity/engine";

import { addYourWidgetAction } from "../state/videosLinksUIReducer";

export default () => {
    const dispatch = useAppDispatch();

    const dispatchAdd = (message: string) => {
        dispatch(addYourWidgetAction(message));
    };

    return {
        dispatchAdd,
    };
};
