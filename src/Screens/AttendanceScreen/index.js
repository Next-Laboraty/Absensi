import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import Footer from '../../Molecule/Footer'
import AttendanceImageHeaderOne from '../../ImagesSource/AttendanceImageHeaderOne'
import ListLog from '../../Molecule/ListLog';

export default class AttendanceScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1 }} style={{ marginTop: 20 }}>
                <StatusBar hidden={true} style="light" />
                <View style={{borderBottomEndRadius:60,borderBottomStartRadius:60}}>
                    <AttendanceImageHeaderOne />
                </View>
                <ScrollView>
                <View style={styles.AttendanceMain}>
                    <Text style={styles.HeaderCard}>Attendance</Text>
                    <View style={styles.rowCard}>
                        <View style={styles.bodyCard}>
                            <View>
                                <Image source={require('../../../assets/log-in-2.png')} style={{ width: 50, height: 50 }} />
                                <Text style={styles.bodyText3}>IN</Text>
                            </View>
                        </View>
                        <View style={styles.bodyCard2}>
                            <View>
                                <Image source={require('../../../assets/logout.png')} style={{ width: 50, height: 50 }} />
                                <Text style={styles.bodyText}>OUT</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.AttendanceMain}>
                    <Text style={styles.HeaderCard}>Client Visit</Text>
                    <View style={styles.rowCard}>
                        <View style={styles.bodyCard3}>
                        <Image source={require('../../../assets/multiple.png')} style={{ width: 50, height: 50 }} />
                            <Text style={styles.bodyText3}>Visit</Text>
                        </View>
                    </View>
                </View>
                <View>
                   <ListLog />
                </View>
                </ScrollView>
                {/* <Footer sections="attendance" navigation={this.props.navigation}/> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    AttendanceMain: {
        height: 200,
        backgroundColor: '#516BEB',
        marginTop: 20,
        marginHorizontal: 20,
        borderRadius: 30
    },
    HeaderCard: {
        marginTop: 10,
        color: 'white',
        fontFamily: 'Oxygen_700Bold',
        fontSize: 18,
        marginLeft: 10,
        textAlign: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
        alignItems: 'center'
    },
    rowCard: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    bodyCard: {
        height: 100,
        width: 100,
        backgroundColor: '#e3f8fa',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        flex: 1,
        marginHorizontal: 30,
        borderRadius: 15
    },
    bodyCard2: {
        height: 100,
        width: 100,
        backgroundColor: '#ffe6e2',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        flex: 1,
        marginHorizontal: 30,
        borderRadius: 15
    },
    bodyCard3: {
        height: 100,
        width: 100,
        backgroundColor: '#e3f8fa',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginHorizontal: 30,
        borderRadius: 15
    },
    bodyText: {
        textAlign: 'center',
        color:'#fc573b',
        fontFamily: 'Oxygen_700Bold'
    },
    bodyText3: {
        textAlign: 'center',
        color:'#26c6da',
        fontFamily: 'Oxygen_700Bold'
    }
})