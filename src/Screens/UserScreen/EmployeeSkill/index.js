import { base64 } from "@firebase/util";
import { Layout, Spinner, Text, Divider } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { View, ScrollView } from 'react-native'
import { useSelector } from "react-redux";
import AxiosGetEmployee from "../../../lib/AxiosGetEmployee";
import { AntDesign } from '@expo/vector-icons';
import { getDatabase, ref, child, get } from "firebase/database";
export default function EmployeeSkill() {
    const { employee, server, token } = useSelector(state => state.employee)
    const [loading, setLoading] = useState(true)
    const [skills, setSkills] = useState([])
    useEffect(() => {
       
    }, [])

    return (
        <Layout style={{ flex: 1 }}>
            <Layout level={'4'} style={{ marginHorizontal: 20, paddingVertical: 20, paddingHorizontal: 20, marginVertical: 20, borderRadius: 20 }}>
                <Text style={{ textAlign: 'center', fontSize: 20 }}>{employee.employee_name}</Text>
                <Text style={{ textAlign: 'center', fontSize: 15 }}>{employee.designation}</Text>
            </Layout>
            {loading ?
                <Layout level={'4'} style={{ marginHorizontal: 20, paddingVertical: 20, paddingHorizontal: 20, marginVertical: 20, borderRadius: 20, alignItems: 'center' }}>
                    <Spinner style={{ alignItems: 'center' }} />
                </Layout>
                :
                <Layout level={'4'} style={{ marginHorizontal: 20, paddingVertical: 20, paddingHorizontal: 20, marginVertical: 20, borderRadius: 20, alignContent: 'center' }}>
                    <Text status={'primary'} style={{ fontFamily: 'Medium', marginBottom: 10 }}>Kemampuan</Text>
                    <ScrollView>
                        {skills.map((ix) => (
                            <View key={ix.name}>
                                <Layout level={'4'} style={{ flexDirection: 'row' }}>
                                    <View style={{ marginRight: 10 }}>
                                        <AntDesign name="star" size={35} color="yellow" />
                                        <Text style={{ fontFamily: 'Bold', color: 'black', position: 'absolute', left: 12, top: 8 }}>{ix.proficiency}</Text>
                                    </View>
                                    <Text style={{ flex: 1 }}>{ix.skill}</Text>
                                </Layout>
                                <Divider></Divider>
                            </View>
                        ))}
                    </ScrollView>
                </Layout>
            }
        </Layout>
    )
}