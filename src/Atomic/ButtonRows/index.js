import React from 'react'
import { TouchableOpacity, Text, StyleSheet,View } from 'react-native'
import { Fontisto } from '@expo/vector-icons';

export default function ButtonRows(props) {
    return (
        <TouchableOpacity>
            <View style={styles.rowMenu}></View>
            <Text style={styles.rowText}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    rowMenu: {
        width: 60,
        height: 60,
        backgroundColor: '#516BEB',
        borderRadius: 15
    },
    rowText:{ 
        marginTop:5,
        marginBottom:2,
        fontFamily: 'Regular', 
        fontSize: 8, 
        textAlign: 'center' 
    }
})