import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native'
import { useDispatch } from "react-redux";
import ButtonInFullTime from "../ButtonInFullTime";
import RestButtonFullTime from "../RestButtonFullTime";
import { setLatitude, setLongitude } from "../../features/Loxation/LoxationSlice";
import * as Location from 'expo-location'

export default function AttendanceButton() {
    const dispatch = useDispatch()
    useEffect(() => {
        let _moun = false
        const time = setInterval(() => {
            Location.getCurrentPositionAsync().then(result => {
                dispatch(setLatitude(result.coords.latitude))
                dispatch(setLongitude(result.coords.longitude))
            })
        }, 1000)
        return () => {
            _moun = true
            clearInterval(time)
        }
    }, [])
    return (
        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 20, marginBottom: 80 }}>
            <ButtonInFullTime />
            <RestButtonFullTime />
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
    textAttendancesRestDone: {
        fontFamily: 'Regular',
        color: '#fff',
        textAlign: 'center',
    },
    buttonAttendanceRestDone: {
        backgroundColor: '#FF7648',
        flex: 1,
        height: 100,
        borderRadius: 15,
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        marginHorizontal: 5,
    },
    buttonAttendance3: {
        backgroundColor: '#828282',
        flex: 1,
        height: 100,
        marginRight: 10,
        borderRadius: 15,
        marginHorizontal: 5,
    },
    buttonAttendance1: {
        backgroundColor: '#516BEB',
        flex: 1,
        height: 100,
        marginRight: 10,
        borderRadius: 15,
        marginHorizontal: 5,
    },
    buttonAttendance2: {
        backgroundColor: '#FF7648',
        flex: 1,
        height: 100,
        marginLeft: 10,
        borderRadius: 15,
        marginHorizontal: 5,
    },
    headerComp: {
        fontFamily: 'Medium',
        textAlign: 'center',
        fontSize: 15,
    },
})