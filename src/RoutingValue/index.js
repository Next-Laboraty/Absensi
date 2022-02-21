import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../Screens/HomeScreen";
import LoginScreen from "../Screens/LoginScreen";
import BottomTabsNavigator from "../Redux/BottomTabsNavigator";

const Stack = createNativeStackNavigator()

// export default Tabs
export default function RoutingValue() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="BottomTabsNavigator" component={BottomTabsNavigator} options={{
                    headerShown: false
                }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}