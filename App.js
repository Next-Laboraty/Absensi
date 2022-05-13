import React from 'react';
import AppLoading from 'expo-app-loading';
import { Text, View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux'
import store from './src/configureStore/index'
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic
} from '@expo-google-fonts/poppins'

import RoutingValue from './src/RoutingValue';

export default function HeaderTitle() {
  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    ThinItalic:Poppins_100Thin_Italic,
    ExtraLight: Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Light: Poppins_300Light,
    LightItalic:Poppins_300Light_Italic,
    Regular: Poppins_400Regular,
    Poppins_400Regular_Italic,
    Medium: Poppins_500Medium,
    Poppins_500Medium_Italic,
    SemiBold: Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Bold: Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Provider store={store}>
        
          <RoutingValue />
      </Provider>
    </ApplicationProvider>
  );
}
