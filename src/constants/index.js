export const API_BASE_URL = 'http://localhost:8080';
export const ACCESS_TOKEN = 'accessToken';
export const IMAGE_URL = 'https://firebasestorage.googleapis.com/v0/b/image-cloud-98533.appspot.com/o/'
export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
// export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
// export const GITHUB_AUTH_URL = API_BASE_URL + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;

// BASE API
export const BASE = `${API_BASE_URL}/api/un`;

// API FOR PRODUCT
export const PRODUCT = "/product";

//API BRAND
export const BRAND = "/brand";
// OPTIONS
export const FIND_BY_ID = "/{id}";
export const FILTER = "/filter";

//CATEGORY
export const CATEGORY = "/category";
export const LOGIN = "/login";

export const STORAGE = "/storage"