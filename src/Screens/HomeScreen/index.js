import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Feather, Octicons, AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import HeaderNameAndNotif from '../../Molecule/HeaderNameAndNotif';
import BannerHeader from '../../Molecule/BannerHeader';
import HeaderOption from '../../Atomic/HeaderOptions';
import ButtonFeatures from '../../Molecule/ButtonFeatures';

export default class HomeScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden={true} style="light" />
                {/* Header Name */}
                <HeaderNameAndNotif />
                <BannerHeader color="#FFE6AB" nav="Home" textlink="Kehadiran" navigation={this.props.navigation}/>
                {/* Banner */}
                <HeaderOption Textrt="Alat Kantor" />
                {/* Alat Kantor */}
                <ButtonFeatures Menu1={'TUGAS'} Menu2={'TO DO'} Menu3={'CATATAN'} Sub1="23 Sedang Dikerjakan" Dub1="40 Selesai" Sub2="23 To Do" Sub3="2 Catatan"/>
                {/* Kehadiran */}
                <View style={{marginTop: 30}}>

                <HeaderOption Textrt="Kehadiran Karyawan" />
                <View style={{marginHorizontal:20}}>
                    {/* Kehadiran Online */}
                    <View style={styles.Kehadiran}>
                        <View style={{ height: 53, flexDirection: 'row', alignItems: 'center', alignContent: 'space-between', marginHorizontal: 10 }}>
                            <View style={{ flex: 1 }}>
                                <View style={{ height: 43, width: 43, backgroundColor: '#516BEB', borderRadius: 120 / 2 }}>
                                    <MaterialCommunityIcons name="gesture-tap-hold" size={30} color="white" style={{ alignSelf: 'center', marginTop: 5 }} />
                                </View>
                            </View>
                            <View style={{ flex: 1, marginLeft: -50 }}>
                                <Text style={styles.TextSub}>Absensi Online</Text>
                                <Text style={styles.TextDub}>24 Februari 2022</Text>
                            </View>
                            <View style={{ flex: 1, right: -55 }}>
                                <TouchableOpacity style={{ width: 60, height: 35, backgroundColor: '#516BEB', borderRadius: 15 }} onPress={() => this.props.navigation.navigate('Attendance')}>
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
                                <Text style={styles.TextSub}>Mengunjungi Klien</Text>
                                <Text style={styles.TextDub}>24 Februari 2022</Text>
                            </View>
                            <View style={{ flex: 1, right: -55 }}>
                                <TouchableOpacity style={{ width: 60, height: 35, backgroundColor: '#516BEB', borderRadius: 15 }}>
                                    <AntDesign name="arrowright" size={24} color="white" style={{ textAlign: 'center', marginTop: 5 }} />
                                </TouchableOpacity>
                            </View>
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
    TextSub:{
        fontFamily: 'Regular',
        fontSize:12,
        color:'#2C3333'
    },
    TextDub:{
        fontFamily: 'Regular',
        fontSize:12,
        color:'#C4C4C4'
    },
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
})