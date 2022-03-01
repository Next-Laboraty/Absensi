import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Fontisto } from '@expo/vector-icons';

export default function ButtonBottom(props) {
    return (
        <TouchableOpacity style={styles.chatScreen}>
            <Fontisto name={props.icon} size={18} color="#516BEB" />
            <Text style={styles.textChat}>
                {props.text}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    textChat:{
        color:'#516BEB',
        fontFamily: 'Medium',
        marginLeft: 10
    },
    chatScreen:{
        borderWidth: 2,
        borderColor: '#516BEB',
        flexDirection: 'row',
        borderRadius: 15,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems:'center',
        justifyContent:'center',
    },
})