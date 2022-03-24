import React, { useEffect, useState } from "react";
import { Layout, Text, Avatar, Divider, Card, Button, Spinner } from '@ui-kitten/components'
import { Alert } from 'react-native'
import AxiosGetEmployee from "../../lib/AxiosGetEmployee";
import { useDispatch, useSelector } from "react-redux";
import { base64 } from "@firebase/util";
import { AntDesign } from '@expo/vector-icons';
import { MASUKAN_TASK, MASUKAN_TODO, MASUKAN_CATATAN } from '../../features/desk/deskSlice'
import { getDatabase, ref, onValue, set,get,child} from "firebase/database";


export default function ReloadButton() {
    const dispatch = useDispatch()
    const { server, token, employee } = useSelector(state => state.employee)
    const [loading, setLoading] = useState(false)
    const dbRef = ref(getDatabase());
    useEffect(() => {

    }, [])
    const getTodo = () => {
        get(child(dbRef, `ToDo/${base64.encodeString(employee.user_id)}`)).then((snapshot) => {
            if (snapshot.exists()) {
                dispatch(MASUKAN_TODO(Object.values(snapshot.val())))
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    const reloadOpen = () => {
        setLoading(true)
        let url1 = `https://${base64.decodeString(server)}/api/resource/Task?fields=["*"]&filters=[["completed_by","=","${employee.user_id}"]]&limit_page_length=0&order_by=modified DESC`
        let tokens = base64.decodeString(token)
        AxiosGetEmployee(url1, tokens).then(response => {
            dispatch(MASUKAN_TASK(response.data.data))
        }).catch(err =>  Alert.alert('Server Timeout', `Data gagal diperbarui \n\n${err}`, [{ text: 'OK', style: 'cancel' }]))
        getTodo()
        let url3 = `https://${base64.decodeString(server)}/api/resource/Note?fields=["*"]&order_by=modified DESC&filters=[["public","=",1]]`
        AxiosGetEmployee(url3, tokens).then(response => {
            dispatch(MASUKAN_CATATAN(response.data.data))
        }).catch(err => console.log(err))
        setTimeout(() => {
            Alert.alert('Data diperbarui', 'Data berhasil diperbarui', [{ text: 'OK', style: 'cancel' }])
            setLoading(false)
        }, 3000)
    }
    if (loading) {
        return <Button size={'tiny'} status='warning' style={{ height: 40}} appearance='ghost' onPress={() => reloadOpen()}><Spinner status='warning' size={'medium'} /></Button>
    }
    return (
        <Button size={'tiny'} status='warning' style={{ height: 40,width:40,marginRight:30}} appearance='ghost' onPress={() => reloadOpen()}><AntDesign name="reload1" size={24} color="black" /></Button>
    )
}