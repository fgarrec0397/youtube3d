import useGameManager from "@widgets/Widgets/GameManager/_actions/hooks/useGameManager";
import { useMemo } from "react";

export default () => {
    const { pointerLockEnable } = useGameManager();

    const canDisplayThumbnails = useMemo(() => pointerLockEnable, [pointerLockEnable]);

    return { canDisplayThumbnails };
};
