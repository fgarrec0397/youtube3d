import useGameManagerService from "../_data/hooks/useGameManagerService";

export default () => {
    const {
        setPointerLockEnable,
        canOpenDoor,
        setCanOpenDoor,
        pointerLockEnable,
        videosLinks,
        setVideosLinks,
    } = useGameManagerService();

    const updatePointerLockEnable = (value: boolean) => {
        setPointerLockEnable(value);
    };

    const updateVideosLinks = (links: string[]) => {
        setVideosLinks(links);
    };

    const updateCanOpenDoor = (value: boolean) => {
        setCanOpenDoor(value);
    };

    const addVideoLink = (link: string) => {
        const newVideosLinks = [...(videosLinks || []), link];
        setVideosLinks(newVideosLinks);
    };

    const removeVideoLink = (link: string) => {
        const newVideosLinks = videosLinks?.filter((x) => x !== link);

        if (newVideosLinks) {
            setVideosLinks(newVideosLinks);
        }
    };

    return {
        updatePointerLockEnable,
        pointerLockEnable,
        addVideoLink,
        removeVideoLink,
        updateVideosLinks,
        videosLinks,
        updateCanOpenDoor,
        canOpenDoor,
    };
};
