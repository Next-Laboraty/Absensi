import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { MaterialIcons, MaterialCommunityIcons, Ionicons, FontAwesome, AntDesign, Entypo, EvilIcons, Octicons } from '@expo/vector-icons';
import MaintenanceScreen from '../../../Molecule/MaintenanceScreen'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class SalarySlipScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1, marginBottom: 20 }}>
                <View style={{ flexDirection: 'row'}}>
                    <Text style={{
                        flex: 1, fontFamily: "Medium", fontSize: 25, fontWeight: 'bold', color: 'white', paddingLeft: 50, backgroundColor: '#516BEB', marginTop: 40, marginLeft: 1, height: 50, marginRight: 250,
                        paddingVertical: 5, borderTopRightRadius: 15, borderBottomRightRadius: 15,
                    }}>Isu</Text>
                </View>
                <View style={{ backgroundColor: '#FFFFFE', flex: 1, marginTop: 5, borderRadius: 20, marginRight: 15, marginLeft: 15 }}>
                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                        <Text style={{ fontFamily: 'Medium', fontSize: 11, color: '#2C3333', paddingLeft: 7 }}>Agung Priyatna</Text>
                        <Text style={{ fontFamily: 'Medium', fontSize: 13, color: '#ADACAC', paddingLeft: 7, fontWeight: 'bold', marginRight: 15 }}>Research & Development - ONL</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontFamily: 'Medium', fontSize: 11, color: '#2C3333', paddingLeft: 7 }}>Regarding</Text>
                        <Text style={{ fontFamily: 'Medium', fontSize: 13, color: '#2C3333', paddingLeft: 7, fontWeight: 'bold' }}>Resolusi Tenaga Kerja/Penambahan SDM</Text>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <Text style={{ fontFamily: 'Medium', fontSize: 11, color: '#2C3333', paddingLeft: 7 }}>Priority</Text>
                        <Text style={{ fontFamily: 'Medium', fontSize: 13, color: '#2C3333', paddingLeft: 7, fontWeight: 'bold' }}>Urgent</Text>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <Text style={{ fontFamily: 'Medium', fontSize: 11, color: '#2C3333', paddingLeft: 7 }}>Status</Text>
                        <Text style={{ fontFamily: 'Medium', fontSize: 13, color: '#2C3333', paddingLeft: 7, fontWeight: 'bold' }}>Open</Text>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <Text style={{ fontFamily: 'Medium', fontSize: 11, color: '#2C3333', paddingLeft: 7 }}>Issue Type</Text>
                        <Text style={{ fontFamily: 'Medium', fontSize: 13, color: '#2C3333', paddingLeft: 7, fontWeight: 'bold' }}>Recruitment</Text>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <Text style={{ fontFamily: 'Medium', fontSize: 11, color: '#2C3333', paddingLeft: 7 }}>Explanation</Text>
                        <Text style={{ fontFamily: 'Medium', fontSize: 13, color: '#2C3333', paddingLeft: 7, fontWeight: 'bold' }}>Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit.
                            Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus,
                            ut interdum tellus elit sed risus. Maecenas eget
                            condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
                            per inceptos himenaeos.
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}