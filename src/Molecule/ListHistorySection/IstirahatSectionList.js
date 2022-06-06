import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Divider, List, ListItem, Layout, Text, Button, Spinner } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import moment from 'moment';
moment.locale('id')

export default function IstirahatSectionList() {
    const { server, token, employee } = useSelector((state) => state.employee)
    const { dataIstirahat } = useSelector(state => state.kehadiran)
    const [loadLazy, setLoadLazy] = useState({})
    const [loading, setLoading] = useState(true)
    const tanggal = moment().format("DD-MM-YYYY")
    useEffect(() => {
        console.log(dataIstirahat)
    },[])
    const dateSplit = (string) => {
        return string.split('-')
    }
    return (
        <>
            {dataIstirahat.map(Data => (
                <View key={Data.name}>
                    <Layout style={{ marginHorizontal: 10, flexDirection: 'row', marginTop: '2%' }}>
                        <Layout style={{ width: '20%', marginTop: 15 }}>
                            <Text style={{ fontFamily: 'Medium' }}>{moment(`${dateSplit(Data.tgl)[2]}-${dateSplit(Data.tgl)[1]}-${dateSplit(Data.tgl)[0]} ${Data.jam}`).format('HH:mm')}</Text>
                        </Layout>
                        <Layout style={{ flex: 1, backgroundColor: '#FF7648', paddingHorizontal: 20, borderRadius: 10, paddingVertical: 5 }}>
                            <Text style={{ fontFamily: 'Medium', color: '#fff' }}>{`Mulai Istirahat`}</Text>
                            <Text style={{ fontFamily: 'Regular', fontSize: 11, color: '#fff' }}>
                                {Data.lat == 'ONGLAI NEXT LAB DEVICE'?
                                'Menggunakan Mesin Absensi'
                                :
                                Data.lat == ''
                                ?
                                '(Pemantauan Serius)'
                                :
                                'Menggunakan Aplikasi Mobile'
                                }
                            </Text>
                        </Layout>
                    </Layout>
                    {Data.lat2 !== null ?
                    <Layout style={{ marginHorizontal: 10, flexDirection: 'row', marginTop: '2%' }}>
                        <Layout style={{ width: '20%', marginTop: 15 }}>
                            <Text style={{ fontFamily: 'Medium' }}>{moment(`${dateSplit(Data.tgl)[2]}-${dateSplit(Data.tgl)[1]}-${dateSplit(Data.tgl)[0]} ${Data.jam2}`).format('HH:mm')}</Text>
                        </Layout>
                        <Layout style={{ flex: 1, backgroundColor: '#D61C4E', paddingHorizontal: 20, borderRadius: 10, paddingVertical: 5 }}>
                            <Text style={{ fontFamily: 'Medium', color: '#fff' }}>Istirahat selesai {Data.ket}</Text>
                            <Text style={{ fontFamily: 'Regular', fontSize: 11, color: '#fff' }}>
                            {Data.lat == 'ONGLAI NEXT LAB DEVICE'?
                                'Menggunakan Mesin Absensi'
                                :
                                Data.lat == ''
                                ?
                                '(Pemantauan Serius)'
                                :
                                'Menggunakan Aplikasi Mobile'
                                }
                            </Text>
                        </Layout>
                    </Layout>
                    :
                    null    
                }
                </View>
            ))}
        </>
    )
}