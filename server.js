/**
 * @file AVON Hash generator
 * @author Rabah Zeineddine
 */



const express = require('express');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');
const request = require('request');

let app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


require('dotenv').load(); // Load .env file to process.. 

app.get('/', routes.index);


app.post('/api/v1/login', (req, res) => {
    let user = req.body;
    if (user.username && user.password && user.accountType) {
        getNewToken(user, (err, result) => {
            if (err) {
                res.status(err.statusCode).json({ error: true, message: err.message });
            } else {
                generateRSAHash(result, (err, data) => {
                    if (err) {
                        res.status(err.statusCode).json({ error: true, message: err.message });
                    } else {
                        let encrypted = data.encrypted;
                        let response = {
                            url: 'https://www.messenger.com/t/' + process.env.FB_PAGE_ID + '?ref=' + encrypted
                        }
                        res.status(200).json(response);
                    }
                });
            }
        })

    } else {
        res.status('400').json({ error: true, message: "BAD_REQUEST" })
    }
});


const getNewToken = (user, callback) => {

    let options = {
        uri: process.env.TOKEN_URL,
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            devKey: process.env.DEVKEY
        },
        json: {
            userId: user.username,
            password: user.password,
            userType: user.accountType,
            domain: process.env.DOMAIN
        }
    }
    request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            callback(null, body);
        } else {
            console.log(body);
            callback({ error: true, statusCode: response.statusCode, message: "BAD_REQUEST" }, null);
        }
    })
}

const generateRSAHash = (data, callback) => {

    
    let token = data.token;
    let userId = data.userId;

    let options = {
        uri: 'https://hashgenerator.mybluemix.net/encrypt?key=' + userId + '|' + token,
        method: 'GET'
    }

    request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body);
            callback(null, body);
        } else {
            callback({ error: true, statusCode: response.statusCode, message: "INTERNAL_SERVER_ERROR" }, null);
        }
    })



}

app.listen(app.get('port'), '0.0.0.0', () => {
    console.log(`App is listening on ${chalk.cyan(app.get('port'))}`);
})