import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import InformationWithPhoto from "../../Molecule/InformationWithPhoto";
import UserHeader from "../../Molecule/UserHeader";
import HeaderOptions from '../../Atomic/HeaderOptions'
import MyInfoMenu from "../../Molecule/MyInfoMenu";


export default class UserScreen extends Component {
    render() {
        return (
            <View>
                <UserHeader />
                <InformationWithPhoto />
                <HeaderOptions Textrt="Informasi Saya" />
                <View style={{ marginBottom: 30 }}>
                    <TouchableOpacity>
                        <MyInfoMenu NameMenu="Informasi Pribadi" Imag={require('../../../assets/User.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MyInfoMenu NameMenu="Informasi Karyawan" Imag={require('../../../assets/Employee.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MyInfoMenu NameMenu="Informasi Kontak Darurat" Imag={require('../../../assets/emergency.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MyInfoMenu NameMenu="Informasi Payroll" Imag={require('../../../assets/Payroll.png')} />
                    </TouchableOpacity>

                </View>
                <HeaderOptions Textrt="Pengaturan" />
                <TouchableOpacity>
                    <MyInfoMenu NameMenu="Ganti Password" Imag={require('../../../assets/password.png')} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <MyInfoMenu NameMenu="Keluar" Imag={require('../../../assets/power.png')} />
                </TouchableOpacity>
            </View>
        )
    }
}

const datas = StyleSheet.create({

})