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
    const [NumberIN, setNumberIn] = useState()
    const myHeaders = new Headers({
        'Authorization': `token ${base64.decodeString(token)}`,
        'accept': 'application/json',
        'accept-encoding': 'gzip, deflate',
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': "*"
    });
    const Hour = moment().format('H')
    useEffect(() => {
        getDbIN()
        setTimeNow(moment().format())
        getLocations()
        let isMounted = true
        Logs()
        isMounted = false
    }, [statusButtonLeft])
    const Logs = () => {
        setInterval(() => {
            getDbIN()
            if (statusButtonLeft == 'Bekerja' || statusButtonLeft == 'Pulang') {
                logicRest()
            }
        }, 5000)
    }

    const logicRest = async () => {
        let uri = `https://${base64.decodeString(server)}/api/resource/Lunch?field=["*"]&filters=[[%22add%22,%22=%22,%22${employee.user_id}%22],["tgl","=","${moment().format('DD-MM-YYYY')}"]]`

        try {
            const response = await fetch(uri, {
                method: 'GET',
                headers: myHeaders,
                mode: 'no-cors',
            })
            const dta = await response.json();
            if (dta.data.length < 1 || !dta) {
                setLoadingRest(false)
                setStatusButtoRight('Buka')
            }
            else {
                logicRestTrue(dta.data)
            }
        }
        catch (error) {
            setLoadingRest(false)
            setStatusButtoRight('Tutup')
            AlertFunction('Gagal Mengambil Data', `Periksa Koneksi Internet anda, memerlukan internet yang stabil untuk mengakses layanan ini\n\nDetail Error\n${error}`)
        }
    }
    const logicRestTrue = async (dataX) => {
        setHeadexr(dataX[0].name)
        try {
            const request = await fetch(`https://${base64.decodeString(server)}/api/resource/Lunch/${dataX[0].name}?field=["*"]`, {
                method: 'GET',
                headers: myHeaders,
                mode: 'no-cors',
            })
            const res = await request.json();
            const jamIstr = (res.data)
            if (!jamIstr.jam2) {
                setTimeRest(jamIstr.jam)
                setLoadingRest(false)
                setStatusButtoRight('Selesai')
            }
            else {
                setLoadingRest(false)
                setStatusButtoRight('Tutup')
            }
        }
        catch (error) {
            setLoadingRest(false)
            setStatusButtoRight('Tutup')
            AlertFunction('Gagal Mengambil Data', `Periksa Koneksi Internet anda, memerlukan internet yang stabil untuk mengakses layanan ini\n\nDetail Error\n${error}`)
        }
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
        const myHeaders = new Headers({
            'Authorization': `token ${base64.decodeString(token)}`,
            'accept': 'application/json',
            'accept-encoding': 'gzip, deflate',
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': "*"
        });
        fetch(url, {
            method: 'GET',
            headers: myHeaders,
        })
            .then(res => res.json())
            .then(res => {
                let JsData = res.data
                if(JsData !== null || JsData.length > 0) {
                    if (Hour >= 7 && Hour <= 13) {
                        setStatusButtonLeft('Bekerja')
                    }
                    if (Hour >= 14) {
                        setStatusButtonLeft('Pulang')

                    }
                }
                else {
                    if (Hour >= 7 && Hour <= 13) {
                        setStatusButtonLeft('Masuk')
                    }
                    if (Hour >= 14) {
                        setStatusButtonLeft('Tutup')

                    }
                }
            })
            .catch((error) =>{
                if (Hour >= 7 && Hour <= 13) {
                    setStatusButtonLeft('Masuk')
                }
                if (Hour >= 14) {
                    setStatusButtonLeft('Tutup')

                }
            })
            setLoadingIN(false)
        // const json = datax.json();
        // alert(JSON.stringify(json.data))

        // const dxdata = json.data
        // if (dxdata === undefined || json.data.length) {
        //     if (Hour >= 7 && Hour <= 13) {
        //         setStatusButtonLeft('Masuk')
        //     }
        //     if (Hour >= 14) {
        //         setStatusButtonLeft('Tutup')

        //     }
        // }
        // else {
        //     if (Hour >= 7 && Hour <= 13) {
        //         setStatusButtonLeft('Bekerja')
        //     }
        //     if (Hour >= 14) {
        //         setStatusButtonLeft('Pulang')

        //     }
        // }
        // setLoadingIN(false)



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
        const myHeaders = new Headers({
            'Authorization': `token ${base64.decodeString(token)}`,
            'accept': 'application/json',
            'accept-encoding': 'gzip, deflate',
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': "*"
        });
        fetch(`https://${base64.decodeString(server)}/api/resource/Employee%20Checkin`, {
            method: 'POST',
            headers: myHeaders,
            mode: 'no-cors',
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(res => {
                AlertFunction('Berhasil Absensi Pulang', `Halo ${employee.employee_name} ! Kamu berhasil Absensi Pulang\n\n${NewQuotes()}`)
                setLoadingIN(false)
                setStatusButtonLeft('Tutup')
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

        const myHeaders = new Headers({
            'Authorization': `token ${base64.decodeString(token)}`,
            'accept': 'application/json',
            'accept-encoding': 'gzip, deflate',
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': "*"
        });
        fetch(`https://${base64.decodeString(server)}/api/resource/Lunch/${headexr}`, {
            method: 'PUT',
            headers: myHeaders,
            mode: 'no-cors',
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(res => {
                AlertFunction('Berhasil Menyelesaikan Istirahat', `Halo ${employee.employee_name} ! Sedikit Kata Mutiara hari ini\n\n${NewQuotes()}`)

                setLoadingRest(false)
                setStatusButtoRight('Tutup')

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
        const myHeaders = new Headers({
            'Authorization': `token ${base64.decodeString(token)}`,
            'accept': 'application/json',
            'accept-encoding': 'gzip, deflate',
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': "*"
        });

        try {
            const request = await fetch(`https://${base64.decodeString(server)}/api/resource/Lunch`, {
                method: 'POST',
                headers: myHeaders,
                mode: 'no-cors',
                body: JSON.stringify(payload)
            })
            const response = request.json()
            setLoadingRest(false)
            AlertFunction('Berhasil Absensi Masuk', `Halo ${employee.employee_name} ! Kamu berhasil Absensi Masuk\n\n${NewQuotes()}`)
            scheduleTime()
            setStatusButtoRight('Selesai')

        }
        catch (err) {
            setLoadingRest(false)
            AlertFunction('Gagal Absensi Istirahat', `Periksa Koneksi Internet anda, memerlukan internet yang stabil untuk mengakses layanan ini\n\nDetail Error\n${err}`)
        }
    }
    const scheduleTime = async () => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: `${employee.employee_name} Waktu istirahat sudah 40 Menit`,
                body: 'Pengingat Istirahat agar pekerjaanmu lebih mudah',
            },
            trigger: {
                seconds: 2400
            }
        })
        await Notifications.scheduleNotificationAsync({
            content: {
                title: `${employee.employee_name} Waktu istirahat sudah 45 Menit`,
                body: 'Pengingat Istirahat agar pekerjaanmu lebih mudah',
            },
            trigger: {
                seconds: 2700
            }
        })
        await Notifications.scheduleNotificationAsync({
            content: {
                title: `${employee.employee_name} Waktu istirahat sudah 55 Menit`,
                body: 'Pengingat Istirahat agar pekerjaanmu lebih mudah',
            },
            trigger: {
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
        const myHeaders = new Headers({
            'Authorization': `token ${base64.decodeString(token)}`,
            'accept': 'application/json',
            'accept-encoding': 'gzip, deflate',
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': "*"
        });
        fetch(`https://${base64.decodeString(server)}/api/resource/Employee%20Checkin`, {
            method: 'POST',
            headers: myHeaders,
            mode: 'no-cors',
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(res => {
                AlertFunction('Berhasil Absensi Masuk', `Halo ${employee.employee_name} ! Kamu berhasil Absensi Masuk\n\n${NewQuotes()}`)

                setStatusButtonLeft('Bekerja')

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