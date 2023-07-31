const extractVideoIdFromUrl = (url: string): string | undefined => {
    const pattern = /v=([^&]+)/;

    const match = url.match(pattern);

    if (match && match.length >= 2) {
        return match[1];
    }

    return;
};

export default extractVideoIdFromUrl;
