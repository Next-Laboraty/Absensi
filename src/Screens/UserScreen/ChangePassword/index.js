import React, { useState } from "react";
import { Input, Layout, Text, Button,Alert } from '@ui-kitten/components';
import { View } from 'react-native'
import { useSelector } from "react-redux";
import { base64 } from "@firebase/util";
import WebhookUrl from "../../../lib/WebhookUrl";
import { Paragraph, Dialog, Portal, Provider } from 'react-native-paper';

export default function ChangePassword() {
    const { employee, server, token } = useSelector(state => state.employee)
    const [repeat, setRepeat] = useState('')
    const [new_password, setNew_password] = useState('')
    const [stat, setStat] = useState('primary')
    const [buttonDisable, setButtonDisable] = useState(true)
    const [msg, setMsg] = useState('')
    const [visible, setVisible] = useState()
    const onRepeat = repeat => {
        setRepeat(repeat);
        if (repeat.length <= 5) {
            setStat('danger')
            setMsg('Password kurang dari 6 Karakter')
        }
        else {
            if (new_password !== repeat) {
                setStat('danger')
                setMsg('Password tidak sama')
            }
            else {
                setStat('primary')
            }
        }
    };
    const hideDialog = () => setVisible(false);
    const OnChangePass = () => {
        if (repeat.length <= 1 && new_password <= 1) {
            setStat('danger')
            setMsg('Field tidak boleh kosong')
        }
        else {
            setMsg('Tunggu Sebentar')
            setStat('danger')
            const payload = {
                new_password
            }
            const DataX = {
                type: 'changePassword',
                payload,
                server: base64.decodeString(server),
                token: base64.decodeString(token),
                employee: employee.employee
            }
            WebhookUrl(DataX).then(() => {
                setMsg(`Berhasil mengubah Password`)
                setVisible(true)
            }).catch((err) =>{
                setMsg(`Coba lagi dalam beberapa menit lagi atau tutup aplikasi dan coba kembali lagi nanti, cek koneksi internet anda. \nJika speed internet dibawah 1,5MB/s maka anda akan mendapatan error ini lagi`)
                setVisible(true)})
        }
    }
    const onPasswordChange = new_password => {
        setNew_password(new_password);
        if (new_password.length <= 5) {
            setStat('danger')
            setMsg('Password kurang dari 6 Karakter')
        }
        else {
            if (new_password !== repeat) {
                setStat('danger')
                setMsg('Password tidak sama')
            }
            else {
                setStat('primary')
            }
        }
    };
    return (
        <Provider>
            <Layout style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Layout level={'4'} style={{ marginHorizontal: 20, marginVertical: 20, padding: 20 }} >
                        <Text style={{ fontSize: 10, fontFamily: 'Regular' }}>
                            Masukan Password Baru
                        </Text>
                        <Input status={stat} onChangeText={onRepeat} placeholder={'Masukan Password Baru'}></Input>
                    </Layout>
                    <Layout level={'4'} style={{ marginHorizontal: 20, marginVertical: 10, padding: 20 }} >
                        <Text style={{ fontSize: 10, fontFamily: 'Regular' }}>
                            Ulangi
                        </Text>
                        <Input status={stat} onChangeText={onPasswordChange} placeholder={'Masukan Password Baru'}></Input>
                    </Layout>
                    {stat == 'danger' ? <Layout level={'4'} style={{ marginHorizontal: 20, marginVertical: 10, padding: 20 }} ><Text status={'warning'}>Perhatian: {msg}</Text></Layout> : null}

                </View>
                <View style={{ height: '10%' }}>
                    {stat == 'danger' ? <Button disabled={buttonDisable}>Ganti Password</Button> : <Button onPress={() => OnChangePass()}>Ganti Password</Button>}
                </View>
            </Layout>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Laporan Penggantian Password</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>{msg}</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Mengerti</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </Provider>
    )
}