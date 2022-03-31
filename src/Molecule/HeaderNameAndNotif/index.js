import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import * as Notifications from 'expo-notifications';
import { Feather, Octicons, AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux'
import { getDatabase, ref, get, child, query, orderByValue, onValue, orderByKey, orderByChild } from "firebase/database";
import { base64 } from "@firebase/util";
import { tambahNotifikasi } from '../../features/Notifikasi/NotifikasiSlice';
import { MASUKAN_TASK, MASUKAN_TODO, MASUKAN_CATATAN } from '../../features/desk/deskSlice'
import axios from 'axios';
const dbRef = ref(getDatabase());

export default function HeaderNameAndNotif(props) {
    const dispatch = useDispatch()
    const { employee, server, token } = useSelector((state) => state.employee)
    const { notif } = useSelector(state => state.Notifikasi)
    const [notificationCount, setNotificationCount] = useState(0)
    const notificationListener = useRef();
    const responseListener = useRef();
    const [notification, setNotification] = useState(false);
    const [notificationd, setNotificationd] = useState([]);
    // const starCountRef = ref(db, `ToDo/${base64.encodeString(employee.user_id)}`);
    useEffect(() => {
        // onValue(starCountRef, (snapshot) => {
        //     schedulePushNotification()
        // });
        Notifications.getBadgeCountAsync().then(res => setNotificationCount(res))
        getTodo()
        getTask()
        getBuletin()
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
            setNotificationCount(notificationCount + 1)
            notificationd.push(notification)
        });
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            dispatch(tambahNotifikasi(response))
        });
        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    })
    const getTask = () => {
        axios.get(`https://${base64.decodeString(server)}/api/resource/Task?fields=["*"]&filters=[["completed_by","=","${employee.user_id}"]]`, {
            headers: {
                'Authorization': `token ${base64.decodeString(token)}`,
                'Content-Type': 'application/json',
                'Accept-Language': 'application/json',
            }
        })
            .then((res) => {
                dispatch(MASUKAN_TASK(res.data.data))
            })
            .catch((err) => {
                Alert.alert('Terjadi Kesalahan', `Cek Koneksi internet anda, koneksi tidak stabil\n\n${err}`, [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            })
    }
    const getBuletin = () => {
        axios.get(`https://${base64.decodeString(server)}/api/resource/Note?fields=["*"]`, {
            headers: {
                'Authorization': `token ${base64.decodeString(token)}`,
                'Content-Type': 'application/json',
                'Accept-Language': 'application/json',
            }
        })
            .then((res) => {
                console.log(res.data)
                dispatch(MASUKAN_CATATAN(res.data.data))
            })
            .catch((err) => {
                Alert.alert('Terjadi Kesalahan', `Cek Koneksi internet anda, koneksi tidak stabil\n\n${err}`, [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            })
    }
    const getTodo = () => {
        axios.get(`https://${base64.decodeString(server)}/api/resource/ToDo?fields=["*"]&filters=[["owner","=","${employee.user_id}"]]`, {
            headers: {
                'Authorization': `token ${base64.decodeString(token)}`,
                'Content-Type': 'application/json',
                'Accept-Language': 'application/json',
            }
        })
            .then((res) => {
                dispatch(MASUKAN_TODO(res.data.data))
            })
            .catch((err) => {
                Alert.alert('Terjadi Kesalahan', `Cek Koneksi internet anda, koneksi tidak stabil\n\n${err}`, [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            })
    }
    async function schedulePushNotification() {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "You've got mail! 📬",
                body: 'Here is the notification body',
                data: { data: 'goes here' },
            },
            trigger: { seconds: 2 },
        });
    }
    return (
        <View style={styles.header}>
            <View style={{ flex: 1, marginLeft: 20 }}>
                <Text style={styles.textHeader1}>{employee.employee} </Text>
                <Text style={styles.textHeader2}>{employee.employee_name}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 20 }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Notification')}>

                    {notificationCount >= 1
                        ?
                        <>
                            <Ionicons name="notifications" size={24} color="red" />
                            <View style={{ width: 5, height: 5, backgroundColor: 'red', position: 'absolute', borderRadius: 120 / 2 }}></View>
                        </>
                        :
                        <Ionicons name="notifications-outline" size={24} color="#2C3333" />
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-start',
        marginTop: 23
    },
    textHeader1: {
        fontFamily: 'Medium',
        fontSize: 15,
        color: '#ADACAC'
    },
    textHeader2: {
        fontFamily: 'Medium',
        fontSize: 15,
        color: '#2C3333'
    }
})