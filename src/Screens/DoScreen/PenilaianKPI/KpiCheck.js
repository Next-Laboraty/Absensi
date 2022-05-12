import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Image } from 'react-native'
import { useSelector } from "react-redux";
import LoadingComp from "../../../Atomic/LoadingComp";
import { Divider, List, ListItem } from '@ui-kitten/components';

export default function KpiCheck({ props, route }) {
    const [goals, setGoals] = useState(null)
    const [dax, setDax] = useState(null)
    const [loading, setLoading] = useState(true)
    const { server, token } = useSelector(state => state.employee)
    let datas = {
        server,
        token,
        name: route.params.name
    }
    useEffect(() => {
        axios.post(`http:///103.179.57.18:21039/KPI/get`, datas).then(res => {
            setGoals(res.data.goals)
            console.log(res.data)
            setDax(res.data)
            setLoading(false)
        }).catch(err => console.log(err))
    }, [])
    if (loading) {
        return (
            <LoadingComp />
        )
    }
    const renderItem = ({ item, index }) => (
        <ListItem
            title={`${item.kra}`}
            description={`Skor ${item.score_earned}`}
        />
    );
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#F73D93', height: 80, paddingHorizontal: 20 }}>
                <Image source={require('../../../../assets/kpiData.png')} style={{ width: 100, height: 100 }} />
                <Text style={{ flex: 1, fontFamily: 'Bold', fontSize: 25, color: '#F2F2F2', alignSelf: 'center', textAlign: 'center' }}>Skor {dax.total_score}/5</Text>
            </View>
            <List
                style={{ marginTop: 20 }}
                data={goals}
                ItemSeparatorComponent={Divider}
                renderItem={renderItem}
            />
        </View>
    )
}