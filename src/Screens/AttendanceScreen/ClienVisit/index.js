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

LogBox.ignoreLogs(['Setting a timer']);

const WINDOW_HEIGHT = Dimensions.get('window').height;
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08);


export default function App() {
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
    onHandlePermission();
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const intervalId = setInterval(() => {
      setLongitude(location.coords.longitude)
      setLatitude(location.coords.latitude)
    }, 250)
    if (longitude !== null && latitude !== null) {
      clearInterval(intervalId); //This is important
    }
  }, [useState]);
  const onHandlePermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

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
          const servers = `https://${base64.decodeString(server)}/api/resource/Visiting Client`
          const url = await getDownloadURL(res.ref)
          let payload = {
            employee: employee.employee,
            server,
            url,
            longitude,
            latitude
          }
          AxiosPostData(servers, base64.decodeString(token), payload).then(res => {
            setLoaded(false)
            setMsg(true)
          }).catch(err => setVisible(true))
        }).catch(err => setVisible(true))
      }
    }
  };

  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }
  const StatusCamer = () => {
    if (!latitude && !latitude) {
      if (msg) {
        return (
          <Text>Data Berhasil di Input</Text>
        )
      }
      return (
        <Spinner size={'tiny'} />
      )
    }
    if (loaded) {
      return (
        <View style={{alignItems:'center'}}>
          <Spinner size={'tiny'} style={{alignSelf:'center'}}/>
          <Text style={{textAlign:'center',marginTop:'5%'}}>Mengirim Data ke server {base64.decodeString(server)}</Text>
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
            <Paragraph>Coba lagi dalam beberapa menit lagi atau tutup aplikasi dan coba kembali lagi nanti, cek koneksi internet anda. {`\n`}Jika speed internet dibawah 1,5MB/s maka anda akan mendapatan error ini lagi</Paragraph>
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