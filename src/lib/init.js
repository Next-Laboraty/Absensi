import React from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import db from './firebaseinit'
export default function contoh(score) {
    const reference = ref(db, 'dataContoh/');
    set(reference, {
        score,
    });
    // alert('000')
}