import { Layout, Text, Avatar, Divider, Card, Button } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import moment from 'moment';
import 'moment/locale/id'
import { base64 } from "@firebase/util";
import { MaterialIcons, Entypo, AntDesign } from '@expo/vector-icons';
import ListAllDataNote from '../../../Molecule/ListAllDataNote';
import ReloadButton from '../../../Atomic/ButtonReload';

export default function NoteScreen() {
    const { employee, server, token } = useSelector(state => state.employee)
    const { GET_BULETIN } = useSelector(state => state.DESK_MANAGER)
    const [taskList, setTaskList] = useState(GET_BULETIN)
    const [comp, setComp] = useState(0)
    const [work, setWork] = useState(0)
    const [over, setOver] = useState(0)
    const url = base64.decodeString(server)
    useEffect(() => {
        setComp(GET_BULETIN.length)

    })
    return (
        <Layout style={{ flex: 1 }}>
            <Layout level={'4'} style={{ height: '20%', borderRadius: 20, marginHorizontal: 20, marginVertical: '2%' }}>
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ margin: 8, alignSelf: 'center', flex: 1, marginLeft: 30 }}>
                            <Avatar size='large' source={{ uri: 'https://' + url + employee.image }} />
                        </View>
                        <ReloadButton />
                    </View>
                    <Divider />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ textAlign: 'center', fontFamily: 'Medium', fontSize: 12 }}>Catatan</Text>
                        </View>
                    </View>
                    <Divider />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ textAlign: 'center', fontFamily: 'Bold', fontSize: 22 }}>{comp}</Text>
                        </View>
                    </View>
                </View>
            </Layout>
            <ScrollView style={{ flex: 1 }}>
                {taskList.map((dataReturn) =>
                    <TouchableOpacity key={dataReturn.name} style={{ marginVertical: 5 }}>
                        <Layout level={'2'}>
                            <ListAllDataNote key={dataReturn.name} Freedom={dataReturn.name} status={dataReturn.status} modified={dataReturn.modified} subject={dataReturn.title} />
                        </Layout>
                    </TouchableOpacity>
                )}
            </ScrollView>
            <Button size={'tiny'} status='success' style={{ height: 40, flex: 1, marginHorizontal: 20, position: 'absolute', top: '90%', left: '80%', borderRadius: 120 / 2, width: 40 }} appearance='outline'><AntDesign name="pluscircleo" size={24} color="black" /></Button>
        </Layout>
    )
}