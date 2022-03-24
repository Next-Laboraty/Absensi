import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import * as Notifications from 'expo-notifications';
import { Feather, Octicons, AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux'
import { getDatabase, ref, onValue } from "firebase/database";
import { base64 } from "@firebase/util";
import { tambahNotifikasi } from '../../features/Notifikasi/NotifikasiSlice';


export default function HeaderNameAndNotif(props) {
    const db = getDatabase();
    const dispatch = useDispatch()
    const { employee } = useSelector((state) => state.employee)
    const { notif } = useSelector(state => state.Notifikasi)
    const [notificationCount, setNotificationCount] = useState(0)
    const notificationListener = useRef();
    const responseListener = useRef();
    const [notification, setNotification] = useState(false);
    const [notificationd, setNotificationd] = useState([]);
    const starCountRef = ref(db, `ToDo/${base64.encodeString(employee.user_id)}`);
    useEffect(() => {
        console.log(notif)
        // onValue(starCountRef, (snapshot) => {
        //     schedulePushNotification()
        // });
        Notifications.getBadgeCountAsync().then(res=>setNotificationCount(res))

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
            setNotificationCount(notificationCount + 1)
            notificationd.push(notification)
            // console.log('LAH' + notification)
        });
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            dispatch(tambahNotifikasi(response))
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, [])
    const NotifTambah = () => {
        setNotificationCount(notificationCount + 1)
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