import useCinemaDispatch from "./useCinemaDispatch";
import useCinemaSelector from "./useCinemaSelector";

export default () => {
    const { dispatchAdd } = useCinemaDispatch();
    const widgetStarter = useCinemaSelector();

    const add = (message: string) => {
        dispatchAdd(message);
    };

    return { add, widgetStarterMessage: widgetStarter?.widgetStarterMessage };
};
