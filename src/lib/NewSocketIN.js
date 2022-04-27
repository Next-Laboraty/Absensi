export default function NewSocketIN(payload){
    console.log(JSON.stringify(payload))
    const ws = new WebSocket('ws://103.179.57.18:21039/Attendance/CheckIn')
    
    ws.onopen = () =>{
        ws.send(JSON.stringify(payload))
    }
    ws.onmessage = (result) => {
        result.data
    }
}