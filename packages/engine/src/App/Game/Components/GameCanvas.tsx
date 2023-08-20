import canvasConfig from "@engine/App/Core/configs/canvas";
import { Effects, useContextBridge } from "@granity/three/drei";
import { Canvas, extend, Object3DNode } from "@granity/three/fiber";
import { useTheme } from "@granity/ui";
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
