import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import AttendanceHeader from '../../Molecule/AttendanceHeader';
import ButtonBottom from '../../Atomic/ButtonBottom';
import JamComponent from '../../Atomic/JamComponent';
import AttendanceButtonFree from '../../Molecule/AttendanceButtonFree';
import AttendanceButton from '../../Molecule/AttendanceButton';
import {connect} from 'react-redux'
// import { SWRConfig } from "swr";

class AttendanceScreen extends Component {
    componentDidMount(){
        
    }
    getDataIs(){
        let tipe = this.props.employee.employee.employment_type
        if(tipe == 'freelance' || tipe=='Flexible-time'){
            return <AttendanceButtonFree />
        }
        else{
            return <AttendanceButton />
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{flex: 1 }}>
                    <AttendanceHeader />
                    <JamComponent />
                    <View style={{ marginTop: '20%' }}>
                        <Text style={styles.headerComp}>Absensi</Text>
                        <View style={{ height: 1, width: 164, backgroundColor: '#2C3333', alignSelf: 'center' }}>

                        </View>
                        {this.getDataIs()}
                    </View>

                </View>
                <View style={{height: '15%' }}>
                    <ButtonBottom icon="clock" text="Riwayat" nav={`History`} navigation={this.props.navigation}/>
                </View>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return{
        employee: state.employee
    }
}
export default connect(mapStateToProps)(AttendanceScreen)
const styles = StyleSheet.create({
    textAttendances: {
        textAlign: 'center',
        marginTop: 35,
        fontFamily: 'Medium',
        fontSize: 18,
        color: '#fff'
    },
    buttonAttendance1: {
        flex: 1,
        backgroundColor: '#516BEB',
        height: 100,
        marginRight: 10,
        borderRadius: 15
    },
    buttonAttendance2: {
        backgroundColor: '#FF7648',
        flex: 1,
        height: 100,
        marginLeft: 10,
        borderRadius: 15
    },
    headerComp: {
        fontFamily: 'Medium',
        textAlign: 'center',
        fontSize: 15,
    },
})