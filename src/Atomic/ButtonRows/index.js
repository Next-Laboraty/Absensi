import React from 'react'
import { TouchableOpacity, Text, StyleSheet,View,Image } from 'react-native'
import { Fontisto } from '@expo/vector-icons';

export default function ButtonRows(props) {
    return (
        <TouchableOpacity onPress={()=>props.navigation.navigate(props.nav)}>
            <View style={styles.rowMenu}>
                <Image source={props.image} style={styles.images} />
            </View>
            <Text style={styles.rowText}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    rowMenu: {
        width: 60,
        height: 60,
        backgroundColor: '#516BEB',
        borderRadius: 15,
        alignItems:'center',
        justifyContent:'center'
    },
    rowText:{ 
        marginTop:5,
        marginBottom:2,
        fontFamily: 'Regular', 
        fontSize: 8, 
        textAlign: 'center' 
    },
    images:{
        width: 30,
        height:30
    }
})