import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { MaterialIcons, MaterialCommunityIcons, Ionicons, FontAwesome, AntDesign, Entypo, EvilIcons, Octicons } from '@expo/vector-icons';
import MaintenanceScreen from '../../../Molecule/MaintenanceScreen'
import NewQuotes from '../../../lib/quotes';
import moment from 'moment';
import { useSelector } from 'react-redux';
import axios from 'axios';


export default function SalarySlipScreen({ route }) {
    const dataNumber = (number) => {
        return 'Rp. ' + number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    const { employee, server, token } = useSelector(state => state.employee)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const dats = route.params.item
    useEffect(() => {
        let data = {
            server,
            token,
            id: dats.name
        }
        axios.post('http://103.179.57.18:21039/Payslip/getDATA', data).then(
            res => {
                setData(res.data)
                setLoading(false)
            }
        ).catch(err => console.log(err))
    }, [])
    if (loading || data == null) {
        return (
            <View style={{ marginTop: '20%' }}>
                <MaintenanceScreen />
                <ActivityIndicator size={'small'} color={'blue'} />
                <Text style={{ textAlign: 'center', fontFamily: 'Medium', marginTop: '30%' }}>Tunggu Sebentar</Text>
                <Text style={{ fontFamily: 'ThinItalic', textAlign: 'center', marginHorizontal: 10, marginTop: 10 }}>
                    <NewQuotes />
                </Text>
            </View>
        )
    }
    else {
        return (
                <View style={{ flex: 1, marginBottom: 20 }}>
                    {
                        data.status == 'Cancelled' ?
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ flex: 1, fontFamily: "Medium", fontSize: 24, color: 'white', paddingLeft: 25, paddingHorizontal: 10, backgroundColor: '#F55353', marginTop: 10, marginLeft: 1, marginRight: 78, height: 55, paddingVertical: 10, borderTopRightRadius: 15, borderBottomRightRadius: 15 }}>{data.status}</Text>
                            </View>
                            :
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ flex: 1, fontFamily: "Medium", fontSize: 24, color: 'white', paddingLeft: 25, paddingHorizontal: 10, backgroundColor: '#516BEB', marginTop: 10, marginLeft: 1, marginRight: 78, height: 55, paddingVertical: 10, borderTopRightRadius: 15, borderBottomRightRadius: 15 }}>{data.status}</Text>
                            </View>
                    }
                    <View style={{ height: 54, flexDirection: 'row', backgroundColor: '#FFFFFE', borderRadius: 40, marginHorizontal: 5 }}>
                        <View style={{ marginTop: 15, marginLeft: 15 }}>
                            <View style={{ width: 30, height: 30, backgroundColor: '#516BEB', borderRadius: 120 / 2, paddingLeft: 1, justifyContent: 'center' }}>
                                <AntDesign name="calendar" size={15} color="white" style={{ alignSelf: 'center' }} />
                            </View>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 15, color: '#000000', fontWeight: 'bold' }}>Periode Waktu</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 15, color: '#ADACAC' }}>{moment(data.start_date).format('DD MMM YYYY')} - </Text>
                                <Text style={{ fontSize: 15, color: '#ADACAC' }}>{moment(data.end_date).format('DD MMM YYYY')}</Text>
                            </View>
                        </View>
                    </View>
                    <ScrollView style={styles.card}>
                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                            <Text style={{ fontFamily: 'Medium', fontSize: 15, color: '#2C3333', paddingLeft: 7 }}>Februari 2022</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.textTitle}>{data.employee_name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.textSub}>{data.designation}</Text>
                        </View>
                        <View style={styles.textLoop}>
                            <Text style={{ fontFamily: 'Regular', fontSize: 8 }}>Jumlah Absen</Text>
                            <Text style={{ fontFamily: 'Medium', fontSize: 8 }}>{data.jumlah_absen}</Text>
                        </View>
                        <View style={styles.textLoop}>
                            <Text style={{ fontFamily: 'Regular', fontSize: 8 }}>Jumlah Hari Kerja</Text>
                            <Text style={{ fontFamily: 'Medium', fontSize: 8 }}>{data.total_working_days}</Text>
                        </View>
                        <View style={styles.textLoop}>
                            <Text style={{ fontFamily: 'Regular', fontSize: 8 }}>Jumlah Lembur</Text>
                            <Text style={{ fontFamily: 'Medium', fontSize: 8 }}>{data.jam_lembur}</Text>
                        </View>
                        <View style={styles.textLoop}>
                            <Text style={{ fontFamily: 'Regular', fontSize: 8 }}>Jumlah Cuti</Text>
                            <Text style={{ fontFamily: 'Medium', fontSize: 8 }}>{data.leave_without_pay}</Text>
                        </View>
                        <View style={styles.textLoop}>
                            <Text style={{ fontFamily: 'Regular', fontSize: 8 }}>KPI</Text>
                            <Text style={{ fontFamily: 'Medium', fontSize: 8 }}>{data.total_kpi}</Text>
                        </View>
                        <View style={{ height: 20, backgroundColor: 'white' }}>

                        </View>
                        <View style={styles.textLoop}>
                            <Text style={{ fontFamily: 'Regular', fontSize: 8, color: 'black' }}>Gaji Kotor</Text>
                            <Text style={{ fontFamily: 'Medium', fontSize: 8 }}>{dataNumber(data.gross_pay)}</Text>
                        </View>
                        <View style={styles.textLoop}>
                            <Text style={{ fontFamily: 'Regular', fontSize: 8, color: 'red' }}>Potongan</Text>
                            <Text style={{ fontFamily: 'Medium', fontSize: 8 }}>{dataNumber(data.total_deduction)}</Text>
                        </View>
                        <View style={styles.textLoop}>
                            <Text style={{ fontFamily: 'Regular', fontSize: 8, color: 'black' }}>Gaji NET</Text>
                            <Text style={{ fontFamily: 'Medium', fontSize: 8 }}>{dataNumber(data.net_pay)}</Text>
                        </View>
                        <View style={styles.textLoop}>
                            <Text style={{ fontFamily: 'Regular', fontSize: 8, color: 'blue' }}>Gaji Bersih</Text>
                            <Text style={{ fontFamily: 'Medium', fontSize: 8 }}>{dataNumber(data.rounded_total)}</Text>
                        </View>
                        <View>
                            <Text style={{ fontFamily: 'Bold', marginHorizontal: 10, fontSize: 15, color: 'red', marginTop: 15 }}>Potongan</Text>
                            {
                                data.deductions.map(loop => {
                                    return (
                                        <View style={styles.textLoop} key={loop.name} >
                                            <Text style={{ fontFamily: 'Regular', fontSize: 8 }}>{loop.salary_component}</Text>
                                            <Text style={{ fontFamily: 'Medium', fontSize: 8 }}>{dataNumber(loop.amount)}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                        <View style={{ marginBottom: 50 }}>
                            <Text style={{ fontFamily: 'Bold', marginHorizontal: 10, fontSize: 15, color: 'blue', marginTop: 15 }}>Pendapatan</Text>
                            {
                                data.earnings.map(loop => {
                                    return (
                                        <View style={styles.textLoop} key={loop.name} >
                                            <Text style={{ fontFamily: 'Regular', fontSize: 8 }}>{loop.salary_component}</Text>
                                            <Text style={{ fontFamily: 'Medium', fontSize: 8 }}>{dataNumber(loop.amount)}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    textTitle: {
        color: '#2C3333', fontFamily: 'Medium', fontSize: 15, paddingLeft: 7
    },
    textSub: {
        color: '#ADACAC', fontFamily: 'Medium', fontSize: 10, paddingLeft: 7,
        marginBottom: 10
    },
    card: {
        paddingBottom: 200,
        borderRadius: 16,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        marginVertical: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    textLoop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10
    }
})