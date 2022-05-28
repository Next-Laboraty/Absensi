import React, { useEffect, useRef, useState } from "react";
import { Button, Layout, Text } from "@ui-kitten/components";
import { EvilIcons, Entypo } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { TouchableOpacity, SafeAreaView, View } from "react-native";
import * as Location from 'expo-location'
import * as Camera from 'expo-camera'

export default function PermissionScreen({ navigation, route }) {
    const dataBody = () => {
        if (route.params.name == 'Geolokasi')
            return "Dengan mengizinkan Geolokasi, kamu dapat menggunakan fitur Absensi dan Kunjungan klien"
        if (route.params.name == 'Kamera')
            return "Dengan mengizinkan Kamera, kamu dapat menggunakan fitur Kunjungan klien"
    }
    const logo = () => {
        if (route.params.name == 'Kamera')
            return <EvilIcons name="camera" size={120} color="#F73D93" />
        if (route.params.name == 'Geolokasi')
            return <Entypo name="location" size={120} color="#F73D93" />
    }
    const pencetan = () => {
        if (route.params.name == "Geolokasi") {
            Location.requestForegroundPermissionsAsync().then(result => {
                navigation.replace('BottomTabsNavigator')
            })
        }

        if (route.params.name == "Kamera") {
            Camera.requestCameraPermissionsAsync().then(result => {
                navigation.replace('Client')
            })
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Layout style={{ flex: 1 }}>
                <TouchableOpacity style={{ margin: 20, alignSelf: 'flex-end' }} onPress={() => Linking.openURL('https://onglai.id/kebijakan-privasi')}>
                    <Entypo name="help-with-circle" size={40} color="#EC9B3B" />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {logo()}
                    <Text style={{ fontFamily: 'Bold', marginTop: '5%' }}>Nyalakan {route.params.name}</Text>
                    <Text style={{ marginHorizontal: '5%', marginTop: '10%', textAlign: 'center', fontFamily: 'Regular' }}>{dataBody()}</Text>
                </View>
            </Layout>
            <Button style={{ margin: 30 }} onPress={() => pencetan()}>
                Selanjutnya
            </Button>
        </SafeAreaView>
    )
}