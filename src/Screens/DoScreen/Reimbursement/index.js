import React, { useEffect, useState } from 'react'
import { Layout, Text, List, ListItem, Divider, Button, } from '@ui-kitten/components'
import MaintenanceScreen from '../../../Molecule/MaintenanceScreen'
import { StyleSheet, View, RefreshControl, ScrollView } from 'react-native';
import LoadingComp from '../../../Atomic/LoadingComp';
import AxiosPostData from '../../../lib/AxiosPostData';
import { useSelector } from 'react-redux';
import EmptyDataComp from '../../../Atomic/EmptyDataComp'
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
export default function Reimbursement(props) {
    const [refreshing, setRefreshing] = React.useState(false);
    const { server, token, employee } = useSelector(state => state.employee)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        onApi()
    }, [])
    const onApi = () => {
        AxiosPostData('http:///103.179.57.18:21039/Rembes/all', token, {
            server,
            token,
            employee: employee.employee
        }).then(res => {
            setData(res.data)
            setLoading(false)
        })
            .catch(err => {
                alert(err)
            })
    }
    const [data, setData] = useState(null)
    const onRefresh = React.useCallback(() => {
        onApi()
    }, []);
    const renderItem = ({ item, index }) => (
        <ListItem
            accessoryRight={InstallButton(item)}
            onPress={() => props.navigation.navigate('BuktiRembes', item)}
            title={`${item.name}`}
            description={`Rp. ${Number(item.total_claimed_amount).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`}
        />
    );
    const InstallButton = (props) => (
        <>
            <Button size='tiny'  >
                {props.status == 'Draft' ? 'Menunggu Persetujuan' : props.status == 'Rejected' ? 'Ditolak' : props.status}
            </Button>
        </>
    );
    if (loading)
        return <LoadingComp />
    return (
        <View style={styles.container}>
            {data.length > 0 ?
                <List
                    refreshControl={<RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />}
                    style={styles.container}
                    data={data}
                    ItemSeparatorComponent={Divider}
                    renderItem={renderItem}
                />
                :
                <View style={styles.container}>
                    {EmptyDataComp()}
                    <Text style={{ fontFamily: 'Medium', textAlign: 'center' }}>Anda Belum membuat Reimbursement</Text>
                </View>
            }
            <Button style={styles.buttonBaru} size={'small'} appearance={'outline'} status={'primary'} onPress={() => props.navigation.push('Rembes')}>Buat Baru Reimbursement</Button>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonBaru: {
        marginHorizontal: 20, marginVertical: 10
    }
});