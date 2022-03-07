import React, { Component } from 'react'
import { ToastAndroid, View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, SafeAreaView, Image, ActivityIndicator } from 'react-native'
import LoginImageHeaderOne from '../../ImagesSource/LoginImageHeaderOne'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginImageHeaderTwo from '../../ImagesSource/LoginImageHeaderTwo'
import LoginImageHeaderThree from '../../ImagesSource/LoginImageHeaderThree'
import { Feather } from '@expo/vector-icons';
import UserAuthLogin from '../../Redux/UserAuth'
import axios from 'axios';
// import langLib from '../../lib/langLib';


export default class LoginScreen extends Component {
    constructor() {
        super();
        this.state = {
            LangSys: 'ID',
            EyeO: false,
            server: '',
            usr: '',
            pwd: '',
            isLoading: false,
            header: 'Masuk.',
            subtitle: 'Selamat datang kembali ! Masuk \nuntuk melanjutkan ke HRIS',
            placeholderServer: 'Masukan Server',
            placeholderUsername: 'Masukan Username',
            placeholderPassword: 'Masukan Password',
            buttonIn: 'Masuk',

        }
    }
    componentDidMount() {
        this.storageData()
    }
    storageData() {
        AsyncStorage.getItem('LoginScreen', (error, result) => {
            let resultParsed = JSON.parse(result)
            if (result) {
                this.setState({
                    header: resultParsed.header,
                    LangSys: resultParsed.LangSys,
                    statusTapIn: resultParsed.statusTapIn,
                    dateAttendance: resultParsed.dateAttendance,
                    subtitle: resultParsed.subtitle,
                    placeholderServer: resultParsed.placeholderServer,
                    placeholderUsername: resultParsed.placeholderUsername,
                    placeholderPassword: resultParsed.placeholderPassword,
                    buttonIn: resultParsed.buttonIn,
                })
            }

        });
    }
    ChangeMyLang() {
        if (this.state.LangSys == 'EN') {
            const JSO = {
                header: 'Masuk.',
                LangSys: 'ID',
                subtitle: 'Selamat datang kembali ! Masuk \nuntuk melanjutkan ke HRIS',
                placeholderServer: 'Masukan Server',
                placeholderUsername: 'Masukan Username',
                placeholderPassword: 'Masukan Password',
                buttonIn: 'Masuk',
            }
            AsyncStorage.setItem('LoginScreen', JSON.stringify(JSO));
            this.setState({
                header: 'Masuk.',
                LangSys: 'ID',
                subtitle: 'Selamat datang kembali ! Masuk \nuntuk melanjutkan ke HRIS',
                placeholderServer: 'Masukan Server',
                placeholderUsername: 'Masukan Username',
                placeholderPassword: 'Masukan Password',
                buttonIn: 'Masuk',
            })

        }
        else {
            const JSO = {
                header: 'Login.',
                LangSys: 'EN',
                subtitle: 'Welcome Back ! Login to \nEnter HRIS',
                placeholderServer: 'Enter Company Server',
                placeholderUsername: 'Enter your Username',
                placeholderPassword: 'Enter your Password',
                buttonIn: 'Login',
            }
            AsyncStorage.setItem('LoginScreen', JSON.stringify(JSO));
            this.setState({
                header: 'Login.',
                LangSys: 'EN',
                subtitle: 'Welcome Back ! Login to \nEnter HRIS',
                placeholderServer: 'Enter Company Server',
                placeholderUsername: 'Enter your Username',
                placeholderPassword: 'Enter your Password',
                buttonIn: 'Login',
            })
        }
    }
    onLogin() {
        const { usr, pwd, server } = this.state;
        const payload = { usr, pwd };
        if (usr == '' || pwd == '' || server == '') {
            if (this.state.LangSys == 'ID') {
                ToastAndroid.show('Server, Username atau Password yang Anda masukan tidak benar atau masih kosong', ToastAndroid.SHORT)
            }
            else {
                ToastAndroid.show('Incorrect Username/Password or Server is blank', ToastAndroid.SHORT)
            }
        }
        else {

            const url = 'https://' + server
            axios({
                url: url + `/api/method/login`,
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': 'application/json'
                },
                data: payload,
                timeout: 1000
            })


            //     const CancelToken = axios.CancelToken
            //     const source = CancelToken.source();
            //     axios.post(url , payload,{
            //         cancelToken: source.token
            //     }, {
            //         headers: {
            //             'Content-Type': 'application/json',
            //             'Accept-Language': 'application/json'
            //         }
            //     })
            //         .then((res) => {
            //             console.log(res.data)
            //         })
            //         .catch(function (err) {
            //             console.log(err)
            //         }.bind(this))
            // }
        }
    }
    EyeOpen() {
        if (!this.state.EyeO) {
            this.setState({
                EyeO: true
            })
        }
        else {
            this.setState({
                EyeO: false
            })
        }
    }
    onUsernameChange = usr => {
        this.setState({ usr });
    };

    // 999
    onPasswordChange = pwd => {
        this.setState({ pwd });
    }
    onServerChange = server => {
        this.setState({ server });
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, marginTop: 30 }}>
                <TouchableOpacity style={{ width: 65, height: 30, borderColor: '#516BEB', borderWidth: 1, borderRadius: 15, top: 12, left: 280 }}
                    onPress={() => this.ChangeMyLang()}
                >
                    {this.state.LangSys == 'ID' ? <Text style={styles.textLang}>ID</Text> : <Text style={styles.textLang}>EN</Text>}
                    {this.state.LangSys == 'ID' ? <Image source={require('../../../assets/Flag.png')} style={{ width: 25, height: 25, position: 'absolute', right: 6, top: 1 }} /> : <Image source={require('../../../assets/united-kingdom.png')} style={{ width: 25, height: 25, position: 'absolute', right: 6, top: 1 }} />}

                </TouchableOpacity>
                <LoginImageHeaderOne />
                <LoginImageHeaderTwo />
                {
                    this.state.isLoading
                        ?
                        <ActivityIndicator animating={true} size="large" style={{ opacity: 1, flex: 1 }} color="rgba(0,0,0,0.5)" />
                        :
                        <ScrollView style={{ marginTop: 50, flex: 1 }} >
                            <Text style={styles.Header}>{this.state.header}</Text>
                            <Text style={styles.Sub}>{this.state.subtitle}</Text>
                            <KeyboardAvoidingView style={styles.CardInput} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                                <View>
                                    <TextInput value={this.state.server} onChangeText={this.onServerChange} placeholder={this.state.placeholderServer} placeholderTextColor={'#D0D7FC'} style={styles.InputStyle} />
                                    <Feather name="server" size={15} color="#516BEB" style={{ position: 'absolute', left: 37, top: 18 }} />
                                </View>
                                <View>
                                    <TextInput value={this.state.usr} onChangeText={this.onUsernameChange} placeholder={this.state.placeholderUsername} placeholderTextColor={'#D0D7FC'} style={styles.InputStyle} />
                                    <Feather name="user" size={15} color="#516BEB" style={{ position: 'absolute', left: 37, top: 18 }} />
                                </View>
                                <View>
                                    <TextInput value={this.state.pwd} onChangeText={this.onPasswordChange} placeholder={this.state.placeholderPassword} placeholderTextColor={'#D0D7FC'} style={styles.InputStyle} secureTextEntry={!this.state.EyeO} />
                                    <Feather name="key" size={15} color="#516BEB" style={{ position: 'absolute', left: 37, top: 18 }} />
                                    <TouchableOpacity style={{ position: 'absolute', right: 37, top: 18 }} onPress={() => this.EyeOpen()}>
                                        {!this.state.EyeO ? <Feather name="eye-off" size={15} color="#D0D7FC" /> : <Feather name="eye" size={15} color="#D0D7FC" />}
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity style={styles.buttonLogin} onPress={() => this.onLogin()}>
                                        <Text style={styles.buttonLoginText}>
                                            {this.state.buttonIn}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </KeyboardAvoidingView>
                        </ScrollView>
                }

            </SafeAreaView>
        );
    };
};

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