import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import BackgroundSplashScreen from "../../ImagesSource/BackgroundSplashScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginBase from "../../lib/LoginBase";

export default function SplashScreen({navigation}) {
    const [userAuth, setUserAuth] = useState()
    const datass = () => {
        setTimeout(() => {
          //Check if user_id is set or not
          //If not then send for Authentication
          //else send to Home Screen
          AsyncStorage.getItem('@AccountEmail', (error, result) => {
            navigation.replace(result === null ? 'Auth' : 'BottomTabsNavigator')
          });
        }, 3000);
    }
    datass()
    return (
        <LinearGradient style={{ flex: 1, }} colors={['#000', '#5463FF']}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', fontFamily: 'Bold', fontSize: 30, color: '#ECECEC' }}>
                    {`HRIS`}
                </Text>
                <BackgroundSplashScreen />
                <Text style={styles.TextSub}>Simple things to make your day better</Text>
            </View>
            <View style={{ height: '25%' }}>
                <ActivityIndicator animating={true} size="large" style={{ opacity: 1 }} color="rgba(255,255,255,0.5)" />
                <Text style={{ textAlign: 'center', marginTop: '20%', color: '#fff', fontFamily: 'Light' }}>V 2.0</Text>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    TextSub: {
        borderRadius: 30,
        textAlign: 'center',
        marginTop: '10%',
        fontFamily: 'Regular',
        color: '#fff',
        backgroundColor: 'rgba(19,148,135,0.3)',
        marginHorizontal: 20,
        paddingHorizontal: 20
    }
})