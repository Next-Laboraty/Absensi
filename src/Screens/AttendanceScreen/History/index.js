import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Divider, List, ListItem, Layout, Text, Button } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { base64 } from "@firebase/util";
import moment from 'moment';
moment.locale('id')

export default function History() {
    return (
        <Layout style={{ flex: 1 }}>
            {DateTimeNow()}
            {Tanggalan()}
            {SaatIni()}
            {SaatIni2()}
            {SaatIni3()}
        </Layout>
    )
}
function Tanggalan() {
    return (
        <Layout>
            <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: '10%', justifyContent: 'space-between' }}>
                <TouchableOpacity>
                    <Text style={styles.fontHari}>Min</Text>
                    <Text style={styles.fontTanggal}>21</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.fontHari}>Min</Text>
                    <Text style={styles.fontTanggal}>21</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: '#516BEB', padding: 5, borderRadius: 15, marginTop: -10 }}>
                    <Text style={styles.fontHariAktif}>Min</Text>
                    <Text style={styles.fontTanggalAktif}>21</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.fontHari}>Min</Text>
                    <Text style={styles.fontTanggal}>21</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.fontHari}>Min</Text>
                    <Text style={styles.fontTanggal}>21</Text>
                </TouchableOpacity>
            </View>
        </Layout>
    )
}
function DateTimeNow() {
    return (
        <Layout style={{ marginHorizontal: 10, flexDirection: 'row' }}>
            <Layout style={{ justifyContent: 'center', flex: 1 }}>
                <Layout style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: 'Bold', fontSize: 40 }}>24</Text>
                    <Layout style={{ justifyContent: 'center', marginTop: -10, marginLeft: 10 }}>
                        <Text style={{ fontFamily: 'Regular', fontSize: 12 }}>Jumat</Text>
                        <Text style={{ fontFamily: 'Regular', fontSize: 12 }}>Jan 2020</Text>
                    </Layout>
                </Layout>
            </Layout>
            <Layout style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginTop: -10 }}>
                <Button status='basic' style={{ backgroundColor: '#D0D7FC' }}>
                    <Text style={{ color: '#516BEB' }}>Sekarang</Text>
                </Button>
            </Layout>
        </Layout>
    )
}

function SaatIni() {
    return (
        <Layout style={{ marginHorizontal: 10, flexDirection: 'row', marginTop: '20%' }}>
            <Layout style={{ marginRight: '10%' }}>
                <Text style={{ fontFamily: 'Bold' }}>Jam</Text>
            </Layout>
            <Layout style={{ flex: 1 }}>
                <Text style={{ fontFamily: 'Bold' }}>Keterangan</Text>
            </Layout>
        </Layout>
    )
}
function SaatIni2() {
    const { server, token, employee } = useSelector((state) => state.employee)
    const [dataAbsen, setDataAbsen] = useState([])
    const [dataIstirahat, setDataIstirahat] = useState([])
    const url = `https://${base64.decodeString(server)}`
    const tgl = moment().format("YYYY-MM-DD")
    useEffect(() => {
        axios({
            url: url + `/api/resource/Employee Checkin?fields=["*"]&filters=[["employee","=","${employee.employee}"],["time",">","${tgl} 01:43:46.723880" ],["time","<","${tgl} 23:59:59.723880" ]]&order_by=modified desc`,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': 'application/json',
                'Authorization': `token ${base64.decodeString(token)}`

            },
            timeout: 1000
        }).then((res) => {
            setDataAbsen(res.data.data)
        })
            .catch((err) => console.log(err))
    }, [dataAbsen])
    return (
        <>
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
function SaatIni3() {
    const { server, token, employee } = useSelector((state) => state.employee)
    const [dataIstirahat, setDataIstirahat] = useState([])
    const url = "https://" + base64.decodeString(server)
    const [idle, setIdle] = useState(false)
    const tgl = moment().format("DD-MM-YYYY")
    useEffect(() => {
        axios({
            url: url + `/api/resource/Lunch?fields=["*"]&&filters=[["add","=","${employee.user_id}"],["tgl","=","${tgl}" ]]&order_by=modified desc`,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': 'application/json',
                'Authorization': `token ${base64.decodeString(token)}`

            },
            timeout: 1000
        }).then((res) => {
            setDataIstirahat(res.data.data)
            console.log(dataIstirahat)
            if(res.data.data !== []){
                setIdle(true)
            }
        })
            .catch((err) => console.log(err))
    }, [dataIstirahat,idle])
    return (
        <>
            {idle ? <>
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

            </> : <Text>Wait</Text>}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        maxHeight: 200,
    },
    fontTanggal: {
        fontFamily: 'Medium',
        textAlign: 'center'
    },
    fontHari: {
        fontFamily: 'Regular',
        textAlign: 'center'
    },
    fontTanggalAktif: {
        fontFamily: 'Medium',
        textAlign: 'center',
        fontSize: 20
    },
    fontHariAktif: {
        fontFamily: 'Regular',
        textAlign: 'center',
        fontSize: 20
    }
});