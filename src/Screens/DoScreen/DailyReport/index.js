import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { Divider, List, ListItem } from '@ui-kitten/components';
import { MaterialIcons, MaterialCommunityIcons, Ionicons, FontAwesome, AntDesign, Entypo, EvilIcons, Octicons } from '@expo/vector-icons';
import MaintenanceScreen from '../../../Molecule/MaintenanceScreen';
import AxiosPostData from '../../../lib/AxiosPostData';
import { useSelector } from 'react-redux';
import LoadingComp from '../../../Atomic/LoadingComp';
import EmptyDataComp from '../../../Atomic/EmptyDataComp';
import moment from 'moment';

export default function DailyReport({navigation}) {
    const { employee, token, server } = useSelector(state => state.employee)
    const [list, setList] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        AxiosPostData('https://chilly-panda-26.telebit.io/daily/', token, {
            employee: employee.employee,
            server,
            token
        }).then(res => {
            setList(res.data)
            setLoading(false)
        })
    }, [])
    const renderItem = ({ item, index }) => (
        <ListItem
            title={'Laporan bulan '+moment(item.start_date).format('MMMM')}
            description={`Terakhir di ubah pada ${moment(item.modified).format('ddd, D MMM YYYY HH:mm')}`}
            onPress={() => navigation.navigate('DailyReportBulanan', item)}
        />
    );
    if (loading) return <LoadingComp />
    if (list.length == 0) return <EmptyDataComp />
    return (
        <List
      data={list}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
    />
    )
}