import React from "react";
import { Text,View,TouchableOpacity } from "react-native";

export default function TimerComp({timer,status}){
    return(
        <View>
            <Text>Timer {timer} dan {status}</Text>
            <TouchableOpacity>
                <Text>Test</Text>
            </TouchableOpacity>
        </View>
    )
}
function mapStateToProps(state){
    const {isPlaying, elapsedTime, timerDuration} = state
    return{
        isPlaying,
        elapsedTime,
        timerDuration
    }
}