import React from 'react';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import moment from 'moment'
moment.locale('id')
import { base64 } from '@firebase/util'

export default async function UploadClientVisit(blob) {
    var CurrentDate = moment().unix();
    const user = await AsyncStorage.getItem('@AccountEmail');
    const imagesRef = ref(getStorage(), `Images/${user}/${CurrentDate}.jpg`);
    const data = uploadBytes(imagesRef, blob)
    return data
}