import { useWidgets } from "@engine/api";
import useCore from "@engine/App/Core/_actions/hooks/useCore";
import canvasConfig from "@engine/App/Core/configs/canvas";
import { Effects, useContextBridge } from "@granity/three/drei";
import { Canvas, extend, Object3DNode } from "@granity/three/fiber";
import { Skeleton, useTheme } from "@granity/ui";
import { Context, FC } from "react";
import { UnrealBloomPass } from "three-stdlib";

import GameScene from "./GameScene";

type Props = {
    contexts: Context<any>[];
};

extend({ UnrealBloomPass });

declare module "@granity/three/fiber" {
    interface ThreeElements {
        unrealBloomPass: Object3DNode<UnrealBloomPass, typeof UnrealBloomPass>;
    }
}

const GameCanvas: FC<Props> = ({ contexts }) => {
    const theme = useTheme();
    const ContextBridge = useContextBridge(...contexts);
    const { widgetsIds } = useWidgets();
    const { appStatus } = useCore();

    if (appStatus === "loading" || widgetsIds.length === 0) {
        return (
            <>
                <Skeleton
                    variant="rectangular"
                    animation="wave"
                    sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        bgcolor: "grey.900",
                        zIndex: 1,
                    }}
                />
                <Canvas
                    style={{
                        background: theme.palette.background.gradient,
                    }}
                    {...canvasConfig}
                >
                    <Effects disableGamma>
                        <unrealBloomPass threshold={1} strength={0.4} radius={0.5} />
                    </Effects>
                    <ContextBridge>
                        <GameScene />
                    </ContextBridge>
                </Canvas>
            </>
        );
    }

    return (
        <Canvas
            style={{
                background: theme.palette.background.gradient,
            }}
            {...canvasConfig}
        >
            <Effects disableGamma>
                <unrealBloomPass threshold={1} strength={0.4} radius={0.5} />
            </Effects>
            <ContextBridge>
                <GameScene />
            </ContextBridge>
        </Canvas>
    );
};

export default GameCanvas;
