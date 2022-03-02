import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../Screens/HomeScreen";
import LoginScreen from "../Screens/LoginScreen";
import BottomTabsNavigator from "../Redux/BottomTabsNavigator";
import SalarySlipScreen from "../Screens/DoScreen/SalarySlipScreen/index.js";
import PermintaanKehadiran from "../Screens/DoScreen/PermintaanKehadiran/index.js";
import AplikasiCuti from "../Screens/DoScreen/AplikasiCuti/index.js";
import ProgramPelatihan from "../Screens/DoScreen/ProgramPelatihan/index.js";
import HasilPelatihan from "../Screens/DoScreen/HasilPelatihan/index.js";
import KritikSaranPelatihan from "../Screens/DoScreen/KritikSaranPelatihan/index.js";
import SkillKaryawan from "../Screens/DoScreen/SkillKaryawan/index.js";
import PenilaianKPI from "../Screens/DoScreen/PenilaianKPI/index.js";
import PermohonanPinjaman from "../Screens/DoScreen/PermohonanPinjaman/index.js";
import Reimusement from "../Screens/DoScreen/Reimusement";
import Asuransi from "../Screens/DoScreen/Asuransi/index.js";
import AplikasiLembur from "../Screens/DoScreen/AplikasiLembur/index.js";

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
                <Stack.Screen name="SalarySlip" component={SalarySlipScreen} options={{
                    title:'Salary Slip'
                }}/>
                <Stack.Screen name="AttendanceRequest" component={PermintaanKehadiran} options={{
                    title:'Attendance Request'
                }}/>
                <Stack.Screen name="AplikasiCuti" component={AplikasiCuti} options={{
                    title:'Aplikasi Cuti'
                }}/>
                <Stack.Screen name="ProgramPelatihan" component={ProgramPelatihan} options={{
                    title:'Program Pelatihan'
                }}/>
                <Stack.Screen name="HasilPelatihan" component={HasilPelatihan} options={{
                    title:'Hasil Pelatihan'
                }}/>
                <Stack.Screen name="KritikSaranPelatihan" component={KritikSaranPelatihan} options={{
                    title:'Kritik & Saran'
                }}/>
                <Stack.Screen name="SkillKaryawan" component={SkillKaryawan} options={{
                    title:'Skill Karyawan'
                }}/>
                <Stack.Screen name="PenilaianKPI" component={PenilaianKPI} options={{
                    title:'Penilaian KPI'
                }}/>
                <Stack.Screen name="PermohonanPinjaman" component={PermohonanPinjaman} options={{
                    title:'Permohonan Pinjaman'
                }}/>
                <Stack.Screen name="Reimusement" component={Reimusement} options={{
                    title:'Reimbursement'
                }}/>
                <Stack.Screen name="Asuransi" component={Asuransi} options={{
                    title:'Asuransi'
                }}/>
                <Stack.Screen name="AplikasiLembur" component={AplikasiLembur} options={{
                    title:'Aplikasi Lembur'
                }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}