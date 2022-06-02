import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MASUKAN_CATATAN } from "../../features/desk/deskSlice";

export default function GetBuletinFromWS(){
    const {employee, server , token } = useSelector(state => state.employee)
    const ws = new WebSocket('ws://103.179.57.18:21039/buletin')
    const dispatch = useDispatch()
    useEffect(()=>{
        ws.onopen = () => {
            ws.send(JSON.stringify({
                server,
                token
            }))
        }
        ws.onmessage = (result) => {
            let data = JSON.parse(result.data)
            dispatch(MASUKAN_CATATAN(data))
        }
    })
    return null
}