import React, { Component } from 'react'
import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, SafeAreaView } from 'react-native'
import LoginImageHeaderOne from '../../ImagesSource/LoginImageHeaderOne'
import LoginImageHeaderTwo from '../../ImagesSource/LoginImageHeaderTwo'
import LoginImageHeaderThree from '../../ImagesSource/LoginImageHeaderThree'
import { Feather } from '@expo/vector-icons';
import UserAuthLogin from '../../Redux/UserAuth'


export default class LoginScreen extends Component {
    constructor() {
        super();
        this.state = {
            header: 'Welcome !',
            subtitle: 'Nice to see you again !\nExperience new VEF app',
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
                <LoginImageHeaderOne />
                <LoginImageHeaderTwo />
                <ScrollView style={{ marginTop: 50,flex:1 }} >
                    <Text style={styles.Header}>{this.state.header}</Text>
                    <Text style={styles.Sub}>{this.state.subtitle}</Text>
                    <KeyboardAvoidingView style={styles.CardInput} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                        <View>
                            <TextInput placeholder='Enter Server' placeholderTextColor={'#fff'} style={styles.InputStyle} />
                            <Feather name="server" size={15} color="#516BEB" style={{ position: 'absolute', left: 37, top: 18 }} />
                        </View>
                        <View>
                            <TextInput placeholder='Enter Username' placeholderTextColor={'#fff'} style={styles.InputStyle} />
                            <Feather name="user" size={15} color="#516BEB" style={{ position: 'absolute', left: 37, top: 18 }} />
                        </View>
                        <View>
                            <TextInput placeholder='Enter Password' placeholderTextColor={'#fff'} style={styles.InputStyle} secureTextEntry={!this.state.EyeO} />
                            <Feather name="key" size={15} color="#516BEB" style={{ position: 'absolute', left: 37, top: 18 }} />
                            <TouchableOpacity style={{ position: 'absolute', right: 37, top: 18 }} onPress={() => this.EyeOpen()}>
                                {!this.state.EyeO ? <Feather name="eye-off" size={15} color="#000" /> : <Feather name="eye" size={15} color="#747272" />}
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.buttonLogin} onPress={() => this.props.navigation.push('BottomTabsNavigator')}>
                                <Text style={styles.buttonLoginText}>
                                    Log In
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
                <View style={{height: 54}}>
                    <LoginImageHeaderThree />
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    buttonLoginText: {
        color: '#fff',
        textAlign: 'center',
        paddingVertical: 10,
        fontFamily: 'Oxygen_700Bold',
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
        fontFamily: 'Oxygen_700Bold',
        fontSize: 32,
        textAlign: 'center'
    },
    Sub: {
        fontFamily: 'Oxygen_400Regular',
        color: '#5F5F5F',
        textAlign: 'center'
    },
    InputStyle: {
        backgroundColor: '#D0D7FC',
        marginVertical: 12,
        marginHorizontal: 30,
        borderRadius: 30,
        paddingLeft: 30,
        paddingRight: 20,
        color: '#000',
        fontFamily: 'Oxygen_400Regular',
    }
})