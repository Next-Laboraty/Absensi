import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Feather, Octicons, AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux'


export default function HeaderNameAndNotif({ navigation }) {
    const {employee} = useSelector((state) => state.employee)
    const [notificationCount, setNotificationCount] = useState(0)
    const notificationListener = useRef();
    const responseListener = useRef();
    const [notification, setNotification] = useState(false);
    const [notificationd, setNotificationd] = useState([]);
    useEffect(() => {
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
            setNotificationCount(notificationCount + 1)
            notificationd.push(notification)
            console.log(notification)
        });
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, [useEffect])
    const NotifTambah = () => {
        setNotificationCount(notificationCount + 1)
    }
    const cekEmployee = () => {
        console.log(employee)
    } 
    return (
        <View style={styles.header}>
            <View style={{ flex: 1, marginLeft: 20 }}>
                <Text style={styles.textHeader1}>{employee.employee} </Text>
                <Text style={styles.textHeader2}>{employee.employee_name}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 20 }}>
                <TouchableOpacity onPress={() => console.log(employee)}>

                    {notificationCount >= 1
                        ?
                        <>
                            <Ionicons name="notifications" size={24} color="red" />
                            <Text style={{ fontFamily: 'Regular', position: 'absolute', fontSize: 10, left: -7, color: 'red' }}>{notificationCount}</Text>
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