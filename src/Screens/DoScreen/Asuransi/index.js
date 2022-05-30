import React, { useEffect, useState } from "react"
import { Layout, Button, Divider, List, ListItem,Modal, Text, Card } from "@ui-kitten/components"
import { RefreshControl, StyleSheet } from 'react-native'
import { useSelector } from "react-redux"
import axios from "axios";
import LoadingComp from "../../../Atomic/LoadingComp"
import AxiosPostData from "../../../lib/AxiosPostData";
import moment from "moment";
import { ScrollView } from "react-native-gesture-handler";


export default function ListIssue({ navigation }) {
    const [visible, setVisible] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoading] = useState(true)
    const [listIssue, setListIssue] = useState()
    const [data, setData] = useState()
    const { employee, token, server } = useSelector(state => state.employee)
    let bodys = {
        employee: employee.user_id,
        token,
        server
    }
    useEffect(() => {
        loadData()

    }, [])
    const onRefresh = React.useCallback(() => {
        loadData()
    }, []);
    const loadData = () => {
        AxiosPostData('http://103.179.57.18:21039/Issue/Lihat', token, bodys)
            .then(res => {
                setLoading(false)
                setListIssue(res.data)
            })
            .catch(err => console.log(err))
    }
    const renderItem = ({ item, index }) => (
        <ListItem
        onPress={()=> {
            navigation.navigate('LihatIssue', item)
        }}
            title={item.subject}
            description={item.issue_type}
        />
    );
    if (loading) return <LoadingComp />
    return (
        <Layout style={{ flex: 1 }}>
            <List style={{ flex: 1 }}
                data={listIssue}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />}
                ItemSeparatorComponent={Divider}
                renderItem={renderItem}
            />
            <Button style={{ margin: 20 }} status={'warning'} onPress={() => navigation.navigate('PostIssue')}>Buat Laporan Isu</Button>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 192,
        minWidth:300
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});