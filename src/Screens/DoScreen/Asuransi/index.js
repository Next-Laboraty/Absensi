import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, ScrollView, Picker } from 'react-native'
import { MaterialIcons, MaterialCommunityIcons, Ionicons, FontAwesome, AntDesign, Entypo, EvilIcons, Octicons } from '@expo/vector-icons';
import MaintenanceScreen from '../../../Molecule/MaintenanceScreen'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { Button } from '@ui-kitten/components';

export default function Asuransi() {
    const [selectPriority, setSelectPriority] = useState("High")
    return (
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <ScrollView style={{ backgroundColor: '#FFFFFE', marginTop: 5, borderRadius: 20, flex: 1 }}>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ fontFamily: 'Medium', fontSize: 11, color: '#2C3333', paddingLeft: 7 }}>AgungPriyatna</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ fontFamily: 'Medium', fontSize: 15, color: '#ADACAC', paddingLeft: 7, fontWeight: 'bold', marginRight: 15 }}>Research & Development - ONL</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ fontFamily: 'Medium', fontSize: 15, color: '#ADACAC', paddingLeft: 7, fontWeight: 'bold', marginRight: 15 }}>00082</Text>
                </View>
                <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                    <Text style={{ marginBottom: 5, fontFamily: 'Regular' }}>Regarding</Text>
                    <TextInput placeholder='Resolusi Tenaga Kerja/Penambahan SDM' style={{
                        borderWidth: 1, fontSize: 10,
                    }} />
                </View>
                <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                    <Text style={{ marginBottom: 5, fontFamily: 'Regular' }}>Priority</Text>
                    <View style={{borderWidth:1}}>
                    <Picker
                    selectedValue={selectPriority}
                    onValueChange={(itemValue, itemIndex) => setSelectPriority(itemValue)}
                    >
                        <Picker.Item label="High" value="High"/>
                        <Picker.Item label="Normal" value="Normal"/>
                        <Picker.Item label="Urgent" value="Urgent"/>
                        <Picker.Item label="Low" value="Low"/>
                    </Picker>
                    </View>
                </View>
                <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                    <Text style={{ marginBottom: 5, fontFamily: 'Regular' }}>Status</Text>
                    <TextInput placeholder='Open' style={{
                        borderWidth: 1, fontSize: 10,
                    }} />
                </View>
                <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                    <Text style={{ marginBottom: 5, fontFamily: 'Regular' }}>Issue Type</Text>
                    <TextInput placeholder='Recruitment' style={{
                        borderWidth: 1, fontSize: 10,
                    }} />
                </View>
                <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                    <Text style={{ marginBottom: 5, fontFamily: 'Regular' }}>Explanation</Text>
                    <TextInput placeholder='Lorem ipsum dolor sit amet, 
                        consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. 
                        ' style={{
                            borderWidth: 1, fontSize: 10,
                        }} />
                </View>
                <View style={{ marginTop: 40, marginHorizontal: 20 }}>
                    <Button status={"primary"} style={{
                        borderWidth: 1, marginHorizontal: 100,
                        borderRadius: 15, fontFamily: 'Regular'
                    }}>Tambah</Button>
                </View>
            </ScrollView>
        </View>
    )
}