import React from "react";
import { AntDesign } from '@expo/vector-icons';
import { Text, View, StyleSheet, Image } from "react-native";

export default function MyInfoMenu(props) {
    const Images = props.Imag
    return (
        <View style={styles.container}>
            <View style={styles.containerImage}>
                <Image style={styles.Images} source={Images} />
            </View>
            <Text style={styles.TextInfo}>
                {props.NameMenu}
            </Text>
            <View style={styles.ButtonRight}>

                <AntDesign name="right" size={24} color="black" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 20,
        flexWrap:'wrap',
        justifyContent:'space-between',
        borderBottomWidth: 1,
        paddingBottom:15,
        marginTop:15
    },
    Images: {
        width: 25,
        height: 25,
    },
    TextInfo: {
        fontFamily: 'Medium',
        flex: 1,
        textAlign:'left',
        marginLeft: 20
    },
    containerImage: {
    },
    ButtonRight: {
       alignSelf:'flex-end'
    }
})