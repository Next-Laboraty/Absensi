import React from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import db from './firebaseinit'
import axios from 'axios';
import { base64 } from "@firebase/util";

import AsyncStorage from '@react-native-async-storage/async-storage'

export default async function loginFirebase(data) {
    const url = 'https://' + data.server
    axios({
        url: url + `/api/method/frappe.auth.get_logged_user`,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'application/json'
        },
        timeout: 1000
    })
        .then((response) => {
            let xdata = {
                server: data.server,
                email: response.data.message,
                navigation: data.navigation
            }
            _storeUserEmail(xdata)
        })
        .catch((error) => {
            console.log(error)
        })
}

const _storeUserEmail = async (xdata) => {
    try {
        await AsyncStorage.setItem(
            '@AccountEmail',
            base64.encodeString(xdata.email)
        );
        _storeUserServer(xdata)
    } catch (error) {
        // Error saving data
    }
}
const _storeUserServer = async (xdata) => {
    try {
        await AsyncStorage.setItem(
            '@AccountServer',
            xdata.server
        );
        __storeProfile(xdata)
    } catch (error) {
        // Error saving data
    }
    const value = await AsyncStorage.getItem('@AccountServer');
    console.log(value)
}

const __storeProfile = async (xdata) => {
    // xdata.navigation.replace('BottomTabsNavigator')
    const value = await AsyncStorage.getItem('@AccountServer');
    const user = await AsyncStorage.getItem('@AccountEmail');
    console.log(value)
    const url = 'https://' + value
    axios({
        url: url + `/api/resource/Employee?fields=["*"]&filters=[["user_id","=","kevin@onglai.id"]]`,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'application/json'
        },
        timeout: 1000
    })
        .then((response) => {
            const dataKaryawan = response.data.data[0]
            // const reference = ref(db, 'Employee/' + dataKaryawan.user_id);
            // set(reference, {
            //     dataKaryawan ,
            // });
            const data = { ...dataKaryawan }
            const reference = ref(db, 'Employee/' + user);
            set(reference, {
                data,
            });
        })
        .catch((error) => {
            console.log(error)
        })
    // const reference = ref(db, 'Employee/' + data.usr);
    // set(reference, {
    //     data,
    // });
}