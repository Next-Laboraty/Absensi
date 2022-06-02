import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Divider, List, Card, Button, Modal } from '@ui-kitten/components';
import { MaterialIcons, MaterialCommunityIcons, Ionicons, FontAwesome, AntDesign, Entypo, EvilIcons, Octicons } from '@expo/vector-icons';
import MaintenanceScreen from '../../../Molecule/MaintenanceScreen';
import AxiosPostData from '../../../lib/AxiosPostData';
import { useSelector } from 'react-redux';
import LoadingComp from '../../../Atomic/LoadingComp';
import EmptyDataComp from '../../../Atomic/EmptyDataComp';
import moment from 'moment';
import { NavigationContainer } from '@react-navigation/native';

export default function DailyReportBulanan({ route,navigation }) {
    
    const { employee, token, server } = useSelector(state => state.employee)
    const [dataBulanan, setDataBulanan] = useState()
    const [visible, setVisible] = useState(false)
    const [list, setList] = useState()
    const [msg, setMsg] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        let _mounty = false
        let mounty = setInterval(() => AxiosPostData(`https://chilly-panda-26.telebit.io/daily/${route.params.name}`, token, {
            employee: employee.employee,
            server,
            token
        }).then(res => {
            setDataBulanan(res.data)
            setList(res.data.times)
            setLoading(false)
        }), 2000)
        return () => {
            _mounty = true
            clearInterval(mounty)
        }
    }, [])
    const renderItem = ({ item, index }) => (
        <Card style={{ marginHorizontal: 10, marginVertical: 5, flex: 1 }}>
            <View style={{ flex: 1, marginBottom: 10 }}>
                <View>
                    <Text style={style.fontLabel}>Tugas</Text>
                    <Text>{item.tugas}</Text>
                </View>
                <View style={{ marginBottom: 30, marginTop: 20 }}>
                    <Text style={style.fontLabel}>Keterangan</Text>
                    <Text style={{ fontSize: 12, fontFamily: 'Regular' }}>{item.keterangan}</Text>
                </View>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={{ flex: 1, fontFamily: 'Bold' }}>{item.kemajuan}</Text>
                    <Text style={{ flex: 1, fontFamily: 'Bold' }}>{item.prioritas}</Text>
                </View>
            </View>
            {
                route.params.docstatus === 0
                ?
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button size={'small'} status={'danger'} style={{ flex: 1, marginRight: 5 }} onPress={() => onPressDelete(item.name)}>Hapus</Button>
                <Button size={'small'} style={{ flex: 1 }}>Edit</Button>
            </View>
            : null

            }
            <Text style={{fontFamily:'Regular',fontSize:8,textAlign:'center',marginTop:10}}>{moment(item.modified).format('[Dibuat pada ]dddd, DD MMMM YYYY')}</Text>
        </Card>
    );
    const onPressDelete = (timesid) => {
        AxiosPostData(`https://chilly-panda-26.telebit.io/daily/delete/${timesid}`, token, {
            server,
            token
        }).then(res => {
            console.log(res.data)
            setMsg('Data Berhasil di hapus')
            setVisible(true)
        })
    }
    if (loading) return <LoadingComp />
    if (list.length == 0) return (
        <View style={{ flex: 1 }}>
            <EmptyDataComp title={'Laporan bulan ini'} />
            {route.params.docstatus == 0 ?
            <Button style={{ margin: 10 }} onPress={()=>navigation.navigate('LaporanBulananBaru',{dataBulanan,input:false})}>Buat Baru</Button> 
        :
        null
        }
        </View>
    )
    return (
        <View style={{ flex: 1 }}>
            <List
                data={list}
                ItemSeparatorComponent={Divider}
                renderItem={renderItem}
            />
            {route.params.docstatus == 0 ?
            <Button style={{ margin: 10 }} onPress={()=>navigation.navigate('LaporanBulananBaru',{dataBulanan,input:false})}>Buat Baru</Button> 
        :
        null
        }
            <Modal
                visible={visible}
                backdropStyle={style.backdrop}
                onBackdropPress={() => setVisible(false)}>
                <Card disabled={true}>
                    <Text>{msg}</Text>
                    <Button onPress={() => setVisible(false)} style={{marginTop:20}}>
                        Okey
                    </Button>
                </Card>
            </Modal>
        </View>
    )
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
})