import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons, MaterialCommunityIcons, Ionicons, FontAwesome, AntDesign, Entypo, EvilIcons, Octicons } from '@expo/vector-icons';

export default class DailyReport extends Component {
    render() {
        return (
            <View style={{ flex: 1, marginBottom: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1, fontFamily: "Medium", fontSize: 20, color: 'white', paddingLeft: 20, paddingHorizontal: 10, backgroundColor: '#516BEB', marginTop: 46, marginLeft: 1, height: 50, marginRight: 130, paddingVertical: 10, borderTopRightRadius: 15, borderBottomRightRadius: 15 }}>Asuransi</Text>
                    <View style={{ fontFamily: "Medium", backgroundColor: '#516BEB', borderRadius: 15, height: 40, color: '#FFFFFF', marginTop: 50, alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, padding: 10 }}>
                        <Text style={{ fontFamily: "Medium", color: "#FFFFFF" }}>Kembali</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: '#FFFFFE', flex: 1, marginTop: 5, borderRadius: 20, marginRight: 15, marginLeft: 15 }}>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontFamily: 'Medium', fontSize: 11, color: '#2C3333', paddingLeft: 7 }}>Nama Karyawan</Text>
                        <Text style={{ fontFamily: 'Medium', fontSize: 15, color: '#2C3333', paddingLeft: 7, fontWeight: 'bold' }}>Agung Priyatna</Text>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <Text style={{ fontFamily: 'Medium', fontSize: 11, color: '#2C3333', paddingLeft: 7 }}>Jabatan</Text>
                        <Text style={{ fontFamily: 'Medium', fontSize: 15, color: '#2C3333', paddingLeft: 7, fontWeight: 'bold' }}>Admin Online</Text>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <Text style={{ fontFamily: 'Medium', fontSize: 11, color: '#2C3333', paddingLeft: 7 }}>EMP Karyawan</Text>
                        <Text style={{ fontFamily: 'Medium', fontSize: 15, color: '#2C3333', paddingLeft: 7, fontWeight: 'bold' }}>00082</Text>
                    </View>
                    <View style={{ marginHorizontal: 15, marginTop: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={{ fontSize: 15, fontFamily: 'Medium', }}>Tanggal</Text>
                        <TouchableOpacity>
                            <AntDesign name="caretright" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginHorizontal: 15, marginTop: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={{ fontSize: 15, fontFamily: 'Medium', }}>Tugas</Text>
                        <TouchableOpacity>
                            <AntDesign name="caretright" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginHorizontal: 15, marginTop: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={{ fontSize: 15, fontFamily: 'Medium', }}>Kemajuan</Text>
                        <TouchableOpacity>
                            <AntDesign name="caretright" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginHorizontal: 15, marginTop: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={{ fontSize: 15, fontFamily: 'Medium', }}>Prioritas</Text>
                        <TouchableOpacity>
                            <AntDesign name="caretright" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginHorizontal: 15, marginTop: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={{ fontSize: 15, fontFamily: 'Medium', }}>Keterangan</Text>
                        <TouchableOpacity>
                            <AntDesign name="caretright" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginHorizontal: 15, marginTop: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={{ fontSize: 15, fontFamily: 'Medium', }}>Hasil  Pelatihan</Text>
                        <TouchableOpacity>
                            <AntDesign name="caretright" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ flexDirection: 'row' }}>
                        <Text style={{ flex: 1, fontFamily: "Medium", fontSize: 20, color: '#FFFFFF', backgroundColor: '#516BEB', marginLeft: 1, marginRight: 200, height: 40, paddingVertical: 5, borderTopRightRadius: 15, borderBottomRightRadius: 15, borderTopLeftRadius: 15, borderBottomLeftRadius: 15, paddingLeft: 20 }}>Tambah </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}