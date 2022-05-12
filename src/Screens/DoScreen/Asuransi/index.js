import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, ScrollView, Picker, StyleSheet } from 'react-native'
import { MaterialIcons, MaterialCommunityIcons, Ionicons, FontAwesome, AntDesign, Entypo, EvilIcons, Octicons } from '@expo/vector-icons';
import MaintenanceScreen from '../../../Molecule/MaintenanceScreen'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { Button, Input } from '@ui-kitten/components';
import axios from 'axios';
import AxiosPostData from '../../../lib/AxiosPostData';
import LoadingComp from '../../../Atomic/LoadingComp';
import InformationWithPhoto from '../../../Molecule/InformationWithPhoto';

export default function Asuransi() {
    const [priority, setPriority] = useState(null)
    const [loading, setLoading] = useState(true)
    const { server, token, employee } = useSelector(state => state.employee)
    let priodata = {
        server,
        token
    }
    useEffect(() => {
        AxiosPostData(`http:///103.179.57.18:21039/Issue/priority`, token, priodata).then(res => {
            setPriority(res.data)
            setLoading(false)
        })
            .catch(err => alert('Error'))
    }, [])
    const [selectPriority, setSelectPriority] = useState("Pilih")
    if (priority === null)
        return <LoadingComp />
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>

                <Text style={{ fontFamily: 'Bold', fontSize: 30, textAlign: 'center', color: '#205375' }}>Buat Isu Baru</Text>
                <View>
                <InformationWithPhoto />
                </View>
                <ScrollView style={{ backgroundColor: '#FFFFFE', marginTop: 5, flex: 1 }}>

                    <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                        <Text style={{ marginBottom: 5, fontFamily: 'Regular' }}>Judul Isu</Text>
                        <Input placeholder='Masukan Judul' />
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                        <Text style={{ marginBottom: 5, fontFamily: 'Regular' }}>Prioritas</Text>
                        <View style={{ borderWidth: 1, borderRadius: 5, borderColor: '#7F8487' }}>
                            <Picker
                                selectedValue={selectPriority}
                                style={{ height: 25, fontFamily: 'Regular' }}
                                onValueChange={(itemValue, itemIndex) => setSelectPriority(itemValue)}
                            >
                                <Picker.Item label="Pilih Prioritas" />
                                {
                                    priority.map((item) => {
                                        return (
                                            <Picker.Item label={item.name} value={item.name} key={item.name} />
                                        )
                                    })
                                }
                            </Picker>
                        </View>
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                        <Text style={{ marginBottom: 5, fontFamily: 'Regular' }}>Tipe Isu</Text>
                        <Input placeholder='Masukan Tipe Isu' />
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                        <Text style={{ marginBottom: 5, fontFamily: 'Regular' }}>Deskripsi</Text>
                        <Input placeholder='Masukan Deskripsi' />
                        {/* command bawah adalah style manual */}
                        {/* <TextInput placeholder='Masukan Deskripsi' style={StyleGw.inputText} /> */}
                    </View>
                    <View style={{ marginTop: 40, marginHorizontal: 20 }}>
                    </View>
                </ScrollView>
            </View>
            <View>
                <Button status={"primary"} style={{
                    fontFamily: 'Regular'
                }}>Tambah</Button>
            </View>
        </View>
    )
}

const StyleGw = StyleSheet.create({
    inputText: {
        borderWidth: 1,
        fontSize: 13,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderColor: '#7F8487'
    }
})