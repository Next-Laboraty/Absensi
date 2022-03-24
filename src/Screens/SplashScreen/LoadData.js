import { Spinner } from "@ui-kitten/components";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { MASUKAN_TASK, MASUKAN_TODO, MASUKAN_CATATAN } from '../../features/desk/deskSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { base64 } from "@firebase/util";
import FetchData from '../../lib/FetchData'
import AxiosGetEmployee from "../../lib/AxiosGetEmployee";
import { getDatabase, ref, child, get } from "firebase/database";

const dbRef = ref(getDatabase());
export default function LoadData() {
    const dispatch = useDispatch()
    useEffect(() => {
        FirstCome()
    })
    const FirstCome = () => {
        AsyncStorage.getItem('@AccountEmail', async (error, result) => {
            if (result !== null) {
                const server = await AsyncStorage.getItem('@AccountServer')
                const dataEmployee = await AsyncStorage.getItem('@AccountEmployee')
                const token = await AsyncStorage.getItem('@AccountToken')
                const dataEmp = JSON.parse(dataEmployee)
                let url1 = `https://${base64.decodeString(server)}/api/resource/Task?fields=["*"]&filters=[["completed_by","=","${dataEmp.user_id}"]]&limit_page_length=0&order_by=modified DESC`
                let tokens = base64.decodeString(token)
                AxiosGetEmployee(url1, tokens).then(response => {
                    dispatch(MASUKAN_TASK(response.data.data))
                }).catch(err => console.log(err))
                getTodo(base64.encodeString(dataEmp.user_id))
                let url3 = `https://${base64.decodeString(server)}/api/resource/Note?fields=["*"]&order_by=modified DESC&filters=[["public","=",1]]`
                AxiosGetEmployee(url3, tokens).then(response => {
                    dispatch(MASUKAN_CATATAN(response.data.data))
                }).catch(err => console.log(err))
            }
        })
    }
    const getTodo = (employeeUser) => {
        get(child(dbRef, `ToDo/${employeeUser}`)).then((snapshot) => {
            if (snapshot.exists()) {
                dispatch(MASUKAN_TODO(Object.values(snapshot.val())))
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    return (
        <Spinner status='warning' />
    )
}