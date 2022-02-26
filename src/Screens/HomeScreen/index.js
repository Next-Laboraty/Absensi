import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Feather, Octicons, AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import HomeImageHeaderOne from '../../ImagesSource/HomeImageHeaderOne';
import HeaderMenu from '../../Molecule/HeaderMenu';
<<<<<<< HEAD
import Notificationss from '../../lib/Notification';
=======
import AttendanceImageHeaderOne from '../../ImagesSource/AttendanceImageHeaderOne';
>>>>>>> 2573e2e312e5d92807461fab176163ca5fc07091

export default class HomeScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden={true} style="light" />
                {/* Header Name */}
                <View style={styles.header}>
                    <View style={{ flex: 1, marginLeft: 20 }}>
                        <Text style={styles.textHeader1}>Halo, </Text>
                        <Text style={styles.textHeader2}>Kevin Krisma</Text>
                    </View>
<<<<<<< HEAD
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.buttonInv} onPress={()=>Notificationss()}>
                                <Image source={require('../../../assets/attendance.png')} style={{width:60,height:60}} />
                                <Text style={{fontFamily:'Oxygen_400Regular', color:'#fff',marginTop:10}}>Attendance</Text>
=======
                    <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 20 }}>
                        <TouchableOpacity>
                            <Ionicons name="notifications-outline" size={24} color="#2C3333" />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Banner */}
                <TouchableOpacity style={styles.bannerS} onPress={()=>this.props.navigation.navigate('Attendance')}>
                    <View style={styles.row1}>
                        <Text style={styles.bannerText}>{`Jadikan Mudah\nHarimu`}</Text>
                        <TouchableOpacity style={styles.buttonBanner}>
                            <Text style={styles.textButtonBanner}>HRIS</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <AttendanceImageHeaderOne />
                    </View>
                </TouchableOpacity>
                {/* Alat Kantor */}
                <View style={styles.bannerKantor}>
                    <Text style={styles.textKantor}>Alat Kantor</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.rowKantor1}>
                            <View style={{ width: 55, height: 55, backgroundColor: '#D1EFFF', alignSelf: 'center', borderRadius: 120 / 2 }}>
                                <MaterialIcons name="add-task" size={28} color="#648CA0" style={{ textAlign: 'center', marginTop: 12 }} />
                            </View>
                            <Text style={{ fontFamily: 'Medium', textAlign: 'center', color: '#fff', marginTop: 5 }}>TUGAS</Text>
                            <Text style={{ fontFamily: 'Regular', fontSize: 10, marginHorizontal: 20, color: '#7A7979' }}>23 Sedang dikerjakan</Text>
                            <Text style={{ fontFamily: 'Regular', fontSize: 10, marginHorizontal: 20, color: '#7A7979' }}>40 Selesai</Text>
                        </TouchableOpacity>
                        <View style={styles.rowKantor2}>
                            <TouchableOpacity style={styles.rowKantor2_1}>
                                <View style={{ width: 40, height: 40, backgroundColor: '#E4E2FB', borderRadius: 120 / 2, }}>
                                    <Ionicons name="checkmark-done" size={28} color="#817E9F" style={{ textAlign: 'center', marginTop: 7 }} />
                                </View>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ fontFamily: 'Medium', color: '#fff' }}>TO DO</Text>
                                    <Text style={{ fontFamily: 'Regular', fontSize: 10, color: '#7A7979' }}>23 To Do</Text>
                                </View>
>>>>>>> 2573e2e312e5d92807461fab176163ca5fc07091
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.rowKantor2_2}>
                                <View style={{ width: 40, height: 40, backgroundColor: '#D9FEEA', borderRadius: 120 / 2, }}>
                                    <MaterialIcons name="event-note" size={28} color="#6B8E7B" style={{ textAlign: 'center', marginTop: 7 }} />
                                </View>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ fontFamily: 'Medium', color: '#fff' }}>TO DO</Text>
                                    <Text style={{ fontFamily: 'Regular', fontSize: 10, color: '#7A7979' }}>23 To Do</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/* Kehadiran */}
                <View style={styles.bannerKantor}>
                    <Text style={styles.textKantor}>Kehadiran Karyawan</Text>
                    {/* Kehadiran Online */}
                    <View style={styles.Kehadiran}>
                        <View style={{ height: 53, flexDirection: 'row', alignItems: 'center', alignContent: 'space-between', marginHorizontal: 10 }}>
                            <View style={{ flex: 1 }}>
                                <View style={{ height: 43, width: 43, backgroundColor: '#516BEB', borderRadius: 120 / 2 }}>
                                    <MaterialCommunityIcons name="gesture-tap-hold" size={30} color="white" style={{ alignSelf: 'center', marginTop: 5 }} />
                                </View>
                            </View>
                            <View style={{ flex: 1, marginLeft: -50 }}>
                                <Text>Absensi Online</Text>
                                <Text>24 Februari 2022</Text>
                            </View>
                            <View style={{ flex: 1, right: -55 }}>
                                <TouchableOpacity style={{ width: 60, height: 35, backgroundColor: '#516BEB', borderRadius: 15 }} onPress={()=>this.props.navigation.navigate('Attendance')}>
                                    <AntDesign name="arrowright" size={24} color="white" style={{ textAlign: 'center', marginTop: 5 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {/* End Kehadiran Online */}
                    {/* Kehadiran Client Visiting */}
                    <View style={styles.Kehadiran2}>
                        <View style={{ height: 53, flexDirection: 'row', alignItems: 'center', alignContent: 'space-between', marginHorizontal: 10 }}>
                            <View style={{ flex: 1 }}>
                                <View style={{ height: 43, width: 43, backgroundColor: '#516BEB', borderRadius: 120 / 2 }}>
                                    <MaterialCommunityIcons name="map-marker-plus-outline" size={30} color="white" style={{ alignSelf: 'center', marginTop: 5 }} />
                                </View>
                            </View>
                            <View style={{ flex: 1, marginLeft: -50 }}>
                                <Text>Mengunjungi Klien</Text>
                                <Text>24 Februari 2022</Text>
                            </View>
                            <View style={{ flex: 1, right: -55 }}>
                                <TouchableOpacity style={{ width: 60, height: 35, backgroundColor: '#516BEB', borderRadius: 15 }}>
                                    <AntDesign name="arrowright" size={24} color="white" style={{ textAlign: 'center', marginTop: 5 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {/* End */}
                </View>
                {/* End */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Kehadiran2: {
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#516BEB",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    Kehadiran: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#516BEB",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    rowKantor2_2: {
        backgroundColor: '#9DF3C4',
        borderRadius: 10,
        height: 60,
        marginTop: 12,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#516BEB",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,

    },
    rowKantor2_1: {
        backgroundColor: '#C3BEF0',
        paddingLeft: 10,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 10,
        height: 60,
        shadowColor: "#516BEB",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,

    },
    rowKantor2: { height: 30, flex: 1, marginLeft: 6 },
    rowKantor1: {
        paddingTop: 10,
        height: 132,
        flex: 1,
        marginRight: 6,
        backgroundColor: '#9AD0EC',
        borderRadius: 10,
        shadowColor: "#516BEB",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,

    },
    bannerKantor: {
        marginHorizontal: 20,
        marginTop: 30
    },
    textKantor: {
        marginBottom: 12,
        fontSize: 15,
        fontFamily: 'Medium',
    },
    row1: {
        marginLeft: 14,
        flex: 1,
        color: '#2C3333'
    },
    textButtonBanner: {
        color: '#fff',
        fontFamily: 'Medium',
        textAlign: 'center'
    },
    buttonBanner: {
        marginTop: 30,
        backgroundColor: '#2C3333',
        width: 67,
        paddingVertical: 3,
        borderRadius: 15
    },
    bannerText: {
        marginTop: 19,
        fontSize: 20,
        fontFamily: 'Regular',
        textAlignVertical: 'center'
    },
    bannerS: {
        backgroundColor: '#FFE6AB',
        height: 160,
        marginTop: 20,
        borderRadius: 15,
        marginHorizontal: 20
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-start',
        marginTop: 23
    },
    textHeader1: {
        fontFamily: 'Medium',
        fontSize: 15,
        color: '#ADACAC'
    },
    textHeader2: {
        fontFamily: 'Medium',
        fontSize: 15,
        color: '#2C3333'
    }
})