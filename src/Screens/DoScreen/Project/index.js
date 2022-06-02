import React, { Component, useState } from 'react'
import { Text, View, ScrollView, Picker, StyleSheet } from 'react-native'
import MaintenanceScreen from '../../../Molecule/MaintenanceScreen'
import { useSelector } from 'react-redux';
import { Button, Input } from '@ui-kitten/components';
import InformationWithPhoto from '../../../Molecule/InformationWithPhoto';


export default function Project() {
    const [country, setCountry] = useState('Unknown');
    const [aktif, setAktif] = useState('Ya');
    const [metodelengkap, setMetodelengkap] = useState('Panduan');
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
                    <View style={{ marginTop: 10, marginHorizontal: 10, borderWidth: 1 }}>
                        <Text style={{ marginBottom: 5, fontFamily: 'Regular' }}> Pilih Status</Text>
                        <Picker
                            selectedValue={country}
                            onValueChange={(value, index) => setCountry(value)}
                            mode="dropdown" // Android only
                        >
                            <Picker.Item label="Buka" value="Unknown" />
                            <Picker.Item label="Buka" value="Buka" />
                            <Picker.Item label="Selesai" value="Selesai" />
                            <Picker.Item label="Dibatalkan" value="Dibatalkan" />
                        </Picker>
                        <Text ext style={{ marginBottom: 5, fontFamily: 'Regular' }}> Status: {country}</Text>
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: 10, borderWidth: 1 }}>
                        <Text style={{ marginBottom: 5, fontFamily: 'Regular' }}>Aktif</Text>
                        <Picker
                            selectedValue={aktif}
                            onValueChange={(value, index) => setAktif(value)}
                            mode="dropdown" // Android only
                        >
                            <Picker.Item label="Ya" value="Ya" />
                            <Picker.Item label="Tidak" value="Buka" />
                        </Picker>
                        <Text ext style={{ marginBottom: 5, fontFamily: 'Regular' }}> Aktif: {aktif}</Text>
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: 10, borderWidth: 1 }}>
                        <Text style={{ marginBottom: 5, fontFamily: 'Regular' }}>% Metode Lengkap</Text>
                        <Picker
                            selectedValue={metodelengkap}
                            onValueChange={(value, index) => setMetodelengkap(value)}
                            mode="dropdown" // Android only
                        >
                            <Picker.Item label="Panduan" value="Panduan" />
                            <Picker.Item label="Tugas Penyelesaian" value="Tugas Penyelesaian" />
                            <Picker.Item label="Tugas Kemajuan" value="Tugas Kemajuan" />
                            <Picker.Item label="Tugas Berat" value="Tugas Berat" />
                        </Picker>
                        <Text ext style={{ marginBottom: 5, fontFamily: 'Regular' }}> Aktif: {metodelengkap}</Text>
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