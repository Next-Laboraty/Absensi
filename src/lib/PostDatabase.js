import React from 'react'
import { getDatabase, ref,onValue, child, get, set } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { base64 } from '@firebase/util'
import moment from 'moment'
moment.locale('id')
import db from './firebaseinit'
import axios from 'axios';

const dbRef = ref(getDatabase());
export default async function PostDatabase(Xdata) {
  const serverName = await AsyncStorage.getItem('@AccountServer');
  console.log('data' + serverName)
  get(child(dbRef, `serverName/${serverName}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const User = snapshot.val().token
      const token = base64.decodeString(User)
      let Ndata = {
        url: Xdata.uri,
        latitude: Xdata.latitude,
        longitude: Xdata.longitude,
        serverName,
        token
      }
      cariUser(Ndata)
    } else {
      console.log("Post Database gagal");
    }
  }).catch((error) => {
    console.error(error);
  });

  // console.log(Xdata)
}

async function cariUser(Ndata) {
  const userName = await AsyncStorage.getItem('@AccountEmail');
  get(child(dbRef, `Employee/${userName}`)).then((snapshot) => {
    if (snapshot.exists()) {
      let Ydata = {
        dServer: Ndata.serverName,
        longitude: Ndata.longitude,
        latitude: Ndata.latitude,
        token: Ndata.token,
        employee: snapshot.val().employee,
        url: Ndata.url
      }
      keDatabase(Ydata)
      console.log('Cari User Berhasil')
    } else {
      console.log("Cari User Gagal");
    }
  }).catch((error) => {
    console.error(error);
  });
}

async function keDatabase(Ydata) {
  console.log(Ydata)
  const url = 'https://' + Ydata.dServer
  const payload = {
    employee: Ydata.employee,
    longitude: Ydata.longitude,
    latitude: Ydata.latitude,
    url: Ydata.url,
    datestime: moment().format('DD-MM-YYYY h:mm:ss')
  }
  const userName = await AsyncStorage.getItem('@AccountEmail');
  const CurrentDate = moment().unix();
  axios.post(url + `/api/resource/Visiting%20Client`, payload, {
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': 'application/json',
      'Authorization': `token ${Ydata.token}`
    }
  })
    .then((response) => {
      const Employee = ref(db, 'VisitingClient/' + userName + '/' + CurrentDate);
      set(Employee, payload);
    })
    .catch(function (error) {
      console.log(error)
    })

}