const extractVideoIdFromUrl = (url: string): string | undefined => {
    const pattern = /v=([^&]+)/;

    if (!url) {
        return undefined;
    }

    const match = url.match(pattern);

    if (match && match.length >= 2) {
        return match[1];
    }

    return undefined;
};

export default extractVideoIdFromUrl;
