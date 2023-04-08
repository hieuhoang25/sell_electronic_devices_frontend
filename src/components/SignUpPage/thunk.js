import axios from "axios";
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
//--------------------SIGN UP------------
export const signUp = async (value,navigate) => {
    try{
        await axios.post(process.env.REACT_APP_URL + 'un/register',value)
        Toast.fire({
            icon: 'success',
            title: `
            successful registration !`
        })
        navigate('/login')
    }catch(err){
        console.log(err);
        Toast.fire({
            icon: 'error',
            title: `registration failed !`
        })  
    }
}