import axios from "axios"

export default function AxiosPostData(url,token,payload){
    console.log(url)
    const response = axios({
        url: 'https://onglai.id/api/resource/Visiting%20Client',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'application/json',
            'Authorization' : 'token 1641de0c4c7c103:241e433e0962803'
        },
        data: payload,
        timeout: 1000
    })
    return response
}