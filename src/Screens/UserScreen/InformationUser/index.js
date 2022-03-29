import { Divider, Layout, Text } from "@ui-kitten/components";
import { moment } from "moment";
import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useSelector } from "react-redux";


export default function InformationUser() {
    const { employee } = useSelector(state => state.employee)
    return (
        <Layout style={{ flex: 1 }}>
            <ScrollView>
                <Text style={{ fontFamily: 'Medium', fontSize: 18, marginTop: '10%', marginHorizontal: 20 }}>Informasi Pribadi</Text>
                <Layout level={'4'} style={{ marginTop: 20, marginHorizontal: 20, paddingHorizontal: 20, paddingVertical: 20, borderRadius: 20 }}>
                    <View style={styles.ContainerInner}>
                        <Text style={styles.subFont}>Nama Lengkap</Text>
                        <Text style={styles.myFont}>
                            {employee.employee_name}
                        </Text>
                    </View>
                    <View style={styles.ContainerInner}>
                        <Text style={styles.subFont}>Tanggal Lahir</Text>
                        <Text style={styles.myFont}>
                            {employee.date_of_birth}
                        </Text>
                    </View>
                    <View style={styles.ContainerInner}>
                        <Text style={styles.subFont}>Tempat Tinggal</Text>
                        <Text style={styles.myFont}>
                            {employee.current_address}
                        </Text>
                    </View>
                    <View style={styles.ContainerInner}>
                        <Text style={styles.subFont}>Domisili</Text>
                        <Text style={styles.myFont}>
                            {employee.permanent_address}
                        </Text>
                    </View>
                    <View style={styles.ContainerInner}>
                        <Text style={styles.subFont}>Golongan Darah</Text>
                        <Text style={styles.myFont}>
                            {employee.blood_group}
                        </Text>
                    </View>
                    <View style={styles.ContainerInner}>
                        <Text style={styles.subFont}>Status Perkawinan</Text>
                        <Text style={styles.myFont}>
                            {employee.marital_status}
                        </Text>
                    </View>
                </Layout>
                <Text style={{ fontFamily: 'Medium', fontSize: 18, marginTop: '5%', marginHorizontal: 20 }}>Kontak Darurat</Text>
                <Layout level={'4'} style={{ marginTop: 20, marginHorizontal: 20, paddingHorizontal: 20, paddingVertical: 20, borderRadius: 20 }}>
                    <View style={styles.ContainerInner}>
                        <Text style={styles.subFont}>Kontak Darurat</Text>
                        <Text style={styles.myFont}>
                            {employee.emergency_phone_number}
                        </Text>
                    </View>
                    <View style={styles.ContainerInner}>
                        <Text style={styles.subFont}>Telp. Darurat</Text>
                        <Text style={styles.myFont}>
                            {employee.relation}
                        </Text>
                    </View>
                    <View style={styles.ContainerInner}>
                        <Text style={styles.subFont}>Nama Kontak Darurat</Text>
                        <Text style={styles.myFont}>
                            {employee.person_to_be_contacted}
                        </Text>
                    </View>
                </Layout>
            </ScrollView>
        </Layout>
    )
}

const styles = StyleSheet.create({
    myFont: {
        fontFamily: 'Regular'
    },
    subFont: {
        fontFamily: 'Medium', color: 'gray', fontSize: 10
    },
    ContainerInner:{
        marginVertical: 5
    }
})