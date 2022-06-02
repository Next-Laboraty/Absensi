import axios from "axios";

export default function GetRestDance(payload){
    const requ = axios.post('https://chilly-panda-26.telebit.io/dateAttendance/GetRest',payload)
    return requ
}