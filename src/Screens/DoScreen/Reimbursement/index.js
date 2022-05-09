import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { MaterialIcons, MaterialCommunityIcons, Ionicons, FontAwesome, AntDesign, Entypo, EvilIcons, Octicons } from '@expo/vector-icons';
import MaintenanceScreen from '../../../Molecule/MaintenanceScreen'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class SalarySlipScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1, marginBottom: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1, fontFamily: "Medium", fontSize: 20, color: 'white', paddingLeft: 5, paddingHorizontal: 10, backgroundColor: '#516BEB', marginTop: 46, marginLeft: 1, height: 50, marginRight: 70, paddingVertical: 10, borderTopRightRadius: 15, borderBottomRightRadius: 15 }}>Reimbursement</Text>
                    <View style={{fontFamily: "Medium", backgroundColor: '#516BEB', borderRadius: 15, height: 40, color: '#FFFFFF', marginTop: 50, alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, padding:10 }}>
                        <Text style={{ fontFamily: "Medium", color: "#FFFFFF"}}>Kembali</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: '#FFFFFE', flex: 1, marginTop: 5, borderRadius: 20 }}>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontFamily: 'Medium', fontSize: 11, color: '#2C3333', paddingLeft: 7 }}>Nama</Text>
                        <Text style={{ fontFamily: 'Medium', fontSize: 15, color: '#2C3333', paddingLeft: 7, fontWeight: 'bold' }}>AgungPriyatna</Text>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <Text style={{ fontFamily: 'Medium', fontSize: 11, color: '#2C3333', paddingLeft: 7 }}>No Rekeni__ng</Text>
                        <Text style={{ fontFamily: 'Medium', fontSize: 15, color: '#2C3333', paddingLeft: 7, fontWeight: 'bold' }}>7384962784</Text>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <Text style={{ fontFamily: 'Medium', fontSize: 11, color: '#2C3333', paddingLeft: 7 }}>Bank</Text>
                        <Text style={{ fontFamily: 'Medium', fontSize: 15, color: '#2C3333', paddingLeft: 7, fontWeight: 'bold' }}>BCA</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ flex: 1, fontFamily: "Medium", fontSize: 15, color: '#FFFFFF', backgroundColor: '#516BEB', marginLeft: 1, marginRight: 210, height: 45, width: 50, paddingVertical: 10, borderTopRightRadius: 15, borderBottomRightRadius: 15, borderTopLeftRadius: 15, borderBottomLeftRadius: 15, paddingLeft: 20 }}>Upload Bukti </Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1, backgroundColor: '#EBEBEB', alignItems: 'center', alignContent: 'center', justifyContent: 'center', marginHorizontal: 20, marginTop: 10, marginBottom: 10 }}>
                        <Text style={{ fontFamily: 'Medium', fontSize: 15 }}>Preview Hello</Text>
                    </View>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1, fontFamily: "Medium", fontSize: 20, color: '#FFFFFF', backgroundColor: '#516BEB', marginLeft: 1, marginRight: 220, height: 55, paddingVertical: 10, borderTopRightRadius: 15, borderBottomRightRadius: 15, borderTopLeftRadius: 15, borderBottomLeftRadius: 15, paddingLeft: 20 }}>Ajukan </Text>
                </TouchableOpacity>
            </View>
        )
    }
}