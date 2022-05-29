import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Alert, ActivityIndicator, Pressable } from 'react-native'
import { useSelector } from "react-redux";
import SocketIstirahat from '../../lib/SocketIstirahat'
import * as Location from 'expo-location';
import SocketSelesaiIstirahat from "../../lib/SocketSelesaiIstirahat";
import GetRestDance from '../../lib/GetRestDance'
import moment from "moment";
import { AntDesign, Feather } from '@expo/vector-icons';
import NewQuotes from "../../lib/quotes";
import { Button, Card, Layout, Modal } from '@ui-kitten/components';
import axios from "axios";

export default function RestButtonFullTime() {
    const { latitude, longitude } = useSelector(state => state.Loxation)
    const panggilan = useRef()
    const { dataKehadiran } = useSelector(state => state.kehadiran)
    const [modalVisible, setModalVisible] = useState(false);
    const [visible, setVisible] = useState(false);
    const [berhasil, setBerhasil] = useState(false)
    const { employee, server, token } = useSelector(state => state.employee)
    const [rehat, setRehat] = useState([])
    const [rehatCount, setRehatCount] = useState(0)
    const [jumlah, setJumlah] = useState(null)
    const [location, setLocation] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getRestDatax()
        if (dataKehadiran) {
            setLoading(false)
        }
    }, [])
    const getRestDatax = () => {
        panggilan.current = setInterval(() => {
            let payload = {
                server,
                token,
                employee: employee.user_id
            }
            GetRestDance(payload).then(res => {
                let data = res.data
                if (data.length == 1) {
                    setRehat(data)
                }
                setRehatCount(data.length)
            }).catch(err => console.log(err))
        }, 3000)
    }
    const dataReturn = () => {
        if (loading) {
            return (
                <TouchableOpacity style={styles.buttonAttendanceRestStart} disabled={true}>
                    <ActivityIndicator size={'large'} color={'#fff'} />
                </TouchableOpacity>
            )
        }
        else {
            if (dataKehadiran.length == 1) {
                if (rehatCount == 0) {
                    return (
                        <TouchableOpacity style={styles.buttonAttendanceRestStart} onPress={() => {

                            setBerhasil(false)
                            setVisible(true)
                            setLoading(true)
                            let dataRehat = {
                                email: employee.user_id,
                                nama: employee.employee_name,
                                server,
                                token,
                                longitude: longitude,
                                latitude: latitude
                            }
                            //     // setModalVisible(true)
                            axios.post('http:///103.179.57.18:21039/dateAttendance/CheckIn', dataRehat).then(res => {
                                setRehat(res.data)
                                setRehatCount(res.data.length)
                                setLoading(false)
                                setBerhasil(true)
                                getRestDatax()
                            })
                        }}>
                            <Text style={styles.textAttendancesRestDone}>
                                Istirahat
                            </Text>
                        </TouchableOpacity>
                    )
                }
                else if (rehatCount == 1 && !rehat[0].jam2) {
                    let text = rehat[0].tgl
                    let arr = text.split("-")
                    return (
                        <TouchableOpacity style={styles.buttonDone} onPress={() => {

                            setVisible(true)
                            setLoading(true)
                            setBerhasil(false)
                            let dataRehat = {
                                company: employee.company,
                                idIstirahat: rehat[0].name,
                                server,
                                token,
                                longitude: longitude,
                                latitude: latitude
                            }
                            // setModalVisible(true)
                            axios.post('http:///103.179.57.18:21039/dateAttendance/out', dataRehat).then(res => {
                                setRehat(res.data)
                                setRehatCount(res.data.length)
                                setLoading(false)
                                setBerhasil(true)
                                getRestDatax()
                            })
                                .catch(err => {
                                    console.log(err)
                                    setLoading(false)
                                    setBerhasil(true)
                                })
                        }}>
                            <Text style={styles.textAttendancesRestDone}>
                                Istirahat{`\n`}{moment().diff(moment(arr[2] + '-' + arr[1] + '-' + arr[0] + ' ' + rehat[0].jam), 'minutes')} Menit
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
            // else if (dataKehadiran.length == 1 && rehatCount == 1 && !rehat[0].jam2) {
            // }
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
    }
    return (
        <>
            {dataReturn()}
            <Modal visible={visible}>
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
                            <Text style={{ marginTop: 20, fontFamily: 'LightItalic', textAlign: 'center', color: "#187498" }}>{`Waktu Istirahat telah tercatat`}</Text>
                            <Button onPress={() => setVisible(false)} style={{ marginTop: 20 }} >
                                <Feather name="check" size={15} color="white" style={{ marginTop: 50 }} />
                                <Text style={{ fontFamily: 'Medium', marginRight: 20 }}>{' '}Berhasil</Text>
                            </Button>
                        </>
                    }
                </Card>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
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