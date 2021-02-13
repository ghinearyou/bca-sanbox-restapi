const express = require('express'),
    bodyParser = require('body-parser'),
    axios = require('axios'),
    qs = require('qs')

const app = express()
require('dotenv').config()

const url = process.env.SANDBCA
app.use(bodyParser.json())

const generate = () => {
    let client_id = process.env.CLIENT_ID
    let client_secret = process.env.CLIENT_SECRET
    let data = client_id + ':' + client_secret
    let result = new Buffer(data).toString('base64');
    return 'Basic '+result
}

app.route('/').get((req, res) => {
    res.send({
        status: "Success",
        message: "Welcome to BCA Sandbox RestAPI with PrismaORM"
    })
})

app.route('/oauth').get(async (req, res) => {
    let data = qs.stringify({
        'grant_type': 'client_credentials' 
    });
    try {
        const result = await axios.post(url+'api/oauth/token', data, {
            headers: {
                'Authorization': generate(),
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        res.send(result.data)    
    } catch (e) { 
        res.send(e.response.data)
    }
})

app.listen(3000, () => {
    console.log('server starting up on : 3000')
})