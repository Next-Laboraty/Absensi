import React, { useEffect } from "react";
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { MASUKAN_TODO } from "../../features/desk/deskSlice";

export default function GetTodoFromWS() {
    const ws = new WebSocket('ws://103.179.57.18:21039/todo')
    const dispatch = useDispatch()
    const { employee, server, token } = useSelector(state => state.employee)
    useEffect(() => {
        ws.onopen = () => {
            console.log('open')
            ws.send(JSON.stringify({
                owner: employee.user_id,
                server,
                token
            }))
            ws.onmessage = (result) => {
                const data = JSON.parse(result.data)
                dispatch(MASUKAN_TODO(data))
            }
        }
    }, [])
    return null
}