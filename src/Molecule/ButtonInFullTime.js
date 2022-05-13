import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View, Pressable } from "react-native";
import moment from "moment";
import NewQuotes from "../lib/quotes";
import { AntDesign,Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from "react-redux";
import { dataKehadiranEntry } from "../features/attendance/kehadiranSlice";
import NewSocketIN from "../lib/NewSocketIN";
import GetAttendance from '../lib/GetAttendance'
import axios from "axios";
import { Button, Card, Layout, Modal } from '@ui-kitten/components';

export default function ButtonInFullTime() {
    const dispatch = useDispatch()
    const [location, setLocation] = useState(null)
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true)
    const [berhasil, setBerhasil] = useState(false)
    const [jumlah, setJumlah] = useState(null)
    const [buttonsIN, setButtonsIN] = useState(false)
    const { employee, server, token } = useSelector(state => state.employee)
    const dataX = {
        owner: employee.employee,
        token,
        server
    }
    const panggilan = useRef(null)
    const ws = new WebSocket('ws://103.179.57.18:21039/Attendance')
    const [jam, setJam] = useState(moment().format('H'))
    useEffect(() => {
        getLocations()
        getAttendance()

    }, [])

    const getAttendance = () => {
        panggilan.current = setInterval(() => {
            GetAttendance(dataX).then(res => {
                let data = res.data
                dispatch(dataKehadiranEntry(data))
                setJumlah(data.length)
                setLoading(false)
            }).catch(err => console.log(err))
        }, 3000)
    }

    const getLocations = async () => {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    }
    const getPresent = (xdata) => {
        clearInterval(panggilan.current)
        setVisible(true)
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
        axios.post('http:///103.179.57.18:21039/dateAttendance/PostMasuk', data).then(res => {
            let data = (res.data)
            setBerhasil(true)
            dispatch(dataKehadiranEntry(data))
            setJumlah(data.length)
            panggilan.current = setInterval(() => {
                GetAttendance(dataX).then(res => {
                    let data = res.data
                    dispatch(dataKehadiranEntry(data))
                    setJumlah(data.length)
                    setLoading(false)
                }).catch(err => console.log(err))
            }, 3000)
        })
            .catch(err => console.log(err))
    }
    const dataReturn = () => {
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
    return (
        <>
            {dataReturn()}
            <Modal visible={visible}
                backdropStyle={styles.backdrop}>
                <Card disabled={true} style={{ marginHorizontal: 20 }}>
                    {!berhasil ?
                        <>
                            <AntDesign name="warning" size={60} color="#F73D93" style={{ alignSelf: 'center' }} />
                            <Text style={{ color: "#F73D93", paddingHorizontal: 30, textAlign: 'center', fontFamily: 'Medium' }}>Tunggu Sebentar</Text>
                            <Button style={{ marginTop: 20 }} ><ActivityIndicator color={'white'} /></Button>
                        </>
                        :
                        <>
                            <AntDesign name="warning" size={60} color="#2F8F9D" style={{ alignSelf: 'center' }} />
                            <Text style={{ marginTop:20,fontFamily: 'LightItalic', textAlign: 'center',color:"#187498" }}>{NewQuotes()}</Text>
                            <Button onPress={() => setVisible(false)} style={{ marginTop: 20 }} >
                                <Feather name="check" size={15} color="white" style={{marginTop:50}} />
                                <Text style={{fontFamily:'Medium',marginRight:20}}>{' '}Berhasil</Text>
                            </Button>
                        </>
                    }
                </Card>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    ClosedBtn: {
        fontFamily: 'Medium',
        backgroundColor: "#2196F3",
    },
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
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.67)',
    },
})