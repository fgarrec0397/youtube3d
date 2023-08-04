import { createGameWidget, GameEditableWidget, GameOptionsFieldTypes } from "@granity/engine";
import { BakeShadows, Effects } from "@granity/three/drei";
import { extend, Object3DNode, RectAreaLightProps } from "@granity/three/fiber";
import { FC } from "react";
import { GLTF, RectAreaLightHelper, UnrealBloomPass } from "three-stdlib";

import CinemaChunk from "./Components/CinemaChunk";

// extend({ UnrealBloomPass });

// declare module "@granity/three/fiber" {
//     interface ThreeElements {
//         unrealBloomPass: Object3DNode<UnrealBloomPass, typeof UnrealBloomPass>;
//     }
// }

export type CinemaProps = GameEditableWidget & {
    model3D: string;
};

const Cinema: FC<CinemaProps> = ({ model3D }) => {
    const myTestArray = [
        "https://www.youtube.com/watch?v=fuhE6PYnRMc&t=8s&ab_channel=MrBeast",
        "https://www.youtube.com/watch?v=48h57PspBec&t=2s&ab_channel=MrBeast",
        "https://www.youtube.com/watch?v=1WEAJ-DFkHE&ab_channel=MrBeast",
        "https://www.youtube.com/watch?v=UE5AHE2Ypr8&ab_channel=MrBeast",
        "https://www.youtube.com/watch?v=DuQbOQwVaNE&ab_channel=MrBeast",
    ];

    return (
        <>
            {/* <Effects disableGamma>
                <unrealBloomPass threshold={1} strength={1.0} radius={0.5} />
            </Effects> */}
            {/* <fog attach="fog" color="#ffffff" near={1} far={2} /> */}
            {/* <BakeShadows /> */}
            {myTestArray.map((x, index) => (
                <CinemaChunk key={x} videoUrl={x} index={index} cinemaModel3D={model3D} />
            ))}
        </>
    );
};

export const widget = createGameWidget({
    component: Cinema,
    reducer: null,
    name: "Cinema",
    options: [
        {
            name: "model3D",
            displayName: "3D Model",
            fieldType: GameOptionsFieldTypes.File,
            defaultValue: "",
        },
    ],
});
