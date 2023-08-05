import useGameManagerService from "../_data/hooks/useGameManagerService";

export default () => {
    const { setPointerLockEnable, pointerLockEnable } = useGameManagerService();

    const updatePointerLockEnable = (value: boolean) => {
        setPointerLockEnable(value);
    };

    return { updatePointerLockEnable, pointerLockEnable };
};
