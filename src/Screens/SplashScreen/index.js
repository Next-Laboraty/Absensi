import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import BackgroundSplashScreen from "../../ImagesSource/BackgroundSplashScreen";

export default function SplashScreen() {
    return (
        <LinearGradient style={{ flex: 1, }} colors={['#5463FF', '#FFB2A6']}>
            <View style={{ flex: 1,justifyContent:'center' }}>
                <Text style={{textAlign:'center',fontFamily:'Bold',fontSize: 30,color:'#ECECEC'}}>
                    {`ONGLAI HRIS`}
                </Text>
                <BackgroundSplashScreen />
                <Text style={{textAlign:'center',marginTop:10,fontFamily:'Regular',color:'#EEEDDE'}}>Simple things to make your day better</Text>
            </View>
            <View style={{ height: '25%' }}>
                <ActivityIndicator animating={true} size="large" style={{ opacity: 1 }} color="#fff" />
                <Text style={{textAlign:'center',marginTop:'20%',color:'#fff',fontFamily:'Light'}}>V 2.0</Text>
            </View>
        </LinearGradient>
    )
}