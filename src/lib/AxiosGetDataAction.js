import axios from 'axios'

export default function AxiosGetDataAction(data) {
    const action = axios({
        url: data.url,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'application/json',
            'Authorization': `token ${data.token}`

        },
        timeout: 1000
    })
    return action
}