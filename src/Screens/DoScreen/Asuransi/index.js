import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, ScrollView, StyleSheet } from 'react-native'
import { MaterialIcons, MaterialCommunityIcons, Ionicons, FontAwesome, AntDesign, Entypo, EvilIcons, Octicons } from '@expo/vector-icons';
import MaintenanceScreen from '../../../Molecule/MaintenanceScreen'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { Button, Input, Select, SelectItem, IndexPath, Modal, Card } from '@ui-kitten/components';
import axios from 'axios';
import AxiosPostData from '../../../lib/AxiosPostData';
import LoadingComp from '../../../Atomic/LoadingComp';
import InformationWithPhoto from '../../../Molecule/InformationWithPhoto';

export default function Asuransi() {
    const [priority, setPriority] = useState(null)
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(true)
    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
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
                <ScrollView style={{ backgroundColor: '#FFFFFE', marginTop: 5, flex: 1 }}>

                    <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                        <Input label={'Judul Isu'} placeholder='Masukan Judul' />
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Select
                                style={{ flex: 1, marginRight: 10 }}
                                label='Prioritas'
                                selectedIndex={selectedIndex}
                                onSelect={index => setSelectedIndex(index)}
                                value={priority[selectedIndex.row].name}>
                                {priority.map((item) => {
                                    return (
                                        <SelectItem title={item.name} key={item.name} />
                                    )
                                })}
                            </Select>
                            <Select
                                style={{ flex: 1, marginLeft: 10 }}
                                label='Tipe Isu'
                                selectedIndex={selectedIndex}
                                onSelect={index => setSelectedIndex(index)}
                                value={priority[selectedIndex.row].name}>
                                {priority.map((item) => {
                                    return (
                                        <SelectItem title={item.name} key={item.name} />
                                    )
                                })}
                            </Select>
                        </View>
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                        <Input
                            label={'Deskripsi'}
                            placeholder='Masukan Deskripsi...'
                            multiline={true}
                            textStyle={{ minHeight: 250, textAlignVertical: 'top' }} />
                        {/* command bawah adalah style manual */}
                        {/* <TextInput placeholder='Masukan Deskripsi' style={StyleGw.inputText} /> */}
                    </View>
                    <View style={{ marginTop: 40, marginHorizontal: 20 }}>
                    </View>
                </ScrollView>
                <Modal
                    visible={visible}
                    backdropStyle={StyleGw.backdrop}
                    onBackdropPress={() => setVisible(false)}>
                    <Card disabled={true}>
                        <Text style={{fontFamily:'Bold', fontSize:18,textAlign:'center'}}>Perhatian !!!</Text>
                        <Text style={{marginHorizontal:20,textAlign:'center'}}>Halaman Ini sedang Tahap pengembangan, belum bisa digunakan sampai proses maintenance selesai</Text>
                        <Button onPress={() => setVisible(false)} style={{marginTop:40}}>
                            OKEY
                        </Button>
                    </Card>
                </Modal>
            </View>
            <View>
                <Button status={"primary"} style={{
                    margin: 20
                }} onPress={() => {
                    setVisible(true)
                }}>Kirim ke Perusahaan</Button>
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
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
})