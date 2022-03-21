import React, { useState } from "react";
import { Input, Layout, Text, Button } from '@ui-kitten/components';
import {View} from 'react-native'

export default function ChangePassword() {
    const [repeat, setRepeat] = useState('')
    const [new_password, setNew_password] = useState('')
    const [stat, setStat] = useState('primary')
    const [buttonDisable, setButtonDisable] = useState(true)
    const onRepeat = repeat => {
        setRepeat(repeat);
        if (repeat !== new_password) {
            setStat('danger')
        }
        else {
            if(repeat !== '' || new_password !== ''){
                setStat('primary')
                setButtonDisable(false)
            }
            else{
                setStat('primary')
            }
        }
    };
    const onPasswordChange = new_password => {
        setNew_password(new_password);
        if (repeat !== new_password) {
            setStat('danger')
        }
        else {
            if(repeat !== '' || new_password !== ''){
                setStat('primary')
                setButtonDisable(false)
            }
            else{
                setStat('primary')
            }
        }
    };
    useState(() => {
        if (repeat !== new_password) {
            setStat('danger')
        }
    }, [repeat, new_password])
    return (
        <Layout style={{ flex: 1 }}>
            <View style={{flex:1}}>
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
            </View>
            <View style={{height:'10%'}}>
            <Button disabled={buttonDisable}>Ganti Password</Button>
            </View>
        </Layout>
    )
}