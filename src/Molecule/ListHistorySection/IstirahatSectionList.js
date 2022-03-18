import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Divider, List, ListItem, Layout, Text, Button, Spinner } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { base64 } from "@firebase/util";
import moment from 'moment';
import AxiosGetDataAction from '../../lib/AxiosGetDataAction';
moment.locale('id')

export default function IstirahatSectionList() {
    const { server, token, employee } = useSelector((state) => state.employee)
    const [dataIstirahat, setDataIstirahat] = useState([])
    const [loadLazy, setLoadLazy] = useState({})
    const [loading, setLoading] = useState(true)
    const tanggal = moment().format("DD-MM-YYYY")
    const data = {
        url : `https://${base64.decodeString(server)}/api/resource/Lunch?fields=["*"]&filters=[["add","=","${employee.user_id}"],["tgl","=","${tanggal}" ]]&order_by=modified desc`,
        token: base64.decodeString(token),
    }
    useEffect(() => {
        getDatafromDatabase()
        return () => {
            setLoadLazy({}); // This worked for me
          };
    }, [])
    const getDatafromDatabase = () => {
        AxiosGetDataAction(data).then((res) => {
            setDataIstirahat(res.data.data)
            setLoading(false)
        }).catch((err) => console.log(err))
    }
    return (
        <>
            {loading ? <Spinner size={'tiny'} /> :
                <>
                    {dataIstirahat.map(Data => (
                        <Layout key={Data.name} style={{ marginHorizontal: 10, flexDirection: 'row', marginTop: '2%' }}>
                            <Layout style={{ marginRight: '10%', marginTop: 15 }}>
                                <Text style={{ fontFamily: 'Medium' }}>{moment(`${Data.modified}`).format("HH:mm")}</Text>
                            </Layout>
                            <Layout style={{ flex: 1, backgroundColor: '#FF7648', paddingHorizontal: 20, borderRadius: 10, paddingVertical: 5 }}>
                                <Text style={{ fontFamily: 'Medium' }}>{Data.ket}</Text>
                                <Text style={{ fontFamily: 'Regular', fontSize: 11 }}>{Data.lat == 'ONGLAI NEXT LAB DEVICE' ? 'Menggunakan Mesin Absen' : 'Menggunakan Aplikasi / Lainnya'}</Text>
                            </Layout>
                        </Layout>
                    ))}
                </>
            }
        </>
    )
}