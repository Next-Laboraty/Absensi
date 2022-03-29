import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import * as Notifications from 'expo-notifications';
import { Feather, Octicons, AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux'
import { getDatabase, ref, get, child,query,orderByValue,onValue,orderByKey,orderByChild } from "firebase/database";
import { base64 } from "@firebase/util";
import { tambahNotifikasi } from '../../features/Notifikasi/NotifikasiSlice';
import { MASUKAN_TASK, MASUKAN_TODO, MASUKAN_CATATAN } from '../../features/desk/deskSlice'
const dbRef = ref(getDatabase());

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
        get(child(dbRef, `Task/${base64.encodeString(employee.user_id)}`)).then((snapshot) => {
            if (snapshot.exists()) {
                dispatch(MASUKAN_TASK(Object.values(snapshot.val())))

            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    const getBuletin = () => {
        get(child(dbRef, `Buletin`)).then((snapshot) => {
            if (snapshot.exists()) {
                dispatch(MASUKAN_CATATAN(Object.values(snapshot.val())))
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    const getTodo = () => {
        const emp = base64.encodeString(employee.user_id)
        const TodoRef = query(ref(db, 'ToDo/' + emp), orderByKey())
        onValue(TodoRef, (snapshot) => {
            const data = Object.values(snapshot.val());
            dispatch(MASUKAN_TODO(data))
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