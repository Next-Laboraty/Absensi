import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Feather, Octicons, AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export default function HeaderNameAndNotif(props) {
    return (
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
    )
}

const styles = StyleSheet.create({
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