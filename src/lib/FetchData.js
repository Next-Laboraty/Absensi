export default async function FetchData(url, tokens) {

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `token ${tokens}`, // notice the Bearer before your token
            'Content-type': 'application/json',
            'Accept': 'application/json',
            withCredentials: true
        },
    })

    return response

}