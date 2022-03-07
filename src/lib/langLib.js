import React, { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

export default function langLib(){
    const [languagess, setLanguagess] = React.useState()
    useEffect(()=>{
        return

    })
    const datX = async () => {
        await SecureStore.getItemAsync('LoginSys')
    }
    const langS = 'id'
    return langS
}