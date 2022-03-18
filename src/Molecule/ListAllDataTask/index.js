import { Layout, Text, Avatar, Divider, Card, Button } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { MaterialIcons, Entypo,AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import 'moment/locale/id'

export default function ListAllDataTask(props) {
    const Images = props.Imag
    return (
        <View style={styles.container}>
            <View style={styles.containerImage}>
                {props.status == 'Completed' ? <Entypo name="check" size={24} color="teal" /> : props.status == 'Overdue' ? <Entypo name="back-in-time" size={24} color="red" /> : <MaterialIcons name="pending" size={24} color="gray" />}
            </View>
            <Text style={styles.TextInfo}>
                {props.subject}
            </Text>
            <View style={styles.ButtonRight}>
                <AntDesign name="right" size={24} color="blue" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 20,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#828282',
        paddingBottom: 15,
        marginTop: 15
    },
    Images: {
        width: 25,
        height: 25,
    },
    TextInfo: {
        fontFamily: 'Regular',
        flex: 1,
        textAlign: 'left',
        marginLeft: 20
    },
    containerImage: {
    },
    ButtonRight: {
        alignSelf: 'flex-end'
    }
})