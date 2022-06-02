import React, { useState, useEffect } from 'react'
import { Text, View, Image, ActivityIndicator } from 'react-native'
import { List, ListItem } from '@ui-kitten/components';
import LoadingComp from '../../../Atomic/LoadingComp';
import { useSelector } from 'react-redux';
import axios from 'axios'
import moment from 'moment';

export default function PenilaianKPI(props) {
    const [loading, setLoading] = useState(true)
    const { server, employee, token } = useSelector(state => state.employee)
    const [data, setData] = useState(null)
    const dataServer = {
        server,
        token,
        employee: employee.employee
    }
    useEffect(() => {
        axios.post(`http:///103.179.57.18:21039/KPI`, dataServer).then(res => {
            setData(res.data)
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        })
    }, [])
    const renderItem = ({ item, index }) => (
        <ListItem
            onPress={() => {
                props.navigation.push('kpicheck',{
                    name: item.name
                })
            }}
            title={`${item.kra_template} - ${moment(item.end_date).format('DD MMMM YYYY')}`}
            style={{ marginVertical: 2 }}
            description={`Skor KPI ${item.total_score}`} />
    );
    if (loading)
        return (
            <LoadingComp />
        )
    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: '10%', backgroundColor: '#6A67CE', margin: 10, borderRadius: 15, alignSelf: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'white', textAlign: 'center', padding: 10, fontFamily: 'Regular' }}>
                    Alat mengukur serta mengevaluasi kinerja karyawan dalam perusahaan
                </Text>
            </View>
            <List
                style={{ flex: 1 }}
                data={data}
                renderItem={renderItem}
            />
        </View>
    );
}