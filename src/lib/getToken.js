import React from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import db from './firebaseinit'
export default function getToken(server) {
    get(child(db, `serverName/${server}`)).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val()
        } else {
            let data = "No data available"
            return data
        }
    }).catch((error) => {
        return error
    });
}