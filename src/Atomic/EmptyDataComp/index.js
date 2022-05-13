import React from "react";
import {View} from 'react-native'
import NoDataSvg from "../../ImagesSource/NoDataSvg";

export default function EmptyDataComp() {
    return (
        <View style={{ alignContent: 'center', marginLeft: 50 }}>
            <NoDataSvg />
        </View>
    )
}