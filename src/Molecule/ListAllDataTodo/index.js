import { Layout, Text, Avatar, Divider, Card, Button } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { MaterialIcons, Entypo,AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import 'moment/locale/id'

export default function ListAllDataTodo(props) {
    const Images = props.Imag
    return (
        <View style={styles.container}>
            <View style={styles.containerImage}>
            {props.status == 'Closed' ? <AntDesign name="checksquare" size={18} color="teal" />: props.status == 'Cancelled' ? <AntDesign name="closecircle" size={18} color="red" /> : <MaterialIcons name="pending" size={18} color="gray" />}
            </View>
            <Text style={styles.TextInfo}>
            {props.subject ? props.subject+' | ': null}{moment(props.dibuat).format('DD MMMM YYYY')}
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
        justifyContent:'center',
        alignSelf:'center',
        flex: 1,
        textAlign: 'left',
        fontSize:10,
        marginLeft: 20
    },
    containerImage: {
    },
    ButtonRight: {
        alignSelf: 'flex-end'
    }
})