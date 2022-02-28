import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Fontisto } from '@expo/vector-icons';
import HeaderNameAndNotif from '../../Molecule/HeaderNameAndNotif';
import BannerHeader from '../../Molecule/BannerHeader';
import HeaderOption from '../../Atomic/HeaderOptions';

export default class TodoScreen extends Component {
    render() {
        return (
            <View>
                <HeaderNameAndNotif/>
                <BannerHeader color="#9DF3C4" nav="Do" textlink="HRIS"/>
                {/* End Banner */}
                <HeaderOption Textrt="Sistem Informasi" />
                <View style={styles.newRow}>
                    <View style={styles.rows}>
                        <View style={styles.rowMenu}></View>
                        <View style={styles.rowMenu}></View>
                        <View style={styles.rowMenu}></View>
                        <View style={styles.rowMenu}></View>
                        <View style={styles.rowMenu}></View>
                    </View>
                    <View style={styles.rows}>
                        <View style={styles.rowMenu}></View>
                        <View style={styles.rowMenu}></View>
                        <View style={styles.rowMenu}></View>
                        <View style={styles.rowMenu}></View>
                        <View style={styles.rowMenu}></View>
                    </View>
                </View>
                <HeaderOption Textrt="Payroll" />
                <View style={styles.newRow}>
                    <View style={styles.rows}>
                        <View style={styles.rowMenu}></View>
                        <View style={styles.rowMenu}></View>
                        <View style={styles.rowMenu}></View>
                        <View style={styles.rowMenu}></View>
                        <View style={styles.rowMenu}></View>
                    </View>
                </View>
                <TouchableOpacity style={styles.chatScreen}>
                <Fontisto name="hipchat" size={18} color="#516BEB" />
                <Text style={styles.textChat}>
                    Chat Management
                </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textChat:{
        color:'#516BEB',
        fontFamily: 'Medium',
        marginLeft: 10
    },
    chatScreen:{
        borderWidth: 2,
        borderColor: '#516BEB',
        flexDirection: 'row',
        borderRadius: 15,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems:'center',
        justifyContent:'center',
        marginTop: 20
    },
    rowMenu:{
        width:60, 
        height: 60, 
        backgroundColor:'#516BEB',
        borderRadius: 15
    },
    rows:{
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent: 'space-between',
        marginVertical: 10
    },  
    newRow:{
        marginHorizontal: 20,
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