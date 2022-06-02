import { Divider, Layout, Text } from "@ui-kitten/components";
import { moment } from "moment";
import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useSelector } from "react-redux";


export default function EmployeeInformation() {
    const { employee } = useSelector(state => state.employee)
    return (
        <Layout style={{ flex: 1 }}>
            <ScrollView>
                <Text style={{ fontFamily: 'Medium', fontSize: 18, marginTop: '10%', marginHorizontal: 20 }}>Data Karyawan</Text>
                <Layout level={'4'} style={{ marginTop: 20, marginHorizontal: 20, paddingHorizontal: 20, paddingVertical: 20, borderRadius: 20 }}>
                    <View style={styles.ContainerInner}>
                        <Text style={styles.subFont}>ID Karayawan</Text>
                        <Text style={styles.myFont}>
                            {employee.employee}
                        </Text>
                    </View>
                    <View style={styles.ContainerInner}>
                        <Text style={styles.subFont}>Nama Karyawan Terdaftar</Text>
                        <Text style={styles.myFont}>
                            {employee.employee_name}
                        </Text>
                    </View>
                    <View style={styles.ContainerInner}>
                        <Text style={styles.subFont}>Perusahaan</Text>
                        <Text style={styles.myFont}>
                            {employee.company}
                        </Text>
                    </View>
                    <View style={styles.ContainerInner}>
                        <Text style={styles.subFont}>Email Perusahaan</Text>
                        <Text style={styles.myFont}>
                            {employee.company_email}
                        </Text>
                    </View>
                    <View style={styles.ContainerInner}>
                        <Text style={styles.subFont}>Departemen</Text>
                        <Text style={styles.myFont}>
                            {employee.department}
                        </Text>
                    </View>
                    <View style={styles.ContainerInner}>
                        <Text style={styles.subFont}>Jabatan</Text>
                        <Text style={styles.myFont}>
                            {employee.designation}
                        </Text>
                    </View>
                </Layout>
                <Text style={{ fontFamily: 'Medium', fontSize: 18, marginTop: '5%', marginHorizontal: 20 }}>Kontak Darurat</Text>
                <Layout level={'4'} style={{ marginTop: 20, marginHorizontal: 20, paddingHorizontal: 20, paddingVertical: 20, borderRadius: 20 }}>
                    <View style={styles.ContainerInner}>
                        <Text style={styles.subFont}>Tanggal Bergabung</Text>
                        <Text style={styles.myFont}>
                            {employee.date_of_joining}
                        </Text>
                    </View>
                    <View style={styles.ContainerInner}>
                        <Text style={styles.subFont}>Shift</Text>
                        <Text style={styles.myFont}>
                            {employee.default_shift}
                        </Text>
                    </View>
                    <View style={styles.ContainerInner}>
                        <Text style={styles.subFont}>Tipe Pekerjaan</Text>
                        <Text style={styles.myFont}>
                            {employee.employment_type}
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