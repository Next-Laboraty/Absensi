import React, { useState, useEffect } from 'react'
import { Text, View, ActivityIndicator, ScrollView, StyleSheet } from 'react-native'
import { MaterialIcons, MaterialCommunityIcons, Ionicons, FontAwesome, AntDesign, Entypo, EvilIcons, Octicons } from '@expo/vector-icons';
import MaintenanceScreen from '../../../Molecule/MaintenanceScreen'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { Button, Input, Select, SelectItem, IndexPath, Modal, Card } from '@ui-kitten/components';
import axios from 'axios';
import AxiosPostData from '../../../lib/AxiosPostData';
import LoadingComp from '../../../Atomic/LoadingComp';
import Fuse from 'fuse.js'
import { Divider, List, ListItem } from '@ui-kitten/components';

export default function PostIssue() {
    const [priority, setPriority] = useState(null)
    const [visible, setVisible] = useState(false);
    const [msg, setMsg] = useState({
        title: null,
        body: null
    })
    const [pilihIssue, setPilihIssue] = useState(false)
    const [listIssue, setListIssue] = useState()
    const [typeSearch, setTypeSearch] = useState()
    const [loading, setLoading] = useState(0)
    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
    const { server, token, employee } = useSelector(state => state.employee)
    const [rawDesc, setRawDesc] = useState(null)



    // Form
    const [judul, setJudul] = useState(null)
    const [issue, setIssue] = useState(null)
    const [prioritas, setPrioritas] = useState(null)

    let priodata = {
        server,
        token
    }
    useEffect(() => {
        AxiosPostData(`http:///103.179.57.18:21039/Issue/priority`, token, priodata).then(res => {
            setPriority(res.data)
            AxiosPostData(`http:///103.179.57.18:21039/Issue/issueType`, token, priodata).then(rest => {
                setListIssue(rest.data)
                setPrioritas(res.data[0].name)
                setLoading(1)
            })
                .catch(err => console.log('Error'))
        })
            .catch(err => console.log('Error'))

    }, [])

    const options = {
        includeScore: true,
        // Search in `author` and in `tags` array
        keys: ['name']
    }
    const fuse = new Fuse(listIssue, options)
    // 
    // console.log(result)
    const changeTextIssue = (next) => {
        const result = fuse.search(next)
        setTypeSearch(result)
    }
    const renderSearch = ({ item, index }) => (
        <ListItem
            title={item.item.name}
            onPress={() => {
                setIssue(item.item.name)
                setPilihIssue(false)
            }}
        />
    );
    const renderSearchEmpty = ({ item, index }) => (
        <ListItem
            title={item.name}
            onPress={() => {
                setIssue(item.name)
                setPilihIssue(false)
            }}
        />
    );
    const writeData = () => {
        if (!judul || !issue || !rawDesc) {
            setMsg({
                title: 'Gagal Mengirim Issue !',
                body: 'Periksa Judul, Tipe, Prioritas dan Deskripsi\nData tidak boleh kosong.'
            })
            setVisible(true)
        }
        else {
            let newString = rawDesc.replace(/\n/g, "<br>");
            let body = {
                status: 'Open',
                subject: judul,
                priority: prioritas,
                description: newString,
                issue_type: issue,
                raised_by: employee.user_id
            }
            let postdata = {
                ...priodata,
                payload:body
            }
            console.log(postdata)
            setMsg({
                title: 'Harap Tunggu !',
                body: 'Data Sedang dikirim..'
            })
            setVisible(true)
            axios.post('http://103.179.57.18:21039/Issue/PostIssue', postdata).then(res => {
                setMsg({
                    title: 'Laporan Berhasil dibuat',
                    body: 'Laporan yang anda buat sudah dikirim, mungkin membutuhkan waktu agar laporan anda dibaca oleh pihak perusahaan.'
                })
                setVisible(true)
            })
        }

    }
    if (loading === 0)
        return <LoadingComp />

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <ScrollView style={{ backgroundColor: '#FFFFFE', marginTop: 5, flex: 1 }}>

                    <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                        <Input label={'Judul Isu'} placeholder='Masukan Judul' onChangeText={(next) => setJudul(next)} />
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                        <Select
                            style={{ flex: 1 }}
                            label='Prioritas'
                            selectedIndex={selectedIndex}
                            onSelect={index => {
                                setSelectedIndex(index)
                                setPrioritas(priority[selectedIndex.row].name)
                            }}
                            value={priority[selectedIndex.row].name}>
                            {priority.map((item) => {
                                return (
                                    <SelectItem title={item.name} key={item.name} />
                                )
                            })}
                        </Select>
                        <Button appearance={'outline'} style={{ marginVertical: 20 }} onPress={() => setPilihIssue(true)}>{!issue ? 'Pilih Issue' : 'Issue : ' + issue} </Button>
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                        <Input
                            onChangeText={(next) => setRawDesc(next)}
                            label={'Deskripsi'}
                            placeholder='Masukan Deskripsi...'
                            multiline={true}
                            textStyle={{ minHeight: 250, textAlignVertical: 'top' }} />
                    </View>
                    <View style={{ marginTop: 40, marginHorizontal: 20 }}>
                    </View>
                </ScrollView>
                <Modal
                    visible={visible}
                    backdropStyle={StyleGw.backdrop}
                    onBackdropPress={() => setVisible(false)}>
                    <Card disabled={true}>
                        {
                            loading === 3 ?
                                <>
                                    <ActivityIndicator color={'#000'} />
                                    <Text style={{ fontFamily: 'Regular', textAlign: 'center' }}>Sedang Membuat Laporan</Text>
                                </>

                                :
                                <>
                                    <Text style={{ fontFamily: 'Bold', fontSize: 18, textAlign: 'center' }}>{msg.title}</Text>
                                    <Text style={{ marginHorizontal: 20, textAlign: 'center', fontFamily: 'Regular' }}>{msg.body}</Text>
                                    <Button onPress={() => setVisible(false)} style={{ marginTop: 40 }}>
                                        OKEY
                                    </Button>
                                </>
                        }
                    </Card>
                </Modal>
                <Modal
                    visible={pilihIssue}
                    backdropStyle={StyleGw.backdrop}
                    onBackdropPress={() => setPilihIssue(false)}>
                    <Card disabled={true} style={{ width: 300 }}>
                        <Text style={{ fontFamily: 'Bold', fontSize: 18, textAlign: 'center' }}>Cari Tipe Isu</Text>
                        <Input placeholder='Cari Tipe Issue' onChangeText={(next) => changeTextIssue(next)} />
                        {!typeSearch || typeSearch.length == 0 ?
                            <List
                                style={{ height: 300 }}
                                data={listIssue}
                                ItemSeparatorComponent={Divider}
                                renderItem={renderSearchEmpty}
                            />
                            :
                            <List
                                style={{ height: 300 }}
                                data={typeSearch}
                                ItemSeparatorComponent={Divider}
                                renderItem={renderSearch}
                            />
                        }
                    </Card>
                </Modal>

            </View>
            <View>
                <Button status={"primary"} style={{
                    margin: 20
                }} onPress={() => {
                    writeData()
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