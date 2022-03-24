import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import HeaderNameAndNotif from '../../Molecule/HeaderNameAndNotif';
import BannerHeader from '../../Molecule/BannerHeader';
import HeaderOption from '../../Atomic/HeaderOptions';
import ButtonFeatures from '../../Molecule/ButtonFeatures';
import HomeScreenBody from '../../Molecule/HomeScreenBody';
import { Camera } from 'expo-camera';
import { getDatabase, ref, onValue, set,get,child} from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { MASUKAN_TASK, MASUKAN_TODO, MASUKAN_CATATAN } from '../../features/desk/deskSlice'
import RegisterForPushNotificationsAsync from '../../NotoficationsData/NotificationAll/RegisterForPushNotificationsAsync';
import * as Notifications from 'expo-notifications';
import {base64} from '@firebase/util'

export default function HomeScreen({ navigation }) {
    const dispatch = useDispatch()
    const [hasPermission, setHasPermission] = useState(null);
    const {employee} = useSelector(state => state.employee)
    const db = getDatabase();
    const dbRef = ref(getDatabase());

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
    
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
        getTodo()
        RegisterForPushNotificationsAsync().then(res => set(ref(db, 'NotificationUser/' + base64.encodeString(employee.user_id)), res)).catch(err => console.log(err))
        // const starCountRef = ref(db, `ToDo/${base64.encodeString(employee.user_id)}`);
        // onValue(starCountRef, (snapshot) => {
        //     schedulePushNotification()
        //     console.log(snapshot.val)
        //     console.log('data')
        // });


    }, []);
    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={{ flex: 1 }}>
            <StatusBar hidden={true} style="light" />
            {/* Header Name */}
            <HeaderNameAndNotif navigation={navigation} />
            <BannerHeader color="#FFE6AB" nav="Home" textlink="Kehadiran" />
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