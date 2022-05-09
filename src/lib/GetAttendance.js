import axios from "axios";

export default function GetAttendance(payload){
    const requ = axios.post('http:///103.179.57.18:21039/dateAttendance/GetAttendance',payload)
    return requ
}