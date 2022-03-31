import React, { useEffect, useState } from "react";
import axios from "axios";
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native'
import { useSelector } from "react-redux";
import { base64 } from '@firebase/util';
import { Spinner } from "@ui-kitten/components";
import moment from "moment";
import * as Location from 'expo-location';
import NewQuotes from "../../lib/quotes";
import * as Notifications from 'expo-notifications';



Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });


export default function AttendanceButton() {
    const { employee, server, token } = useSelector(state => state.employee)
    const [location, setLocation] = useState(null);
    const [isie, setIsie] = useState([])
    const [LoadingIN, setLoadingIN] = useState(true)
    const [LoadingRest, setLoadingRest] = useState(true)
    const [timeNow, setTimeNow] = useState()
    const [statusButtonLeft, setStatusButtonLeft] = useState('Tutup')
    const [statusButtonRight, setStatusButtoRight] = useState('Tutup')
    const [Msg, setMsg] = useState('')
    const [headexr, setHeadexr] = useState()
    const [timeRest, setTimeRest] = useState()

    useEffect(() => {
        getDbIN()
        getLocations()
        let isMounted = true
        const intervalId = setInterval(() => {
            setTimeNow(moment().format())
            const Hour = moment().format('H')
            if (Hour <= 13) {
                setStatusButtonLeft('Masuk')
            }
            if (Hour <= 13 && isie.length == 1) {
                setStatusButtonLeft('Bekerja')
                logicRest()
            }
            if (Hour >= 14 && isie.length == 1) {
                setStatusButtonLeft('Pulang')
                logicRest()
            }
        }, 1000)
        return () => {
            clearInterval(intervalId); //This is important
            isMounted = false
        }
    }, [timeNow])
    const logicRest = async () => {
        let url = `https://${base64.decodeString(server)}/api/resource/Lunch?field=["*"]&filters=[[%22add%22,%22=%22,%22${employee.user_id}%22],["tgl","=","${moment().format('DD-MM-YYYY')}"]]`
        axios.get(url, {
            headers: {
                'Authorization': `token ${base64.decodeString(token)}`,
                'Content-Type': 'application/json'
            },
            timeout: 3000
        })
            .then(res => {
                let dta = res.data.data
                if (dta.length == 0) {
                    setLoadingRest(false)
                    setStatusButtoRight('Buka')
                }
                if (dta.length == 1) {
                    setHeadexr(dta[0].name)
                    axios.get(`https://${base64.decodeString(server)}/api/resource/Lunch/${dta[0].name}?field=["*"]`, {
                        headers: {
                            'Authorization': `token ${base64.decodeString(token)}`,
                            'Content-Type': 'application/json'
                        },
                        timeout: 3000
                    }).then(res => {
                        const jamIstr = (res.data.data)
                        if (!jamIstr.jam2) {
                            setTimeRest(jamIstr.jam)
                            setLoadingRest(false)
                            setStatusButtoRight('Selesai')
                        }
                        else {
                            setLoadingRest(false)
                            setStatusButtoRight('Tutup')
                        }
                    }).catch(err => {
                        setLoadingRest(false)
                        setStatusButtoRight('Tutup')
                        AlertFunction('Gagal Mengambil Data', `Periksa Koneksi Internet anda, memerlukan internet yang stabil untuk mengakses layanan ini\n\nDetail Error\n${err}`)
                    })
                }
            })
            .catch(err => {
                setLoadingRest(false)
                setStatusButtoRight('Tutup')
                AlertFunction('Gagal Mengambil Data', `Periksa Koneksi Internet anda, memerlukan internet yang stabil untuk mengakses layanan ini\n\nDetail Error\n${err}`)
            })
    }
    const AlertFunction = (title, body) => {
        Alert.alert(title, body, [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
    }
    const getLocations = async () => {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    }
    const getDbIN = async () => {
        const url = `https://${base64.decodeString(server)}/api/resource/Employee%20Checkin/?fields=["*"]&filters=[["employee","=","${employee.employee}"],["time",">","${moment().format("YYYY-MM-DD")} 00:00:01.569260"],["time","<","${moment().format("YYYY-MM-DD")} 23:59:59.569260"]]`
        axios.get(url, {
            headers: {
                'Authorization': `token ${base64.decodeString(token)}`,
                'Content-Type': 'application/json'
            },
            timeout: 30000
        }).then(res => {
            setIsie(res.data.data)
            setTimeout(() => {
                setLoadingIN(false)
            }, 1000)
        })
            .catch(err => {
                setLoadingIN(false)
                alert(err)
            })
    }
    const pressOut = async () => {
        setLoadingIN(true)
        let payload = {
            employee: employee.employee,
            log_type: 'OUT',
            device_id: 'ONL_APP_MOBILE',
            time: moment().format("YYYY-MM-DD HH:mm:ss"),
            skip_auto_attendance: 0,
            longitude: location.coords.longitude,
            latitude: location.coords.latitude
        }
        await axios.post(`https://${base64.decodeString(server)}/api/resource/Employee%20Checkin`, payload, {
            headers: {
                'Authorization': `token ${base64.decodeString(token)}`,
                'Content-Type': 'application/json'
            },
        }).then(res => {
            AlertFunction('Berhasil Absensi Pulang', `Halo ${employee.employee_name} ! Kamu berhasil Absensi Pulang\n\n${NewQuotes()}`)
            setTimeout(() => {
                setLoadingIN(false)
                setStatusButtonLeft('Tutup')
            }, 3000)
        }
        ).catch(err => {
            setLoadingIN(false)
            AlertFunction('Gagal Mengambil Data', `Periksa Koneksi Internet anda, memerlukan internet yang stabil untuk mengakses layanan ini\n\nDetail Error\n${err}`)
        })
    }
    const selesaiIstirahat = async () => {
        setLoadingRest(true)
        console.log(headexr)
        const dates1 = moment().format("YYYY-MM-DD")
        const date1 = moment(`${dates1} ${timeRest}`, "YYYY-MM-DD HH:mm:ss")
        const date2 = moment(moment().format("YYYY-MM-DD HH:mm:ss"))
        const date3 = date2.diff(date1, "minutes")
        let payload
        if (date3 <= 45) {
            payload = {
                long2: location.coords.longitude,
                lat2: location.coords.latitude,
                jam2: moment().format("HH:mm:ss"),
                ket: `Istirahat ${date3} Menit`
            }
        }
        else {
            payload = {
                long2: location.coords.longitude,
                lat2: location.coords.latitude,
                jam2: moment().format("HH:mm:ss"),
                ket: `Telat ${date3 - 45} Menit`
            }

        }
        await axios.put(`https://${base64.decodeString(server)}/api/resource/Lunch/${headexr}`, payload, {
            headers: {
                'Authorization': `token ${base64.decodeString(token)}`,
                'Content-Type': 'application/json'
            },
        }).then(res => {
            setLoadingRest(false)
            setStatusButtonLeft('Tutup')
            AlertFunction('Berhasil Menyelesaikan Istirahat', `Halo ${employee.employee_name} ! Sedikit Kata Mutiara hari ini\n\n${NewQuotes()}`)
            Notifications.cancelAllScheduledNotificationsAsync()
        }
        ).catch(err => {
            setLoadingRest(false)
            AlertFunction('Gagal Mengambil Data', `Periksa Koneksi Internet anda, memerlukan internet yang stabil untuk mengakses layanan ini\n\nDetail Error\n${err}`)
        })
    }
    const pressRestIN = async () => {
        setLoadingRest(true)
        let payload = {
            tgl: moment().format("DD-MM-YYYY"),
            jam: moment().format("HH:mm:ss"),
            long: location.coords.longitude,
            lat: location.coords.latitude,
            nm: employee.employee_name,
            add: employee.user_id,
            ket: 'Sedang Istirahat'
        }
        console.log(payload, base64.decodeString(server))
        await axios.post(`https://${base64.decodeString(server)}/api/resource/Lunch`, payload, {
            headers: {
                'Authorization': `token ${base64.decodeString(token)}`,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                setLoadingRest(false)
                AlertFunction('Berhasil Absensi Masuk', `Halo ${employee.employee_name} ! Kamu berhasil Absensi Masuk\n\n${NewQuotes()}`)
                setStatusButtoRight('Selesai')
                scheduleTime()

            })
            .catch(err => {
                setLoadingRest(false),
                    AlertFunction('Gagal Absensi Istirahat', `Periksa Koneksi Internet anda, memerlukan internet yang stabil untuk mengakses layanan ini\n\nDetail Error\n${err}`)
            })
    }
    const scheduleTime = async () => {
        await Notifications.scheduleNotificationAsync({
            content:{
                title: `${employee.employee_name} Waktu istirahat sudah 40 Menit`,
                body: 'Pengingat Istirahat agar pekerjaanmu lebih mudah',
            },
            trigger:{
                seconds: 2400
            }
        })
        await Notifications.scheduleNotificationAsync({
            content:{
                title: `${employee.employee_name} Waktu istirahat sudah 45 Menit`,
                body: 'Pengingat Istirahat agar pekerjaanmu lebih mudah',
            },
            trigger:{
                seconds: 2700
            }
        })
        await Notifications.scheduleNotificationAsync({
            content:{
                title: `${employee.employee_name} Waktu istirahat sudah 55 Menit`,
                body: 'Pengingat Istirahat agar pekerjaanmu lebih mudah',
            },
            trigger:{
                seconds: 3300
            }
        })
    } 
    const pressIN = async () => {
        setLoadingIN(true)
        let payload = {
            employee: employee.employee,
            log_type: 'IN',
            device_id: 'ONL_APP_MOBILE',
            time: moment().format("YYYY-MM-DD HH:mm:ss"),
            skip_auto_attendance: 0,
            longitude: location.coords.longitude,
            latitude: location.coords.latitude
        }
        await axios.post(`https://${base64.decodeString(server)}/api/resource/Employee%20Checkin`, payload, {
            headers: {
                'Authorization': `token ${base64.decodeString(token)}`,
                'Content-Type': 'application/json'
            },
            timeout:30000
        }).then(res => {
            AlertFunction('Berhasil Absensi Masuk', `Halo ${employee.employee_name} ! Kamu berhasil Absensi Masuk\n\n${NewQuotes()}`)
            setTimeout(() => {
                setStatusButtonLeft('Bekerja')
            }, 3000)
            setLoadingIN(false)
        }
        ).catch(err => {
            setLoadingIN(false)
            AlertFunction('Gagal Absensi Masuk', `Periksa Koneksi Internet anda, memerlukan internet yang stabil untuk mengakses layanan ini\n\nDetail Error\n${err}`)
        })
    }
    const ButtonIN = () => {
        if (LoadingIN || statusButtonLeft == null) {
            return (
                <TouchableOpacity style={styles.buttonAttendance3} disabled>
                    <Text style={styles.textAttendances}>
                        Tutup
                    </Text>
                </TouchableOpacity>
            )
        }
        else if (!LoadingIN && statusButtonLeft == 'Masuk') {
            return (
                <TouchableOpacity style={styles.buttonAttendance1} onPress={() => pressIN()}>
                    <Text style={styles.textAttendances}>
                        Masuk
                    </Text>
                </TouchableOpacity>
            )
        }
        else if (!LoadingIN && statusButtonLeft == 'Bekerja') {
            return (
                <TouchableOpacity style={styles.buttonAttendance3} disabled>
                    <Text style={styles.textAttendances}>
                        Bekerja
                    </Text>
                </TouchableOpacity>
            )
        }
        else if (!LoadingIN && statusButtonLeft == 'Pulang') {
            return (
                <TouchableOpacity style={styles.buttonAttendance2} onPress={() => {
                    pressOut()
                }}>
                    <Text style={styles.textAttendances}>
                        Pulang
                    </Text>
                </TouchableOpacity>
            )
        }
        else {
            return (
                <TouchableOpacity style={styles.buttonAttendance3} disabled>
                    <Text style={styles.textAttendances}>
                        Tutup
                    </Text>
                </TouchableOpacity>
            )
        }
    }
    const rehat = () => {
        if (LoadingRest) {
            return (
                <TouchableOpacity style={styles.buttonAttendance3} disabled={true}>
                    <Text style={styles.textAttendances}>
                       Tutup
                    </Text>
                </TouchableOpacity>
            )
        }
        if (!LoadingRest && statusButtonRight === 'Tutup') {
            return (
                <TouchableOpacity style={styles.buttonAttendance3} disabled={true}>
                    <Text style={styles.textAttendances}>
                        Tutup
                    </Text>
                </TouchableOpacity>
            )
        }
        if (!LoadingRest && statusButtonRight === 'Buka') {
            return (
                <TouchableOpacity style={styles.buttonAttendance1} onPress={() => pressRestIN()}>
                    <Text style={styles.textAttendances}>
                        Istirahat
                    </Text>
                </TouchableOpacity>
            )
        }
        if (!LoadingRest && statusButtonRight === 'Selesai') {
            return (
                <TouchableOpacity style={styles.buttonAttendanceRestDone} onPress={() => selesaiIstirahat()}>
                    <Text style={styles.textAttendancesRestDone}>
                        {`Selesai\nIstirahat`}
                    </Text>
                </TouchableOpacity>
            )
        }
    }

    return (
        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 20, marginBottom: 80 }}>
            {
                ButtonIN()
            }
            {rehat()}
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