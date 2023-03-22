import { https } from "../../services/config";

export const fetchInfoUer = async (dispatch) =>{
    try{
        const res = await https.get(`user/info`)
        dispatch({
            type:"GET_INFO_USER",
            payload: res.data
        })
    }catch(err){
        console.log(err);
    }
}