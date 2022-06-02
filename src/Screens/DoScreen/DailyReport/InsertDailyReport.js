import { Button, Card, Datepicker, Input, Select, SelectGroup, SelectItem, IndexPath } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { View, StyleSheet,ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import { MomentDateService } from '@ui-kitten/moment';

const CalendarIcon = () => {
    return <AntDesign name="calendar" size={24} color="black" />
}
const renderIcon1 = () => {
    return <AntDesign name="notification" size={24} color="black" />
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
const dateService = new MomentDateService();
export default function InsertDailyReport({route}) {
    const [selectKemajuan, setSelectKemajuan] = useState(new IndexPath(0));
    const [selectStatus, setSelectStatus] = useState(new IndexPath(0));
    const [date, setDate] = React.useState(moment());
    const displayKemajuan = _kemajuan[selectKemajuan.row];
    const displayStatus = _status[selectStatus.row];
    useEffect(() => {

    }, [])
    const kemajuanOption = (title) => (
        <SelectItem title={title} />
    );
    const statusOption = (title) => (
        <SelectItem title={title} />
    );
        const onChangeDatess =(next) => {
            setDate(new Date())
        }
    return (
        <View style={{ flex: 1,backgroundColor:'#fff' }}>
            <ScrollView style={{flex:1}}>
                
            <Card style={{ flex: 1 }}>
            <Datepicker
        placeholder='Pick Date'
        date={date}
        dateService={dateService}
        onSelect={nextDate => setDate(nextDate)}
      />
                {/* <DateTimePicker  /> */}
                <Input
                    value={'value'}
                    label='Tugas'
                    placeholder='Masukan judul tugas'
                    style={{ marginBottom: 20 }}
                    caption={'Contoh : Membuat design untuk perusahan ABC'}
                    accessoryRight={renderIcon1}
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
                    multiline={true}
                    textStyle={{ minHeight: 124 }}
                    placeholder='Masukan Keterangan Tugas'
                />
            </Card>
                </ScrollView>
            <Button style={{ margin: 10 }} status={'info'} onPress={()=>{
                let data
                if(route.params.dataBulanan.times.length > 0){
                    data = {
                        times:[
                            {
                                tanggal:date,
                                kemajuan:displayKemajuan,
                            },
                                ...route.params.dataBulanan.times
                        ]
                    }
                }
                else{
                    data = {
                        times:[
                            {
                                tanggal:date,
                                kemajuan:displayKemajuan,
                            }
                        ]
                    }
                }
                console.log(data)
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
        marginBottom:20
    }
})