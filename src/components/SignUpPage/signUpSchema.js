import * as yub from 'yup';
const  email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
export const signUpSchema = yub.object().shape({
    // email: yub
    // .string()
    // .email('')
    // .required('* Please enter your email !'),
    // full_name: yub
    // .string()
    // .required('* Please enter your full name !')

})