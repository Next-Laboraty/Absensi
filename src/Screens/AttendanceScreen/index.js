import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import AttendanceImageHeaderOne from '../../ImagesSource/AttendanceImageHeaderOne'
import ListLog from '../../Molecule/ListLog';
import AttendanceHeader from '../../Molecule/AttendanceHeader';
import ButtonBottom from '../../Atomic/ButtonBottom';
import JamComponent from '../../Atomic/JamComponent';
import AttendanceButton from '../../Molecule/AttendanceButton';

export default class AttendanceScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{flex: 1 }}>
                    <AttendanceHeader />
                    <JamComponent />
                    <View style={{ marginTop: '20%' }}>
                        <Text style={styles.headerComp}>Absensi</Text>
                        <View style={{ height: 1, width: 164, backgroundColor: '#2C3333', alignSelf: 'center' }}>

                        </View>
                        <AttendanceButton />
                    </View>

                </View>
                <View style={{height: '15%' }}>
                    <ButtonBottom icon="clock" text="Riwayat" nav={`History`} navigation={this.props.navigation}/>
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
    headerComp: {
        fontFamily: 'Medium',
        textAlign: 'center',
        fontSize: 15,
    },
})