const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 58577;

const axios = require('axios')

app.use(bodyParser.json());

app.post('/api/localmethod/ToDo', async (req, res) => {
    if (req.body.server && req.body.token) {
        try {
            const request = await axios.get(`https://${req.body.server}/api/resource/ToDo?fields=["*"]&filters=[["owner","=","${req.body.payload}"]]`, {
                headers: {
                    'Authorization': `token ${req.body.token}`,
                    'Content-Type': 'application/json',
                    'Accept-Language': 'application/json',
                }
            })
            res.send({
                status: 200,
                body: request.data.data
            });
        }
        catch (error) {
            res.send({
                status: 203,
                message: `Error sambungan tidak dikenali`
            });
        }
    }
    else {
        // GetTodo()
        res.send({
            message: `Error sambungan tidak dikenali`
        })
    }
})

app.post('/api/localmethod/task', async (req, res) => {
    if (req.body.server && req.body.token) {
        let server = req.body.server
        let token = req.body.token
        let payload = req.body.payload
        try {
            const request = await axios.get(`https://${server}/api/resource/Task?fields=["*"]&filters=[["completed_by","=","${payload}"]]`, {
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json',
                    'Accept-Language': 'application/json',
                }
            })
            res.send({
                status: 200,
                body: request.data.data
            });
        }
        catch (error) {
            res.send({
                status: 203,
                message: `Error sambungan tidak dikenali`
            });
        }
    }
    else {
        // GetTodo()
        res.send({
            message: `Error sambungan tidak dikenali`
        })
    }
})

app.post('/api/localmethod/buletin', async (req, res) => {
    if (req.body.server && req.body.token) {
        let server = req.body.server
        let token = req.body.token
        try {
            const request = await axios.get(`https://${server}/api/resource/Note?fields=["*"]`, {
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json',
                    'Accept-Language': 'application/json',
                }
            })
            res.send({
                status: 200,
                body: request.data.data
            });
        }
        catch (error) {
            res.send({
                status: 203,
                message: `Error sambungan tidak dikenali`
            });
        }
    }
    else {
        // GetTodo()
        res.send({
            message: `Error sambungan tidak dikenali`
        })
    }
})

app.post('/api/localmethod/clientvisit', async (req, res) => {
    if (req.body.server && req.body.token) {
        let server = req.body.server
        let token = req.body.token
        let payload = req.body.payload
        try {
            const request = await axios.post(`https://${server}/api/resource/Visiting%20Client`, payload, {
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json',
                    'Accept-Language': 'application/json',
                }
            })
            console.log(request)
            res.send({
                status: 200,
                body: request.data
            });
        }
        catch (error) {
            res.send({
                status: 203,
                message: `Error sambungan tidak dikenali`
            });
        }
    }
    else {
        // GetTodo()
        res.send({
            message: `Error sambungan tidak dikenali`
        })
    }
})

app.get('/helloworld', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`cli-nodejs-api listening at http://localhost:${port}`)
});

async function GetTodo(server, token, user) {
    const request = await axios.get(`https://${server}/api/resource/ToDo?fields=["*"]&filters=[["owner","=","${user}"]]`, {
        headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json',
            'Accept-Language': 'application/json',
        }
    })
    return request
}