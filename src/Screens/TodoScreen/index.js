import React, { Component } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import TodoScreenImage from '../../ImagesSource/TodoScreenImage'

export default class TodoScreen extends Component {
    render() {
        return (
            <View>
                <TodoScreenImage />
                <View>
                    <View style={styles.MenuCard1}>
                        <Image source={require('../../../assets/news.png')} style={styles.Images1} />
                        <Text style={styles.Text1}>
                            News for you
                        </Text>
                    </View>
                    <View style={styles.MenuCard2}>
                        <Image source={require('../../../assets/to-do-list.png')} style={styles.Images1} />
                        <Text style={styles.Text1}>
                            To Do for you
                        </Text>
                    </View>
                    <View style={styles.MenuCard2}>
                        <Image source={require('../../../assets/completed-task.png')} style={styles.Images1} />
                        <Text style={styles.Text1}>
                            Task for you
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Text1: {
        fontSize: 18,
        color: '#fff',
        marginLeft: 20,
        fontFamily:'Oxygen_400Regular'
    },
    Images1: {
        width: 50,
        height: 50,
        marginLeft: 20,
        marginTop: -60
    },
    MenuCard1: {
        flexDirection: 'row',
        backgroundColor: '#516BEB',
        alignItems: 'center',
        marginHorizontal: 20,
        borderRadius: 30,
        height: 60,
        marginTop: -10
    },
    MenuCard2: {
        flexDirection: 'row',
        backgroundColor: '#516BEB',
        alignItems: 'center',
        marginHorizontal: 20,
        borderRadius: 30,
        height: 60,
        marginTop: 20
    }
})