import React, { useEffect, useState } from 'react'
import { Text, View, TextInput, ScrollView, StyleSheet, Image } from 'react-native'
import { MaterialIcons, MaterialCommunityIcons, Ionicons, FontAwesome, AntDesign, Entypo, EvilIcons, Octicons } from '@expo/vector-icons';
import MaintenanceScreen from '../../../Molecule/MaintenanceScreen'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from 'react-redux';
import { Button, Input, Card, Modal } from '@ui-kitten/components';
import { Datepicker, IndexPath, Select, SelectItem, Icon, Layout } from '@ui-kitten/components'
import InformationWithPhoto from '../../../Molecule/InformationWithPhoto';
import moment from 'moment';
import LoadingComp from '../../../Atomic/LoadingComp';
import axios from 'axios';
import AxiosPostData from '../../../lib/AxiosPostData';

export default function Rembes() {
    const { employee, server, token } = useSelector(state => state.employee)
    const [visible, setVisible] = useState(false)
    const [tipeData, setTipeData] = useState(null)
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [date, setDate] = useState(new Date())
    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
    const [listData, setListData] = useState([ 'Pilih Tipe Klaim'])
    const displayValue = listData[selectedIndex.row].name;
    const [image, setImage] = useState(null);
    const [total, setTotal] = useState('')
    const [alertText, setAlertText] = useState(false)
    const [loading1, setLoading1] = useState(true)
    useEffect(() => {
        AxiosPostData('http:///103.179.57.18:21039/Rembes', token, {
            server,
            token
        }).then(res => {
            setLoading1(false)
            setTipeData(res.data)
            setListData(res.data)
            console.log(tipeData)
        }).catch(err => {
            setAlertText(err)

            setVisible(true)
        })
    }, [])
    const onChangeTotal = total => {
        setTotal(total)
        console.log(total);
    };
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [6, 10],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage({
                uri: result.uri,
                name: 'Reimbusement.jpg',
                type: 'image/jpg',
            });
        }
    };
    const onChangedNumber = (text) => {
        let newText = '';
        let numbers = '0123456789';
    
        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
            else {
                // your call back function
                alert("please enter numbers only");
            }
        }
        setTotal({ total: newText });
    }
    const renderOption = (title) => (
        <SelectItem key={title.name} title={title.name} />
    );
    if (tipeData == null)
        return <LoadingComp />
    return (
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <ScrollView style={{ backgroundColor: '#FFFFFE', marginTop: 5, borderRadius: 20, flex: 1 }}>
                <InformationWithPhoto />
                <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                    <Text style={{ marginBottom: 5, fontFamily: 'Regular' }}>Masukan Tanggal</Text>
                    <Datepicker
                        placeholder='Masukan Tanggal'
                        date={date}
                        onSelect={nextDate => setDate(nextDate)}
                    />
                </View>
                <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                    <Text style={{ marginBottom: 5, fontFamily: 'Regular' }}>Tipe Klaim</Text>
                    <Select
                        selectedIndex={selectedIndex}
                        value={displayValue}
                        onSelect={index => setSelectedIndex(index)}>
                        {tipeData.map(renderOption)}
                    </Select>
                </View>
                <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                    <Text style={{ marginBottom: 5, fontFamily: 'Regular' }}>Deskripsi</Text>
                    <Input placeholder='Pilih Tipe' multiline={true} style={{marginVertical:2}}
        textStyle={{ minHeight: 64 }}/>
                </View>
                <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                    <Text style={{ marginBottom: 5, fontFamily: 'Regular' }}>Total</Text>
                    <Input placeholder='Masukan Jumlah' keyboardType='numeric' onChangeText={onChangeTotal} value={total}/>
                </View>
                <View style={{ marginTop: 40, marginHorizontal: 20 }}>
                    <Button status={"danger"} style={{ borderWidth: 1, borderRadius: 15, fontFamily: 'Regular' }} onPress={pickImage} >Upload Bukti </Button>

                </View>
                {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 400, alignSelf: 'center', marginVertical: 10 }} />}
            </ScrollView>
            <Button status={"info"} style={{ marginVertical: 10, marginHorizontal: 10 }} onPress={() => {
                try {
                    if (!image) {

                    }
                    const data = new FormData();
                    data.append("image", image);
                    const request = fetch(`http:///103.179.57.18:21039/Rembes/upload`, {
                        method: "POST",
                        body: data,
                    }).then(response => response.json())
                        .then(data => { console.log(data); })
                } catch (error) {
                    console.log(error);
                }

            }}>Ajukan {total}</Button>
            <Modal
                visible={visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setVisible(false)}>
                <Card disabled={true} style={{ width: 250, height: 500, }}>
                    <Text>{alertText}</Text>
                    <Button onPress={() => setVisible(false)} style={{ marginTop: 20 }}>
                        CAPTURE
                    </Button>
                </Card>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        minHeight: 192,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});