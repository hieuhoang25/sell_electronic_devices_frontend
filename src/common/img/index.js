import { IMAGE_URL } from "../../constants";
export function getImage(fileName){
    return `${IMAGE_URL}${fileName}?alt=media`
}