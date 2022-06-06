import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, InteractionManager } from 'react-native'
import { Divider, List, ListItem } from '@ui-kitten/components';
import { MaterialIcons, MaterialCommunityIcons, Ionicons, FontAwesome, AntDesign, Entypo, EvilIcons, Octicons } from '@expo/vector-icons';
import MaintenanceScreen from '../../../Molecule/MaintenanceScreen';
import AxiosPostData from '../../../lib/AxiosPostData';
import { useSelector } from 'react-redux';
import LoadingComp from '../../../Atomic/LoadingComp';
import EmptyDataComp from '../../../Atomic/EmptyDataComp';
import moment from 'moment';
import ErrorFunction from '../../../Molecule/ErrorFunction'
import { Button } from 'react-native-paper';

export default function DailyReport({ navigation }) {
    const { employee, token, server } = useSelector(state => state.employee)
    const [list, setList] = useState()
    const [_error, set_error] = useState(false)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        AxiosPostData('https://chilly-panda-26.telebit.io/daily/', token, {
            employee: employee.employee,
            server,
            token
        }).then(res => {
            if (res.data.messageErr) {
                set_error(true)
                setLoading(false)
            }
            else {
                setList(res.data)
                setLoading(false)
            }
        }).catch(err => {
            set_error(true)
            setLoading(false)
        })
    }, [])
    const onRetry = () => {
        setLoading(true)
        AxiosPostData('https://chilly-panda-26.telebit.io/daily/', token, {
            employee: employee.employee,
            server,
            token
        }).then(res => {
            if (res.data.messageErr) {
                set_error(true)
                setLoading(false)
            }
            else {
                set_error(false)
                setList(res.data)
                setLoading(false)
            }
        }).catch(err => {
            set_error(true)
            setLoading(false)
        })
    }
    const renderItem = ({ item, index }) => (
        <TouchableOpacity style={styles.containerList} onPress={() => navigation.navigate('DailyReportBulanan', item)}>
            {item.docstatus ===1?
            <View style={{ width: 5, height: '100%', backgroundColor: '#FC5185', borderTopStartRadius: 10, borderBottomStartRadius: 10 }}>

            </View>:
            <View style={{ width: 5, height: '100%', backgroundColor: '#364F6B', borderTopStartRadius: 10, borderBottomStartRadius: 10 }}>

            </View>
            }
            <View style={{ padding: 5,flex:1 }}>
                <Text style={{ fontFamily: 'Medium', fontSize: 12 }}>{'Laporan bulan ' + moment(item.start_date).format('MMMM')}</Text>
                <Text style={{ fontFamily: 'Regular', fontSize: 8 }}>{`Terakhir di ubah pada ${moment(item.modified).format('ddd, D MMM YYYY HH:mm')}`}</Text>
            </View>
            <View style={{alignSelf:'center',marginRight:10}}>
                <AntDesign name="arrowright" size={18} color="black" />
            </View>

        </TouchableOpacity>
        // <ListItem
        //     style={{ marginHorizontal: 10, marginVertical: 2 }}
        //     title={'Laporan bulan ' + moment(item.start_date).format('MMMM')}
        //     description={`Terakhir di ubah pada ${moment(item.modified).format('ddd, D MMM YYYY HH:mm')}`}
        //     onPress={() => navigation.navigate('DailyReportBulanan', item)}
        // />
    );
    if (loading) {
        return <LoadingComp />
    } else {
        if (_error) {
            return (
                <View style={{ flex: 1 }}>
                    <ErrorFunction />
                    <Button style={{ margin: 20 }} onPress={() => onRetry()}>Coba Kembali</Button>
                </View>
            )
        }
        else {
            if (list.length == 0) return <EmptyDataComp />
            else {
                return (
                    <View style={{ flex: 1, backgroundColor: '#DAEAF1' }}>
                        <List
                        style={{marginTop:10, backgroundColor: '#DAEAF1'}}
                            data={list}
                            renderItem={renderItem}
                        />
                    </View>
                )
            }
        }
    }
}
const styles = StyleSheet.create({
    containerList: {
        marginHorizontal: 10,
        borderRadius: 5,
        flexDirection: 'row',
        backgroundColor: '#fff', marginBottom: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    }
})