import axios from 'axios'

export default function AxiosToken(server) {
    const action = axios({
        url: `${server}/api/method/frappe.auth.get_logged_user`,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'application/json',

        },
        timeout: 1000
    })
    return action
}