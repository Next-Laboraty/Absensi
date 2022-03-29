import React, { useEffect, useState } from "react";
import axios from "axios";
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { useSelector } from "react-redux";
import { base64 } from '@firebase/util';
import { Spinner } from "@ui-kitten/components";
import moment from "moment";
import * as Location from 'expo-location';

export default function AttendanceButton() {
    const { employee, server, token } = useSelector(state => state.employee)
    const [location, setLocation] = useState(null);
    const [isie, setIsie] = useState()
    const [LoadingIN, setLoadingIN] = useState(true)
    const [timeNow, setTimeNow] = useState()

    useEffect(() => {
        getDbIN()
        getLocations()
        let isMounted = true
        const intervalId = setInterval(() => {
            setTimeNow(moment().format())
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
    const getDbIN = async () => {
        const d = await axios({
            url:`https://${base64.decodeString(server)}/api/resource/Employee%20Checkin/?fields=["*"]&filters=[["employee","=","${employee.employee}"],["time",">","${moment().format("YYYY-MM-DD")} 00:00:01.569260"],["time","<","${moment().format("YYYY-MM-DD")} 23:59:59.569260"]]`,
            headers:{
                'Authorization': `token ${token}`
              },
        })
        console.log(d)
    }
    const pressIN = async () => {
        setLoadingIN(true)
        console.log(location)
        let payload = {
            employee: employee.employee,
            log_type: 'IN',
            time: moment().format("YYYY-MM-DD HH:mm:ss"),
            skip_auto_attendance: 0,
            longitude: location.coords.longitude,
            latitude: location.coords.latitude
        }
        const data = {
            type:'Masuk',
            token: base64.decodeString(token),
            server: base64.decodeString(server),
            employee: employee.employee,
            payload: payload
        }
        await axios.post(`https://${base64.decodeString(server)}/api/resource/Employee%20Checkin/?fields=["*"]&filters=[["employee","=","${steps.trigger.event.body.employee}"],["time",">","${dateNow} 00:00:01.569260"],["time","<","${dateNow} 23:59:59.569260"]]`, data).then(res => {
            setLoadingIN(false)
            console.log(res.data)
        }
        ).catch(err => {
            setLoadingIN(false)
            alert(err)
        })
    }
    const ButtonIN = () => {
        if (LoadingIN) {
            return (
                <TouchableOpacity style={styles.buttonAttendance1} disabled>
                    <Text style={styles.textAttendances}>
                        <Spinner status={'control'} />
                    </Text>
                </TouchableOpacity>
            )
        }
        else {
            if (isie && isie.length == 1 && !LoadingIN) {
                return (
                    <TouchableOpacity style={styles.buttonAttendance1}>
                        <Text style={styles.textAttendances}>
                            Pulang
                        </Text>
                    </TouchableOpacity>
                )
            }
            else if (isie && isie.length == 2 && !LoadingIN) {
                return (
                    <TouchableOpacity style={styles.buttonAttendance3}>
                        <Text style={styles.textAttendances}>
                            Tutup
                        </Text>
                    </TouchableOpacity>
                )
            }
            else if (!LoadingIN) {
                return (
                    <TouchableOpacity style={styles.buttonAttendance1} onPress={()=>pressIN()}>
                        <Text style={styles.textAttendances}>
                            Masuk
                        </Text>
                    </TouchableOpacity>
                )
            }
            else {
                return (
                    <TouchableOpacity style={styles.buttonAttendance1}>
                        <Text style={styles.textAttendances}>
                            Tutup
                        </Text>
                    </TouchableOpacity>
                )
            }
        }
    }

    return (
        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 20, marginBottom: 80 }}>
            {
                ButtonIN()
            }
            <TouchableOpacity style={styles.buttonAttendance2} disabled={true}>
                <Text style={styles.textAttendances}>
                    Pulang
                </Text>
            </TouchableOpacity>
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
    buttonAttendance3: {
        backgroundColor: '#828282',
        flex: 1,
        height: 100,
        marginRight: 10,
        borderRadius: 15
    },
    buttonAttendance1: {
        backgroundColor: '#516BEB',
        flex: 1,
        height: 100,
        marginRight: 10,
        borderRadius: 15
    },
    buttonAttendance2: {
        backgroundColor: '#FF7648',
        flex: 1,
        height: 100,
        marginLeft: 10,
        borderRadius: 15
    },
    headerComp: {
        fontFamily: 'Medium',
        textAlign: 'center',
        fontSize: 15,
    },
})