import React, { useState, useRef, useEffect, } from 'react';
import { base64 } from "@firebase/util";
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import { Camera } from 'expo-camera';
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
import UploadClientVisit from '../../../lib/UploadClientVisit';
import * as Location from 'expo-location';
import { LogBox } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { getDownloadURL } from 'firebase/storage';
import AxiosPostData from '../../../lib/AxiosPostData';
import { Layout, Spinner, Text, Icon, Button } from '@ui-kitten/components';
import { Paragraph, Dialog, Portal, Provider } from 'react-native-paper';
import WebhookUrl from '../../../lib/WebhookUrl';
import axios from 'axios';

LogBox.ignoreLogs(['Setting a timer']);

const WINDOW_HEIGHT = Dimensions.get('window').height;
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08);


export default function App({ navigation }) {
  const dimensionss = useRef(Dimensions.get("window"));
  const screenWidth = dimensionss.current.width;
  const [ratio, setRatio] = useState('4:3');
  const { employee, server, token } = useSelector((state) => state.employee)
  const [gambar, setGambar] = useState()
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null);
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const [isPreview, setIsPreview] = useState(false);
  const [msg, setMsg] = useState(false)
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [loaded, setLoaded] = useState(false)
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  useEffect(async () => {
    let isMounted = true
    checkPermission()
    let location = await Location.getCurrentPositionAsync({});
    const intervalId = setInterval(() => {
      setLongitude(location.coords.longitude)
      setLatitude(location.coords.latitude)
    }, 250)
    if (longitude !== null && latitude !== null) {
      clearInterval(intervalId); //This is important
    }
  }, [useState]);
  const checkPermission = () => {
    Camera.getCameraPermissionsAsync().then(res => {
      let dataBody = {
        res,
        name: 'Kamera'
      }
      if (res.status =='undetermined' || res.status =='denied') {
        console.log(res.status)
        navigation.replace('PermissionScreen', dataBody)
      }
      else {
        Location.getForegroundPermissionsAsync().then(res => {
          let dataPermLoc = {
            res,
            name: 'Geolokasi'
          }
          if (res.status == 'denied') {
            navigation.replace('PermissionScreen', dataPermLoc)
          }
        })
      }

    })
  }
  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType(prevCameraType =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };
  const onSnap = async () => {
    setLoaded(true)
    if (cameraRef.current) {
      const options = { quality: 0.2, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;
      const res = await fetch(source)
      const blob = await res.blob()
      if (source) {
        await cameraRef.current.pausePreview();
        setIsPreview(true);
        UploadClientVisit(blob).then(async (res) => {
          // const servers = `	https://eo4475g9a2hfb6.m.pipedream.net`
          const url = await getDownloadURL(res.ref)
          let payload = {
            employee: employee.employee,
            server,
            url,
            longitude,
            latitude
          }
          const DataX = {
            type: 'ClientVisit',
            payload,
            server,
            token
          }
          SendToERP(DataX)
        }).catch(err => setVisible(true))
      }
    }
  };

  const SendToERP = async (payload) => {
    console.log(payload)
    await axios.post(`http://103.179.57.18:21039/Client`, payload, {
      headers: {
        'Authorization': `token ${base64.decodeString(token)}`,
        'Content-Type': 'application/json',
        'Accept-Language': 'application/json',
      },
    }).then((res) => {
      setLoaded(false)
      setMsg(true)
    }).catch((err) => setVisible(true))
  }

  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };
  const StatusCamer = () => {
    if (msg) {
      return (
        <Text style={{ fontFamily: 'Regular' }}>Data Berhasil di Input</Text>
      )
    }
    if (!latitude && !latitude) {
      return (
        <Spinner size={'tiny'} />
      )
    }
    if (loaded) {
      return (
        <View style={{ alignItems: 'center' }}>
          <Spinner size={'tiny'} style={{ alignSelf: 'center' }} />
          <Text style={{ textAlign: 'center', marginTop: '5%' }}>Mengirim Data ke server {base64.decodeString(server)}</Text>
        </View>
      )
    }
    return (
      <Button style={{ borderRadius: 20 }} onPress={() => onSnap()}>
        <Feather name="camera" size={24} color="black" style={{ alignSelf: 'center' }} />
      </Button>
    )
  }
  return (
    <Provider>
      <Layout style={{ flex: 1 }}>
        <Layout style={{ flex: 1 }}>
          <Camera
            ref={cameraRef}
            ratio="16:9"
            height={Math.round((screenWidth * 16) / 9)}
            width={'100%'}
            style={{ flex: 1, alignSelf: 'center' }}
            type={cameraType}
            onCameraReady={onCameraReady}
            useCamera2Api={true}
          />
        </Layout>
        <Layout style={{ height: '20%', alignSelf: 'center', justifyContent: 'center' }}>
          {StatusCamer()}
        </Layout>
      </Layout>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Terjadi Kesalahan pada server</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Koneksi Internet Anda tidak Stabil{`\n`}Coba lagi dalam beberapa menit lagi atau tutup aplikasi dan coba kembali lagi nanti, cek koneksi internet anda.</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Mengerti</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject

  },
  text: {
    color: '#fff'
  },
  bottomButtonsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 28,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeButton: {
    position: 'absolute',
    top: 35,
    right: 20,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5A45FF',
    opacity: 0.7
  },
  capture: {
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 5,
    height: CAPTURE_SIZE,
    width: CAPTURE_SIZE,
    borderRadius: Math.floor(CAPTURE_SIZE / 2),
    marginBottom: 28,
    marginHorizontal: 30
  },
  captures: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    height: CAPTURE_SIZE,
    width: CAPTURE_SIZE,
    borderRadius: Math.floor(CAPTURE_SIZE / 2),
    marginBottom: 28,
    marginHorizontal: 30
  }
});