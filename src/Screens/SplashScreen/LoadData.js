import { Spinner } from "@ui-kitten/components";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { MASUKAN_TASK, MASUKAN_TODO, MASUKAN_CATATAN } from '../../features/desk/deskSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { base64 } from "@firebase/util";
import FetchData from '../../lib/FetchData'
import AxiosGetEmployee from "../../lib/AxiosGetEmployee";
import { getDatabase, ref, child, get, query, orderByValue, onValue } from "firebase/database";
import { collection, doc, setDoc } from "firebase/firestore";
import FireDbs from "../../lib/firestore";

const citiesRef = collection(FireDbs, "cities");

const db = getDatabase()
const dbRef = ref(getDatabase());
export default function LoadData() {
    const dispatch = useDispatch()
    const dts = async () => {
        await setDoc(doc(citiesRef, "SF"), {
            name: "San Francisco", state: "CA", country: "USA",
            capital: false, population: 860000,
            regions: ["west_coast", "norcal"]
        });
    }
    useEffect(() => {
        FirstCome()
        dts()
    })
    const FirstCome = () => {
        AsyncStorage.getItem('@AccountEmail', async (error, result) => {
            if (result !== null) {
                const server = await AsyncStorage.getItem('@AccountServer')
                const dataEmployee = await AsyncStorage.getItem('@AccountEmployee')
                const token = await AsyncStorage.getItem('@AccountToken')
                const dataEmp = JSON.parse(dataEmployee)
                getTask(base64.encodeString(dataEmp.user_id))
                getTodo(base64.encodeString(dataEmp.user_id))
                getBuletin()
            }
        })
    }
    const getBuletin = () => {
        get(child(dbRef, `Buletin`)).then((snapshot) => {
            if (snapshot.exists()) {
                dispatch(MASUKAN_CATATAN(Object.values(snapshot.val())))
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    const getTodo = (employeeUser) => {
        const TodoRef = query(ref(db, 'ToDo/' + employeeUser),  orderByValue("creation"))
        onValue(TodoRef, (snapshot) => {
            const data = Object.values(snapshot.val());
            dispatch(MASUKAN_TODO(data))
        })
    }
    const getTask = (employeeUser) => {
        get(child(dbRef, `Task/${employeeUser}`)).then((snapshot) => {
            if (snapshot.exists()) {
                dispatch(MASUKAN_TASK(Object.values(snapshot.val())))
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    return (
        <Spinner status='warning' />
    )
}