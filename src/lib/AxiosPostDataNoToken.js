import axios from "axios"

export default function AxiosPostDataNoToken(data){
    const response = axios({
        url: `https://${data.server}/api/method/login`,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'application/json'
        },
        data: data.payload,
        timeout: 1000
    })
    return response
}