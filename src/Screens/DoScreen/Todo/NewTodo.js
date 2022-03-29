import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, TextInput } from 'react-native';
import { Datepicker, IndexPath, Layout, Select, SelectGroup, SelectItem, Text, NativeDateService, Button } from '@ui-kitten/components';
import { getDatabase, ref, child, get, set } from "firebase/database";
import { base64 } from '@firebase/util';
import { useSelector } from "react-redux";
import moment from 'moment';
import WebhookUrl from '../../../lib/WebhookUrl';

const prioritas = [
    'Medium',
    'Low',
    'High'
];
const useDatepickerState = (initialDate = null) => {
    const [date, setDate] = useState(initialDate);
    return { date, onSelect: setDate };
};

export default function NewTodo({ route }) {
    const formatDateService = new NativeDateService('en', { format: 'YYYY-MM-DD' });
    const { server } = route.params
    const [article, setArticle] = useState();
    const { employee, token } = useSelector(state => state.employee)
    const dbRef = ref(getDatabase());
    const [listData, setListData] = useState(['VHVuZ2d1IFNlYmVudGFy'])
    const [priority, setPriority] = useState(['VHVuZ2d1IFNlYmVudGFy'])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        get(child(dbRef, `NotificationUser/${server}`)).then((snapshot) => {
            if (snapshot.exists()) {
                setListData(Object.keys(snapshot.val()));
                setLoading(false)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });

    }, [])
    function writeUserData() {
        console.log(tanggal)


        var newString = changeNumber.replace(/\n/g, "<br>");
        const dataXS = {
            owner:base64.decodeString(displayValue),
            description:newString,
            priority:displayPriority,
            status:'Open',
            date:moment(tanggal).format(`YYYY-MM-DD`)
        }
        const DATAX = {
            server: base64.decodeString(server),
            tokens: base64.decodeString(token),
            payload:dataXS,
            type:'KirimTodo'
        }
        WebhookUrl(DATAX)
        // const db = getDatabase();
        // set(ref(db, 'ToDo/' + base64.encodeString(employee.user_id)+'/Data'), dataXS);
    }
    const [changeNumber, onChangeNumber] = useState()
    console.log(changeNumber)
    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
    const [selectPriority, setSelectPriority] = useState(new IndexPath(0));
    const displayPriority = prioritas[selectPriority.row];
    const displayValue = listData[selectedIndex.row];

    const renderOption = (title) => (
        <SelectItem style={styles.select} key={title} title={base64.decodeString(title)} />
    );
    const renderOption2 = (title) => (
        <SelectItem style={styles.select} key={title} title={title} />
    );

    const [tanggal, setTanggal] = useState(new Date())
    const dateFormatPickerState = useDatepickerState();
    return (
        <Layout style={styles.container} level='1'>
            <ScrollView style={{ flex: 1 }}>
                <Layout style={styles.Views}>
                    <Text style={{ fontFamily: 'Medium', fontSize: 10 }}>Berikan ToDo untuk</Text>
                    <Select
                        placeholder='Default'
                        value={base64.decodeString(displayValue)}
                        selectedIndex={selectedIndex}
                        onSelect={index => setSelectedIndex(index)}>
                        {listData.map(renderOption)}
                    </Select>
                </Layout>
                <Layout style={styles.Views}>
                    <Text style={{ fontFamily: 'Medium', fontSize: 10 }}>Prioritas</Text>
                    <Select
                        placeholder='Default'
                        value={displayPriority}
                        selectedIndex={selectPriority}
                        onSelect={index => setSelectPriority(index)}>
                        {prioritas.map(renderOption2)}
                    </Select>
                </Layout>

                <Layout style={styles.Views}>
                    <Text style={{ fontFamily: 'Medium', fontSize: 10 }}>Dead Line</Text>
                    <Datepicker placeholder='Date Format' date={tanggal} onSelect={nextDate => setTanggal(nextDate)} dateService={formatDateService} {...dateFormatPickerState} />
                </Layout>
                <Layout style={styles.Views}>
                    <Text style={{ fontFamily: 'Medium', fontSize: 10 }}>Isi ToDo</Text>
                    <TextInput style={{ padding: 10, height: 200, fontFamily: 'Regular', borderColor: '#d7d7d7', backgroundColor: '#F7F5F2', borderWidth: 1, borderRadius: 15 }} onChangeText={onChangeNumber} multiline={true} />
                </Layout>
            </ScrollView>
            <Layout style={{ height: '8%', flexDirection: 'row', alignItems: 'center' }} level='4'>
                <Text style={{ textAlign: 'center', justifyContent: 'center', width: '50%', fontFamily: 'Medium' }}>Kirim Sekarang</Text><Button style={{ margin: 5, flex: 1 }} onPress={() => writeUserData()}>Submit</Button>
            </Layout>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    Views: {
        margin: 20,
        borderRadius: 20
    },
});