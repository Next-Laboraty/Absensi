import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

export default function InformationWithPhoto() {
    return (
        <View style={styles.Container}>
            <View style={styles.row1}>
                <Text style={styles.TextName}>Kevin Krisma</Text>
                <Text style={styles.TextJabatan}>IT Programmer</Text>
            </View>
            <View style={styles.row2}>
                <Image source={require('../../../assets/photo.png')} style={styles.Foto} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    row1: {
        flex: 1
    },
    row2: {
        flex: 1
    },
    Container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20
    },
    TextName: {
        fontFamily: 'Bold',
        color: '#2C3333'
    },
    TextJabatan: {
        fontFamily: 'Medium',
        color: '#ADACAC'
    },
    Foto: {
        width: 80,
        height: 80,
        alignSelf: 'flex-end'
    }
})