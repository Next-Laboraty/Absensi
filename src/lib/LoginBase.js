import React from "react";
import * as SecureStore from 'expo-secure-store';

export default function LoginBase() {
    return alert('Hello');

}
async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
}