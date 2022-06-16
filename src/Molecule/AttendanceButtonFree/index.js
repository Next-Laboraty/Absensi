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
    const [visible, setVisible] = useState(false)
    const [type, setType] = useState(null)
    const [berhasil, setBerhasil] = useState(true)
    const [loading, setLoading] = useState(true)
    const { latitude, longitude } = useSelector(state => state.Loxation)
    const [jumlah, setJumlah] = useState(null)
    const panggilan = useRef(null)
    const { employee, server, token } = useSelector(state => state.employee)
    const dataX = {
        owner: employee.employee,
        token,
        server
    }

    useEffect(() => {
        panggilan.current = setInterval(getAttendance, 1000)
    }, [])

    const getAttendance = () => {
        GetAttendance(dataX).then(res => {
            let data = res.data
            dispatch(dataKehadiranEntry(data))
            setJumlah(data.length)
            setLoading(false)
        }).catch(err => console.log(err))
    }
    const getMasuk = (xxdata) => {
        clearInterval(panggilan.current)
        setBerhasil(false)
        setVisible(true)
        let payload = {
            employee: employee.employee,
            log_type: xxdata,
            device_id: 'ONL_APP_MOBILE',
            shift: employee.default_shift,
            company: employee.company,
            time: moment().format("YYYY-MM-DD HH:mm:ss"),
            skip_auto_attendance: 0,
            longitude: longitude,
            latitude: latitude
        }
        let data = {
            token,
            server,
            payload,
            employee: employee.user_id
        }
        axios.post('https://chilly-panda-26.telebit.io/dateAttendance/present', data).then(res => {
            let data = (res.data)
            if (data.messageErr) {
                setBerhasil(true)
                Alert.alert(data.title, data.body, [
                    { text: 'OK', onPress: () => setVisible(false) },
                ]);
            }
            else {
                setBerhasil(true)
                setVisible(false)
                setJumlah(data.length)
                panggilan.current = setInterval(() => {
                    GetAttendance(dataX).then(res => {
                        let data = res.data
                        dispatch(dataKehadiranEntry(data))
                        setJumlah(data.length)
                    }).catch(err => {
                        Alert.alert('Koneksi tidak stabil', 'Periksa kembali internet anda sebelum memulai absensi, coba lagi beberapa saat lagi', [
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ]);
                    })
                }, 3000)
            }
        })
            .catch(err => console.log(err))
    }
    const ButtonIN = () => {
        if (jumlah == null || loading) {
            return (
                <TouchableOpacity style={styles.tombolLoading} disabled>
                    <ActivityIndicator size={'small'} color={'#fff'} />
                </TouchableOpacity>
            )
        }
        else {
            if (jumlah == 1) {
                return (
                    <TouchableOpacity style={styles.tombol} onPress={() => {
                        setType('OUT')
                        setVisible(true)
                    }}>
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
                    <TouchableOpacity style={styles.tombolMasuk} onPress={() => { 
                        setType('IN')
                        setVisible(true) }}>
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
            <View style={{ alignSelf: 'center', marginTop: 20 }}>
                {
                    ButtonIN()
                }

            </View>
            <Modal
                visible={visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setVisible(false)}>
                <Card disabled={true} style={{ marginHorizontal: 30 }}>
                    <Text style={{ fontFamily: 'Regular' }}>Kamu akan melakukan absensi {type == 'OUT' ? 'Pulang' : 'Masuk'} yakin akan memprosesnya ?</Text>
                    {berhasil ?
                        <Button onPress={() => {
                            clearInterval(panggilan.current)
                            getMasuk(type)
                        }
                        } style={{ marginTop: 20 }}>
                            Absensi Sekarang
                        </Button>
                        :
                        <Button style={{ marginTop: 20 }}><ActivityIndicator color={'#fff'} /></Button>
                    }
                    <Button appearance={'ghost'} status={'danger'} onPress={() => setVisible(false)}>Tidak, lain kali</Button>
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
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.67)',
    },
})