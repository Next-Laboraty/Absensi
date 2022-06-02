import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Divider, List, ListItem, Layout, Text, Button } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { tanggalMinusPlus } from '../../features/tanggalDate/tanggalSlice';
moment.locale('id')
export default function TanggalRow() {
    return(
        <Layout style={{ marginHorizontal: 10, flexDirection: 'row' }}>
            <Layout style={{ justifyContent: 'center', flex: 1 }}>
                <Layout style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: 'Bold', fontSize: 40 }}>{moment().format('D')}</Text>
                    <Layout style={{ justifyContent: 'center', marginTop: -10, marginLeft: 10 }}>
                        <Text style={{ fontFamily: 'Regular', fontSize: 12 }}>{moment().format('dddd')}</Text>
                        <Text style={{ fontFamily: 'Regular', fontSize: 12 }}>{moment().format('MMM YYYY')}</Text>
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