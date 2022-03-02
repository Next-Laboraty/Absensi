import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import 'moment/locale/id'
import moment from 'moment'
moment.locale('id')

export default function JamComponent() {
    const [tanggal, setTanggal] = useState()
    useEffect(() => {
        let isMounted = true
        const intervalId = setInterval(() => {
            setTanggal(moment().format('LTS'))
        }, 1000)
        return () => {
            clearInterval(intervalId); //This is important
            isMounted = false
        }

    }, [useState])
    return (
        <View style={styles.clockContainer}>
            <Text style={styles.textClock}>
                {tanggal}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    textClock: {
        fontFamily: 'Medium',
        textAlign: 'center',
        fontSize: 15
    },
    clockContainer: {
        alignSelf: 'center',
        marginTop: 42,
        borderRadius: 15,
        backgroundColor: '#fff',
        width: 120
    },
})