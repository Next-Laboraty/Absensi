import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View, Pressable } from "react-native";
import moment from "moment";
import NewQuotes from "../lib/quotes";
import { AntDesign, Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from "react-redux";
import { dataKehadiranEntry } from "../features/attendance/kehadiranSlice";
import NewSocketIN from "../lib/NewSocketIN";
import GetAttendance from '../lib/GetAttendance'
import axios from "axios";
import { Button, Card, Divider, Layout, Modal } from '@ui-kitten/components';

export default function ButtonInFullTime() {
    const dispatch = useDispatch()
    const [type, setType] = useState(null)
    const { latitude, longitude } = useSelector(state => state.Loxation)
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true)
    const [berhasil, setBerhasil] = useState(true)
    const [jumlah, setJumlah] = useState(null)
    const [buttonsIN, setButtonsIN] = useState(false)
    const { employee, server, token } = useSelector(state => state.employee)
    const dataX = {
        owner: employee.employee,
        token,
        server
    }
    const panggilan = useRef(null)
    const [jam, setJam] = useState(moment().format('H'))
    useEffect(() => {
        console.log(employee)
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
    const getPresent = (xdata) => {
        clearInterval(panggilan.current)
        setBerhasil(false)
        setVisible(true)
        let payload = {
            employee: employee.employee,
            log_type: xdata,
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
            payload
        }
        axios.post('http:///103.179.57.18:21039/dateAttendance/present', data).then(res => {
            let data = (res.data)
            setBerhasil(true)
            dispatch(dataKehadiranEntry(data))
            setJumlah(data.length)
            setVisible(false)
            panggilan.current = setInterval(() => {
                GetAttendance(dataX).then(res => {
                    let data = res.data
                    setVisible(false)
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
                    <TouchableOpacity style={styles.buttonOUT} onPress={() => {
                        setType('OUT')
                        setVisible(true)
                    }} disabled={buttonsIN}>
                        <Text style={styles.textIN}>
                            Pulang
                        </Text>
                    </TouchableOpacity>
                )
            }
            else if (jumlah == 0 && jam <= 13) {
                return (
                    <TouchableOpacity style={styles.buttonIN} onPress={() => {
                        setType('IN')
                        setVisible(true)
                    }} disabled={buttonsIN}>
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
            <Modal
                visible={visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setVisible(false)}>
                <Card disabled={true} style={{marginHorizontal:30}}>
                    <Text style={{fontFamily:'Regular'}}>Kamu akan melakukan absensi {type =='OUT'? 'Pulang':'Masuk'} yakin akan memprosesnya ?</Text>
                    {berhasil?
                    <Button onPress={() => {
                        clearInterval(panggilan.current)
                        getPresent(type)
                        }
                        } style={{marginTop:20}}>
                        Absensi Sekarang
                    </Button>
                    :
                    <Button style={{marginTop:20}}><ActivityIndicator color={'#fff'}/></Button>
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