import React, { Component } from 'react'
import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, SafeAreaView, Image } from 'react-native'
import LoginImageHeaderOne from '../../ImagesSource/LoginImageHeaderOne'
import LoginImageHeaderTwo from '../../ImagesSource/LoginImageHeaderTwo'
import LoginImageHeaderThree from '../../ImagesSource/LoginImageHeaderThree'
import { Feather } from '@expo/vector-icons';
import UserAuthLogin from '../../Redux/UserAuth'


export default class LoginScreen extends Component {
    constructor() {
        super();
        this.state = {
            header: 'Masuk.',
            subtitle: 'Selamat datang kembali ! Masuk \nuntuk melanjutkan ke HRIS',
            placeholderServer: 'Masukan Server',
            placeholderUsername: 'Masukan Username',
            placeholderPassword: 'Masukan Password',
            buttonIn: 'Masuk',
            EyeO: false,
            loginData: {
                server: '',
                usr: '',
                pwd: ''
            }

        }
    }
    componentWillUnmount() {
    }
    onUsernameChange = usr => {
        this.setState({ loginData:{
            usr
        } });
    };
    onPasswordChange = pwd => {
        this.setState({
            loginData:{
                pwd
            }
        })
    }
    onServerChange = server => {
        this.setState({
            server
        })
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

    render() {
        return (
            <SafeAreaView style={{ flex: 1, marginTop: 30 }}>
                <TouchableOpacity style={{width: 65,height: 30,borderColor:'#516BEB',borderWidth:1,borderRadius:15,top:12,left:280}}>
                    <Text style={styles.textLang}>ID</Text>
                    <Image source={require('../../../assets/Flag.png')} style={{width:25,height:25,position:'absolute',right:6,top:1}} />
                </TouchableOpacity>
                <LoginImageHeaderOne />
                <LoginImageHeaderTwo />
                <ScrollView style={{ marginTop: 50,flex:1 }} >
                    <Text style={styles.Header}>{this.state.header}</Text>
                    <Text style={styles.Sub}>{this.state.subtitle}</Text>
                    <KeyboardAvoidingView style={styles.CardInput} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                        <View>
                            <TextInput placeholder={this.state.placeholderServer} placeholderTextColor={'#D0D7FC'} style={styles.InputStyle} />
                            <Feather name="server" size={15} color="#516BEB" style={{ position: 'absolute', left: 37, top: 18 }} />
                        </View>
                        <View>
                            <TextInput placeholder={this.state.placeholderUsername}  placeholderTextColor={'#D0D7FC'} style={styles.InputStyle} />
                            <Feather name="user" size={15} color="#516BEB" style={{ position: 'absolute', left: 37, top: 18 }} />
                        </View>
                        <View>
                            <TextInput placeholder={this.state.placeholderPassword}  placeholderTextColor={'#D0D7FC'} style={styles.InputStyle} secureTextEntry={!this.state.EyeO} />
                            <Feather name="key" size={15} color="#516BEB" style={{ position: 'absolute', left: 37, top: 18 }} />
                            <TouchableOpacity style={{ position: 'absolute', right: 37, top: 18 }} onPress={() => this.EyeOpen()}>
                                {!this.state.EyeO ? <Feather name="eye-off" size={15} color="#D0D7FC" /> : <Feather name="eye" size={15} color="#D0D7FC" />}
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.buttonLogin} onPress={() => this.props.navigation.navigate('SplashScreen')}>
                                <Text style={styles.buttonLoginText}>
                                    {this.state.buttonIn}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    textLang:{
        fontFamily:'Bold',
        color:'#516BEB',
        fontSize:15,
        right:-10,
        top:3
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
        color:'#516BEB',
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
        borderColor:'#D0D7FC',
        borderWidth:1,
        marginVertical: 12,
        marginHorizontal: 30,
        borderRadius: 30,
        paddingLeft: 30,
        paddingRight: 20,
        color: '#000',
        fontFamily: 'Regular',
    }
})