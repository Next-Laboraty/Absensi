import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';


const firebaseConfig = {
    apiKey: "AIzaSyBWgWXSNBMMSkHhCmVMOtIu9DyUixvXTqw",
    authDomain: "attendancesxxa.firebaseapp.com",
    databaseURL: "https://attendancesxxa-default-rtdb.firebaseio.com",
    projectId: "attendancesxxa",
    storageBucket: "attendancesxxa.appspot.com",
    messagingSenderId: "677403891801",
    appId: "1:677403891801:web:82ed1e99f6a0b793ccf948",
    measurementId: "G-9LQPNELD8Q"
  };  // apiKey, authDomain, etc. (see above)

initializeApp(firebaseConfig);
const db = getDatabase();

export default db