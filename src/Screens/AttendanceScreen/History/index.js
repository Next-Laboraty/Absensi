import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Divider, List, ListItem, Layout, Text, Button } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { base64 } from "@firebase/util";
import moment from 'moment';
import ListHistorySection from '../../../Molecule/ListHistorySection';
import IstirahatSectionList from '../../../Molecule/ListHistorySection/IstirahatSectionList';
import TanggalRow from '../../../Molecule/ListHistorySection/TanggalRow';
moment.locale('id')

export default function History() {
    return (
        <Layout style={{ flex: 1 }}>
            {DateTimeNow()}
            <TanggalRow />
            {SaatIni()}
            <ListHistorySection />
            <IstirahatSectionList />
        </Layout>
    )
}

function DateTimeNow() {
    return (
        <Layout style={{ marginHorizontal: 10, flexDirection: 'row' }}>
            <Layout style={{ justifyContent: 'center', flex: 1 }}>
                <Layout style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: 'Bold', fontSize: 40 }}>24</Text>
                    <Layout style={{ justifyContent: 'center', marginTop: -10, marginLeft: 10 }}>
                        <Text style={{ fontFamily: 'Regular', fontSize: 12 }}>Jumat</Text>
                        <Text style={{ fontFamily: 'Regular', fontSize: 12 }}>Jan 2020</Text>
                    </Layout>
                </Layout>
            </Layout>
            <Layout style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginTop: -10 }}>
                <Button status='basic' style={{ backgroundColor: '#D0D7FC' }}>
                    <Text style={{ color: '#516BEB' }}>Sekarang</Text>
                </Button>
            </Layout>
        </Layout>
    )
}

function SaatIni() {
    return (
        <Layout style={{ marginHorizontal: 10, flexDirection: 'row', marginTop: '20%' }}>
            <Layout style={{ marginRight: '10%' }}>
                <Text style={{ fontFamily: 'Bold' }}>Jam</Text>
            </Layout>
            <Layout style={{ flex: 1 }}>
                <Text style={{ fontFamily: 'Bold' }}>Keterangan</Text>
            </Layout>
        </Layout>
    )
}