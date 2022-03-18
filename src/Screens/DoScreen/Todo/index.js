import React, { Component } from 'react'
import { Text, View,TouchableOpacity} from 'react-native'

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