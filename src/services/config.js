import axios from "axios";

const BASE_URL = "http://vongtayyeuthuong.shop/api/";
const TOKEN =  localStorage.getItem("tk") // token user long;

export const https =axios.create({
    baseURL: BASE_URL,
    headers:{
    Authorization: 'Bearer ' + TOKEN
    }
});

export const checkTokenValidity = async (data)=>{
    try{
        const res = await axios.post("http://vongtayyeuthuong.shop/api/un/login",data,{
            headers: {
                Authorization: {}
            }
        })
        localStorage.setItem("tk",res.data.access_token);
   
    }catch(err){
        console.log(err);
    }}

   