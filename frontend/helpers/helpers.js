import CONST from "../constants/constants";

/**
 * Extract image url from images array
 */
function getImageUri(images){
    let image = images?.slice(-1)[0] //last image object
    let imageUri = CONST.API_BASE_URL+'files/image/'+image?.filename;
    return imageUri
}

const helpers = {
    getImageUri,
};
export default helpers;