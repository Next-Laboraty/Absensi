export default function SocketIstirahat(data){
    const ws = new WebSocket('ws://103.179.57.18:21039/Rest/CheckIN')
    ws.onopen = () => {
        ws.send(JSON.stringify(data))
    }
}