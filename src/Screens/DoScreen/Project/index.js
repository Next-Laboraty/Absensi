import React, { Component } from 'react'
import { Text, View, ScrollView, Picker, StyleSheet } from 'react-native'
import MaintenanceScreen from '../../../Molecule/MaintenanceScreen'
import { useSelector } from 'react-redux';
import { Button, Input } from '@ui-kitten/components';
import InformationWithPhoto from '../../../Molecule/InformationWithPhoto';


export default class Project extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: 'Bold', fontSize: 30, textAlign: 'center', color: '#205375' }}>Buat Project Baru</Text>
                    <View>
                        <InformationWithPhoto />
                    </View>

                    <ScrollView style={{ backgroundColor: '#FFFFFE', marginTop: 5, flex: 1 }}>

                        <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                            <Text style={{ marginBottom: 5, fontFamily: 'Regular' }}>Nama Proyek</Text>
                            <Input placeholder='Masukan Nama Proyek' />
                        </View>
                        <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                            <Text style={{ marginBottom: 5, fontFamily: 'Regular' }}>Prioritas</Text>
                            <View style={{ borderWidth: 1, borderRadius: 5, borderColor: '#7F8487' }}>
                            </View>
                        </View>
                        <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                            <Text style={{ marginBottom: 5, fontFamily: 'Regular' }}>status</Text>
                            <View style={{ borderWidth: 1, borderRadius: 5, borderColor: '#7F8487' }}>
                            </View>
                        </View>
                        <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                            <Text style={{ marginBottom: 5, fontFamily: 'Regular' }}>Department</Text>
                            <Input placeholder='Masukan Nama Department' />
                        </View>
                        <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                            <Text style={{ marginBottom: 5, fontFamily: 'Regular' }}>Deskripsi</Text>
                            <Input placeholder='Masukan Deskripsi' />
                            {/* command bawah adalah style manual */}
                            {/* <TextInput placeholder='Masukan Deskripsi' style={StyleGw.inputText} /> */}
                        </View>
                        <View style={{ marginTop: 40, marginHorizontal: 20 }}>
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}