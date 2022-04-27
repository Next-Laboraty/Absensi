import { Spinner } from "@ui-kitten/components";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { MASUKAN_TASK, MASUKAN_TODO, MASUKAN_CATATAN } from '../../features/desk/deskSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { async, base64 } from "@firebase/util";
import FetchData from '../../lib/FetchData'
import AxiosGetEmployee from "../../lib/AxiosGetEmployee";
import { getDatabase, ref, child, get, query, orderByValue, onValue } from "firebase/database";
import { collection, doc, setDoc } from "firebase/firestore";
import FireDbs from "../../lib/firestore";
import GetTodoFromWS from "../../Molecule/GetTodoFromWS";

const citiesRef = collection(FireDbs, "cities");

const db = getDatabase()
const dbRef = ref(getDatabase());
export default function LoadData() {
    const dispatch = useDispatch()
    useEffect(() => {
        FirstCome()
    })
    const FirstCome = () => {
        AsyncStorage.getItem('@AccountEmail', async (error, result) => {
            if (result !== null) {
                const server = await AsyncStorage.getItem('@AccountServer')
                const dataEmployee = await AsyncStorage.getItem('@AccountEmployee')
                const token = await AsyncStorage.getItem('@AccountToken')
                const dataEmp = JSON.parse(dataEmployee)
            }
        })
    }
    return (
        <>
        <Spinner status='warning' />
        </>
    )
}