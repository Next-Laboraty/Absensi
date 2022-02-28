import React from "react";
import { StyleSheet, Image, View, Text } from "react-native";

export default function AttendanceHeader() {
    return (
        <View style={styles.containers}>
            <Image source={require('../../../assets/photo.png')} style={{ width: 62, height: 62, alignSelf: 'center', marginTop: -60 }} />
            <Text style={styles.Text1}>Kevin Krisma</Text>
            <Text style={styles.Text2}>Kevin@onglai.id</Text>
            <Text style={styles.Text3}>Research & Developer</Text>
            <Text style={styles.Text4}>IT Full-stack Developer</Text>
        </View>
    )
}

const styles = StyleSheet.create({
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