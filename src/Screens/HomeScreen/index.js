import React, { useEffect, useRef, useState } from 'react'
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import HeaderNameAndNotif from '../../Molecule/HeaderNameAndNotif';
import BannerHeader from '../../Molecule/BannerHeader';
import HeaderOption from '../../Atomic/HeaderOptions';
import ButtonFeatures from '../../Molecule/ButtonFeatures';
import HomeScreenBody from '../../Molecule/HomeScreenBody';
import { Camera } from 'expo-camera';
import { useDispatch, useSelector } from "react-redux";
import RegisterForPushNotificationsAsync from '../../NotoficationsData/NotificationAll/RegisterForPushNotificationsAsync';
import { base64 } from '@firebase/util'
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import axios from 'axios'

export default function HomeScreen({ navigation }) {
    const { employee, server } = useSelector(state => state.employee)
    const dispatch = useDispatch()
    const [hasPermission, setHasPermission] = useState(null);
    const panggilan = useRef(null)


    useEffect(() => {
        requestPermissions()
        console.log(hasPermission)
        check()
    }, []);
    const check = () => {
        if (hasPermission === false) {
            ubahScreen()
        }
    }
    const requestPermissions = async () => {
        RegisterForPushNotificationsAsync().then(res => {
            let data = {
                name: employee.user_id,
                token: res.toString(),
                server
            }
            axios.post(`http://103.179.57.18:21039/notif/InsertData`, data)
            .then(res => null)
            .catch(err => 
                axios.post('http:///103.179.57.18:21039/notif/Update', data)
                .then(res => null)
                .catch(err => console.log('error Bos', err))
            )
        
        })
        await Location.requestBackgroundPermissionsAsync();
        await Location.requestForegroundPermissionsAsync()
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
        await Notifications.getPermissionsAsync();
    };
    const ubahScreen = () => {
        navigation.push('PermissionScreen')
    }
    return (
        <View style={{ flex: 1 }}>
            <StatusBar hidden={true} style="light" />
            {/* Header Name */}
            <HeaderNameAndNotif navigation={navigation} />
            <BannerHeader color="#FFE6AB" nav="Attendance" textlink="Kehadiran" navigation={navigation} />
            {/* Banner */}
            <HeaderOption Textrt="Alat Kantor" />
            {/* Alat Kantor */}
            <ButtonFeatures navigation={navigation} />
            {/* Kehadiran */}
            <View style={{ marginTop: 30 }}>

                <HeaderOption Textrt="Kehadiran Karyawan" />
                <View style={{ marginHorizontal: 20 }}>
                    {/* Kehadiran Online */}
                    <HomeScreenBody navigation={navigation} link={'Attendance'} title={`Menu Absensi`} icon="calendar-outline" />
                    <HomeScreenBody navigation={navigation} link={'Client'} title={`Visiting Klien`} icon="md-camera-outline" />
                    {/* End Kehadiran Online */}
                    {/* Kehadiran Client Visiting */}
                </View>
                {/* End */}
            </View>
            {/* End */}
        </View>
    )
}

const styles = StyleSheet.create({
    TextSub: {
        fontFamily: 'Regular',
        fontSize: 12,
        color: '#2C3333'
    },
    TextDub: {
        fontFamily: 'Regular',
        fontSize: 12,
        color: '#C4C4C4'
    },
    Kehadiran2: {
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#516BEB",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    Kehadiran: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#516BEB",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
})