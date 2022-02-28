import React from "react";
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Feather, Octicons, AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export default function ButtonFeatures(props) {
    return (
        <View style={styles.bannerKantor}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.rowKantor1}>
                    <View style={{ width: 55, height: 55, backgroundColor: '#D1EFFF', alignSelf: 'center', borderRadius: 120 / 2 }}>
                        <MaterialIcons name="add-task" size={28} color="#648CA0" style={{ textAlign: 'center', marginTop: 12 }} />
                    </View>
                    <Text style={{ fontFamily: 'Medium', textAlign: 'center', color: '#2C3333', marginTop: 5 }}>{props.Menu1}</Text>
                    <Text style={{ fontFamily: 'Regular', fontSize: 10, marginHorizontal: 20, color: '#7A7979' }}>{props.Sub1}</Text>
                    <Text style={{ fontFamily: 'Regular', fontSize: 10, marginHorizontal: 20, color: '#7A7979' }}>{props.Dub1}</Text>
                </TouchableOpacity>
                <View style={styles.rowKantor2}>
                    <TouchableOpacity style={styles.rowKantor2_1}>
                        <View style={{ width: 40, height: 40, backgroundColor: '#E4E2FB', borderRadius: 120 / 2, }}>
                            <Ionicons name="checkmark-done" size={28} color="#817E9F" style={{ textAlign: 'center', marginTop: 7 }} />
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ fontFamily: 'Medium', color: '#2C3333' }}>{props.Menu2}</Text>
                            <Text style={{ fontFamily: 'Regular', fontSize: 10, color: '#7A7979' }}>{props.Sub2}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rowKantor2_2}>
                        <View style={{ width: 40, height: 40, backgroundColor: '#D9FEEA', borderRadius: 120 / 2, }}>
                            <MaterialIcons name="event-note" size={28} color="#6B8E7B" style={{ textAlign: 'center', marginTop: 7 }} />
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ fontFamily: 'Medium', color: '#2C3333' }}>{props.Menu3}</Text>
                            <Text style={{ fontFamily: 'Regular', fontSize: 10, color: '#7A7979' }}>{props.Sub3}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
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
    },
})