import React from "react"

export default async function WebhookUrl(dataX) {
    const data = fetch('https://eo4475g9a2hfb6.m.pipedream.net', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataX)
    })
    return data
}