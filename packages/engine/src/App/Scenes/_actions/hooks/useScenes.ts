import { FetchStatus } from "@engine/App/Core/_actions/coreTypes";
import useInitWidgets from "@engine/App/Widgets/_actions/hooks/useInitWidgets";
import useWidgets from "@engine/App/Widgets/_actions/hooks/useWidgets";
import useWidgetsModules from "@engine/App/Widgets/_actions/hooks/useWidgetsModules";
import useWidgetsUtilities from "@engine/App/Widgets/_actions/hooks/useWidgetsUtilities";
import serializeWidgets from "@engine/App/Widgets/_actions/utilities/serializeWidgets";
import { cloneDeep, isEqual, uidGenerator, usePrevious } from "@granity/helpers";
import { useSnackbar } from "@granity/ui";
import { useCallback, useEffect, useState } from "react";

import useScenesService from "../_data/hooks/useScenesService";
import { ScenesDictionary, ScenesDictionaryItem, ScenesId } from "../scenesTypes";
import getDefaultSceneId from "../utilities/getDefaultSceneId";
import getFirstNonDefaultScene from "../utilities/getFirstNonDefaultScene";

export default () => {
    const {
        scenes,
        scenesStatus,
        scenesIds,
        currentSceneId,
        currentDefaultSceneId,
        add,
        setStatus,
        addBatch,
        reset,
        updateCurrentSceneId,
        updateCurrentDefaultSceneId,
        updateScene,
        remove,
    } = useScenesService();
    const { enqueueSnackbar } = useSnackbar();
    const { initWidgets } = useInitWidgets();
    const { unserializeWidgets } = useWidgetsUtilities();
    const { widgets, widgetsIds, widgetsInfoDictionary, resetWidgets } = useWidgets();
    const { widgetsModules } = useWidgetsModules();
    const previousScenes = usePrevious(scenes);
    const [lastSceneAdded, setLastSceneAdded] = useState<ScenesDictionaryItem>();

    const hasScenes = useCallback(() => {
        return scenesIds.length > 0;
    }, [scenesIds]);

    const setScenesStatus = useCallback(
        (status: FetchStatus) => {
            setStatus(status);
        },
        [setStatus]
    );

    const getSceneById = useCallback(
        (sceneId: string | null) => {
            if (scenes && sceneId) {
                return scenes[sceneId];
            }

            return null;
        },
        [scenes]
    );

    const getSceneByName = useCallback(
        (sceneName: string | null) => {
            if (scenes && sceneName) {
                const sceneId = Object.keys(scenes).find((x) => scenes[x].name === sceneName);

                if (sceneId) {
                    return scenes[sceneId];
                }
            }

            return null;
        },
        [scenes]
    );

    const getSceneByNameOrId = useCallback(
        (sceneIdOrName: string | null) => {
            const scene = getSceneById(sceneIdOrName);

            if (!scene) {
                return getSceneByName(sceneIdOrName);
            }

            return scene;
        },
        [getSceneById, getSceneByName]
    );

    const getCurrentScene = useCallback(() => {
        return getSceneById(currentSceneId);
    }, [currentSceneId, getSceneById]);

    const updateCurrentScene = useCallback(() => {
        const serializedWidgets = serializeWidgets(widgets);
        const currentScene = getCurrentScene();

        if (currentScene) {
            const scene: ScenesDictionaryItem = {
                ...currentScene,
                data: {
                    serializedWidgets,
                    widgetsInfoDictionary,
                    widgetsIds,
                },
            };

            updateScene(scene);
        }
    }, [getCurrentScene, updateScene, widgets, widgetsIds, widgetsInfoDictionary]);

    const displaySceneName = useCallback(
        (sceneId: string) => {
            const scene = getSceneById(sceneId);

            if (scene?.name) {
                return scene.name;
            }

            return undefined;
        },
        [getSceneById]
    );

    const loadScene = useCallback(
        (sceneNameOrId: string) => {
            const scene = getSceneByNameOrId(sceneNameOrId);

            if (scene) {
                const selectedSceneData = scene.data;
                const deserializedWidgets = unserializeWidgets(
                    selectedSceneData.serializedWidgets,
                    widgetsModules
                );

                updateCurrentScene();
                updateCurrentSceneId(sceneNameOrId);
                resetWidgets(
                    deserializedWidgets,
                    selectedSceneData.widgetsInfoDictionary,
                    selectedSceneData.widgetsIds,
                    true
                );
            }
        },
        [
            getSceneByNameOrId,
            resetWidgets,
            unserializeWidgets,
            updateCurrentScene,
            updateCurrentSceneId,
            widgetsModules,
        ]
    );

    /**
     * Verifiy if a scene has been added. If yes, load it.
     */
    useEffect(() => {
        if (
            !isEqual(scenes, previousScenes) &&
            scenes &&
            lastSceneAdded &&
            currentSceneId !== lastSceneAdded.id
        ) {
            loadScene(lastSceneAdded.id);
        }
    }, [currentSceneId, lastSceneAdded, scenes, loadScene, previousScenes]);

    const getCurrentDefaultScene = useCallback(() => {
        return getSceneById(currentDefaultSceneId);
    }, [currentDefaultSceneId, getSceneById]);

    const removeCurrentDefaultScene = useCallback(() => {
        if (currentDefaultSceneId) {
            updateScene({
                ...scenes[currentDefaultSceneId],
                isDefault: false,
            });
        }
    }, [currentDefaultSceneId, scenes, updateScene]);

    const changeDefaultScene = useCallback(
        (scene: ScenesDictionaryItem) => {
            updateScene({
                ...scene,
                isDefault: true,
            });
            removeCurrentDefaultScene();
            updateCurrentDefaultSceneId(scene.id);
        },
        [removeCurrentDefaultScene, updateCurrentDefaultSceneId, updateScene]
    );

    const addScene = useCallback(
        (name: string, isDefault: boolean) => {
            const isSceneDefault = isDefault || !currentDefaultSceneId;

            const scene: ScenesDictionaryItem = {
                id: uidGenerator(),
                name,
                isDefault: isSceneDefault,
                data: {
                    serializedWidgets: {},
                    widgetsInfoDictionary: {},
                    widgetsIds: [],
                },
            };

            if (isSceneDefault) {
                changeDefaultScene(scene);
            }

            add(scene);
            setLastSceneAdded(scene);
        },
        [add, changeDefaultScene, currentDefaultSceneId]
    );

    const addScenesBatch = useCallback(
        (scenesDictionary: ScenesDictionary) => {
            addBatch(scenesDictionary);
        },
        [addBatch]
    );

    const resetScenes = useCallback(
        (scenesDictionary: ScenesDictionary, newCurrentSceneId: string) => {
            reset(scenesDictionary, newCurrentSceneId);
        },
        [reset]
    );

    const saveScenes = useCallback(() => {
        const serializedWidgets = serializeWidgets(widgets);

        const currentScene = getCurrentScene();
        const scenesClone = cloneDeep(scenes);

        if (currentScene && scenesClone) {
            scenesClone[currentScene.id] = {
                ...scenesClone[currentScene.id],
                data: {
                    serializedWidgets,
                    widgetsInfoDictionary,
                    widgetsIds,
                },
            };

            enqueueSnackbar("Scenes successfully saved", { variant: "success" });

            return scenesClone;
        } else {
            enqueueSnackbar("Impossible to save without a scene", { variant: "error" });
        }
    }, [enqueueSnackbar, getCurrentScene, scenes, widgets, widgetsIds, widgetsInfoDictionary]);

    const removeScene = useCallback(
        (sceneId: ScenesId) => {
            const sceneToRemove = getSceneById(sceneId.id);

            if (scenes) {
                if (sceneToRemove && sceneToRemove.isDefault) {
                    const nonDefaultScene = getFirstNonDefaultScene(scenes);

                    loadScene(nonDefaultScene.id);
                    changeDefaultScene(nonDefaultScene);
                }
            }

            remove(sceneId.id);
        },
        [getSceneById, scenes, remove, loadScene, changeDefaultScene]
    );

    const initScenes = useCallback(
        (initialScenes?: ScenesDictionary) => {
            setScenesStatus("loading");

            if (initialScenes) {
                const newCurrentSceneId = getDefaultSceneId(initialScenes);
                const newCurrentScene = initialScenes[newCurrentSceneId];

                initWidgets(
                    newCurrentScene.data.serializedWidgets,
                    newCurrentScene.data.widgetsInfoDictionary,
                    newCurrentScene.data.widgetsIds
                );

                resetScenes(initialScenes, newCurrentSceneId);
                changeDefaultScene(newCurrentScene);
            } else {
                initWidgets();
            }
            setScenesStatus("success");
        },
        [setScenesStatus, initWidgets, resetScenes, changeDefaultScene]
    );

    return {
        scenes,
        scenesIds,
        scenesStatus,
        currentScene: getCurrentScene(),
        currentSceneId,
        hasScenes,

        // Actions
        addScene,
        setScenesStatus,
        addScenesBatch,
        changeDefaultScene,
        getSceneById,
        getCurrentScene,
        getCurrentDefaultScene,
        resetScenes,
        saveScenes,
        displaySceneName,
        loadScene,
        removeScene,
        initScenes,
    };
};
