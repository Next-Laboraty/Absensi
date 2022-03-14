import React, { useState, useRef, useEffect, } from 'react';
import { base64 } from "@firebase/util";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
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

LogBox.ignoreLogs(['Setting a timer']);

const WINDOW_HEIGHT = Dimensions.get('window').height;
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08);


export default function App() {
  const dimensionss = useRef(Dimensions.get("window"));
  const screenWidth = dimensionss.current.width;
  const [ratio, setRatio] = useState('4:3');
  const {employee,server,token} = useSelector((state) => state.employee)
  const [gambar, setGambar] = useState()
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null);
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);

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
    if (cameraRef.current) {
      const options = { quality: 0.2, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;
      const res = await fetch(source)
      const blob = await res.blob()
      if (source) {
        await cameraRef.current.pausePreview();
        setIsPreview(true);
        let dataX = {
          employee:employee.employee,
          server,
          token,
          longitude,
          latitude
        }
        UploadClientVisit(dataX, blob)
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

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        ratio="16:9"
        height={Math.round((screenWidth * 16) / 9)}
        width={'100%'}
        style={{flex:1}}
        type={cameraType}
        onCameraReady={onCameraReady}
        useCamera2Api={true}
      />
      <View style={styles.container}>
        {isPreview && (
          <>
            <Text style={{ fontFamily: 'Regular', textAlign: 'center', backgroundColor: 'green', color: 'white', paddingVertical: 5 }}>Data Received, you can go out now</Text>
            {/* <TouchableOpacity
              onPress={cancelPreview}
              style={styles.closeButton}
              activeOpacity={0.7}
            >
              <AntDesign name='close' size={32} color='#fff' />
            </TouchableOpacity> */}
          </>
        )}
        {!isPreview && (
          <View style={styles.bottomButtonsContainer}>
            <TouchableOpacity disabled={!isCameraReady} onPress={(switchCamera)}>
              <MaterialIcons name='flip-camera-ios' size={28} color='white' />
            </TouchableOpacity>
            {longitude ?
              <TouchableOpacity
                activeOpacity={0.7}
                disabled={!isCameraReady}
                onPress={onSnap}
                style={styles.capture}
              >
                <Feather name="camera" size={24} color="black" style={{ alignSelf: 'center' }} />

              </TouchableOpacity>
              :
              <View
                activeOpacity={0.7}
                style={styles.capture}
              >
                <ActivityIndicator color={'black'} />

              </View>
            }
          </View>
        )}
      </View>
    </View>
  );
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