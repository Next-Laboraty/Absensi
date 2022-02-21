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
                            <Foundation name="home" size={24} style={{ color: focused ? '#516BEB' : '#545454' }} />
                        </View>
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? '#516BEB' : '#545454', fontSize: 10, fontFamily: focused ? 'Oxygen_700Bold' : 'Oxygen_400Regular', marginTop: 4 }}>
                            Home
                        </Text>
                    ),
                }}
            />
            <Tab.Screen name="Attendance" component={AttendanceScreen}
                options={{
                    headerShown:false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Octicons name="checklist" size={24} style={{ color: focused ? '#516BEB' : '#545454' }} />
                        </View>
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? '#516BEB' : '#545454', fontSize: 10, fontFamily: focused ? 'Oxygen_700Bold' : 'Oxygen_400Regular', marginTop: 4 }}>
                            Attendance
                        </Text>
                    ),
                }}
            />
            <Tab.Screen name="Todo" component={TodoScreen}
                options={{
                    headerShown:false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Octicons name="briefcase" size={24} style={{ color: focused ? '#516BEB' : '#545454' }} />
                        </View>
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? '#516BEB' : '#545454', fontSize: 10, fontFamily: focused ? 'Oxygen_700Bold' : 'Oxygen_400Regular', marginTop: 4 }}>
                            Desk
                        </Text>
                    ),
                }}
            />
            <Tab.Screen name="Salary" component={SalarySlipScreen}
                options={{
                    headerShown:false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <AntDesign name="creditcard" size={24} style={{ color: focused ? '#516BEB' : '#545454' }}/>
                        </View>
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? '#516BEB' : '#545454', fontSize: 10, fontFamily: focused ? 'Oxygen_700Bold' : 'Oxygen_400Regular', marginTop: 4 }}>
                            Salary
                        </Text>
                    ),
                }}
            />
            <Tab.Screen name="User" component={UserScreen}
                options={{
                    headerShown:false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <AntDesign name="idcard" size={24} style={{ color: focused ? '#516BEB' : '#545454' }}/>
                        </View>
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? '#516BEB' : '#545454', fontSize: 10, fontFamily: focused ? 'Oxygen_700Bold' : 'Oxygen_400Regular', marginTop: 4 }}>
                            User
                        </Text>
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabsNavigator