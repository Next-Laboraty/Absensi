import { StyleSheet, Image, View, Text } from "react-native";
import { useSelector } from "react-redux";
import { base64 } from "@firebase/util";

export default function AttendanceHeader() {
    const {employee,server} = useSelector((state) => state.employee)
    const url = base64.decodeString(server)
    return (
        <View style={styles.containers}>
            <Image source={{uri:'https://'+url+employee.image}} style={{ width: 62, height: 62, alignSelf: 'center', marginTop: -60,borderRadius:120/2 }} />
            <Text style={styles.Text1}>{employee.employee_name}</Text>
            <Text style={styles.Text2}>{employee.user_id}</Text>
            <Text style={styles.Text3}>{employee.department}</Text>
            <Text style={styles.Text4}>{employee.designation}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    containers: {
        height: 200, backgroundColor: '#fff', borderRadius: 30,
        justifyContent: 'center',
        marginTop: 80,
        marginHorizontal: 20
    },
    Text1: {
        fontFamily: 'Medium',
        textAlign: 'center',
        fontSize: 20,
        color: '#2C3333'
    },
    Text2: {
        fontFamily: 'Light',
        textAlign: 'center',
        fontSize: 15,
        color: '#2C3333'
    },
    Text3: {
        marginTop: 20,
        fontFamily: 'Medium',
        textAlign: 'center',
        color: '#2C3333',
        fontSize: 13,
    },
    Text4: {
        fontFamily: 'ExtraLight',
        textAlign: 'center',
        color: '#2C3333',
        fontSize: 11,
    }
})