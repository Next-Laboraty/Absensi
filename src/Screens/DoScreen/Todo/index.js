import { Layout, Text, Avatar, Divider, Card, Button } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { base64 } from "@firebase/util";
import { MaterialIcons, Entypo,AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import 'moment/locale/id'
import ListAllDataTodo from '../../../Molecule/ListAllDataTodo';
import ReloadButton from '../../../Atomic/ButtonReload';

export default function TaskScreen() {
    const { employee, server, token } = useSelector(state => state.employee)
    const { GET_TODO } = useSelector(state => state.DESK_MANAGER)
    const [taskList, setTaskList] = useState(GET_TODO)
    const [comp, setComp] = useState(0)
    const [work, setWork] = useState(0)
    const [over, setOver] = useState(0)
    const url = base64.decodeString(server)
    useEffect(() => {
        const Buka = GET_TODO.filter(x => x.status == 'Open')
        const Tutup = GET_TODO.filter(x => x.status == 'Closed')
        const Batal = GET_TODO.filter(x => x.status == 'Cancelled')
        setComp(Buka.length)
        setWork(Tutup.length)
        setOver(Batal.length)

    })
    return (
        <Layout style={{ flex: 1 }}>
            <Layout level={'4'} style={{height: '20%', borderRadius: 20, marginHorizontal: 20, marginVertical: '2%' }}>
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ margin: 8, alignSelf: 'center',flex:1,marginLeft:30 }}>
                            <Avatar size='large' source={{ uri: 'https://' + url + employee.image }} />
                        </View>
                        <ReloadButton />
                    </View>
                    <Divider />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ textAlign: 'center', fontFamily: 'Medium', fontSize: 12 }}>Dibuka</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ textAlign: 'center', fontFamily: 'Medium', fontSize: 12 }}>Ditutup</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ textAlign: 'center', fontFamily: 'Medium', fontSize: 12 }}>Dibatalkan</Text>
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
                    <TouchableOpacity key={dataReturn.name} style={{marginVertical:5}}>
                        <Layout level={'2'}>
                            <ListAllDataTodo key={dataReturn.name} Freedom={dataReturn.name} status={dataReturn.status} modified={dataReturn.modified} dibuat={dataReturn.creation} subject={dataReturn.assigned_by_full_name} />
                        </Layout>
                    </TouchableOpacity>
                )}
            </ScrollView>
            <Button size={'tiny'} status='success' style={{ height: 40, flex: 1, marginHorizontal: 20,position:'absolute',top:'90%',left:'80%',borderRadius:120/2,width:40 }} appearance='outline'><AntDesign name="pluscircleo" size={24} color="black" /></Button>
        </Layout>
    )
}