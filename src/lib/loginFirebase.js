import React from 'react';
import { getDatabase, ref, onValue, set, get, child } from 'firebase/database';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import db from './firebaseinit'
import axios from 'axios';
import { base64 } from "@firebase/util";
import {Text} from 'react-native'

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
}

const __storeProfile = async (xdata) => {
    // xdata.navigation.replace('BottomTabsNavigator')
    const value = await AsyncStorage.getItem('@AccountServer');
    let token
    token = (await Notifications.getExpoPushTokenAsync()).data;
    const user = await AsyncStorage.getItem('@AccountEmail');
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
            const dbRef = ref(getDatabase());
            const dataKaryawan = response.data.data[0]
            const data = { ...dataKaryawan }
            get(child(dbRef, `Employee/${user}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    xdata.navigation.replace('BottomTabsNavigator')
                } else {
                    const Employee = ref(db, 'Employee/' + user);
                    set(Employee, data);
                    const Notification = ref(db, 'NotificationUser/' + user);
                    set(Notification, token);
                    xdata.navigation.replace('BottomTabsNavigator')
                }
            }).catch((error) => {
                console.error(error);
            });
        })
        .catch((error) => {
            console.log(error)
        })
}