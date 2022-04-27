import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native'
import { useSelector } from "react-redux";
import SocketIstirahat from '../../lib/SocketIstirahat'
import * as Location from 'expo-location';
import SocketSelesaiIstirahat from "../../lib/SocketSelesaiIstirahat";

export default function RestButtonFullTime() {
    const { dataKehadiran } = useSelector(state => state.kehadiran)
    const {employee, server, token} = useSelector(state => state.employee)
    const [rehat, setRehat] = useState([])
    const [rehatCount, setRehatCount] = useState(0)
    const [jumlah, setJumlah] = useState(null)
    const [location, setLocation] = useState(null)
    const [loading, setLoading] = useState(true)
    const ws = new WebSocket('ws://103.179.57.18:21039/Rest')
    useEffect(() => {
        ws.onopen =() => {
            ws.send(JSON.stringify({
                owner: employee.user_id,
                server,
                token
            }))
        }
        ws.onmessage = (result) => {
            let data = JSON.parse(result.data)
            setRehat(data)
            setRehatCount(data.length)
            setJumlah(dataKehadiran.length)
        }
        if (dataKehadiran) {
            setLoading(false)
        }
        getLocations()
    },[jumlah, rehat])
    const getLocations = async () => {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    }
    if (loading) {
        return (
            <TouchableOpacity style={styles.buttonIN} disabled={true}>
                <ActivityIndicator size={'large'} color={'#fff'} />
            </TouchableOpacity>
        )
    }
    else if (jumlah == 1 && rehatCount == 0) {
        
        return (
            <TouchableOpacity style={styles.buttonAttendanceRestStart} onPress={()=>{
                if(location.coords.longitude){
                    let dataRehat = {
                        email : employee.user_id,
                        nama: employee.employee_name,
                        server,
                        token,
                        longitude: location.coords.longitude,
                        latitude: location.coords.latitude
                    }
                    SocketIstirahat(dataRehat)
                }
                else{
                    alert('wait')
                }
            }}>
                <Text style={styles.textAttendancesRestDone}>
                    Istirahat
                </Text>
            </TouchableOpacity>
        )
    }
    else if (jumlah == 1 && rehatCount == 1 && !rehat[0].jam2) {
        return (
            <TouchableOpacity style={styles.buttonDone} onPress={()=>{
                if(location.coords.longitude){
                    let dataRehat = {
                        idIstirahat : rehat[0].name,
                        server,
                        token,
                        longitude: location.coords.longitude,
                        latitude: location.coords.latitude
                    }
                    SocketSelesaiIstirahat(dataRehat)
                }
                else{
                    alert('wait')
                }
            }}>
                <Text style={styles.textAttendancesRestDone}>
                    Selesai{`\n`}Istirahat
                </Text>
            </TouchableOpacity>
        )
    }
    else {
        return (
            <TouchableOpacity style={styles.buttonClose} disabled>
                <Text style={styles.textAttendancesRestDone}>
                    Tutup
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    textAttendancesRestDone: {
        fontFamily: 'Medium',
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
    },
    buttonAttendanceRestStart: {
        backgroundColor: '#E8630A',
        flex: 1,
        height: 100,
        borderRadius: 15,
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        marginHorizontal: 5,
    },
    buttonDone: {
        backgroundColor: '#F55353',
        flex: 1,
        height: 100,
        borderRadius: 15,
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        marginHorizontal: 5,
    },
    buttonClose: {
        backgroundColor: '#383838',
        flex: 1,
        height: 100,
        borderRadius: 15,
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        marginHorizontal: 5,
    },
    buttonIN: {
        flex: 1,
        backgroundColor: '#143F6B',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
})