import axios from "axios";

export default function GetAttendance(payload){
    const requ = axios.post('https://chilly-panda-26.telebit.io/dateAttendance/GetAttendance',payload)
    return requ
}