import React from "react";
import { Text, TouchableOpacity, View } from 'react-native'
import { Feather, Octicons, AntDesign,Foundation } from '@expo/vector-icons';
import { TabActions } from '@react-navigation/native';

export default function Footer(props) {
    return (
        <View style={{ backgroundColor: '#fff', height: 56, flexDirection: 'row' }}>
            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => props.navigation.dispatch(
                TabActions.jumpTo('Home')
            )}>
                {props.sections == 'home' ? <>
                <Foundation name="home" size={24} color="#516BEB" />
                    <Text style={{ fontSize: 10, fontFamily: 'Oxygen_400Regular', color: '#516BEB', marginTop: 4 }}>
                        Home
                    </Text>
                </>
                    :
                    <>
                        <Octicons name="home" size={26} color="#545454" />
                        <Text style={{ fontSize: 10, fontFamily: 'Oxygen_400Regular', color: '#545454', marginTop: 4 }}>
                            Home
                        </Text>
                    </>
                }
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => props.navigation.replace('Attendance')}>
                {props.sections == 'attendance' ?
                    <>
                    <Octicons name="checklist" size={24} color="#516BEB" />
                        <Text style={{ fontSize: 10, fontFamily: 'Oxygen_400Regular', color: '#516BEB', marginTop: 4 }}>
                            Attendance
                        </Text>
                    </>
                    :
                    <>
                        <Octicons name="tasklist" size={24} color="#545454" />
                        <Text style={{ fontSize: 10, fontFamily: 'Oxygen_400Regular', color: '#545454', marginTop: 4 }}>
                            Attendance
                        </Text>
                    </>
                }
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Octicons name="briefcase" size={24} color="black" />
                <Text style={{ fontSize: 10, fontFamily: 'Oxygen_400Regular', color: '#545454', marginTop: 4 }}>
                    Desk
                </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <AntDesign name="creditcard" size={24} color="black" />
                <Text style={{ fontSize: 10, fontFamily: 'Oxygen_400Regular', color: '#545454', marginTop: 4 }}>
                    Salary
                </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <AntDesign name="idcard" size={24} color="black" />
                <Text style={{ fontSize: 10, fontFamily: 'Oxygen_400Regular', color: '#545454', marginTop: 4 }}>
                    User
                </Text>
            </View>
        </View>
    )
}