import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Feather, Octicons, AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useSelector } from "react-redux";

export default function ButtonFeatures(props) {
    const { GET_TASK, GET_TODO,GET_BULETIN } = useSelector((state) => state.DESK_MANAGER)
    const [taskCompleted, setTaskCompleted] = useState()
    const [taskWorking, setTaskWorking] = useState()
    const [todoCount, setTodoCount] = useState()
    const [bulletinCount, setBulletinCount] = useState()
    useEffect(() => {
        const getDataTask = GET_TASK.filter(x => x.status == 'Completed')
        const getDataTaskWorking = GET_TASK.filter(x => x.status == 'Open')
        const getTodos = GET_TODO.filter(x => x.status == 'Open')
        setTimeout(() => {
            setTaskWorking(getDataTaskWorking.length)
            setTaskCompleted(getDataTask.length)
            setTodoCount(getTodos.length)
            setBulletinCount(GET_BULETIN.length)
        }, 1500)
    })
    return (
        <View style={styles.bannerKantor}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.rowKantor1} onPress={()=>props.navigation.navigate('Task')}>
                    <View style={{ width: 55, height: 55, backgroundColor: '#D1EFFF', alignSelf: 'center', borderRadius: 120 / 2 }}>
                        <MaterialIcons name="add-task" size={28} color="#648CA0" style={{ textAlign: 'center', marginTop: 12 }} />
                    </View>
                    <Text style={{ fontFamily: 'Medium', textAlign: 'center', color: '#2C3333', marginTop: 5 }}>T U G A S</Text>
                    <Text style={{ fontFamily: 'Regular', fontSize: 10, marginHorizontal: 20, color: '#7A7979' }}>{taskCompleted} Tugas Selesai</Text>
                    <Text style={{ fontFamily: 'Regular', fontSize: 10, marginHorizontal: 20, color: '#7A7979' }}>{taskWorking} Sedang dikerjakan</Text>
                </TouchableOpacity>
                <View style={styles.rowKantor2} >
                    <TouchableOpacity style={styles.rowKantor2_1} onPress={()=>props.navigation.navigate('todo')}>
                        <View style={{ width: 40, height: 40, backgroundColor: '#E4E2FB', borderRadius: 120 / 2, }}>
                            <Ionicons name="checkmark-done" size={28} color="#817E9F" style={{ textAlign: 'center', marginTop: 7 }} />
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ fontFamily: 'Medium', color: '#2C3333' }}>T O D O</Text>
                            <Text style={{ fontFamily: 'Regular', fontSize: 10, color: '#7A7979' }}>{todoCount} Pekerjaan</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rowKantor2_2} onPress={()=>props.navigation.navigate('Bulletin')}>
                        <View style={{ width: 40, height: 40, backgroundColor: '#caf0f8', borderRadius: 120 / 2, }}>
                            <MaterialIcons name="event-note" size={28} color="#6B8E7B" style={{ textAlign: 'center', marginTop: 7 }} />
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ fontFamily: 'Medium', color: '#2C3333' }}>BULETIN</Text>
                            <Text style={{ fontFamily: 'Regular', fontSize: 10, color: '#7A7979' }}>{bulletinCount} Catatan</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    rowKantor2_2: {
        backgroundColor: '#90e0ef',
        borderRadius: 10,
        height: 60,
        marginTop: 12,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#516BEB",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,

    },
    rowKantor2_1: {
        backgroundColor: '#94b3fd',
        paddingLeft: 10,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 10,
        height: 60,
        shadowColor: "#516BEB",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,

    },
    rowKantor2: { height: 30, flex: 1, marginLeft: 6 },
    rowKantor1: {
        paddingTop: 10,
        height: 132,
        flex: 1,
        marginRight: 6,
        backgroundColor: '#9AD0EC',
        borderRadius: 10,
        shadowColor: "#516BEB",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,

    },
    bannerKantor: {
        marginHorizontal: 20,
    },
})