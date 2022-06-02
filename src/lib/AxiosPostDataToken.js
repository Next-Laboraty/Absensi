import axios from "axios"

export default function AxiosPostDataToken(url,token){
    const response = axios({
        url: url,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'application/json',
            'Authorization' : `token ${token}`
        },
        timeout: 1000
    })
    return response
}