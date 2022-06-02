import moment from "moment";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import { Avatar } from 'react-native-paper';
import { Button, Card, Layout, Modal } from '@ui-kitten/components';
import { useSelector } from "react-redux";
import LoadingComp from "../../../Atomic/LoadingComp";
import AxiosPostData from "../../../lib/AxiosPostData";

export default function BuktiRembes({ route }) {
    let dataBefore = route.params
    const [visible, setVisible] = useState(false)
    const [exp, setExp] = useState(null)
    const { server, token } = useSelector(state => state.employee)
    useEffect(() => {
        AxiosPostData(`http:///103.179.57.18:21039/Rembes/select`, token, {
            server,
            token,
            name: dataBefore.name
        }).then(res => {
            setExp(res.data)
        })
            .catch(err => alert(err))
    }, [])
    if (exp == null || !exp) {
        return <LoadingComp />
    }
    else {
        return (
            <Layout style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <View>
                        <View style={styles.header}>
                            <Text style={{ fontFamily: 'Regular', color: '#7F8487' }}>
                                Rp
                            </Text>
                            <Text style={{ fontFamily: 'Bold', fontSize: 25 }}>{Number(dataBefore.total_claimed_amount).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</Text>
                            <Text style={{ fontFamily: 'Regular', color: '#7F8487', flex: 1, textAlign: 'left' }}>
                                {' '}.00
                            </Text>
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ height: 10, width: 10, backgroundColor: '#2155CD', borderRadius: 120 / 2, alignSelf: 'center', marginRight: 10 }}>
                                    </View>
                                    <Text style={{ fontFamily: 'Regular', color: '#7F8487', fontSize: 12 }}>{dataBefore.status == 'Draft' ? 'Menunggu Persetujuan' : dataBefore.status}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', backgroundColor: '#EFEFEF', padding: 10, margin: 10, borderRadius: 15, alignItems: 'center' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontFamily: 'Bold', color: '#000' }}>{exp.expenses[0].expense_type}</Text>
                                <Text style={{ fontFamily: 'Regular', color: '#000' }}>
                                    {exp.expenses[0].description}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.textTanggal}>{moment(exp.expenses[0].expense_date).format('DD MMM YYYY')}</Text>
                                {exp.expenses[0].proof ? <Button size={'tiny'} onPress={() => setVisible(true)}>Lihat Bukti</Button> : null}
                            </View>
                        </View>
                    </View>
                    <Modal visible={visible}
                        backdropStyle={styles.backdrop}
                        onBackdropPress={() => setVisible(false)}>
                        <Card disabled={true}>
                            <Image style={{width:250,height:500,marginBottom:20}} source={{ uri: exp.expenses[0].proof }} />
                            <Button onPress={() => setVisible(false)}>
                                Tutup
                            </Button>
                        </Card>
                    </Modal>
                </ScrollView>
            </Layout>
        )
    }
}

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#E8F9FD',
        height: 50,
        alignItems: 'center',
        paddingHorizontal: 20
    },
    textTanggal: {
        fontFamily: 'Medium',
        color: '#000',
        textAlign: 'center'
    }
})