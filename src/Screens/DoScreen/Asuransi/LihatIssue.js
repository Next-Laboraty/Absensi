import { Layout } from "@ui-kitten/components";
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from "react";
import RenderHTML from "react-native-render-html";

export default function LihatIssue({ route }) {
    let data = route.params
    const [dataIsi, setDataIsi] = useState(null)
    useEffect(() => {

    })
    const displayHtml = (datax) => {
        const html = datax
        return <RenderHTML contentWidth={Dimensions.get('window').width} source={{ html }} />
    }
    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.header}>
                {data.status == 'Closed'
                    ?
                    <Text style={{ fontFamily: 'Bold', fontSize: 18, color: 'red' }}>{data.status}</Text>
                    :
                    <Text style={{ fontFamily: 'Bold', fontSize: 18 }}>{data.status}</Text>
                }
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ height: 10, width: 10, backgroundColor: '#2155CD', borderRadius: 120 / 2, alignSelf: 'center', marginRight: 10 }}>
                        </View>
                        <Text style={{ fontFamily: 'Regular', color: '#7F8487', fontSize: 12 }}>{data.resolution_details ? 'Sudah Dijawab' : 'Menunggu Jawaban'}</Text>
                    </View>
                </View>
            </View>
            <View style={{ backgroundColor: '#fff', marginHorizontal: 10, marginVertical: 30, padding: 20, borderRadius: 5 }}>
                <Text style={{ fontFamily: 'Medium', textAlign: 'left', fontSize: 10, color: '#73777B' }}>Tipe Isu</Text>
                <Text style={{ fontFamily: 'Medium', textAlign: 'left' }}>{data.issue_type}</Text>
            </View>
            <View style={{ backgroundColor: '#fff', marginHorizontal: 10, marginVertical: 5, padding: 20, borderRadius: 5 }}>
                <Text style={{ fontFamily: 'Medium', textAlign: 'left', fontSize: 10, color: '#73777B' }}>Deksripsi</Text>
                {displayHtml(data.description)}
            </View>
            {data.resolution_details ?
                <View style={{ backgroundColor: '#fff', marginHorizontal: 10, marginVertical: 5,marginBottom:20, padding: 20, borderRadius: 5 }}>
                    <Text style={{ fontFamily: 'Medium', textAlign: 'left', fontSize: 10, color: '#73777B' }}>Tanggapan</Text>
                    {displayHtml(data.resolution_details)}
                </View>
                :
                null
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#E8F9FD',
        height: 50,
        alignItems: 'center',
        paddingHorizontal: 20
    },
})