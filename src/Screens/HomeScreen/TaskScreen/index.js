import { Layout, Text, Avatar, Divider, Card, Button } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { base64 } from "@firebase/util";
import { MaterialIcons, Entypo, } from '@expo/vector-icons';
import moment from 'moment';
import 'moment/locale/id'
import ListAllDataTask from '../../../Molecule/ListAllDataTask';
import ReloadButton from '../../../Atomic/ButtonReload';

export default function TaskScreen() {
    const { employee, server, token } = useSelector(state => state.employee)
    const { GET_TASK } = useSelector(state => state.DESK_MANAGER)
    const [taskList, setTaskList] = useState(GET_TASK)
    const [comp, setComp] = useState(0)
    const [work, setWork] = useState(0)
    const [over, setOver] = useState(0)
    const url = base64.decodeString(server)
    useEffect(() => {
        const Compl = GET_TASK.filter(x => x.status == 'Completed')
        const Worki = GET_TASK.filter(x => x.status == 'Open')
        const Overd = GET_TASK.filter(x => x.status == 'Overdue')
        setComp(Compl.length)
        setWork(Worki.length)
        setOver(Overd.length)

    })
    return (
        <Layout style={{ flex: 1 }}>
            <Layout level={'4'} style={{ height: '20%', borderRadius: 20, marginHorizontal: 20, marginVertical: '2%' }}>
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Avatar size='large' source={{ uri: 'https://' + url + employee.image }} style={{ margin: 8, alignSelf: 'center' }} />
                        <Button size={'tiny'} status='success' style={{ height: 40, flex: 1, marginHorizontal: 20 }} appearance='outline'>Baru</Button>
                        <ReloadButton />
                    </View>
                    <Divider />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ textAlign: 'center', fontFamily: 'Medium', fontSize: 12 }}>Selesai</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ textAlign: 'center', fontFamily: 'Medium', fontSize: 12 }}>Dikerjakan</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ textAlign: 'center', fontFamily: 'Medium', fontSize: 12 }}>Terlambat</Text>
                        </View>
                    </View>
                    <Divider />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ textAlign: 'center', fontFamily: 'Bold', fontSize: 22 }}>{comp}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ textAlign: 'center', fontFamily: 'Bold', fontSize: 22 }}>{work}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ textAlign: 'center', fontFamily: 'Bold', fontSize: 22 }}>{over}</Text>
                        </View>
                    </View>
                </View>
            </Layout>
            <ScrollView style={{ flex: 1 }}>
                {taskList.map((dataReturn) =>
                    <TouchableOpacity key={dataReturn.name}>
                        <Layout level={'2'} style={{marginVertical:5}}>
                            <ListAllDataTask key={dataReturn.name} Freedom={dataReturn.name} status={dataReturn.status} modified={dataReturn.modified} subject={dataReturn.subject} />
                        </Layout>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </Layout>
    )
}