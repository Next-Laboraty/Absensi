import React, { useEffect, useState } from "react";
import { Layout, Text, Avatar, Divider, Card, Button, Spinner } from '@ui-kitten/components'
import { AntDesign } from '@expo/vector-icons';
import { ActivityIndicator } from "react-native";
import { useDispatch,useSelector } from "react-redux";
import { MASUKAN_TODO } from "../../features/desk/deskSlice";


export default function ReloadButton() {
    const [loading, setLoading] = useState(false)
    const ws = new WebSocket('ws://103.179.57.18:21039/todo')
    const dispatch = useDispatch()
    const { employee, server, token } = useSelector(state => state.employee)
    useEffect(() => {
        ws.onopen = () => {
            console.log('reload')
        }
    }, [])
    const getTodo = () => {
        ws.send(JSON.stringify({
            owner: employee.user_id,
            server,
            token
        }))
        ws.onmessage = (result) => {
            const datax = JSON.parse(result.data)
            console.log(datax)
            setLoading(false)
            // dispatch(MASUKAN_TODO(datax))
        }
    }
    const reloadOpen = () => {
        setLoading(true)
        getTodo()
       
    }
    if(loading) return <ActivityIndicator size={'small'} color="black" style={{ height: 40,width:40,marginRight:30}} />
    return (
        <Button size={'tiny'} status='warning' style={{ height: 40,width:40,marginRight:30}} appearance='ghost' onPress={() => reloadOpen()}><AntDesign name="reload1" size={24} color="black" /></Button>
    )
}