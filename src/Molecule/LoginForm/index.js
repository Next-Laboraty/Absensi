import React, { useState } from "react";
import { KeyboardAvoidingView, View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux'
import { employee_data, employee_name, employee_mail, employee_server, employee_token } from "../../features/employee/employeeSlice";
import { getDatabase, ref, onValue, set, get, child } from 'firebase/database';
import axios from 'axios';
import { base64 } from "@firebase/util";
import AsyncStorage from '@react-native-async-storage/async-storage'

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
            axios({
                url: `https://${server}/api/method/login`,
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': 'application/json'
                },
                data: payload,
                timeout: 1000
            })
                .then((response) => {
                    // handle success
                    if (response.data.message == "Logged In") {
                        const data = {
                            server: server
                        }
                        goDatabase(data)
                    }
                    else {
                        setLoading(false)
                    }
                })
                .catch((error) => {
                    // handle error
                    setLoading(false)
                })
        }
    }
    // Datbase Engine
    const goDatabase = async (data) => {
        const url = 'https://' + data.server
        axios({
            url: url + `/api/method/frappe.auth.get_logged_user`,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': 'application/json'
            },
            timeout: 1000
        })
            .then(async (response) => {
                setLoading(false)
                const baseServer = base64.encodeString(data.server)
                try {
                    const user = response.data.message
                    await AsyncStorage.setItem(
                        '@AccountEmail',
                        base64.encodeString(user)
                    );
                    await AsyncStorage.setItem(
                        '@AccountServer',
                        baseServer
                    );
                    dispatch(employee_server(baseServer))
                    dispatch(employee_mail(base64.encodeString(user)))
                    axios({
                        url: url + `/api/resource/Employee?fields=["*"]&filters=[["user_id","=","${user}"]]`,
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept-Language': 'application/json'
                        },
                        timeout: 1000
                    })
                        .then(async (res) => {
                            const dbRef = ref(getDatabase());
                            const dataKaryawan = res.data.data[0]
                            const data = { ...dataKaryawan }
                            console.log(dataKaryawan)
                            await AsyncStorage.setItem('@AccountEmployee', JSON.stringify(dataKaryawan))
                            dispatch(employee_data(dataKaryawan))
                            get(child(dbRef, `Employee/${base64.encodeString(user)}`)).then((snapshot) => {
                                if (snapshot.exists()) {
                                    get(child(dbRef, `serverName/${baseServer}`)).then(async (snapshot) => {
                                        if (snapshot.exists()) {
                                            await AsyncStorage.setItem('@AccountToken',snapshot.val().token)
                                            dispatch(employee_token(snapshot.val().token))
                                            props.nav.replace('BottomTabsNavigator')
                                        }
                                    }).catch((error) => {
                                        console.error(error);
                                    });
                                } else {
                                    const Employee = ref(db, 'Employee/' + base64.encodeString(user));
                                    set(Employee, data);
                                    get(child(dbRef, `serverName/${baseServer}`)).then(async (snapshot) => {
                                        if (snapshot.exists()) {
                                            await AsyncStorage.setItem('@AccountToken',snapshot.val().token)
                                            dispatch(employee_token(snapshot.val().token))
                                            props.nav.replace('BottomTabsNavigator')
                                        }
                                    }).catch((error) => {
                                        console.error(error);
                                    });
                                }
                            }).catch((error) => {
                                console.error(error);
                            });
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                } catch (error) {
                    // Error saving data
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <KeyboardAvoidingView style={styles.CardInput} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {loading ? <ActivityIndicator color={'#516BEB'} /> :
                <>
                    <View>
                        <TextInput value={server} onChangeText={onServerChange} placeholder='Masukan Server' placeholderTextColor={'#D0D7FC'} style={styles.InputStyle} />
                        <Feather name="server" size={15} color="#516BEB" style={{ position: 'absolute', left: 37, top: 18 }} />
                        <Text style={{ fontFamily: 'Regular', fontSize: 8, color: 'gray', position: 'absolute', top: 42, left: 40 }}>Contoh <Text style={{ fontFamily: 'Bold', color: 'red' }}>onglai.id</Text> (tanpa http dan www)</Text>
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