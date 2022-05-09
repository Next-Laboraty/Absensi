import axios from "axios";

export default function GetRestDance(payload){
    const requ = axios.post('http:///103.179.57.18:21039/dateAttendance/GetRest',payload)
    return requ
}