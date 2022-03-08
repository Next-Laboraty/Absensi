import React, { useEffect, useState } from "react";
import * as Crypto from 'expo-crypto';
import { base64 } from "@firebase/util";

export default async function langLib(data) {
    var dige = base64.encodeString(data)
    var fff = base64.decodeString(dige)
    console.log(dige + `\n` + fff)
}