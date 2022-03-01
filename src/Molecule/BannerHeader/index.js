import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AttendanceImageHeaderOne from '../../ImagesSource/AttendanceImageHeaderOne';
import TodoScreenImage from '../../ImagesSource/TodoScreenImage'

export default function BannerHeader(props) {
    const color = props.color
    const screen = props.nav
    return (
        <TouchableOpacity style={Banners(color)} onPress={() => props.navigation.navigate('Attendance')}>
            <View style={styles.row1}>
                <Text style={styles.bannerText}>{`Jadikan Mudah\nHarimu`}</Text>
                <TouchableOpacity style={styles.buttonBanner}>
                    <Text style={styles.textButtonBanner}>{props.textlink}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                {ImagesSource(screen)}
            </View>
        </TouchableOpacity>
    )
}
function ImagesSource(screen){
    if(screen == 'Home'){
        return(
            <AttendanceImageHeaderOne />
        )
    }
    else if(screen == 'Do'){
        return(
            <TodoScreenImage />
        )
    }
}
function Banners(color) {
    return {
        backgroundColor: color,
        height: 160,
        marginTop: 20,
        borderRadius: 15,
        marginHorizontal: 20
    }
}
const styles = StyleSheet.create({
    textButtonBanner: {
        color: '#fff',
        fontFamily: 'Medium',
        textAlign: 'center'
    },
    buttonBanner: {
        marginTop: 30,
        backgroundColor: '#2C3333',
        width: 90,
        paddingVertical: 3,
        borderRadius: 15
    },
    bannerText: {
        marginTop: 19,
        fontSize: 20,
        fontFamily: 'Regular',
        textAlignVertical: 'center'
    },
    row1: {
        marginLeft: 14,
        flex: 1,
        color: '#2C3333'
    },
})