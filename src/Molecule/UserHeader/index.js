import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function UserHeader(props) {
    return (
        <View style={styles.ContainerHeader}>
            <View style={styles.HeaderTitle}>
                <View style={styles.borderTitle}>
                    <Text style={styles.TextHeader}>
                        Account
                    </Text>

                </View>
            </View>
            <View style={styles.Request}>
                <TouchableOpacity >
                    <Text style={styles.textRequest}></Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    borderTitle:{
        paddingHorizontal: 30,
        width: '85%',
        backgroundColor: '#516BEB',
        paddingVertical: 10,
        borderTopEndRadius: 15,
        borderBottomEndRadius: 15
    },
    textRequest: {
        textAlign: 'right',
        fontFamily: 'Medium',
        fontSize: 10,
        color: '#516BEB'
    },
    Request: {
        flex: 1,
    },
    TextHeader: {
        fontFamily: 'Bold',
        color: '#fff',
        fontSize: 18
    },
    HeaderTitle: {
        flex: 1,
    },
    ContainerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight:20,
        marginTop: 46,
        marginBottom: 18
    }
})