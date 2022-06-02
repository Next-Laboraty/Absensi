import { getDatabase, ref, onValue, set } from 'firebase/database';
import db from './firebaseinit'
export default function LoginBase(DatabaseFireInit,dataBody) {
    const reference = ref(db, `${DatabaseFireInit}`);
    set(reference, dataBody);

}