export const getImageUrl = (name: string) => {
    const url = new URL(`../assets/toys/${name}.jpg`, import.meta.url);
    return url.href
};
