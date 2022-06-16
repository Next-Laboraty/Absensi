import { Spinner } from "@ui-kitten/components";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { MASUKAN_TASK, MASUKAN_TODO, MASUKAN_CATATAN } from '../../features/desk/deskSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegisterForPushNotificationsAsync from "../../NotoficationsData/NotificationAll/RegisterForPushNotificationsAsync";
import AxiosPostData from "../../lib/AxiosPostData";

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
                RegisterForPushNotificationsAsync().then(tokenNotif => {
                    AxiosPostData(`https://chilly-panda-26.telebit.io/notif/Insert`,token,{
                        name:dataEmp.user_id,
                        server:server,
                        token:tokenNotif
                    })
                }).catch(err => console.log(err))
            }
        })
    }
    return (
        <>
        <Spinner status='warning' />
        </>
    )
}