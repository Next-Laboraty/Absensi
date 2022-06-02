import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import * as Notifications from 'expo-notifications';
import { Feather, Octicons, AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux'
import { base64 } from "@firebase/util";
import { tambahNotifikasi } from '../../features/Notifikasi/NotifikasiSlice';
import { MASUKAN_TASK, MASUKAN_TODO, MASUKAN_CATATAN } from '../../features/desk/deskSlice'
import axios from 'axios';
import GetTodoFromWS from '../GetTodoFromWS';
import GetTaskFromWS from '../GetTaskFromWS';
import GetBuletinFromWS from '../GetBuletinFromWS';

export default function HeaderNameAndNotif(props) {
    const dispatch = useDispatch()
    const { employee, server, token } = useSelector((state) => state.employee)
    const { notif } = useSelector(state => state.Notifikasi)
    const [notificationCount, setNotificationCount] = useState(0)
    const notificationListener = useRef();
    const responseListener = useRef();
    const [notification, setNotification] = useState(false);
    const [notificationd, setNotificationd] = useState([]);
    useEffect(() => {
        // onValue(starCountRef, (snapshot) => {
        //     schedulePushNotification()
        // });
        Notifications.getBadgeCountAsync().then(res => setNotificationCount(res))
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
    // 
    return (
        <View style={styles.header}>
            <GetBuletinFromWS />
            <GetTodoFromWS />
            <GetTaskFromWS />
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