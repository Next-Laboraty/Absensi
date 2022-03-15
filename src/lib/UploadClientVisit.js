import React from 'react';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import moment from 'moment'
moment.locale('id')
import { base64 } from '@firebase/util'

export default async function UploadClientVisit(dataX, blob) {
    var CurrentDate = moment().unix();
    const user = await AsyncStorage.getItem('@AccountEmail');
    const imagesRef = ref(getStorage(), `Images/${user}/${CurrentDate}.jpg`);
    uploadBytes(imagesRef, blob).then((snapshot) => {
        return getDownloadURL(snapshot.ref)
    }).then(downloadURL => {
        let Xdata = {
            server: dataX.server,
            token: dataX.token,
            employee: dataX.employee,
            longitude: dataX.longitude,
            latitude: dataX.latitude,
            uri: downloadURL
        }
        PostDataToDatabase(Xdata)
    })

}

async function PostDataToDatabase(Xdata) {
    const url = 'https://' + base64.decodeString(Xdata.server) + '/api/resource/Visiting%20Client'
    const token = base64.decodeString(Xdata.token)
    const payload = {
        employee: Xdata.employee,
        latitude: Xdata.latitude,
        longitude: Xdata.longitude,
        url: Xdata.uri,
        datestime: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    console.log(payload,JSON.stringify(token))
    const rawResponse = await fetch(url, {
        method: 'post',
        headers: new Headers({
            'Authorization': 'token '+JSON.stringify(token),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(payload)
    });
    const content = await rawResponse.json();

    console.log(content);

}