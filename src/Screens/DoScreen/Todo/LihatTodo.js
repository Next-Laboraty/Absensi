import { Layout, Spinner, Text, Button } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, equalTo, query, orderByChild, push, set } from "firebase/database";
import { useSelector } from "react-redux";
import { base64 } from '@firebase/util'
import moment from "moment";
import { ScrollView, View, TouchableOpacity, Dimensions } from "react-native";
import { Entypo } from '@expo/vector-icons';
import RenderHTML from "react-native-render-html";
import WebhookUrl from "../../../lib/WebhookUrl";
import axios from "axios";


export default function LihatTodo({ route, navigation }) {
    const { employee, server, token } = useSelector(state => state.employee)
    const [dataX, setDataX] = useState()
    const { todoID } = route.params;
    const [dataNum, setDataNum] = useState()
    const [loading, setLoading] = useState(true)
    // const db = getDatabase()
    const ws = new WebSocket('ws://103.179.57.18:21039/todo/'+todoID)
    // const pressIn = () => {
    //     const xUpdate = dataX
    //     const updates = { ...dataX, status: 'Closed' }
    //     console.log(updates)
    //     const payload = {
    //         status: 'Closed'
    //     }
    //     axios.put(`https://${base64.decodeString(server)}/api/resource/ToDo/${todoID}`, payload, {
    //         headers: {
    //             'Authorization': `token ${base64.decodeString(token)}`,
    //             'Content-Type': 'application/json',
    //             'Accept-Language': 'application/json',
    //         }
    //     }).then(res => {
    //         set(ref(db, `ToDo/${base64.encodeString(employee.user_id)}/${dataX.name}`), updates)
    //         setDataX(updates)
    //     })
    //         .catch(err => console.log(err))

    // }
    useEffect(() => {
        // dataHelper()
        ws.onopen = () => {
            ws.send(JSON.stringify({
                token,
                server
            }))
        }
        ws.onmessage = (result) => {
            setDataX(JSON.parse(result.data))
            setLoading(false)
        }
    }, [])
    if (loading) {
        return <Spinner style={{ flex: 1 }} />
    }
    const html = dataX.description;
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', margin: 20 }}>
                    <View style={{ marginRight: 10, top: 2 }}><Entypo name="code" size={20} color="black" /></View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontFamily: 'Regular' }}>{dataX.name}</Text>
                        <Text style={{ fontSize: 10 }}>Dibuat Pada {moment(dataX.creation).format("DD MMM YYYY")}</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: 20 }}>
                    <RenderHTML contentWidth={Dimensions.get('window').width} source={{ html }} />
                </View>
            </ScrollView>
            <Layout style={{ height: 60, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} level={'4'}>
                <View style={{ flex: 1 }}>
                    {dataX.status == 'Open' ?
                        <Text style={{ textAlign: 'center', fontFamily: 'Bold' }} status={'primary'}>{dataX.status}</Text>
                        :
                        dataX.status == 'Closed' ?
                            <Text style={{ textAlign: 'center', fontFamily: 'Bold' }} status={'warning'}>{dataX.status}</Text>
                            :
                            <Text style={{ textAlign: 'center', fontFamily: 'Bold' }} status={'danger'}>{dataX.status}</Text>
                    }
                </View>
                <View style={{ flex: 1, marginHorizontal: 10 }}>
                    {
                        dataX.status == 'Open' ?
                            <Button onPress={() => pressIn()}>Selesai</Button>
                            :
                            null
                    }
                </View>
            </Layout>
        </View>
    )
}