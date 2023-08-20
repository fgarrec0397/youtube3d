import canvasConfig from "@engine/App/Core/configs/canvas";
import useEditor from "@engine/App/Editor/_actions/hooks/useEditor";
import Scenes from "@engine/App/Scenes/Scenes";
import { Effects, useContextBridge } from "@granity/three/drei";
import { Canvas, extend, Object3DNode } from "@granity/three/fiber";
import { pxToRem, useTheme } from "@granity/ui";
import { Context, FC } from "react";
import { UnrealBloomPass } from "three-stdlib";

type Props = {
    contexts: Context<any>[];
};

extend({ UnrealBloomPass });

declare module "@granity/three/fiber" {
    interface ThreeElements {
        unrealBloomPass: Object3DNode<UnrealBloomPass, typeof UnrealBloomPass>;
    }
}

const CoreCanvas: FC<Props> = ({ contexts }) => {
    const theme = useTheme();
    const { isPreview } = useEditor();
    const ContextBridge = useContextBridge(...contexts);
    const previewWarningBorderWidth = 4;

    return (
        <Canvas
            style={{
                background: theme.palette.background.gradient,
                ...(isPreview
                    ? {
                          padding: pxToRem(previewWarningBorderWidth),
                          height: `calc(100vh - ${pxToRem(previewWarningBorderWidth)})`,
                          boxShadow: `${theme.palette.warning.main} 0px 0px 0px ${pxToRem(
                              previewWarningBorderWidth
                          )} inset`,
                      }
                    : {}),
            }}
            {...canvasConfig}
        >
            <Effects disableGamma>
                <unrealBloomPass threshold={1} strength={0.4} radius={0.5} />
            </Effects>
            <ContextBridge>
                <Scenes />
            </ContextBridge>
        </Canvas>
    );
};

export default CoreCanvas;
