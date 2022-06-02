import React from "react";
import { Text, View, StyleSheet, Image,TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { base64 } from "@firebase/util";

export default function InformationWithPhoto() {
    const {employee,server} = useSelector((state) => state.employee)
    const url = base64.decodeString(server)
    return (
        <View style={styles.Container}>
            <View style={styles.row1}>
                <Text style={styles.TextName}>{employee.employee_name}</Text>
                <Text style={styles.TextJabatan}>{employee.designation}</Text>
            </View>
            <View style={styles.row2}>
                <Image source={{uri:'https://'+url+employee.image}} style={styles.Foto} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    row1: {
        flex: 1
    },
    row2: {
        flex: 1
    },
    Container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20
    },
    TextName: {
        fontFamily: 'Bold',
        color: '#2C3333'
    },
    TextJabatan: {
        fontSize:12,
        fontFamily: 'Medium',
        color: '#ADACAC'
    },
    Foto: {
        width: 80,
        height: 80,
        borderRadius:120/2,
        alignSelf: 'flex-end'
    }
})