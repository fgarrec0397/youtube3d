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
            backgroundColor: "grey.900",
            zIndex: 999999,

            ".loader-circle": {
                position: "absolute",
                left: "50%",
                top: "50%",
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,.1)",
                marginLeft: "-60px",
                marginTop: "-60px",
                // .animation(fade 1.2s infinite ease-in-out);
            },

            ".loader-line-mask": {
                position: "absolute",
                left: "50%",
                top: "50%",
                width: "60px",
                height: "120px",
                marginLeft: "-60px",
                marginTop: "-60px",
                overflow: "hidden",
                transformOrigin: "60px 60px",
                "-webkit-mask-image": "-webkit-linear-gradient(top, rgba(0,0,0,1), rgba(0,0,0,0))",
                animation: "rotate 1.2s infinite linear",
                ".loader-line": {
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,.5)",
                },
            },
            "@keyframes rotate": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(360deg)" },
            },
            "@keyframes fade": { "0%": { opacity: 1 }, "50%": { opacity: 0.25 } },
            "@keyframes fade-in": { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        },
    },
};

const Loader: FC = () => {
    const { isGameReady } = useGame();

    if (!isGameReady) {
        return (
            <Box {...styles.wrapper}>
                <div className="loader-circle"></div>
                <div className="loader-line-mask">
                    <div className="loader-line"></div>
                </div>
            </Box>
        );
    }

    return null;
};

export const widget = createUI({
    component: Loader,
    reducer: null,
    name: "Loader",
});
