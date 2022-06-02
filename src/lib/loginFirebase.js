import React from 'react';
import { getDatabase, ref, onValue, set, get, child } from 'firebase/database';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import db from './firebaseinit'
import axios from 'axios';
import { base64 } from "@firebase/util";
import { Text } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

export default async function loginFirebase(data,user) {

    get(child(db, `${user}`)).then((snapshot) => {
        if (!snapshot.exists()) {
            return true
        } else {
            const Employee = ref(db, 'Employee/' + user);
            set(Employee, data);
            return true
        }
    }).catch((error) => {
        return false
    });
}