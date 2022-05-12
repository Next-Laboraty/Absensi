import React, { Component, useState } from 'react'
import { Text, View, Image,ActivityIndicator } from 'react-native'
import { List, ListItem } from '@ui-kitten/components';
import LoadingComp from '../../../Atomic/LoadingComp';
import { useSelector } from 'react-redux';

export default function PenilaianKPI() {
    const [loading,setLoading] = useState(false)
    const {server, employee, token} = useSelector(state => state.employee)
    const [data, setData] = useState(
        [{title: 'data1'},
        {title: 'data2'}]
    )
    const renderItem = ({ item, index }) => (
        <ListItem title={`${item.title}`} />
    );
    if(loading)
    return(
        <LoadingComp />
    )
    return (
        <View style={{flex:1}}>
            <View style={{height:'10%',backgroundColor:'#6A67CE', margin:10,borderRadius:15,alignSelf:'center',justifyContent:'center'}}>
                <Text style={{color:'white',textAlign:'center',padding:10,fontFamily:'Regular'}}>
                Alat mengukur serta mengevaluasi kinerja karyawan dalam perusahaan
                </Text>
            </View>
            <List
            style={{flex:1}}
                data={data}
                renderItem={renderItem}
            />
        </View>
    );
}