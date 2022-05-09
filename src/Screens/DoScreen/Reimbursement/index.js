import React, { Component } from 'react'
import { Text, View } from 'react-native'
import MaintenanceScreen from '../../../Molecule/MaintenanceScreen'

export default class Reimbursement extends Component{
    render(){
        return(
            <View style={{flex:1}}>
                <MaintenanceScreen />
            </View>
        )
    }
}