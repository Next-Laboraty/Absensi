import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, Ionicons, FontAwesome, AntDesign, Entypo, EvilIcons, Octicons } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native-web';
// import iconHome from './icon/test.png' memanggil image dengan indexing
// <<<ini panduan command>>>
// hapus backgroundColor <jika tidak digunakankarna ini tujuannya untuk awal awal biar mudah dalam design
// selanjutnya tambahkan Image soruce=ukuran width dan heigh 26
// kemudian remove backgroundColor box yellow saja
// kemudian icon-active
// kemudian text home diganti warna color: 'green'
// selanjutnya kita akan mencoba men styling konten yang dibagian atas inini
// remove style={style.welcome}
// tambahkan warna putih wrapper untuk bagian navigation / footer biar sesuai
// selanjutnya membuat search bar dan icon pada bagian atas
// selanjutnya  buat <TextInput value="what do you want to eat? " /> dan lalu kasih border dan radius
// ketika sudah mengatur dari icon dan text input maka ganti background utamanya adalah putih

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      {/* search bar */}
      <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 15 }}>
        <View style={{ marginLeft: 5, marginTop: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRightWidth: 100, borderColor: 'white' }}>
              <Text style={{}}></Text>
            </View>
            <TouchableOpacity style={{ flex: 1, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center', borderBottomLeftRadius: 15, borderTopLeftRadius: 15 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#516BEB', color: 'white' }}>Kembali</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
          <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: '#516BEB', paddingVertical: 7, borderwith: 1, height: 55, width: 150, marginRight: 10, borderBottomRightRadius: 15, borderTopRightRadius: 15 }}>
              <Text style={{ marginLeft: 40, fontSize: 25, fontWeight: 'bold', color: 'white' }}>Training</Text>
            </View>
          </View>
        </View>
        {/* Program Pelatihan */}
        <View style={{ marginLeft: 16 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Program Pelatihan</Text>
        </View>
        {/* Area tema pelatihan */}
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <View style={{ flex: 1, backgroundColor: '#516BEB', marginHorizontal: 15, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 15, color: 'white' }}>Tema Pelatihan</Text>
            <Text style={{ fontSize: 20, color: 'white' }}>Sosialisasi KP</Text>
          </View>
        </View>
        {/* buat area pengisi materi */}
        <View style={{ marginHorizontal: 17, marginTop: 8 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', borderTopLeftRadius: 4, borderTopRightRadius: 4, padding: 14, marginHorizontal: 12 }}>
            {/* logo gopay */}
            <View style={{ backgroundColor: '#FFE6AB', alignContent: 'center', alignItems: 'center', borderRadius: 10, borderLeftWidth: 15, borderRightWidth: 15, borderColor: '#FFE6AB' }}>
              <Text style={{ marginBottom: 14, }}>Pengisi Materi</Text>
              <Text>Mr Kasno</Text>
            </View>
            <View style={{ backgroundColor: '#FFE6AB', paddingHorizontal: 5, alignContent: 'center', alignItems: 'center', borderRadius: 10, borderLeftWidth: 15, borderRightWidth: 15, borderColor: '#FFE6AB' }}>
              <Text style={{ marginBottom: 14 }}>Waktu Pelatihan</Text>
              <Text>9 Maret 2022</Text>
            </View>
          </View>
        </View>
      </View>
      {/* Bagian Button */}
      <View style={{ flexDirection: 'row', marginBottom: 260 }}>
        <View style={{ flex: 1 }}>
          <View style={{ backgroundColor: '#516BEB', borderwith: 1, height: 40, width: 120, borderBottomRightRadius: 50, borderTopRightRadius: 50 }}>
            <Text style={{ marginLeft: 25, fontSize: 25, fontWeight: 'bold', color: 'white' }}>Join</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ marginTop: 20, marginLeft: 5, width: 250, height: 100, fontSize: 20 }}>
                Hasil Pelatihan
              </Text>
              <View style={{ marginTop: 20, marginLeft: 50 }} >
                <AntDesign name="caretright" size={30} color="black" />
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* bagian koding bawah footer */}
      <View style={{ height: 54, flexDirection: 'row', backgroundColor: '#516BEB', borderTopRightRadius: 40, borderTopLeftRadius: 40 }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style={{ width: 26, height: 26, backgroundColor: '#516BEB' }}>
            <FontAwesome name="home" size={24} color="white" />
            {/* <Image style={{ width: 26, height: 26 }} source={require('./icon/test.png')} /> */}
          </TouchableOpacity>
          <Text style={{ fontSize: 10, color: 'white', marginTop: 4, }}>Home</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style={{ width: 26, height: 26, backgroundColor: '#516BEB' }}>
            <Octicons name="checklist" size={24} color="white" />
            {/* <Image source={require('./icon/test.png')} /> */}
          </TouchableOpacity>
          <Text style={{ fontSize: 10, color: 'white', marginTop: 4 }}>Checklist</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style={{ width: 26, height: 26, backgroundColor: '#516BEB' }}>
            <Entypo name="help" size={24} color="white" />
            {/* <Image source={require('./icon/test.png')} /> */}
          </TouchableOpacity>
          <Text style={{ fontSize: 10, color: 'white', marginTop: 4 }}>Info</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style={{ width: 26, height: 26, backgroundColor: '#516BEB' }}>
            {/* <Image source={require('./icon/test.png')} /> */}
            <MaterialIcons name="account-circle" size={24} color='#FF7648' />
          </TouchableOpacity>
          <Text style={{ fontSize: 10, color: '#FF7648', marginTop: 4 }}>Account </Text>
        </View>
      </View>
    </View>
  );

}

const style = StyleSheet.create({
});