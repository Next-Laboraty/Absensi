import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

export default function HeaderMenu(props) {
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.ColName}>
                    <Text style={styles.RowName}>
                        Halo,
                    </Text>
                    <Text style={styles.RowName2}>
                        Kevin Krisma
                    </Text>
                </View>
                <View style={styles.colDesignation}>
                    <Text style={styles.rowDesignation}>
                        Research & Developer
                    </Text>
                    <Text style={styles.rowDesignation2}>
                        IT Full-Stack Developer
                    </Text>
                </View>
            </View>
            <TouchableOpacity style={styles.profilePic}>
                <Image source={require('../../../assets/user.png')} style={{ width: '80%', height: '80%', alignSelf: 'center', alignItems: 'center', alignContent: 'center', marginTop: 5, justifyContent: 'center' }} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#516BEB',
        height: 120,
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    ColName: {
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: 20
    },
    RowName: {
        color: 'white',
        fontFamily: 'Oxygen_700Bold',
        fontSize: 20
    },
    RowName2: {
        color: '#8baffc',
        fontFamily: 'Oxygen_700Bold',
        marginLeft: 10,
        fontSize: 20
    },
    colDesignation: {
        marginTop: 15,
        marginHorizontal: 20
    },
    rowDesignation: {
        color: '#c4d7ff',
        fontFamily: 'Oxygen_700Bold'
    },
    rowDesignation2: {
        color: '#8baffc'
    },
    profilePic: {
        backgroundColor: '#fff',
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginLeft: 30,
        borderRadius: 120 / 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})