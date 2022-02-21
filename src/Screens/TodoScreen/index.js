import React, { Component } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import TodoScreenImage from '../../ImagesSource/TodoScreenImage'

export default class TodoScreen extends Component{
    render(){
        return(
            <View>
                <TodoScreenImage />
                <View>
                    <View style={styles.MenuCard1}>
                        <Image source={require('../../../assets/to-do-list.png')} style={{width:50,height:50,marginLeft:20,marginTop:-60}} />
                        <Text style={{fontSize:18, color:'#fff',marginLeft:20}}>
                            To Do
                        </Text>
                    </View>
                    <View style={styles.MenuCard1}>
                        <Text>
                            To Do
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    MenuCard1:{
        flexDirection:'row', 
        backgroundColor:'teal',
        alignItems:'center', 
        marginHorizontal:20,
        borderRadius:30,
        height: 30,
        marginTop:-10
    }
})