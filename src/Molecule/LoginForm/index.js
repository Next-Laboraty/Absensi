import React, { useState } from "react";
import { KeyboardAvoidingView, View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux'
import { employee_data, employee_name, employee_mail, employee_server, employee_token } from "../../features/employee/employeeSlice";
import { getDatabase, ref, onValue, set, get, child } from 'firebase/database';
import axios from 'axios';
import { base64 } from "@firebase/util";
import AsyncStorage from '@react-native-async-storage/async-storage'
import AxiosPostDataNoToken from "../../lib/AxiosPostDataNoToken";
import { ToastAndroid } from "react-native-web";
import getToken from "../../lib/getToken";
import AxiosGetDataAction from "../../lib/AxiosGetDataAction"
import AxiosToken from "../../lib/AxiosToken";
import AxiosGetEmployee from "../../lib/AxiosGetEmployee";
import RegisterForPushNotificationsAsync from "../../NotoficationsData/NotificationAll/RegisterForPushNotificationsAsync";

export default function LoginForm(props) {
    const dispatch = useDispatch()
    // State
    const [usr, setUsr] = useState('')
    const [pwd, setPwd] = useState('')
    const [loading, setLoading] = useState(false)
    const [server, setServer] = useState('')
    const [eyeOpen, setEyeOpen] = useState(true)

    // On Change
    const onUserChange = usr => {
        setUsr(usr);
    };
    const onServerChange = server => {
        setServer(server);
    };
    const onPasswordChange = pwd => {
        setPwd(pwd);
    };

    const eyeOpenButton = () => {
        eyeOpen ? setEyeOpen(false) : setEyeOpen(true)
    }

    // Logical Login
    const alertMsg = (data) => {
        Alert.alert(data.title, data.body, [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
    }
    const onLogin = () => {
        setLoading(true)
        const payload = {
            usr,
            pwd
        }
        if (server == '' || usr == '' || pwd == '') {
            let data = {
                title: 'Data Kosong',
                body: 'Data yang anda masukan kosong, harap isi dengan data yang valid'
            }
            alertMsg(data)
            setLoading(false)
        }
        else {
            const dataApi = {
                payload,
                server
            }
            AxiosPostDataNoToken(dataApi).then((res) => {
                setLoading(true)
                getToken(server).then(snapshot => {
                    const token = snapshot.val().token
                    const dataHeader = '@AccountToken'
                    AsyncPenyimpanan(dataHeader, token)
                    dispatch(employee_token(token))
                    AsyncPenyimpanan('@AccountServer', base64.encodeString(server))
                    dispatch(employee_server(base64.encodeString(server)))
                    AxiosToken(`https://${server}`).then(res => {
                        const AkunServer = res.data.message
                        AsyncPenyimpanan('@AccountEmail', base64.encodeString(AkunServer))
                        dispatch(employee_mail(AkunServer))
                        const urlX = `https://${server}/api/resource/Employee?fields=["*"]&filters=[["user_id","=","${AkunServer}"]]`
                        AxiosGetEmployee(urlX,base64.decodeString(token)).then(res=>{
                            const employee = JSON.stringify(res.data.data[0])
                            writeEmployeeData(base64.encodeString(AkunServer),res.data.data[0])
                            AsyncPenyimpanan('@AccountEmployee', employee)
                            dispatch(employee_data(JSON.parse(employee)))
                            RegisterForPushNotificationsAsync().then(res=>{
                                writeUserData(base64.encodeString(AkunServer),res,base64.encodeString(server))
                                props.nav.replace('SplashScreen')

                            }).catch(err=>console.log(err))
                        }).catch(err=>console.log(err))
                    }).catch(err => console.log(`Error Bro : ${err}`))
                }).catch(error => console.error(error))
            }
            ).catch((err) => {
                let data = {
                    title: 'Error Login',
                    body: `${err}`
                }
                alertMsg(data)
                setLoading(false)
            })
        }

    }
    function writeEmployeeData(email, data) {
        const db = getDatabase();
        const exit = set(ref(db, 'Employee/' + email + '/dataKaryawan'), data);
        return exit
      }
    function writeUserData(userMail, notificationToken,servers) {
        const db = getDatabase();
        const exit = set(ref(db, 'NotificationUser/' +servers+'/'+ userMail), notificationToken);
        return exit
      }
    const AsyncPenyimpanan = async (dataHeader, textPayload) => {
        await AsyncStorage.setItem(
            dataHeader,
            textPayload
        );
    }
    return (
        <KeyboardAvoidingView style={styles.CardInput} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {loading ? <ActivityIndicator color={'#516BEB'} /> :
                <>
                    <View>
                        <TextInput value={server} onChangeText={onServerChange} placeholder='Masukan Server' placeholderTextColor={'#D0D7FC'} style={styles.InputStyle} />
                        <Feather name="server" size={15} color="#516BEB" style={{ position: 'absolute', left: 37, top: 18 }} />
                        <Text style={{ fontFamily: 'Regular', fontSize: 8, color: 'gray', position: 'absolute', top: 42, left: 40 }}>Contoh <Text style={{ fontFamily: 'Bold', color: 'red' }} onPress={()=>setServer('onglai.id')}>onglai.id</Text> (tanpa http dan www)</Text>
                    </View>
                    <View>
                        <TextInput value={usr} onChangeText={onUserChange} placeholder='Masukan Username' placeholderTextColor={'#D0D7FC'} style={styles.InputStyle} />
                        <Feather name="user" size={15} color="#516BEB" style={{ position: 'absolute', left: 37, top: 18 }} />
                    </View>
                    <View>
                        <TextInput value={pwd} onChangeText={onPasswordChange} placeholder='Masukan Password' placeholderTextColor={'#D0D7FC'} style={styles.InputStyle} secureTextEntry={eyeOpen} />
                        <Feather name="key" size={15} color="#516BEB" style={{ position: 'absolute', left: 37, top: 18 }} />
                        <TouchableOpacity style={{ position: 'absolute', right: 37, top: 18 }} onPress={() => eyeOpenButton()}>
                            {eyeOpen ? <Feather name="eye-off" size={15} color="#D0D7FC" /> : <Feather name="eye" size={15} color="#D0D7FC" />}
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.buttonLogin} onPress={() => onLogin()}>
                            <Text style={styles.buttonLoginText}>
                                Masuk
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            }
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    textLang: {
        fontFamily: 'Bold',
        color: '#516BEB',
        fontSize: 15,
        right: -10,
        top: 3
    },
    buttonLoginText: {
        color: '#fff',
        textAlign: 'center',
        paddingVertical: 10,
        fontFamily: 'Bold',
        fontSize: 18
    },
    buttonLogin: {
        backgroundColor: '#516BEB',
        marginHorizontal: 100,
        marginTop: 50,
        borderRadius: 30
    },
    CardInput: {
        marginTop: 20
    },
    Header: {
        fontFamily: 'Bold',
        fontSize: 39,
        color: '#516BEB',
        textAlign: 'center'
    },
    Sub: {
        fontFamily: 'Regular',
        color: '#5F5F5F',
        marginTop: -10,
        textAlign: 'center'
    },
    InputStyle: {
        backgroundColor: '#fff',
        borderColor: '#D0D7FC',
        borderWidth: 1,
        marginVertical: 12,
        marginHorizontal: 30,
        borderRadius: 30,
        paddingLeft: 30,
        paddingRight: 20,
        color: '#000',
        fontFamily: 'Regular',
    }
});