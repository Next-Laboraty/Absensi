import React from "react"

export default async function WebSocketLocal(dataR, dataX) {
    const data = axios.post('http://192.168.99.99:3000'+dataR , dataX ,{
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
    return data


}