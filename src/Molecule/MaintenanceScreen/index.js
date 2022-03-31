import React from "react";
import {View,Text} from 'react-native'
import LoaderImage from "../../ImagesSource/LoaderImage";

export default function MaintenanceScreen() {
    return (
        <View style={{ alignContent: 'center', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            <LoaderImage />
            <Text style={{ textAlign: 'center', fontFamily: 'Regular', fontSize: 20, marginTop: '5%' }}>
                Maaf Halaman Ini dalam pengembangan
            </Text>
        </View>
    )
}