import { Layout } from "@ui-kitten/components";
import React from "react";
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Feather, Octicons, AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
export default function HomeScreenBody(props) {
    return (
        <Layout style={styles.Kehadiran}>
            <View style={{ height: 53, flexDirection: 'row', alignItems: 'center', alignContent: 'space-between', marginHorizontal: 10 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ height: 43, width: 43, backgroundColor: '#516BEB', borderRadius: 120 / 2 }}>
                        <Ionicons name={props.icon} size={20} color="white" style={{ alignSelf: 'center', marginTop: 10 }} />
                    </View>
                </View>
                <View style={{ flex: 1, marginLeft: -50 }}>
                    <Text style={styles.TextSub}>{props.title}</Text>
                    <Text style={styles.TextDub}>24 Februari 2022</Text>
                </View>
                <View style={{ flex: 1, right: -55 }}>
                    <TouchableOpacity style={{ width: 60, height: 35, backgroundColor: '#516BEB', borderRadius: 15 }} onPress={() => props.navigation.navigate(props.link)}>
                        <AntDesign name="arrowright" size={24} color="white" style={{ textAlign: 'center', marginTop: 5 }} />
                    </TouchableOpacity>
                </View>
            </View>
        </Layout>
    )
}
const styles = StyleSheet.create({
    TextSub: {
        fontFamily: 'Regular',
        fontSize: 12,
        color: '#2C3333'
    },
    TextDub: {
        fontFamily: 'Regular',
        fontSize: 12,
        color: '#C4C4C4'
    },
    Kehadiran: {
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
})