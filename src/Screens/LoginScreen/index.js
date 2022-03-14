import React, { Component } from 'react'
import { ToastAndroid, View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, SafeAreaView, Image, ActivityIndicator } from 'react-native'
import LoginImageHeaderOne from '../../ImagesSource/LoginImageHeaderOne'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginImageHeaderTwo from '../../ImagesSource/LoginImageHeaderTwo'
import axios from 'axios';
import loginFirebase from '../../lib/loginFirebase';
import LoginForm from '../../Molecule/LoginForm';


class LoginScreen extends Component {
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
    render() {
        return (
            <SafeAreaView style={{ flex: 1, marginTop: 30 }}>
                <LoginImageHeaderOne />
                <LoginImageHeaderTwo />
                        {/* <ActivityIndicator animating={true} size="large" style={{ opacity: 1, flex: 1 }} color="rgba(0,0,0,0.5)" /> */}
                        <ScrollView style={{ marginTop: 50, flex: 1 }} >
                            <Text style={styles.Header}>{this.state.header}</Text>
                            <Text style={styles.Sub}>{this.state.subtitle}</Text>
                            <LoginForm nav={this.props.navigation} />
                        </ScrollView>

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
export default LoginScreen