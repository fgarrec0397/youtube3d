import { Vector3Array } from "@granity/helpers";
import { Html } from "@granity/three/drei";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import YouTubePlayer from "youtube-player";

type Props = {
    videoId?: string;
    position: Vector3Array;
    canVideoPlay?: boolean;
};

const YoutubeVideoPlayer: FC<Props> = ({ videoId, position, canVideoPlay }) => {
    const videoPlayerId = `video-player-${videoId}`;
    const [videoPlayerRef, setVideoPlayerRef] = useState<HTMLDivElement | null>(null);
    const youtubePlayer = useMemo(() => {
        if (!videoId) {
            return;
        }

        if (!videoPlayerRef) {
            return;
        }

        return YouTubePlayer(videoPlayerRef, {
            videoId,
        });
    }, [videoId, videoPlayerRef]);

    const handleVideoPlayer = useCallback((element: HTMLDivElement) => {
        setVideoPlayerRef(element);
    }, []);

    const playVideo = useCallback(async () => {
        await youtubePlayer?.playVideo();
    }, [youtubePlayer]);

    const pauseVideo = useCallback(async () => {
        await youtubePlayer?.pauseVideo();
    }, [youtubePlayer]);

    useEffect(() => {
        if (!youtubePlayer) {
            return;
        }

        if (!videoPlayerRef) {
            return;
        }

        if (!videoId) {
            return;
        }

        if (canVideoPlay) {
            playVideo();
        } else {
            pauseVideo();
        }
    }, [canVideoPlay, pauseVideo, playVideo, videoId, videoPlayerRef, youtubePlayer]);

    if (!videoId) {
        return null;
    }

    return (
        <Html occlude distanceFactor={1} transform position={position} scale={[0.7, 0.7, 0.7]}>
            <div
                style={{
                    opacity: canVideoPlay ? 1 : 0,
                }}
            >
                <div ref={handleVideoPlayer} id={videoPlayerId}></div>
            </div>
        </Html>
    );
};

export default YoutubeVideoPlayer;
