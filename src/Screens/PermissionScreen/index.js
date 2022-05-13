import React, { useEffect, useRef, useState } from "react";
import { Button, Layout, Text } from "@ui-kitten/components";
import { EvilIcons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { startActivityAsync, ActivityAction } from 'expo-intent-launcher';
import { Camera } from 'expo-camera';

export default function PermissionScreen(props) {
    return (
        <Layout style={{ flex: 1 }}>
            <Layout style={{ flex: 1,alignItems:'center',justifyContent:'center'}}>
                <EvilIcons name="camera" size={120} color="#F73D93" />
                <Text style={{fontFamily:'Bold'}}>Akses Kamera</Text>
                <Text style={{marginHorizontal:30,textAlign:'center', fontFamily:'Regular'}}>
                    Kami membutuhkan ijin mengakses kamera untuk kebutuhan kunjungan Klien{`\n`}
                    dan sebagai pengalaman penggunaan aplikasi lebih baik
                    </Text>
            </Layout>
            <Button style={{ margin: 10,marginHorizontal:30,marginBottom:20 }} onPress={()=>Linking.openSettings().then(a => props.navigation.push('BottomTabsNavigator')).catch(er => console.log(err))}>Buka Pengaturan</Button>
        </Layout>
    )
}