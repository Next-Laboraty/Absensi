import HomeScreen from "../../Screens/HomeScreen";
import AttendanceScreen from "../../Screens/AttendanceScreen";
import SalarySlipScreen from "../../Screens/SalarySlipScreen"
import TodoScreen from "../../Screens/TodoScreen"
import UserScreen from "../../Screens/UserScreen"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import { Feather, Octicons, AntDesign, Foundation } from '@expo/vector-icons';


const Tab = createBottomTabNavigator()
// export default function BottomTabsNavigator(){
const BottomTabsNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarInactiveTintColor: '#545454',
            tabBarActiveTintColor: '#516BEB',
            tabBarStyle: {
                position: 'absolute',
                borderTopColor: 'rgba(0, 0, 0, .2)',
                borderTopStartRadius: 30,
                borderTopEndRadius: 30,
                elevation: 0
            },
        }}>
            <Tab.Screen name="Home" component={HomeScreen}
                options={{
                    headerShown:false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <AntDesign name="home" size={18} style={{ color: focused ? '#FF7648' : '#9F9FB0' }} />
                        </View>
                    ),
                    tabBarLabel: ({ focused }) => (
                        <View style={{width:4,height:4, backgroundColor: focused ? '#FF7648' : '#fff',marginBottom:focused ? 10 : 0,borderRadius: 120/2}}></View>
                    ),
                }}
            />
            <Tab.Screen name="Attendance" component={AttendanceScreen}
                options={{
                    headerShown:false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <AntDesign name="checkcircleo" size={18} style={{ color: focused ? '#FF7648' : '#9F9FB0' }} />
                        </View>
                    ),
                    tabBarLabel: ({ focused }) => (
                        <View style={{width:4,height:4, backgroundColor: focused ? '#FF7648' : '#fff',marginBottom:focused ? 10 : 0,borderRadius: 120/2}}></View>
                    ),
                }}
            />
            <Tab.Screen name="Todo" component={TodoScreen}
                options={{
                    headerShown:false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Octicons name="briefcase" size={18} style={{ color: focused ? '#FF7648' : '#9F9FB0' }} />
                        </View>
                    ),
                    tabBarLabel: ({ focused }) => (
                        <View style={{width:4,height:4, backgroundColor: focused ? '#FF7648' : '#fff',marginBottom:focused ? 10 : 0,borderRadius: 120/2}}></View>
                    ),
                }}
            />
            <Tab.Screen name="Salary" component={SalarySlipScreen}
                options={{
                    headerShown:false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <AntDesign name="creditcard" size={18} style={{ color: focused ? '#FF7648' : '#9F9FB0' }}/>
                        </View>
                    ),
                    tabBarLabel: ({ focused }) => (
                        <View style={{width:4,height:4, backgroundColor: focused ? '#FF7648' : '#fff',marginBottom:focused ? 10 : 0,borderRadius: 120/2}}></View>
                    ),
                }}
            />
            <Tab.Screen name="User" component={UserScreen}
                options={{
                    headerShown:false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <AntDesign name="user" size={18} style={{ color: focused ? '#FF7648' : '#9F9FB0' }}/>
                        </View>
                    ),
                    tabBarLabel: ({ focused }) => (
                        <View style={{width:4,height:4, backgroundColor: focused ? '#FF7648' : '#fff',marginBottom:focused ? 10 : 0,borderRadius: 120/2}}></View>
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabsNavigator