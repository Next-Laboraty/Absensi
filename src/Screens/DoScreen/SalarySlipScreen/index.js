import React, { useEffect, useState } from 'react'
import { Layout, List, ListItem, Divider, Button, } from '@ui-kitten/components'
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator,RefreshControl } from 'react-native'
import { MaterialIcons, MaterialCommunityIcons, Ionicons, FontAwesome, AntDesign, Entypo, EvilIcons, Octicons } from '@expo/vector-icons';
import MaintenanceScreen from '../../../Molecule/MaintenanceScreen'
import { useSelector } from 'react-redux';
import axios from 'axios';
import NewQuotes from '../../../lib/quotes';
import moment from 'moment';

export default function SalarySlipScreen(props) {
    const [refreshing, setRefreshing] = React.useState(false);
    const { employee, server, token } = useSelector(state => state.employee)
    const [loading, setLoading] = useState(true)
    const [bulan, setBulan] = useState()
    let dataSlip = {
        server,
        token,
        employee: employee.employee
    }
    useEffect(() => {
        panggilData()
    }, [])
    const panggilData = async () => {
        await axios.post('http://103.179.57.18:21039/Payslip', dataSlip).then(res => {
            setBulan(res.data)
            console.log(bulan)
            setTimeout(() => {
                setLoading(false)
            }, 2000)
        })
            .catch(err => console.log(err))
    }
    const renderItem = ({ item, index }) => (
        <ListItem
        accessoryRight={InstallButton(item)}
            onPress={() => props.navigation.push('CekSlipGaji', { item })}
            title={`${item.name}`}
            description={`${moment(item.modified).format('dddd, DD MMM YYYY (HH:mm)')}`}
        />
    );
    const InstallButton = (props) => (
        <>
        { props.status == 'Submitted' ?
            <Button size='tiny' status={'info'}>
                Dikirim
            </Button>
            :
            props.status == 'Cancelled' ?
            <Button size='tiny' status={'danger'}>
                Dibatalkan
            </Button>
            :
            <Button size='tiny'>
                {props.status}
            </Button>

        }
        </>
    );
    const MaintenanceScreenS = () => {
        return (
            <View style={{ marginTop: '20%' }}>
                <MaintenanceScreen />
                <Text style={{ textAlign: 'center', fontFamily: 'Medium', marginTop: '30%' }}>Uppsss.... Data tidak ditemukan</Text>
            </View>
        )
    }
    const loadingData = () => {
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
    const onRefresh = React.useCallback(() => {
        panggilData()
    }, []);
    const adaData = () => {
        return (
            <View>
                <List
                    refreshControl={<RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />}
                    style={styles.container}
                    data={bulan}
                    ItemSeparatorComponent={Divider}
                    renderItem={renderItem}
                />
            </View>
        )
    }
    const getData = () => {
        if (loading) {
            return loadingData()
        }
        else {
            if (!bulan) {
                return MaintenanceScreenS()
            }
            else {
                return adaData()
            }
        }
    }
    return (
        <View>
            {getData()}
        </View>
    )
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
        borderRadius: 16,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        marginVertical: 5,
        padding: 10,
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
        justifyContent: 'space-between'
    }
})