import React, { Component, useEffect, useRef, useState } from 'react'
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import AttendanceHeader from '../../Molecule/AttendanceHeader';
import ButtonBottom from '../../Atomic/ButtonBottom';
import JamComponent from '../../Atomic/JamComponent';
import AttendanceButtonFree from '../../Molecule/AttendanceButtonFree';
import AttendanceButton from '../../Molecule/AttendanceButton';
import { connect, useDispatch, useSelector } from 'react-redux'
import * as Location from 'expo-location'
import { Button, Card } from '@ui-kitten/components';
import {setLatitude, setLongitude} from '../../features/Loxation/LoxationSlice'

export default function AttendanceScreen({ navigation }) {
    const { employee } = useSelector(state => state.employee)
    const [isGPS, setIsGPS] = useState(true)
    const loc = useRef()
    const dispatch = useDispatch()
    useEffect(() => {
        Location.getForegroundPermissionsAsync().then(res => {
            let dataPermLoc = {
                res,
                name: 'Geolokasi'
            }
            if (res.status !== 'granted') {
                navigation.replace('PermissionScreen', dataPermLoc)
            }
            else{
                Location.hasServicesEnabledAsync().then(result => {
                    if(result == true){
                        getLocation()
                    }
                })
            }
        })
    })
    const getLocation = () => {
        Location.getCurrentPositionAsync().then(result => {
            setIsGPS(false)
        })
    }
    const getDataIs = () => {
        let tipe = employee.employment_type
        if (tipe == 'freelance' || tipe == 'Flexible-time') {
            return <AttendanceButtonFree />
        }
        else {
            return <AttendanceButton />
        }
    }
    return (
        <View style={{ flex: 1, marginHorizontal: 20 }}>
            {isGPS ?
            <View style={{justifyContent:'center', flex:1}}>
                <Image source={require('../../../assets/satellite.png')} style={{alignSelf:'center',marginBottom:50,width:100,height:100}} />
                <Card>
                    <Text style={{ fontSize: 18, fontFamily: 'Bold' }}>Uuuupppsss...</Text>
                    <Text style={{fontFamily:'Regular'}}>GPS kamu mati, nyalakan GPS dengan menekan tombol dibawah ini</Text>
                </Card>
                <Button style={{ margin: 20 }} onPress={() => getLocation()}>Nyalakan GPS</Button>
            </View>
            :
            <>
            <View style={{flex: 1 }}>
                    <AttendanceHeader />
                    <JamComponent />
                    <View style={{ marginTop: '20%' }}>
                        <Text style={styles.headerComp}>Absensi</Text>
                        <View style={{ height: 1, width: 164, backgroundColor: '#2C3333', alignSelf: 'center' }}>

                        </View>
                        {getDataIs()}
                    </View>

                </View>
                <View style={{height: '15%' }}>
                    <ButtonBottom icon="clock" text="Riwayat" nav={`History`} navigation={navigation}/>
                </View>
            </>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    textAttendances: {
        textAlign: 'center',
        marginTop: 35,
        fontFamily: 'Medium',
        fontSize: 18,
        color: '#fff'
    },
    buttonAttendance1: {
        flex: 1,
        backgroundColor: '#516BEB',
        height: 100,
        marginRight: 10,
        borderRadius: 15
    },
    buttonAttendance2: {
        backgroundColor: '#FF7648',
        flex: 1,
        height: 100,
        marginLeft: 10,
        borderRadius: 15
    },
    headerComp: {
        fontFamily: 'Medium',
        textAlign: 'center',
        fontSize: 15,
    },
})