import React from "react";
import { NavigationContainer } from '@react-navigation/native'
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
    Reimusement,
    Asuransi,
    AplikasiLembur,
    ChatManagement,
    History
} from './Routing.js'
import BottomTabsNavigator from "../Molecule/BottomTabsNavigator";
import SplashScreen from "../Screens/SplashScreen/index.js";


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
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="BottomTabsNavigator" component={BottomTabsNavigator} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="SalarySlip" component={SalarySlipScreen} options={{
                    title: 'Salary Slip'
                }} />
                <Stack.Screen name="AttendanceRequest" component={PermintaanKehadiran} options={{
                    title: 'Attendance Request'
                }} />
                <Stack.Screen name="AplikasiCuti" component={AplikasiCuti} options={{
                    title: 'Aplikasi Cuti'
                }} />
                <Stack.Screen name="ProgramPelatihan" component={ProgramPelatihan} options={{
                    title: 'Program Pelatihan'
                }} />
                <Stack.Screen name="Project" component={Project} options={{
                    title: 'Project'
                }} />
                <Stack.Screen name="todo" component={Todo} options={{
                    title: 'Kritik & Saran'
                }} />
                <Stack.Screen name="DailyReport" component={DailyReport} options={{
                    title: 'Daily Report'
                }} />
                <Stack.Screen name="PenilaianKPI" component={PenilaianKPI} options={{
                    title: 'Penilaian KPI'
                }} />
                <Stack.Screen name="PermohonanPinjaman" component={PermohonanPinjaman} options={{
                    title: 'Permohonan Pinjaman'
                }} />
                <Stack.Screen name="Reimusement" component={Reimusement} options={{
                    title: 'Reimbursement'
                }} />
                <Stack.Screen name="Asuransi" component={Asuransi} options={{
                    title: 'Asuransi'
                }} />
                <Stack.Screen name="AplikasiLembur" component={AplikasiLembur} options={{
                    title: 'Aplikasi Lembur'
                }} />
                <Stack.Screen name="Chat" component={ChatManagement} options={{
                    title: 'Chat Management'
                }} />
                <Stack.Screen name="History" component={History} options={{
                    title: 'History'
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RoutingValue