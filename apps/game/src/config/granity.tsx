import { EngineConfig, WidgetModule } from "@granity/engine";

let widgetsModules: WidgetModule[] = [];

const importWidgetsModules = (requireContext: any) => {
    const modules = {};
    requireContext.keys().forEach((key: string) => ((modules as any)[key] = requireContext(key)));
    widgetsModules = Object.keys(modules).map((x) => (modules as any)[x].widget);
};

importWidgetsModules(
    require.context("../../../../packages/widgets/src/Widgets", true, /\.widget\.tsx$/)
);

export const granityConfig: EngineConfig = {
    widgetsModules,
    physicsEnabled: true,
    endpoints: {
        app: {
            get: "/server/app",
            save: "/server/app",
        },
    },
};
