import React from "react";
import { StyleSheet,Text } from 'react-native'

export default function HeaderOption(props) {
    return(
        <Text style={styles.textKantor}>{props.Textrt}</Text>
    )
}

const styles = StyleSheet.create({
    textKantor: {
        marginBottom: 12,
        fontSize: 15,
        fontFamily: 'Medium',
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom:10
    },
})