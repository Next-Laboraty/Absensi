import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import Footer from '../../Molecule/Footer'
import AttendanceImageHeaderOne from '../../ImagesSource/AttendanceImageHeaderOne'
import ListLog from '../../Molecule/ListLog';

export default class AttendanceScreen extends Component {
    render() {
        return (
            <View>
                <View style={styles.containers}>
                    <Image source={require('../../../assets/photo.png')} style={{ width: 62, height: 62, alignSelf: 'center', marginTop: -60 }} />
                    <Text style={styles.Text1}>Kevin Krisma</Text>
                    <Text style={styles.Text2}>Kevin@onglai.id</Text>
                    <Text style={styles.Text3}>Research & Developer</Text>
                    <Text style={styles.Text4}>IT Full-stack Developer</Text>
                </View>
                <View style={styles.clockContainer}>
                    <Text style={styles.textClock}>
                        15.32
                    </Text>
                </View>
                <View style={{ marginTop: 40 }}>
                    <Text style={styles.textClock}>Absensi</Text>
                    <View style={{ height: 1, width: 164, backgroundColor: '#2C3333', alignSelf: 'center' }}>

                    </View>
                    <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 20 }}>
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
                <TouchableOpacity style={{borderColor:'#9AD0EC',borderWidth:1,backgroundColor:'transparent',marginHorizontal:20,bottom:-120,borderRadius:15}}>
                    <Text style={{textAlign:'center',fontFamily:'Medium',color:'#9AD0EC'}}>
                        History
                    </Text>
                </TouchableOpacity>
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
    containers: {
        height: 200, backgroundColor: '#fff', borderRadius: 30,
        justifyContent: 'center',
        marginTop: 80,
        marginHorizontal: 20
    },
    Text1: {
        fontFamily: 'Medium',
        textAlign: 'center',
        fontSize: 20,
        color: '#2C3333'
    },
    Text2: {
        fontFamily: 'Light',
        textAlign: 'center',
        fontSize: 15,
        color: '#2C3333'
    },
    Text3: {
        marginTop: 20,
        fontFamily: 'Medium',
        textAlign: 'center',
        color: '#2C3333',
        fontSize: 20,
    },
    Text4: {
        fontFamily: 'ExtraLight',
        textAlign: 'center',
        color: '#2C3333',
        fontSize: 15,
    }
})