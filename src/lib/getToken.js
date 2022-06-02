import { getDatabase, ref, child, get } from "firebase/database";
import { base64 } from "@firebase/util";
export default function getToken(server) {
    const dbRef = ref(getDatabase());
    const snapshot = get(child(dbRef, `serverName/${base64.encodeString(server.toLowerCase())}`))
    return snapshot
}