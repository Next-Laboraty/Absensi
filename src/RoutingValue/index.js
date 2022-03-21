import React, { useState, useEffect, useRef, useContext } from "react";
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    LoginScreen,
    SalarySlipScreen,
    PermintaanKehadiran,
    AplikasiCuti,
    ProgramPelatihan,
    Project,
    Todo,
    DailyReport,
    PenilaianKPI,
    PermohonanPinjaman,
    Reimbursement,
    Asuransi,
    AplikasiLembur,
    ChatManagement,
    History,
    TaskScreen,
    NoteScreen,
    NotificationScreen,
    InformationUser,
    EmployeeInformation,
    EmployeeSkill,
    ChangePassword
} from './Routing.js'
import Notification from "../lib/Notification";
import BottomTabsNavigator from "../Molecule/BottomTabsNavigator";
import SplashScreen from "../Screens/SplashScreen/index.js";
import ClientVisit from "../Screens/AttendanceScreen/ClienVisit/index.js";
// import { getMessaging } from "firebase/messaging";

// const messaging = getMessaging();

const Stack = createNativeStackNavigator()
const Auth = () => {
    return (
        <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen
                options={{ headerShown: false }}
                name="LoginScreen"
                component={LoginScreen}
            />
        </Stack.Navigator>
    )
}

// export default Tabs
const RoutingValue = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen">
                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{
                    headerShown: false
                }} />
                <Stack.Screen
                    name="Auth"
                    component={Auth}
                    options={{ headerShown: false }}
                />

                <Stack.Screen name="BottomTabsNavigator" component={BottomTabsNavigator} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="SalarySlip" component={SalarySlipScreen} options={{
                    title: 'Salary Slip',
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Medium'
                    }
                }} />
                <Stack.Screen name="AttendanceRequest" component={PermintaanKehadiran} options={{
                    title: 'Attendance Request',
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Medium'
                    }
                }} />
                <Stack.Screen name="Notifikasi" component={Notification} options={{
                    title: 'Notification',
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Medium'
                    }
                }}
                />
                <Stack.Screen name="AplikasiCuti" component={AplikasiCuti} options={{
                    title: 'Aplikasi Cuti',
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Medium'
                    }
                }} />
                <Stack.Screen name="Client" component={ClientVisit} options={{
                    title: 'Visiting Client',
                    headerStyle: {
                        backgroundColor: '#516BEB',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Regular'
                    }
                }} />
                <Stack.Screen name="ProgramPelatihan" component={ProgramPelatihan} options={{
                    title: 'Program Pelatihan',
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Medium'
                    }
                }} />
                <Stack.Screen name="Project" component={Project} options={{
                    title: 'Project',
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Medium'
                    }
                }} />
                <Stack.Screen name="todo" component={Todo} options={{
                    title: 'To Do',
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Medium'
                    }
                }} />
                <Stack.Screen name="DailyReport" component={DailyReport} options={{
                    title: 'Daily Report',
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Medium'
                    }
                }} />
                <Stack.Screen name="PenilaianKPI" component={PenilaianKPI} options={{
                    title: 'Penilaian KPI',
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Medium'
                    }
                }} />
                <Stack.Screen name="PermohonanPinjaman" component={PermohonanPinjaman} options={{
                    title: 'Permohonan Pinjaman',
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Medium'
                    }
                }} />
                <Stack.Screen name="Reimusement" component={Reimbursement} options={{
                    title: 'Reimbursement',
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Medium'
                    }
                }} />
                <Stack.Screen name="Asuransi" component={Asuransi} options={{
                    title: 'Asuransi',
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Medium'
                    }
                }} />
                <Stack.Screen name="AplikasiLembur" component={AplikasiLembur} options={{
                    title: 'Aplikasi Lembur',
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Medium'
                    }
                }} />
                <Stack.Screen name="Chat" component={ChatManagement} options={{
                    title: 'Chat Management',
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Medium'
                    }
                }} />
                <Stack.Screen name="History" component={History} options={{
                    title: 'History',
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Medium'
                    }
                }} />
                <Stack.Screen name="Task" component={TaskScreen} options={{
                    title: 'Task',
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Medium'
                    }
                }} />
                <Stack.Screen name="Bulletin" component={NoteScreen} options={{
                    title: 'Bulletin',
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Medium'
                    }
                }} />
                <Stack.Screen name="Notification" component={NotificationScreen} options={{
                    title: 'Notification',
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Medium'
                    }
                }} />
                <Stack.Screen name="UserInfo" component={InformationUser} options={{
                    title: 'User Information',
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Medium'
                    }
                }} />
                <Stack.Screen name="EmployeeInformation" component={EmployeeInformation} options={{
                    title: 'Employee Information',
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Medium'
                    }
                }} />
                <Stack.Screen name="EmployeeSkill" component={EmployeeSkill} options={{
                    title: 'Employee Skill Map',
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Medium'
                    }
                }} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} options={{
                    title: 'Ubah Password',
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Medium'
                    }
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RoutingValue