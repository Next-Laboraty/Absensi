import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Dimensions, RefreshControl, TouchableOpacity } from 'react-native'
import { Divider, List, Card, Button, Modal } from '@ui-kitten/components';
import { MaterialIcons, MaterialCommunityIcons, Ionicons, FontAwesome5, AntDesign, Entypo, EvilIcons, Octicons } from '@expo/vector-icons';
import MaintenanceScreen from '../../../Molecule/MaintenanceScreen';
import AxiosPostData from '../../../lib/AxiosPostData';
import { useSelector } from 'react-redux';
import LoadingComp from '../../../Atomic/LoadingComp';
import EmptyDataComp from '../../../Atomic/EmptyDataComp';
import moment from 'moment';
import { NavigationContainer } from '@react-navigation/native';
import ErrorFunction from '../../../Molecule/ErrorFunction';

export default function DailyReportBulanan({ route, navigation }) {
    const width = Dimensions.get('window').width
    const [refreshing, setRefreshing] = useState(false)
    const { employee, token, server } = useSelector(state => state.employee)
    const [dataBulanan, setDataBulanan] = useState()
    const [visible, setVisible] = useState(false)
    const [list, setList] = useState()
    const [msg, setMsg] = useState({
        title: null,
        body: null
    })
    const [loading, setLoading] = useState(true)
    const [_error, set_error] = useState(true)
    useEffect(() => {
        navigation.addListener('focus', () => {
            onRefresh()
          });
    }, [])
    const onRefresh = () => {
        setLoading(true)
        AxiosPostData(`https://chilly-panda-26.telebit.io/daily/${route.params.name}`, token, {
            employee: employee.employee,
            server,
            token
        }).then(res => {
            if (res.data.messageErr) {
                setLoading(false)
                set_error(true)
            }
            else {
                set_error(false)
                setDataBulanan(res.data)
                setList(res.data.times)
                setLoading(false)
            }
        }).catch(err => {
            setLoading(false)
            set_error(true)
        })
    }
    const iconify = (item) => {
        if (item === 'Dalam Proses') return <AntDesign name="clockcircleo" size={20} color="#FF9A00" style={{ alignSelf: 'center', top: 20 }} />
        else if (item === 'Tertahan') return <AntDesign name="pausecircle" size={20} color="#FF165D" style={{ alignSelf: 'center', top: 20 }} />
        else if (item === 'Menunggu Persetujuan') return <FontAwesome5 name="user-lock" size={20} color="#FF165D" style={{ alignSelf: 'center', top: 20 }} />
        else if (item === 'Selesai') return <Ionicons name="checkmark-done-circle" size={20} color="#1FAB89" style={{ alignSelf: 'center', top: 20 }} />
        else return <MaterialIcons name="remove-done" size={20} color="black" style={{ alignSelf: 'center', top: 20 }} />
    }
    const bodyStatus = (item, doc) => {
        if (doc == 0) {
            if (item == 'Normal') {
                return (
                    <View style={{ width: 20, backgroundColor: '#FFAAA5', height: '100%', justify: 'center', borderTopStartRadius: 20 }}>
                    </View>
                )
            }
            else if (item == 'High') {
                return (
                    <View style={{ width: 20, backgroundColor: '#FFDE7D', height: '100%', justify: 'center', borderTopStartRadius: 20 }}>
                    </View>
                )
            }
            else if (item == 'Urgent') {
                return (
                    <View style={{ width: 20, backgroundColor: '#F6416C', height: '100%', justify: 'center', borderTopStartRadius: 20 }}>
                    </View>
                )
            }
            else {
                return (
                    <View style={{ width: 20, backgroundColor: '#00B8A9', height: '100%', justify: 'center', borderTopStartRadius: 20 }}>
                    </View>
                )
            }
        } else {
            if (item == 'Normal') {
                return (
                    <View style={{ width: 20, backgroundColor: '#FFAAA5', height: '100%', justify: 'center', borderTopStartRadius: 20, borderBottomStartRadius: 10 }}>
                    </View>
                )
            }
            else if (item == 'High') {
                return (
                    <View style={{ width: 20, backgroundColor: '#FFDE7D', height: '100%', justify: 'center', borderTopStartRadius: 20, borderBottomStartRadius: 10 }}>
                    </View>
                )
            }
            else if (item == 'Urgent') {
                return (
                    <View style={{ width: 20, backgroundColor: '#F6416C', height: '100%', justify: 'center', borderTopStartRadius: 20, borderBottomStartRadius: 10 }}>
                    </View>
                )
            }
            else {
                return (
                    <View style={{ width: 20, backgroundColor: '#00B8A9', height: '100%', justify: 'center', borderTopStartRadius: 20, borderBottomStartRadius: 10 }}>
                    </View>
                )
            }
        }
    }
    const textTest = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`
    const renderItem = ({ item, index }) => (
        <View style={{ flexDirection: 'row', marginHorizontal: 10 }} key={item.name}>
            <View style={{ alignSelf: 'center', alignItems: 'center', marginRight: 10, }}>
                <Text style={{ fontFamily: 'Bold', fontSize: 20 }}>{moment(item.tanggal).format('DD')}</Text>
                <Text style={{ fontFamily: 'Medium' }}>{moment(item.tanggal).format('ddd').toLocaleUpperCase()}</Text>
            </View>
            <View style={style.container}>
                <View style={{ flexDirection: 'row' }}>
                    {bodyStatus(item.prioritas, route.params.docstatus)}
                    <View style={{ marginVertical: 10, flex: 1 }}>
                        <Text style={{ textAlign: 'left', paddingLeft: 10, color: '#000', fontSize: 14, fontFamily: 'Bold' }}>{item.tugas.length <= 30 ? item.tugas : item.tugas.substr(0, 30) + '...'}</Text>
                        <Text style={{ alignItems: 'flex-start', textAlign: 'left', paddingLeft: 10, fontSize: 12 }}>
                            {item.keterangan.length <= 60 ? item.keterangan : item.keterangan.substr(0, 60) + '...'}
                            {/* {textTest.length <= 60 ? textTest : textTest.substr(0, 60) + '...'} */}
                        </Text>
                    </View>
                    <View style={{ width: 30, height: '100%', justify: 'center', borderTopStartRadius: 20, alignItems: 'center' }}>
                        {iconify(item.kemajuan)}
                    </View>
                </View>
                {item.docstatus === 0 ?
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ flex: 1, backgroundColor: '#61C0BF', borderBottomStartRadius: 10 }}
                        onPress={() => navigation.navigate('LaporanBulananBaru', { dataBulanan, input: true, item })}>
                            <Text style={{ textAlign: 'center', fontFamily: 'Regular', color: '#fff' }}>
                                Ubah
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1, backgroundColor: '#FF2E63', borderBottomEndRadius: 20, }} onPress={()=>onPressDelete(item.name)}>
                            <Text style={{ textAlign: 'center', fontFamily: 'Regular', color: '#fff', }}>
                                Hapus
                            </Text>
                        </TouchableOpacity>
                    </View> :
                    null
                }
            </View>
        </View>
    );
    const onPressDelete = (timesid) => {
        setLoading(true)
        AxiosPostData(`https://chilly-panda-26.telebit.io/daily/delete/${timesid}`, token, {
            server,
            token
        }).then(res => {
            if (res.data.messageErr) {
                setVisible(true)
                setMsg({
                    title: res.data.title,
                    body: res.data.body
                })
                setLoading(false)
            }
            else {
                setMsg({
                    title: 'Yeay data berhasil di hapus',
                    body: 'Anda telah menghapus 1 laporan harian'
                })
                setVisible(true)
                onRefresh()
                setLoading(false)
            }
        })
            .catch(err => {
                setMsg({
                    title: err.title,
                    body: err.body
                })
                setLoading(false)
            })
    }
    if (loading) {
        return <LoadingComp />
    }
    else {
        if (_error) {
            return (
                <View style={{ flex: 1 }}>
                    <ErrorFunction />
                    <Button appearance={'ghost'} status={'warning'} style={{ margin: 20 }} onPress={() => onRefresh()}>Coba Kembali</Button>
                </View>
            )
        }
        else {
            if (list.length == 0) return (
                <View style={{ flex: 1 }}>
                    <EmptyDataComp title={'Laporan bulan ini'} />
                    {route.params.docstatus == 0 ?
                        <Button style={{ margin: 10 }} onPress={() => navigation.navigate('LaporanBulananBaru', { dataBulanan, input: false })}>Buat Baru</Button>
                        :
                        null
                    }
                </View>
            )
            else {
                return (
                    <View style={{ flex: 1, backgroundColor: '#F9F9FF' }}>
                        <View style={{ flexDirection: 'row', marginHorizontal: 20, justifyContent: 'space-around' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 10, height: 10, backgroundColor: '#FFAAA5', marginRight: 10, borderRadius: 10 / 2 }}></View>
                                <Text>Normal</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 10, height: 10, backgroundColor: '#FFDE7D', marginRight: 10, borderRadius: 10 / 2 }}></View>
                                <Text>Tinggi</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 10, height: 10, backgroundColor: '#F6416C', marginRight: 10, borderRadius: 10 / 2 }}></View>
                                <Text>Urgent</Text>
                            </View>
                        </View>
                        <List
                            style={{ backgroundColor: '#F9F9FF' }}
                            refreshControl={<RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />}
                            data={list}
                            renderItem={renderItem}
                        />
                        {route.params.docstatus == 0 ?
                            <Button style={{ margin: 10 }} onPress={() => navigation.navigate('LaporanBulananBaru', { dataBulanan, input: false })}>Buat Baru</Button>
                            :
                            null
                        }
                        <Modal
                            visible={visible}
                            backdropStyle={style.backdrop}
                            onBackdropPress={() => setVisible(false)}>
                            <Card disabled={true} style={{ width: width * 0.7 }}>
                                <Text style={{ textAlign: 'center', fontFamily: 'Medium', fontSize: 14 }}>{msg.title}</Text>
                                <Text style={{ textAlign: 'center', fontFamily: 'Regular', fontSize: 12 }}>{msg.body}</Text>
                                <Button onPress={() => setVisible(false)} style={{ marginTop: 20 }}>
                                    Okey
                                </Button>
                            </Card>
                        </Modal>
                    </View>
                )

            }
        }
    }
}

const style = StyleSheet.create({
    fontLabel: {
        fontSize: 10,
        fontFamily: 'ExtraBold',
        color: '#7F8487',
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: "#000",
        borderTopStartRadius: 20,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 10,
        borderTopEndRadius: 10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        marginVertical: 10,
    }
})