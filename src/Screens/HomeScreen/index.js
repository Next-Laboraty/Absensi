import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Feather, Octicons, AntDesign } from '@expo/vector-icons';
import HomeImageHeaderOne from '../../ImagesSource/HomeImageHeaderOne';
import HeaderMenu from '../../Molecule/HeaderMenu';

export default class HomeScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden={true} style="light" />
                <HeaderMenu />
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <Text style={{ color: '#516BEB', fontFamily: 'Oxygen_700Bold', fontSize: 18, marginLeft: 10, textAlign: 'center', marginRight: 200, justifyContent: 'center', textAlignVertical: 'center', alignItems: 'center' }}>
                            Work Hard
                        </Text>
                        <Text style={{ color: '#516BEB', fontFamily: 'Oxygen_400Regular', fontSize: 18, marginLeft: 10, textAlign: 'center', marginRight: 200, justifyContent: 'center', textAlignVertical: 'center', alignItems: 'center' }}>
                            {`To Get\nGood Result`}
                        </Text>
                        <HomeImageHeaderOne />
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.buttonInv}>
                                <Image source={require('../../../assets/attendance.png')} style={{width:60,height:60}} />
                                <Text style={{fontFamily:'Oxygen_400Regular', color:'#fff',marginTop:10}}>Attendance</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonInv}>
                            <Image source={require('../../../assets/completed-task.png')} style={{width:60,height:60}} />
                                <Text style={{fontFamily:'Oxygen_400Regular', color:'#fff',marginTop:10}}>Task</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.buttonInv}>
                                <Image source={require('../../../assets/to-do-list.png')} style={{width:60,height:60}} />
                                <Text style={{fontFamily:'Oxygen_400Regular', color:'#fff',marginTop:10}}>To Do</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonInv}>
                            <Image source={require('../../../assets/news.png')} style={{width:60,height:60}} />
                                <Text style={{fontFamily:'Oxygen_400Regular', color:'#fff',marginTop:10}}>Bulletin</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                {/* <Footer sections="home" navigation={this.props.navigation}/> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e3f8fa',
        height: 150,
        marginHorizontal: 20,
        borderRadius: 15,
        marginTop: 25,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    buttonInv:{
        borderRadius:20,
        width: 150, 
        height: 150, 
        backgroundColor: '#516BEB', 
        flex: 1, 
        marginVertical: 20, 
        marginHorizontal: 20, 
        alignItems: 'center', 
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    }
})