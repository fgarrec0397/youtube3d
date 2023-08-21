import { createUI, useGame } from "@granity/engine";
import { Box, BoxProps } from "@granity/ui";
import { FC } from "react";

type LoaderStyles = {
    wrapper?: BoxProps;
};

const styles: LoaderStyles = {
    wrapper: {
        sx: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "red",
        },
    },
};

const Loader: FC = () => {
    const { isGameReady } = useGame();

    // if (!isGameReady) {
    //     return <Box {...styles.wrapper}>test</Box>;
    // }

    return null;
};

export const widget = createUI({
    component: Loader,
    reducer: null,
    name: "Loader",
});
