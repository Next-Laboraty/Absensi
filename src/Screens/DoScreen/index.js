import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Fontisto } from '@expo/vector-icons';
import HeaderNameAndNotif from '../../Molecule/HeaderNameAndNotif';
import BannerHeader from '../../Molecule/BannerHeader';
import HeaderOption from '../../Atomic/HeaderOptions';
import ButtonBottom from '../../Atomic/ButtonBottom';
import ButtonRows from '../../Atomic/ButtonRows';

export default class DoScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>

                    <HeaderNameAndNotif />
                    <BannerHeader color="#9DF3C4" nav="Chat" textlink="Chat Management" navigation={this.props.navigation} />
                    {/* End Banner */}
                    <HeaderOption Textrt="Sistem Informasi" />
                    <View style={styles.newRow}>
                        <View style={styles.rows}>
                            <ButtonRows text={`Permintaan\nKehadiran`} nav={`AttendanceRequest`} navigation={this.props.navigation} image={require('../../../assets/time.png')} />
                            <ButtonRows text={`Aplikasi\nCuti`} nav={`AplikasiCuti`} navigation={this.props.navigation} image={require('../../../assets/manual.png')}/>
                            <ButtonRows text={`Aplikasi\nLembur`} nav={`AplikasiLembur`} navigation={this.props.navigation} image={require('../../../assets/clock-out.png')}/>
                            <ButtonRows text={`Program\nPelatihan`} nav={`ProgramPelatihan`} navigation={this.props.navigation} image={require('../../../assets/training.png')}/>
                        </View>
                        <View style={styles.rows}>
                            <ButtonRows text={`Penilaian\nKPI`} nav={`PenilaianKPI`} navigation={this.props.navigation} image={require('../../../assets/kpi.png')} />
                            <ButtonRows text={`TO DO`} nav={`todo`} navigation={this.props.navigation} image={require('../../../assets/checklist.png')}  />
                            <ButtonRows text={`Project`} nav={`Project`} navigation={this.props.navigation} image={require('../../../assets/idea.png')}  />
                            <ButtonRows text={`Daily Report`} nav={`DailyReport`} navigation={this.props.navigation} image={require('../../../assets/clipboard.png')}  />
                        </View>
                    </View>
                    <HeaderOption Textrt="Keuangan" />
                    <View style={styles.newRow}>
                        <View style={styles.rows}>
                            <ButtonRows text={`Slip Gaji`} nav={`SalarySlip`} navigation={this.props.navigation} image={require('../../../assets/calendar.png')}/>
                            <ButtonRows text={`Permohonan\nPinjaman`} nav={`PermohonanPinjaman`} navigation={this.props.navigation} image={require('../../../assets/loan1.png')}/>
                            <ButtonRows text={`Reimbursement`} nav={`Reimusement`} navigation={this.props.navigation} image={require('../../../assets/loan2.png')}/>
                            <ButtonRows text={`Issue`} nav={`ListIssue`} navigation={this.props.navigation} image={require('../../../assets/issue.png')}/>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rows: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    newRow: {
        marginBottom: 2,
        marginHorizontal: 20,
    },
    textBanners: {
        marginBottom: 12,
        fontSize: 15,
        fontFamily: 'Medium',
    },
    bannerText: {
        marginTop: 19,
        fontSize: 20,
        fontFamily: 'Regular',
        textAlignVertical: 'center'
    },
    bannerS: {
        backgroundColor: '#FFE6AB',
        height: 160,
        marginTop: 20,
        borderRadius: 15,
        marginHorizontal: 20
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-start',
        marginTop: 23
    },
    textHeader1: {
        fontFamily: 'Medium',
        fontSize: 15,
        color: '#ADACAC'
    },
    textHeader2: {
        fontFamily: 'Medium',
        fontSize: 15,
        color: '#2C3333'
    },
    textButtonBanner: {
        color: '#fff',
        fontFamily: 'Medium',
        textAlign: 'center'
    },
    buttonBanner: {
        marginTop: 30,
        backgroundColor: '#2C3333',
        width: 67,
        paddingVertical: 3,
        borderRadius: 15
    },
    row1: {
        marginLeft: 14,
        flex: 1,
        color: '#2C3333'
    },
})