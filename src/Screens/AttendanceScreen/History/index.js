import React from 'react'
import { Text, View } from 'react-native'

export default function History() {
    return (
        <View>
            {DateTimeNow()}
            <Text>
                History
            </Text>
        </View>
    )
}

function DateTimeNow(){
    return(
        <View>
            <Text>1</Text>
        </View>
    )
}