import axios from "axios"

export default function AxiosPostData(url,token,payload){
    const response = axios({
        url: url,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'application/json',
            'Authorization': `token ${token}`
        },
        data: payload,
    })
    return response
}