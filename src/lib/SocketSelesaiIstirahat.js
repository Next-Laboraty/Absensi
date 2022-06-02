export default function SocketSelesaiIstirahat(data){
    const ws = new WebSocket('ws://103.179.57.18:21039/Rest/CheckOUT')
    ws.onopen = () => {
        ws.send(JSON.stringify(data))
    }
}