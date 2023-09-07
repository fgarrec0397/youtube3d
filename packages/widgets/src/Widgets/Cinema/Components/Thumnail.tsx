import { Html } from "@granity/three/drei";
import { FC } from "react";

import useCinema from "../_actions/hooks/useCinema";

export type ThumbnailProps = {
    videoId?: string;
};

const Thumbnail: FC<ThumbnailProps> = ({ videoId }) => {
    const { canDisplayThumbnails } = useCinema();

    if (!canDisplayThumbnails) {
        return null;
    }

    return (
        <Html
            distanceFactor={1}
            transform
            position={[-0.085, 0, 0]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[0.9, 1, 1]}
            occlude="blending"
            wrapperClass="h"
            // geometry={
            //     /** The geometry is optional, it allows you to use any shape.
            //      *  By default it would be a plane. We need round edges here ...
            //      */
            //     <planeGeometry args={[1.66, 0.47, 0.24]} />
            // }
        >
            <img src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`} />
        </Html>
    );
};

export default Thumbnail;
