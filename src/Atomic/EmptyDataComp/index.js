import React from "react";
import {View, Text, Image, Dimensions} from 'react-native'
var {width} = Dimensions.get('window');
import NoDataSvg from "../../ImagesSource/NoDataSvg";

export default function EmptyDataComp(props) {
    const {width} = Dimensions.get('window');
    const ukuran = width * 0.8
    return (
        <View style={{ alignContent: 'center',flex:1 }}>
            {/* <NoDataSvg /> */}
            <View style={{alignSelf:'center'}}>
            {/* <Image source={require('../../../assets/bg.png')} style={{width:ukuran,height:ukuran}} /> */}
            <Image source={require('../../../assets/Saly-11.png')} style={{width:ukuran,height:ukuran,marginLeft:30}}/>

            </View>
            <View style={{marginHorizontal:20}}>
            <Text style={{textAlign:'center',fontFamily:'ExtraBold',fontSize: 60}}>Ups...</Text>
            <Text style={{textAlign:'center',fontFamily:'Medium'}}>Anda belum mempunyai {props.title}</Text>
            </View>
        </View>
    )
}