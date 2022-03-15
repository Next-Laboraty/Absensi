import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Divider, List, ListItem, Layout, Text, Button } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { base64 } from "@firebase/util";
import moment from 'moment';
import AxiosGetDataAction from '../../lib/AxiosGetDataAction';
moment.locale('id')
function ListHistorySection() {
    const { server, token, employee } = useSelector((state) => state.employee)
    const [dataAbsen, setDataAbsen] = useState([])
    const [loadSec, setLoadSec] = useState({})
    const tgl = moment().format("YYYY-MM-DD")
    const url = `https://${base64.decodeString(server)}/api/resource/Employee Checkin?fields=["*"]&filters=[["employee","=","${employee.employee}"],["time",">","${tgl} 01:43:46.723880" ],["time","<","${tgl} 23:59:59.723880" ]]&order_by=modified desc`
    const data = {
        url,
        token: base64.decodeString(token),
    }
    useEffect(() => {
        getDatafromDatabase()
        return () => {
            setLoadSec({}); // This worked for me
          };
    }, [])
    const getDatafromDatabase = () => {
        AxiosGetDataAction(data).then((res) => {
            setDataAbsen(res.data.data)
        }).catch((err) => console.log(err))
    }
    return (
        <>
        {/* <Text>Test</Text> */}
            {dataAbsen.map(Data => (
                <Layout key={Data.name} style={{ marginHorizontal: 10, flexDirection: 'row', marginTop: '2%' }}>
                    <Layout style={{ marginRight: '10%', marginTop: 15 }}>
                        <Text style={{ fontFamily: 'Medium' }}>{moment(Data.time).format("HH:mm")}</Text>
                    </Layout>
                    <Layout style={{ flex: 1, backgroundColor: '#7A90FC', paddingHorizontal: 20, borderRadius: 10, paddingVertical: 5 }}>
                        <Text style={{ fontFamily: 'Medium' }}>Absensi</Text>
                        <Text style={{ fontFamily: 'Regular', fontSize: 11 }}>{Data.longitude !== '' ? 'Menggunakan Aplikasi' : 'Menggunakan Mesin Absen / Lainnya'}</Text>
                    </Layout>
                </Layout>
            ))}
        </>
    )
}

export default ListHistorySection