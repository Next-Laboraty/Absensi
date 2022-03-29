import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, TextInput } from 'react-native';
import { Datepicker, IndexPath, Layout, Select, SelectGroup, SelectItem, Text, NativeDateService, Button, Input } from '@ui-kitten/components';
import { getDatabase, ref, child, get, set } from "firebase/database";
import { base64 } from '@firebase/util';
import { useSelector } from "react-redux";
import moment from 'moment';
import axios from 'axios';
import { Paragraph, Dialog, Portal, Provider } from 'react-native-paper';
import WebhookUrl from '../../../lib/WebhookUrl'

const prioritas = [
    'Low',
    'Medium',
    'High',
    'Urgent',
];

const useDatepickerState = (initialDate = null) => {
    const [date, setDate] = useState(initialDate);
    return { date, onSelect: setDate };
};

export default function TugasBaru({ route, navigation }) {
    const formatDateService = new NativeDateService('en', { format: 'YYYY-MM-DD' });
    const [article, setArticle] = useState();
    const { employee, token, server } = useSelector(state => state.employee)
    const dbRef = ref(getDatabase());
    const [listData, setListData] = useState(['VHVuZ2d1IFNlYmVudGFy'])
    const [priority, setPriority] = useState(['VHVuZ2d1IFNlYmVudGFy'])
    const [typeTask, setTypeTask] = useState(['VHVuZ2d1IFNlYmVudGFy'])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTanggal(moment().format('YYYY-MM-DD'))
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

        get(child(dbRef, `TypeTask/${server}`)).then((snapshot) => {
            if (snapshot.exists()) {
                setTypeTask(Object.keys(snapshot.val()));
                // setLoading(false)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });

    }, [])
    const [changeNumber, onChangeNumber] = useState()
    async function writeUserData() {
        if (subject == '' || changeNumber == '') {
            setMsg('Data tidak boleh kosong')
            setVisible(true)
        }
        else {
            var newString = changeNumber.replace(/\n/g, "<br>");
            setMsg('Data sedang diproses\nJika berhasil anda akan dialihkan ke menu Tugas')
            setVisible(true)
            const dataXS = {
                subject: subject,
                completed_by: base64.decodeString(displayValue),
                type: displayType,
                description: newString,
                priority: displayPriority,
                status: 'Open',
                exp_start_date: moment().format(`YYYY-MM-DD`),
                exp_end_date: moment(tanggal).format(`YYYY-MM-DD`)
            }
            const DATAX = {
                server: base64.decodeString(server),
                tokens: base64.decodeString(token),
                payload: dataXS,
                type: 'BuatTaskBaru'
            }
            WebhookUrl(DATAX)
            setTimeout(() => {
                navigation.navigate('Task')
            }, 3000)
        }
        // const db = getDatabase();
        // set(ref(db, 'ToDo/' + base64.encodeString(employee.user_id)+'/Data'), dataXS);
    }
    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
    const [selectedType, setSelectedType] = useState(new IndexPath(0));
    const [selectPriority, setSelectPriority] = useState(new IndexPath(0));
    const displayPriority = prioritas[selectPriority.row];
    const displayValue = listData[selectedIndex.row];
    const displayType = typeTask[selectedType.row]
    const [subject, setSubject] = React.useState('');
    const [msg, setMsg] = useState('')
    const [visible, setVisible] = useState()
    const [buttonDisable, setButtonDisable] = useState(true)
    const hideDialog = () => setVisible(false);

    const renderOption = (title) => (
        <SelectItem style={styles.select} key={title} title={base64.decodeString(title)} />
    );
    const renderOption2 = (title) => (
        <SelectItem style={styles.select} key={title} title={title} />
    );

    const [tanggal, setTanggal] = useState(new Date())
    const dateFormatPickerState = useDatepickerState();
    return (
        <Provider>

            <Layout style={styles.container} level='1'>
                <ScrollView style={{ flex: 1 }}>
                    <Layout style={styles.Views}>
                        <Input
                            placeholder='Judul Tugas'
                            value={subject}
                            onChangeText={nextValue => setSubject(nextValue)}
                        />
                    </Layout>
                    <Layout style={styles.Views}>
                        <Text style={{ fontFamily: 'Medium', fontSize: 10 }}>Berikan Tugas Untuk</Text>
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
                        <Text style={{ fontFamily: 'Medium', fontSize: 10 }}>Tipe Tugas</Text>
                        <Select
                            placeholder='Default'
                            value={displayType}
                            selectedIndex={selectedType}
                            onSelect={index => setSelectedType(index)}>
                            {typeTask.map(renderOption2)}
                        </Select>
                    </Layout>

                    <Layout style={styles.Views}>
                        <Text style={{ fontFamily: 'Medium', fontSize: 10 }}>Dead Line</Text>
                        <Datepicker placeholder='Date Format' date={tanggal} onSelect={nextDate => setTanggal(nextDate)} dateService={formatDateService} {...dateFormatPickerState} />
                    </Layout>
                    <Layout style={styles.Views}>
                        <Text style={{ fontFamily: 'Medium', fontSize: 10 }}>Tugas</Text>
                        <TextInput style={{ padding: 10, height: 200, fontFamily: 'Regular', borderColor: '#d7d7d7', backgroundColor: '#F7F5F2', borderWidth: 1, borderRadius: 15 }} onChangeText={onChangeNumber} multiline={true} />
                    </Layout>
                </ScrollView>
                <Layout style={{ height: '8%', flexDirection: 'row', alignItems: 'center' }} level='4'>
                    <Text style={{ textAlign: 'center', justifyContent: 'center', width: '50%', fontFamily: 'Medium' }}>Kirim Sekarang</Text><Button style={{ margin: 5, flex: 1 }} onPress={() => writeUserData()}>Submit</Button>
                </Layout>
            </Layout>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Laporan Tugas</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>{msg}</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Mengerti</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </Provider>
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