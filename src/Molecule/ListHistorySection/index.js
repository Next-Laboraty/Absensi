import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Divider, List, ListItem, Layout, Text, Button, Spinner } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { base64 } from "@firebase/util";
import moment from 'moment';
import AxiosGetDataAction from '../../lib/AxiosGetDataAction';
moment.locale('id')
function ListHistorySection() {
    const { server, token, employee } = useSelector((state) => state.employee)
    const { dataKehadiran } = useSelector(state => state.kehadiran)
    const [dataAbsen, setDataAbsen] = useState([])
    const [loadSec, setLoadSec] = useState({})
    const tgl = moment().format("YYYY-MM-DD")
    return (
        <>
            {
                dataKehadiran !== null ? dataKehadiran.map(Data => (
                    <Layout key={Data.name} style={{ marginHorizontal: 10, flexDirection: 'row', marginTop: '2%' }}>
                        <Layout style={{ width: '20%', marginTop: 15 }}>
                            <Text style={{ fontFamily: 'Medium' }}>{moment(Data.time).format("HH:mm")}</Text>
                        </Layout>
                        {
                            Data.log_type == 'IN' ?
                            <Layout style={{ flex: 1, backgroundColor: '#7A90FC', paddingHorizontal: 20, borderRadius: 10, paddingVertical: 5 }}>
                            <Text style={{ fontFamily: 'Medium', color: '#fff' }}>Absensi {Data.log_type == 'IN' ? 'Masuk' : 'Pulang'}</Text>
                            <Text style={{ fontFamily: 'Regular', fontSize: 11, color: '#fff' }}>{Data.device_id == 'ONL_APP_MOBILE' ? 'Menggunakan Aplikasi Mobile' : Data.device_id == 'ONL_DEVICE' ? 'Menggunakan Mesin Absen' : 'Absen Lainnya'}</Text>
                        </Layout>
                        :
                        <Layout style={{ flex: 1, backgroundColor: '#F55353', paddingHorizontal: 20, borderRadius: 10, paddingVertical: 5 }}>
                            <Text style={{ fontFamily: 'Medium', color: '#fff' }}>Absensi {Data.log_type == 'IN' ? 'Masuk' : 'Pulang'}</Text>
                            <Text style={{ fontFamily: 'Regular', fontSize: 11, color: '#fff' }}>{Data.device_id == 'ONL_APP_MOBILE' ? 'Menggunakan Aplikasi Mobile' : Data.device_id == 'ONL_DEVICE' ? 'Menggunakan Mesin Absen' : 'Absen Lainnya'}</Text>
                        </Layout>
                        }
                    </Layout>
                ))
                    :
                    <View style={{ alignContent: 'center', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                        <Spinner size={'tiny'} style={{ alignContent: 'center', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }} />
                    </View>
            }
        </>
    )
}

export default ListHistorySection