export function getImage(fileName) {
    return `${process.env.REACT_APP_BASE_URL_FIREBASE}${fileName}?alt=media`;
}
