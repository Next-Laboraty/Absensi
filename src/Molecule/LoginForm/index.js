import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { loginFunctional, loginGetEmployee } from '../../lib/loginFunctional'
import { useDispatch } from "react-redux";

export default function LoginForm(props) {
  const dispatch = useDispatch;
  // State
  const [usr, setUsr] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [server, setServer] = useState("");
  const [eyeOpen, setEyeOpen] = useState(true);

  // On Change
  const onUserChange = (usr) => {
    setUsr(usr);
  };
  const onServerChange = (server) => {
    setServer(server);
  };
  const onPasswordChange = (pwd) => {
    setPwd(pwd);
  };

  const eyeOpenButton = () => {
    eyeOpen ? setEyeOpen(false) : setEyeOpen(true);
  };

  // Logical Login
  const alertMsg = (data) => {
    Alert.alert(data.title, data.body, [
      { text: "OK", onPress: () => null },
    ]);
  };
  const onLogin = () => {
    setLoading(true);
    const payload = {
      usr,
      pwd,
    };
    if (server == "" || usr == "" || pwd == "") {
      let data = {
        title: "Data Kosong",
        body: "Data yang anda masukan kosong, harap isi dengan data yang valid",
      };
      alertMsg(data);
      setLoading(false);
    } else {
      const dataApi = {
        payload,
        server,
      };
      loginFunctional(dataApi)
        .then(res => {
          if (res.data.errorMsg) {
            setLoading(false)
            alertMsg({ title: res.data.title, body: res.data.body })
          }
          else {
            goLogin(res.data)
          }
        })
        .catch(err => {
          setLoading(false)
          // alertMsg
        })
    }
  };
  const goLogin = (data) => {
    loginGetEmployee(data).then(res => {
      if (res.data.errorMsg) {
        setLoading(false)
        alertMsg({ title: res.data.title, body: res.data.body })
        setLoading(false)
      }else{
        AsyncPenyimpanan('@AccountEmail', data.email)
        AsyncPenyimpanan('@AccountServer', data.server)
        AsyncPenyimpanan('@AccountToken', data.token)
        AsyncPenyimpanan('@AccountEmployee', JSON.stringify(res.data))
        props.nav.replace('SplashScreen')
      }
    })
      .catch(err => {
        console.log(err)
      })
  }
  const AsyncPenyimpanan = (key, value) => {
    AsyncStorage.setItem(key, value);
  }
  return (
    <KeyboardAvoidingView
      style={styles.CardInput}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {loading ? (
        <ActivityIndicator color={"#516BEB"} />
      ) : (
        <>
          <View>
            <TextInput
              value={server}
              onChangeText={onServerChange}
              placeholder="Masukan Server"
              placeholderTextColor={"#D0D7FC"}
              style={styles.InputStyle}
            />
            <Feather
              name="server"
              size={15}
              color="#516BEB"
              style={{ position: "absolute", left: 37, top: 18 }}
            />
            <Text
              style={{
                fontFamily: "Regular",
                fontSize: 8,
                color: "gray",
                position: "absolute",
                top: 42,
                left: 40,
              }}
            >
              Contoh{" "}
              <Text
                style={{ fontFamily: "Bold", color: "red" }}
                onPress={() => setServer("onglai.id")}
              >
                onglai.id
              </Text>{" "}
              (tanpa http dan www)
            </Text>
          </View>
          <View>
            <TextInput
              value={usr}
              onChangeText={onUserChange}
              placeholder="Masukan Username"
              placeholderTextColor={"#D0D7FC"}
              style={styles.InputStyle}
            />
            <Feather
              name="user"
              size={15}
              color="#516BEB"
              style={{ position: "absolute", left: 37, top: 18 }}
            />
          </View>
          <View>
            <TextInput
              value={pwd}
              onChangeText={onPasswordChange}
              placeholder="Masukan Password"
              placeholderTextColor={"#D0D7FC"}
              style={styles.InputStyle}
              secureTextEntry={eyeOpen}
            />
            <Feather
              name="key"
              size={15}
              color="#516BEB"
              style={{ position: "absolute", left: 37, top: 18 }}
            />
            <TouchableOpacity
              style={{ position: "absolute", right: 37, top: 18 }}
              onPress={() => eyeOpenButton()}
            >
              {eyeOpen ? (
                <Feather name="eye-off" size={15} color="#D0D7FC" />
              ) : (
                <Feather name="eye" size={15} color="#D0D7FC" />
              )}
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.buttonLogin}
              onPress={() => onLogin()}
            >
              <Text style={styles.buttonLoginText}>Masuk</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  textLang: {
    fontFamily: "Bold",
    color: "#516BEB",
    fontSize: 15,
    right: -10,
    top: 3,
  },
  buttonLoginText: {
    color: "#fff",
    textAlign: "center",
    paddingVertical: 10,
    fontFamily: "Bold",
    fontSize: 18,
  },
  buttonLogin: {
    backgroundColor: "#516BEB",
    marginHorizontal: 100,
    marginTop: 50,
    borderRadius: 30,
  },
  CardInput: {
    marginTop: 20,
  },
  Header: {
    fontFamily: "Bold",
    fontSize: 39,
    color: "#516BEB",
    textAlign: "center",
  },
  Sub: {
    fontFamily: "Regular",
    color: "#5F5F5F",
    marginTop: -10,
    textAlign: "center",
  },
  InputStyle: {
    backgroundColor: "#fff",
    borderColor: "#D0D7FC",
    borderWidth: 1,
    marginVertical: 12,
    marginHorizontal: 30,
    borderRadius: 30,
    paddingLeft: 30,
    paddingRight: 20,
    color: "#000",
    fontFamily: "Regular",
  },
});
