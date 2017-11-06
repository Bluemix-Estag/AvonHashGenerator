const express = require('express');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');
let app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));



app.get('/', routes.index);


app.post('/api/v1/login', (req, res) => {

    res.status(401).json({error:true, message: 'INTERNAL_SERVER_ERROR'});
});

app.listen(app.get('port'), '0.0.0.0', () => {
    console.log(`App is listening on ${chalk.cyan(app.get('port'))}`);
})