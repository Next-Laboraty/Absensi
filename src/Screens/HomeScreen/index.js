import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import HeaderNameAndNotif from '../../Molecule/HeaderNameAndNotif';
import BannerHeader from '../../Molecule/BannerHeader';
import HeaderOption from '../../Atomic/HeaderOptions';
import ButtonFeatures from '../../Molecule/ButtonFeatures';
import HomeScreenBody from '../../Molecule/HomeScreenBody';
import * as Location from 'expo-location'
import RegisterForPushNotificationsAsync from '../../NotoficationsData/NotificationAll/RegisterForPushNotificationsAsync';

export default function HomeScreen({ navigation }) {
    useEffect(() => {
        Location.getForegroundPermissionsAsync().then(res => {
            let dataPermLoc = {
                res,
                name: 'Geolokasi'
            }
            if(res.status == 'undetermined'){
                navigation.replace('PermissionScreen', dataPermLoc)
            }
        })
    },[])
    
    
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