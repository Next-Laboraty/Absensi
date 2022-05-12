import { Layout } from "@ui-kitten/components";
import React from "react";
import {View,Image,ActivityIndicator,Text} from 'react-native'
import NewQuotes from "../../lib/quotes";
export default function LoadingComp(){
    return(
        <View style={{justifyContent:'center',flex:1,alignSelf:'center'}}>
            <Image source={require('../../../assets/share.png')} style={{width:100,height:100,alignSelf:'center'}}/>
            <Text style={{textAlign:'center',fontFamily:'Regular',marginTop:'5%'}}>Loading...</Text>
            <ActivityIndicator color={'black'}/>
            <View style={{marginHorizontal:20,marginTop:'20%'}}>
                <Text style={{textAlign:'center',fontFamily:'ThinItalic'}}>{NewQuotes()}</Text>
            </View>
        </View >
    )
}