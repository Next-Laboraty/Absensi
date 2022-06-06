import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import BackgroundSplashScreen from "../../ImagesSource/BackgroundSplashScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from "react-redux";
import { employee_data, employee_mail, employee_server, employee_token } from "../../features/employee/employeeSlice";
import LoadData from "./LoadData";
import * as Notifications from 'expo-notifications'

export default function SplashScreen({ navigation, data }) {
    useEffect(() => {
        FirstCome()
    }, [])
    const dispatch = useDispatch()
    const FirstCome = () => {
        AsyncStorage.getItem('@AccountEmail', async (error, result) => {
            if (result === null) {
                navigation.replace('Auth')
            }
            else {
                const server = await AsyncStorage.getItem('@AccountServer')
                const dataEmployee = await AsyncStorage.getItem('@AccountEmployee')
                const token = await AsyncStorage.getItem('@AccountToken')
                const dataEmp = JSON.parse(dataEmployee)
                dispatch(employee_data(dataEmp))
                dispatch(employee_server(server))
                dispatch(employee_token(token))
                setTimeout(() => {
                    navigation.replace('BottomTabsNavigator')
                    
                }, 4000);
            }
        })
    }
    // loginFirebase(data)
    return (
        <LinearGradient style={{ flex: 1, }} colors={['#000', '#5463FF']}>
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'flex-end' }}>
                {/* <Text style={{ textAlign: 'center', fontFamily: 'Bold', fontSize: 30, color: '#ECECEC' }}>
                    {`HRIS`}
                </Text> */}
                <BackgroundSplashScreen />
                <Text style={styles.TextSub}>{`Simple things to make\nYour day better`}</Text>
            </View>
            <View style={{ height: '25%', alignSelf: 'center', justifyContent: 'flex-end' }}>
                <LoadData />
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
        marginHorizontal: 20,
        paddingHorizontal: 20
    }
})