import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import InformationWithPhoto from "../../Molecule/InformationWithPhoto";
import UserHeader from "../../Molecule/UserHeader";
import HeaderOptions from '../../Atomic/HeaderOptions'
import MyInfoMenu from "../../Molecule/MyInfoMenu";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class UserScreen extends Component {
    async dataRemove() {
        AsyncStorage.clear();
        this.logout()
    }
    logout() {
        setTimeout(() => {
            this.props.navigation.replace('Auth')
        }, 2000)
    }
    render() {
        return (
            <View>
                <UserHeader />
                <InformationWithPhoto />
                <HeaderOptions Textrt="Informasi Saya" />
                <View style={{ marginBottom: 30 }}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('UserInfo')}>
                        <MyInfoMenu NameMenu="Informasi Pribadi" Imag={require('../../../assets/User.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MyInfoMenu NameMenu="Informasi Karyawan" Imag={require('../../../assets/Employee.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MyInfoMenu NameMenu="Informasi Kontak Darurat" Imag={require('../../../assets/emergency.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <MyInfoMenu NameMenu="Informasi Keahlian" Imag={require('../../../assets/Payroll.png')} />
                    </TouchableOpacity>

                </View>
                <HeaderOptions Textrt="Pengaturan" />
                <TouchableOpacity>
                    <MyInfoMenu NameMenu="Ganti Kata Sandi" Imag={require('../../../assets/password.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.dataRemove()}>
                    <MyInfoMenu NameMenu="Keluar" Imag={require('../../../assets/power.png')} navigation={this.props.navigation} />
                </TouchableOpacity>
            </View>
        )
    }
}

const datas = StyleSheet.create({

})