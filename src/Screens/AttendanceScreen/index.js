import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import AttendanceImageHeaderOne from '../../ImagesSource/AttendanceImageHeaderOne'
import ListLog from '../../Molecule/ListLog';
import AttendanceHeader from '../../Molecule/AttendanceHeader';
import ButtonBottom from '../../Atomic/ButtonBottom';

export default class AttendanceScreen extends Component {
    render() {
        return (
            <View>
                <AttendanceHeader />
                <View style={styles.clockContainer}>
                    <Text style={styles.textClock}>
                        15.32
                    </Text>
                </View>
                <View style={{ marginTop: 40 }}>
                    <Text style={styles.textClock}>Absensi</Text>
                    <View style={{ height: 1, width: 164, backgroundColor: '#2C3333', alignSelf: 'center' }}>

                    </View>
                    <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 20,marginBottom:80 }}>
                        <TouchableOpacity style={styles.buttonAttendance1}>
                            <Text style={styles.textAttendances}>
                                Bekerja
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonAttendance2}>
                            <Text style={styles.textAttendances}>
                                Pulang
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <ButtonBottom icon="clock" text="Riwayat" />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textAttendances: {
        textAlign: 'center',
        marginTop: 35,
        fontFamily: 'Medium',
        fontSize: 18,
        color: '#fff'
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
    textClock: {
        fontFamily: 'Medium',
        textAlign: 'center',
        fontSize: 15
    },
    clockContainer: {
        alignSelf: 'center',
        marginTop: 42,
        borderRadius: 15,
        backgroundColor: '#fff',
        width: 120
    },
})