import { Object3D } from "@granity/three";
import { useHelper } from "@granity/three/drei";
import { MutableRefObject } from "react";

import useEditor from "./useEditor";

type Constructor = new (...args: any[]) => any;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Rest<T> = T extends [infer _, ...infer R] ? R : never;
type Helper = Object3D & {
    update: () => void;
};

/**
 * It's `useHelper` hook from **react-three-drei** but it also manages the `isEditor` state.
 *
 * @param object3D The object you want to apply the helper on.
 * @param helperConstructor The helper you want to use.
 * @param additionnalCondition An additionnal condition you want to apply to display the helper.
 */

export default <T extends Constructor>(
    object3D: MutableRefObject<Object3D>,
    helperConstructor: T,
    ...args: Rest<ConstructorParameters<T>>
): MutableRefObject<Helper | undefined> | undefined => {
    const { isEditor, isPreview } = useEditor();

    const displayHelper = isEditor || isPreview;

    if (object3D === null) {
        return undefined;
    }

    return useHelper(displayHelper ? object3D : false, helperConstructor, ...args);
};
