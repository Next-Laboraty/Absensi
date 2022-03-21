import { Layout, Text } from "@ui-kitten/components";
import { moment } from "moment";
import React, { useEffect } from "react";
import { StyleSheet,View } from "react-native";
import { useSelector } from "react-redux";


export default function InformationUser() {
    const { employee } = useSelector(state => state.employee)
    console.log(employee)
    return (
        <Layout style={{ flex: 1 }}>
            <Text style={{ fontFamily: 'Medium', fontSize: 18 }}>Informasi Pribadi</Text>
            <Layout level={'4'} style={{ marginTop: 20, marginHorizontal: 20, height: '45%', paddingHorizontal: 20, paddingVertical: 20, borderRadius: 20 }}>
                <View style={{marginVertical:10}}>
                    <Text style={styles.subFont}>Nama Lengkap</Text>
                    <Text style={styles.myFont}>
                        {employee.employee_name}
                    </Text>
                </View>
                <View style={{marginVertical:10}}>
                    <Text style={styles.subFont}>Tanggal Lahir</Text>
                    <Text style={styles.myFont}>
                        {moment(employee.date_of_birth).format()}
                    </Text>
                </View>
                <View style={{marginVertical:10}}>
                    <Text style={styles.subFont}>Nama Lengkap</Text>
                    <Text style={styles.myFont}>
                        {employee.employee_name}
                    </Text>
                </View>
                <View style={{marginVertical:10}}>
                    <Text style={styles.subFont}>Nama Lengkap</Text>
                    <Text style={styles.myFont}>
                        {employee.employee_name}
                    </Text>
                </View>
                <Text style={styles.myFont}>
                    {employee.date_of_birth}
                </Text>
                <Text style={styles.myFont}>
                    {employee.current_address}
                </Text>
                <Text style={styles.myFont}>
                    {employee.permanent_address}
                </Text>
            </Layout>
        </Layout>
    )
}

const styles = StyleSheet.create({
    myFont: {
        fontFamily: 'Regular'
    },
    subFont:{
        fontFamily: 'Medium', color: 'gray', fontSize: 10
    }
})