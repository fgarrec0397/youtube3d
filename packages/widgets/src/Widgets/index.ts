import { GameWidgetModule, UIWidgetModule } from "@granity/engine";

import type { CamerasProps } from "./Cameras";
import { GameManagerState } from "./GameManager";
import type { GeometryFormsProps } from "./GeometryForms";
import { LightProps } from "./Light";
import type { TerrainProps } from "./Terrain";
import type { WidgetStarterProps } from "./WidgetStarter";

declare module "@granity/engine" {
    /**
     * Add your Widgets reducers state here
     */

    interface State {
        features?: {
            gameManager: GameManagerState;
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
