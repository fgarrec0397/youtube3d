import { GameWidgetModule, UIWidgetModule } from "@granity/engine";

import type { CamerasProps } from "./Cameras";
import type { GeometryFormsProps } from "./GeometryForms";
import { LightProps } from "./Light";
import type { PlayerProps } from "./Player";
import type { TerrainProps } from "./Terrain";
import type { WidgetStarterProps, WidgetStarterState } from "./WidgetStarter";

// const modules = import.meta.glob("./*/*.tsx", { eager: true });

declare module "@granity/engine" {
    /**
     * Add your Widgets reducers state here
     */

    interface State {
        features?: {
            widgetStarter: WidgetStarterState;
        };
    }

    /**
     * Add your Widgets Props here as union types
     */
    interface GameWidgetProps {
        geometryProps: GeometryFormsProps;
        camerasProps: CamerasProps;
        lightProps: LightProps;
        terrainProps: TerrainProps;
        widgetStarterProps: WidgetStarterProps;
    }
}

const resolveModules = () => {
    const widgetsModules: (GameWidgetModule | UIWidgetModule)[] = [];
    // for (const path in modules) {
    //     const { widget } = modules[path] as any;
    //     widgetsModules.push(widget);
    // }

    return widgetsModules;
};

export default resolveModules();
