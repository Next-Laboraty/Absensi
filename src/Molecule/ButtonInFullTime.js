import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import moment from "moment";
import * as Location from 'expo-location';
import { useDispatch, useSelector } from "react-redux";
import { dataKehadiranEntry } from "../features/attendance/kehadiranSlice";
import NewSocketIN from "../lib/NewSocketIN";

export default function ButtonInFullTime() {
    const dispatch = useDispatch()
    const [location, setLocation] = useState(null)
    const [loading, setLoading] = useState(true)
    const [jumlah, setJumlah] = useState(null)
    const [buttonsIN, setButtonsIN] = useState(false)
    const { employee, server, token } = useSelector(state => state.employee)
    const dataX = {
        owner: employee.employee,
        token,
        server
    }
    const ws = new WebSocket('ws://103.179.57.18:21039/Attendance')
    const [jam, setJam] = useState(null)
    useEffect(() => {
        getLocations()
        ws.onopen = () => {
            ws.send(JSON.stringify(dataX))
        }
        ws.onmessage = (result) => {
            setLoading(false)
            let res = JSON.parse(result.data)
            dispatch(dataKehadiranEntry(res))
            setJumlah(res.length)
        }
        let isMounted = true
        const intervalId = setInterval(() => {
            ws.send(JSON.stringify(dataX))
            setJam(moment().format('H'))
        }, 1000)
        return () => {
            clearInterval(intervalId); //This is important
            isMounted = false
        }
    }, [])
    const getLocations = async () => {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    }
    const getPresent = (xdata) => {
        setButtonsIN(true)
        setLoading(true)
        setTimeout(()=>{
            let payload = {
                employee: employee.employee,
                log_type: xdata,
                device_id: 'ONL_APP_MOBILE',
                time: moment().format("YYYY-MM-DD HH:mm:ss"),
                skip_auto_attendance: 0,
                longitude: location.coords.longitude,
                latitude: location.coords.latitude
            }
            let data = {
                token,
                server,
                payload
            }
            NewSocketIN(data)
            ws.send(JSON.stringify(dataX))
            setTimeout(()=>{
                setLoading(false)
                setButtonsIN(false)
            },1000)
        },1000)
    }
    if (jumlah == null || loading) {
        return (
            <TouchableOpacity style={styles.buttonClose} disabled>
                <Text style={styles.textIN}>
                    Tunggu
                </Text>
            </TouchableOpacity>
        )
    }
    else {
        if (jumlah == 1 && jam >= 14) {
            return (
                <TouchableOpacity style={styles.buttonOUT} onPress={() => getPresent('OUT')} disabled={buttonsIN}>
                    <Text style={styles.textIN}>
                        Pulang
                    </Text>
                </TouchableOpacity>
            )
        }
        else if (jumlah == 0 && jam <= 13) {
            return (
                <TouchableOpacity style={styles.buttonIN} onPress={() => getPresent('IN')} disabled={buttonsIN}>
                    <Text style={styles.textIN}>
                        Masuk
                    </Text>
                </TouchableOpacity>
            )
        }
        else {
            return (
                <TouchableOpacity style={styles.buttonClose} disabled>
                    <Text style={styles.textIN}>
                        Tutup
                    </Text>
                </TouchableOpacity>
            )
        }
    }
}

const styles = StyleSheet.create({
    buttonIN: {
        flex: 1,
        backgroundColor: '#143F6B',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    buttonOUT: {
        flex: 1,
        backgroundColor: '#F55353',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    buttonClose: {
        flex: 1,
        backgroundColor: '#383838',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    textIN: {
        fontFamily: 'Medium',
        fontSize: 16,
        color: '#fff'
    }
})