import React, { Component, useState } from 'react'
import { Text, View, ScrollView, Picker, StyleSheet } from 'react-native'
import MaintenanceScreen from '../../../Molecule/MaintenanceScreen'
import { useSelector } from 'react-redux';
import { Button, Input, Layout } from '@ui-kitten/components';
import InformationWithPhoto from '../../../Molecule/InformationWithPhoto';


export default function Project() {
    const [country, setCountry] = useState('Unknown');
    const [aktif, setAktif] = useState('Ya');
    const [metodelengkap, setMetodelengkap] = useState('Panduan');
    return (
            <MaintenanceScreen />
    )
}