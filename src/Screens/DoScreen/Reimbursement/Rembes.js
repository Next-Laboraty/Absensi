import React, { Component, useEffect } from 'react'
import { Text, View, TextInput, ScrollView } from 'react-native'
import { MaterialIcons, MaterialCommunityIcons, Ionicons, FontAwesome, AntDesign, Entypo, EvilIcons, Octicons } from '@expo/vector-icons';
import MaintenanceScreen from '../../../Molecule/MaintenanceScreen'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { Button } from '@ui-kitten/components';

export default function Rembes() {
    const { employee } = useSelector(state => state.employee)
    console.log(employee)
    return (
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <ScrollView style={{ backgroundColor: '#FFFFFE', marginTop: 5, borderRadius: 20, flex: 1 }}>
                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                    <Text style={{ fontFamily: 'Medium', fontSize: 11, color: '#2C3333', paddingLeft: 7 }}>{employee.employee_name}</Text>
                    <Text style={{ fontFamily: 'Medium', fontSize: 15, color: '#ADACAC', paddingLeft: 7, fontWeight: 'bold', marginRight: 15 }}>{employee.designation}</Text>
                </View>
                <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                    <Text style={{ marginBottom: 5, fontFamily: 'Regular' }}>Masukan Tanggal</Text>
                    <TextInput placeholder='' style={{
                        borderWidth: 1, fontSize: 10,
                    }} />
                </View>
                <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                    <Text style={{ marginBottom: 5, fontFamily: 'Regular' }}>Tipe Klaim</Text>
                    <TextInput placeholder='' style={{
                        borderWidth: 1, fontSize: 10
                    }} />
                </View>
                <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                    <Text style={{ marginBottom: 5, fontFamily: 'Regular' }}>Deskripsi</Text>
                    <TextInput placeholder='' style={{
                        borderWidth: 1, fontSize: 10,
                    }} />
                </View>
                <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                    <Text style={{ marginBottom: 5, fontFamily: 'Regular' }}>Total</Text>
                    <TextInput placeholder='' style={{
                        borderWidth: 1, fontSize: 10,
                    }} />
                </View>
                <View style={{ marginTop: 40, marginHorizontal: 20 }}>
                    <Button status={"danger"} style={{ borderWidth: 1, marginHorizontal: 100, borderRadius: 15, fontFamily: 'Regular' }}>Upload Bukti </Button>

                </View>
                <View style={{margin: 20, flex: 1, backgroundColor: '#E6E6E6', height: 170}}>
                <Text style={{alignSelf: 'center', marginTop: 70, color: 'white', fontFamily: 'Regular', fontSize: 20, fontWeight: 'bold' }}>Preview</Text>
                </View>
            </ScrollView>
            <Button status={"info"} style={{ marginVertical: 10, marginHorizontal:10 }}>Ajukan</Button>
        </View>
    )
}