import { Button, Card, Datepicker, Input, Select, Modal, SelectItem, IndexPath } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import { MomentDateService } from '@ui-kitten/moment';
import { useSelector } from "react-redux";
import AxiosPostData from "../../../lib/AxiosPostData";
import LoadingComp from "../../../Atomic/LoadingComp";

const CalendarIcon = () => {
    return <AntDesign name="calendar" size={20} color="black" />
}
const renderIcon1 = () => {
    return <AntDesign name="notification" size={20} color="black" />
}
const _kemajuan = [
    'Dalam Proses',
    'Tertahan',
    'Menunggu Persetujuan',
    'Selesai'
];

const _status = [
    'Normal',
    'High',
    'Urgent'
]
const startOfMonth = moment().startOf('month')
const endOfMonth = moment().endOf('month')
const dateService = new MomentDateService();
export default function InsertDailyReport({ route, navigation }) {
    const [loading, setLoading] = useState(false)
    const { employee, token, server } = useSelector(state => state.employee)
    const width = Dimensions.get('window').width
    const [msg, setMsg] = useState({
        title: null,
        body: null
    })
    const [_done, set_Done] = useState(false)
    const [visible, setVisible] = useState(false)
    const [selectKemajuan, setSelectKemajuan] = useState(new IndexPath(0));
    const [selectStatus, setSelectStatus] = useState(new IndexPath(0));
    const [date, setDate] = React.useState(moment());
    const displayKemajuan = _kemajuan[selectKemajuan.row];
    const displayStatus = _status[selectStatus.row];
    const [tugas, setTugas] = useState(null)
    const [keterangan, setKeterangan] = useState(null)
    useEffect(() => {
        if (route.params.item) {
            let item = route.params.item
            setKeterangan(item.keterangan)
            setTugas(item.tugas)
            setSelectKemajuan(new IndexPath(_kemajuan.indexOf(item.kemajuan)))
            setSelectStatus(new IndexPath(_status.indexOf(item.prioritas)))
        }
        else {
            console.log('no')
        }
    }, [])
    const kemajuanOption = (title, index) => (
        <SelectItem title={title}  key={index}/>
    );
    const statusOption = (title, index) => (
        <SelectItem title={title} key={index} />
    );
    const onSubmitEvent = () => {
        setLoading(true)
        let data
        if (!route.params.input) {
            let edited =
            {
                name: '7b87d8de6e',
                tanggal: date,
                kemajuan: displayKemajuan,
            }
            if (route.params.dataBulanan.times.length === 0) {
                data = { times: [edited] }
            }
            else {
                if (!tugas || !keterangan) {
                    setMsg({
                        title: 'Data tidak Valid',
                        body: 'Pastikan anda mengisi form dengan benar'
                    })
                    setVisible(true)
                }
                else {
                    let item = route.params.dataBulanan.times
                    data = {
                        times: [
                            ...item,
                            {
                                tanggal: moment(date).format('YYYY-MM-DD'),
                                kemajuan: displayKemajuan,
                                prioritas: displayStatus,
                                keterangan,
                                tugas,
                                owner: employee.user_id
                            }
                        ]
                    }
                    let payload = {
                        server,
                        token,
                        data
                    }
                    AxiosPostData(`https://chilly-panda-26.telebit.io/daily/new/${route.params.dataBulanan.name}`, token, payload).then(res => {
                        if (res.data.messageErr) {
                            setLoading(false)
                            setMsg({
                                body: res.data.body,
                                title: res.data.title
                            })
                            setVisible(true)
                        }
                        else {
                            setLoading(false)
                            set_Done(true) //nanti hapus
                            setMsg({
                                title: 'Data berhasil dibuat',
                                body: 'Anda akan dialihkan ke halaman selanjutnya'
                            })
                            setVisible(true)
                        }
                    }).catch(err => {
                        setLoading(false)
                        setLoading(false)
                        setMsg({
                            body: err.body,
                            title: err.title
                        })
                        setVisible(true)
                    })
                }
            }
        }
        else {
            if (!tugas || !keterangan) {
                setLoading(false)
                setMsg({
                    title: 'Data tidak Valid',
                    body: 'Pastikan anda mengisi form dengan benar'
                })
                setVisible(true)
            }
            else {
                let edited =
                {
                    name: route.params.item.name,
                    tanggal: moment(date).format('YYYY-MM-DD'),
                    kemajuan: displayKemajuan,
                    prioritas: displayStatus,
                    keterangan,
                    tugas,
                    owner: employee.user_id
                }
                let item = route.params.dataBulanan.times
                let dataValid = item.map(e => e.name !== edited.name ? e : edited)
                data = {
                    times: dataValid.sort((a, b) => moment(a.tanggal).format('YYYYMMDD') - moment(b.tanggal).format('YYYYMMDD'))
                }
                let payload = {
                    server,
                    token,
                    data
                }
                AxiosPostData(`https://chilly-panda-26.telebit.io/daily/new/${route.params.dataBulanan.name}`, token, payload).then(res => {
                    if (res.data.messageErr) {
                        setLoading(false)
                        setMsg({
                            body: res.data.body,
                            title: res.data.title
                        })
                        setVisible(true)
                    }
                    else {
                        setLoading(false)
                        set_Done(true) //nanti hapus
                        setMsg({
                            title: 'Data berhasil dibuat',
                            body: 'Anda akan dialihkan ke halaman selanjutnya'
                        })
                        setVisible(true)
                    }
                }).catch(err => {
                    setLoading(false)
                    setMsg({
                        body: err.body,
                        title: err.title
                    })
                    setVisible(true)
                })
            }
        }
    }
    if (loading) return <LoadingComp />
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView style={{ flex: 1 }}>

                <Card style={{ flex: 1 }}>
                    <Datepicker
                        placeholder='Pick Date'
                        date={date}
                        min={startOfMonth}
                        max={endOfMonth}
                        dateService={dateService}
                        onSelect={nextDate => setDate(nextDate)}
                        accessoryRight={CalendarIcon}
                    />
                    {/* <DateTimePicker  /> */}
                    <Input
                        label='Tugas'
                        value={tugas}
                        placeholder='Masukan judul tugas'
                        style={{ marginBottom: 20 }}
                        caption={'Contoh : Membuat design untuk perusahan ABC'}
                        accessoryRight={renderIcon1}
                        onChangeText={next => setTugas(next)}
                    //   onChangeText={nextValue => setValue(nextValue)}
                    />
                    <View style={styles.selectRow}>
                        <Select
                            style={styles.select}
                            placeholder='Default'
                            label={'Kemajuan'}
                            value={displayKemajuan}
                            selectedIndex={selectKemajuan}
                            onSelect={index => setSelectKemajuan(index)}>
                            {_kemajuan.map(kemajuanOption)}
                        </Select>
                        <Select
                            label={'Status'}
                            style={styles.select}
                            placeholder='Default'
                            value={displayStatus}
                            selectedIndex={selectStatus}
                            onSelect={index => setSelectStatus(index)}>
                            {_status.map(statusOption)}
                        </Select>
                    </View>
                    <Input
                        label={'Keterangan'}
                        value={keterangan}
                        textAlignVertical={'top'}
                        onChangeText={next => setKeterangan(next)}
                        multiline={true}
                        textStyle={{ minHeight: 124 }}
                        placeholder='Masukan Keterangan Tugas'
                    />
                </Card>
            </ScrollView>
            <Modal
                visible={visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setVisible(false)}>
                <Card disabled={true} style={{ width: width * 0.7 }}>
                    <Text style={{ textAlign: 'center', fontFamily: 'Medium', fontSize: 14 }}>{msg.title || ''}</Text>
                    <Text style={{ textAlign: 'center', fontFamily: 'Regular', fontSize: 12 }}>{msg.body || ''}</Text>
                    {!_done ?
                        <Button onPress={() => setVisible(false)} style={{ marginTop: 20 }}>
                            Okey
                        </Button> :
                        <Button onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
                            Kembali
                        </Button>}

                </Card>
            </Modal>
            <Button style={{ margin: 10 }} status={'info'} onPress={() => {
                onSubmitEvent()
            }
            }>Buat Laporan</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    select: {
        flex: 1,
    },
    selectRow: {
        flexDirection: 'row',
        marginBottom: 20
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
})