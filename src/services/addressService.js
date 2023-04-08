import axios from "./axios"

export const PROVINCE_URL = "https://provinces.open-api.vn/api/p/";
export const PROVINCE_SEARCH_URL = "https://provinces.open-api.vn/api/p/search/?q=";


const getProvince = async () => {
  const response = await axios({
       method: 'get',
       url: PROVINCE_URL,
     })
    
     return  response.data;
      
}

const getSearchProvince = async (input) => {
   const response = await axios({
       method: 'get',
       url: PROVINCE_SEARCH_URL + input + "*",
       //  responseType: 'stream'
     })
     return response.data;
}
export {getProvince, getSearchProvince };