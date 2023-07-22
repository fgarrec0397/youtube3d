import { uidGenerator, useForwardedRef, Vector3Array } from "@granity/helpers";
import { PerspectiveCamera } from "@granity/three";
import { useThree } from "@granity/three/fiber";
import { ForwardedRef, MutableRefObject, useEffect } from "react";

import { SceneCamera, SceneCameraRef } from "../scenesTypes";
import useCameras from "./useCameras";

/**
 * Create a new camera and add it to the CamerasContext.
 */
export default (
    cameraName: string,
    position: Vector3Array,
    ref?: MutableRefObject<PerspectiveCamera> | ForwardedRef<PerspectiveCamera>,
    isDefault?: boolean
) => {
    const camera = useThree((state) => state.camera);
    const { addCamera, removeCamera } = useCameras();
    const cameraRef = useForwardedRef(ref) as SceneCameraRef;

    useEffect(() => {
        const newCameraId = cameraRef.current?.uuid || uidGenerator();
        const newSceneCamera: SceneCamera = {
            id: newCameraId,
            name: cameraName,
            isDefault,
            cameraRef,
            position,
        };
        const newCamera = addCamera(newSceneCamera);

        return () => {
            removeCamera(newCamera?.id);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        camera,
        cameraRef,
    };
};
