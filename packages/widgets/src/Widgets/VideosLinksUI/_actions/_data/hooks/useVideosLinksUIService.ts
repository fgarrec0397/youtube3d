import useWidgetStarterDispatch from "./useVideosLinksUIDispatch";
import useWidgetStarterSelector from "./useVideosLinksUISelector";

export default () => {
    const { dispatchAdd } = useWidgetStarterDispatch();
    const widgetStarter = useWidgetStarterSelector();

    const add = (message: string) => {
        dispatchAdd(message);
    };

    return { add, widgetStarterMessage: widgetStarter?.widgetStarterMessage };
};
