import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import InformationWithPhoto from "../../Molecule/InformationWithPhoto";
import UserHeader from "../../Molecule/UserHeader";
import HeaderOptions from '../../Atomic/HeaderOptions'
import MyInfoMenu from "../../Molecule/MyInfoMenu";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Card, Modal } from '@ui-kitten/components';
import { useSelector } from "react-redux";

export default function UserScreen({ navigation }) {
    const [visible, setVisible] = useState(false);
    const { employee } = useSelector(state => state.employee)
    const dataRemove = async () => {

        setVisible(true)
    }
    const logout = () => {
        AsyncStorage.clear().then(res => {
            navigation.replace('Auth')
        })
    }
    return (
        <View>
            <UserHeader />
            <InformationWithPhoto />
            <ScrollView>

                <HeaderOptions Textrt="Informasi Saya" />
                <View style={{ marginBottom: 30 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('UserInfo')}>
                        <MyInfoMenu NameMenu="Informasi Pribadi" Imag={require('../../../assets/User.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('EmployeeInformation')}>
                        <MyInfoMenu NameMenu="Informasi Karyawan" Imag={require('../../../assets/Employee.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('EmployeeSkill')}>
                        <MyInfoMenu NameMenu="Informasi Keahlian" Imag={require('../../../assets/Payroll.png')} />
                    </TouchableOpacity>

                </View>
                <View style={{ height: '45%' }}>
                    <HeaderOptions Textrt="Pengaturan" />
                    <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
                        <MyInfoMenu NameMenu="Ganti Kata Sandi" Imag={require('../../../assets/password.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => dataRemove()}>
                        <MyInfoMenu NameMenu="Keluar" Imag={require('../../../assets/power.png')} navigation={navigation} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Modal
                visible={visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setVisible(false)}>
                <Card disabled={true} style={{ backgroundColor: '#FF8C8C', marginHorizontal: 20 }}>
                    <Text style={{ textAlign: 'center', fontFamily: 'Bold', fontSize: 18, marginBottom: 10, color: '#000' }}>Peringatan !</Text>
                    <View style={{ backgroundColor: '#fff', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, marginBottom: 20 }}>
                        <Text style={{ textAlign: 'center', fontFamily: 'Medium', color: '#000' }}>Kami sudah mencatat bahwa Smartphone ini milik {employee.employee_name}</Text>
                    </View>
                    <Button onPress={() => setVisible(false)}>
                        Tidak
                    </Button>
                    <Button appearance={'ghost'} style={{ color: '#fff' }} onPress={() => logout()}>Saya, ingin keluar</Button>
                </Card>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 192,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});