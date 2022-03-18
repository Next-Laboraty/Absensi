import { Layout, Text, Avatar, Divider, Card, Button } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { MaterialIcons, Entypo, AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import 'moment/locale/id'

export default function ListAllDataNote(props) {
    const Images = props.Imag
    return (
        <View style={styles.container}>
            <View style={styles.containerImage}>
                <AntDesign name="notification" size={18} color="#598BFF" />
            </View>
            <Text style={styles.TextInfo}>
                {props.subject}
            </Text>
            <View style={styles.ButtonRight}>
                <AntDesign name="right" size={16} color="gray" />
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
        paddingBottom: 15,
        marginTop: 15
    },
    Images: {
        width: 25,
        height: 25,
    },
    TextInfo: {
        fontFamily: 'Regular',
        alignSelf:'center',
        justifyContent:'center',
        flex: 1,
        fontSize:10,
        textAlign: 'left',
        marginLeft: 20
    },
    containerImage: {
    },
    ButtonRight: {
        alignSelf: 'flex-end'
    }
})