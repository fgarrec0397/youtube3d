import { createGameWidget } from "@granity/engine";
import { Sky as SkyComponent } from "@granity/three/drei";
import { FC } from "react";

const Sky: FC = () => {
    return <SkyComponent sunPosition={[10, 5, 10]} />;
};

export const widget = createGameWidget({
    component: Sky,
    hasRef: true,
    reducer: null,
    isFrozen: true,
    name: "Sky",
});
