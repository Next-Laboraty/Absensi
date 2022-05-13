import React, { useEffect, useRef, useState } from "react";
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Pressable } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import * as Location from 'expo-location';
import NewSocketIN from "../../lib/NewSocketIN";
import { dataKehadiranEntry } from "../../features/attendance/kehadiranSlice";
import axios from "axios";
import NewQuotes from '../../lib/quotes'
import GetAttendance from "../../lib/GetAttendance";
import { Button, Card, Layout, Modal } from '@ui-kitten/components';

export default function AttendanceButtonFree() {
    const dispatch = useDispatch()
    const [dataTunggu, setDataTunggu] = useState(false)
    const [visible, setVisible] = useState(false);
    const [berhasil, setBerhasil] = useState(false)
    const { employee, server, token } = useSelector(state => state.employee)
    const [loading, setLoading] = useState(true)
    const [jumlah, setJumlah] = useState(null)
    const [location, setLocation] = useState({
        coords: {
            longitude: null,
            latitude: null
        }
    })
    const panggilan = useRef(null)
    const dataX = {
        today: moment().format(),
        owner: employee.employee,
        token,
        server
    }
    useEffect(() => {
        getData()
        getLocations()
    }, [])
    const getData = () => {
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
    const getMasuk = (xdata) => {
        clearInterval(panggilan.current)
        setLoading(true)
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
        if (location.coords.latitude == null) {
            alert('Error lokasi tidak dapat dibaca')
        }
        else {
            setVisible(true)
            console.log(data)
            axios.post('http://103.179.57.18:21039/Absensi', data).then(res => {
                let data = res.data
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
            }).catch(err => console.log(err))
            // ws.send(JSON.stringify(dataX))
            setLoading(false)
        }
    }

    const ButtonIN = () => {
        if (loading && location.coords !== null) {
            return (
                <TouchableOpacity style={styles.tombolLoading} disabled>
                    <ActivityIndicator size={'small'} color={'#fff'} />
                </TouchableOpacity>
            )
        }
        else {
            if (jumlah == 1) {
                return (
                    <TouchableOpacity style={styles.tombol} onPress={() => getMasuk('OUT')}>
                        <Text style={styles.textPulang}>
                            Pulang
                        </Text>
                    </TouchableOpacity>
                )
            }
            else if (jumlah == 2) {
                return (
                    <TouchableOpacity style={styles.tombolTutup} disabled>
                        <Text style={styles.textPulang}>
                            Tutup
                        </Text>
                    </TouchableOpacity>
                )
            }
            else {
                return (
                    <TouchableOpacity style={styles.tombolMasuk} onPress={() => { getMasuk('IN') }}>
                        <Text style={styles.textPulang}>
                            Masuk
                        </Text>
                    </TouchableOpacity>
                )
            }
        }
    }
    return (
        <>
            <View style={{ alignSelf: 'center' }}>
                {
                    ButtonIN()
                }

            </View>
            <Modal visible={visible}>
                <Card disabled={true}>
                    <Text style={{ fontFamily: 'Bold', textAlign: 'center' }}>Data sedang di Cek</Text>
                    <Text style={{ fontFamily: 'ThinItalic', textAlign: 'center' }}>{NewQuotes()}</Text>
                    <Text style={{ fontFamily: 'Regular', textAlign: 'center' }}>Status absensi <Text style={{ fontFamily: 'Medium', color: 'red' }}>{berhasil === false ? 'Check' : 'Berhasil'}</Text></Text>
                    {berhasil === true ? <Button style={{ marginTop: '50%' }} onPress={() => setVisible(false)}>
                        Okey
                    </Button>
                        :
                        null}
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
    buttonClose: {
        fontFamily: 'Medium',
        backgroundColor: "#2196F3",
    },
    buttonClose2: {
        fontFamily: 'Medium',
        backgroundColor: "#000",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        fontFamily: 'Regular',
        textAlign: "center"
    },
    textPulang: {
        fontFamily: 'Medium',
        color: '#F7F5F2'
    },
    textMasuk: {
        fontFamily: 'Medium',
        color: '#F7F5F2'
    },
    tombolTutup: {
        backgroundColor: '#383838',
        justifyContent: 'center',
        alignContent: 'center',
        width: 100,
        alignItems: 'center',
        borderRadius: 120 / 2,
        height: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    tombol: {
        backgroundColor: '#F24A72',
        justifyContent: 'center',
        alignContent: 'center',
        width: 100,
        alignItems: 'center',
        borderRadius: 120 / 2,
        height: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    tombolMasuk: {
        backgroundColor: '#61A4BC',
        justifyContent: 'center',
        alignContent: 'center',
        width: 100,
        alignItems: 'center',
        borderRadius: 120 / 2,
        height: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    tombolLoading: {
        backgroundColor: '#FDAF75',
        justifyContent: 'center',
        alignContent: 'center',
        width: 100,
        alignItems: 'center',
        borderRadius: 120 / 2,
        height: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})