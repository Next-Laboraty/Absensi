import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-web'

export default class Todo extends Component{
    render(){
        return(
            <View>
                <TouchableOpacity>
                    <Text>List</Text>
                    </TouchableOpacity>
            </View>
        )
    }
}