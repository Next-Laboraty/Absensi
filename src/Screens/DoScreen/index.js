import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Feather, Octicons, AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import TodoScreenImage from '../../ImagesSource/TodoScreenImage'

export default class TodoScreen extends Component {
    render() {
        return (
            <View>
                <View style={styles.header}>
                    <View style={{ flex: 1, marginLeft: 20 }}>
                        <Text style={styles.textHeader1}>Halo, </Text>
                        <Text style={styles.textHeader2}>Kevin Krisma</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 20 }}>
                        <TouchableOpacity>
                            <Ionicons name="notifications-outline" size={24} color="#2C3333" />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Banner */}
                <TouchableOpacity style={styles.bannerS} onPress={() => this.props.navigation.navigate('Attendance')}>
                    <View style={styles.row1}>
                        <Text style={styles.bannerText}>{`Sistem Human\nResource`}</Text>
                        <TouchableOpacity style={styles.buttonBanner}>
                            <Text style={styles.textButtonBanner}>HRIS</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TodoScreenImage />
                    </View>
                </TouchableOpacity>
                <View style={styles.newRow}>
                    <Text style={styles.textBanners}>
                        Menu HR
                    </Text>
                    <View style={styles.rows}>
                        <View style={styles.rowMenu}></View>
                        <View style={styles.rowMenu}></View>
                        <View style={styles.rowMenu}></View>
                        <View style={styles.rowMenu}></View>
                        <View style={styles.rowMenu}></View>
                    </View>
                </View>
                <View style={styles.newRow}>
                    <Text style={styles.textBanners}>
                        Informasi Gaji
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rowMenu:{
        width:60, height: 60, backgroundColor:'red',
        borderRadius: 15
    },
    rows:{
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent: 'space-between'
    },  
    newRow:{
        marginHorizontal: 20,
        marginTop: 20
    },  
    textBanners: {
        marginBottom: 12,
        fontSize: 15,
        fontFamily: 'Medium',
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
    row1: {
        marginLeft: 14,
        flex: 1,
        color: '#2C3333'
    },
})