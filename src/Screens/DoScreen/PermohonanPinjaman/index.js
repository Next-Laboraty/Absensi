import React, { Component } from 'react'
import { Text, View } from 'react-native'
import MaintenanceScreen from '../../../Molecule/MaintenanceScreen'

export default class PermohonanPinjaman extends Component{
    render(){
        return(
            <View style={{flex:1}}>
               <MaintenanceScreen />
            </View>
        )
    }
}