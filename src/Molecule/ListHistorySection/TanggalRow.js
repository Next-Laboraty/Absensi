import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Divider, List, ListItem, Layout, Text, Button } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { tanggalMinusPlus } from '../../features/tanggalDate/tanggalSlice';
moment.locale('id')
export default function TanggalRow() {
    const { TanggalMenu } = useSelector((state) => state.tanggalDate)
    const dispatch = useDispatch()
    const changeButton = (number) => {
        dispatch(tanggalMinusPlus(number))
    }
    const ButtonData = (number) => {
        return (
            <TouchableOpacity onPress={() => changeButton(number)} style={(TanggalMenu == number ? styles.buttonActive : {})}>
                <Text style={(TanggalMenu == number ? styles.fontHariAktif : styles.fontHari)}>{moment(moment().add(number, 'd')).format("ddd")}</Text>
                <Text style={(TanggalMenu == number ? styles.fontTanggalAktif : styles.fontTanggal)}>{moment(moment().add(number, 'd')).format("DD")}</Text>
            </TouchableOpacity>
        )
    }
    const ButtonDataDisable = (dataTanggal) => {
        return (
            <TouchableOpacity disabled={true}>
                <Text style={styles.fontHari}>{moment(moment().add(dataTanggal, 'd')).format("ddd")}</Text>
                <Text style={styles.fontTanggal}>{moment(moment().add(dataTanggal, 'd')).format("DD")}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <Layout>
            <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: '10%', justifyContent: 'space-between' }}>
                {ButtonData(-2)}
                {ButtonData(-1)}
                {ButtonData(0)}
                {ButtonDataDisable(1)}
                {ButtonDataDisable(2)}
            </View>
        </Layout>
    )
}
const styles = StyleSheet.create({
    container: {
        maxHeight: 200,
    },
    buttonActive: {
        backgroundColor: '#516BEB', padding: 5, borderRadius: 15, marginTop: -10
    },
    fontTanggal: {
        fontFamily: 'Medium',
        textAlign: 'center'
    },
    fontHari: {
        fontFamily: 'Regular',
        textAlign: 'center'
    },
    fontTanggalAktif: {
        fontFamily: 'Medium',
        textAlign: 'center',
        fontSize: 20
    },
    fontHariAktif: {
        fontFamily: 'Regular',
        textAlign: 'center',
        fontSize: 20
    }
});