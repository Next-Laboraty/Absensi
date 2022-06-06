import React from "react";
import {View, Text, Image, Dimensions} from 'react-native'
export default function ErrorFunction(){
    let width = Dimensions.get('window').width *0.5
    return(
        <View style={{alignSelf:'center',justifyContent:'center',alignItems:'center',flex:1}}>
            <Image source={require('../../../assets/no-wifi.png')} style={{width:width, height:width,marginBottom:20}} />
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontFamily:'ExtraBold',fontSize:60,marginRight:10}}>UPS</Text>
                <View style={{width:10,height:50,backgroundColor:'black'}}>

                </View>
                <View style={{marginLeft:10}}>
                    <Text style={{fontFamily:'Medium',fontSize:18}}>NO</Text>
                    <Text style={{fontFamily:'Medium',fontSize:18}}>Signal</Text>
                </View>
            </View>
            <Text style={{textAlign:'center',fontFamily:'Regular'}}>Periksa Kembali Jaringan Internet anda</Text>
        </View>
    )
}