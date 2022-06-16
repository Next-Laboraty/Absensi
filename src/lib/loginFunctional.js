import axios from "axios";

async function loginFunctional(data){
    const res = await axios.post('https://chilly-panda-26.telebit.io/login', data)
    return res
}

async function loginGetEmployee(data){
    const res = await axios.post('https://chilly-panda-26.telebit.io/login/me', data)
    return res
}

export {
    loginFunctional,
    loginGetEmployee
}