let delivery = require('./ipldta-javascript/deliveries.json')
let matches  = require('./ipldta-javascript/matches.json')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const app = express()
// const port = 3000

// middleware

// let logger = (req,res,next)=>{
//         console.log('Logging.....');
//         next();
// }

// app.use(logger);

// View Engine
// app.set('view engine', 'ejs');
// app.set('views',path.join(__dirname,'views'));



//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//Set Static Path
app.use(express.static(path.join(__dirname, '../client')));

var ipldata = require('./ipldta-javascript/economical-bowler.js');

app.get('/bowledovers', function (req, res) {
   res.send(ipldata.bowledOvers(delivery));

})
app.get('/strikedata', function (req, res) {
    res.send(ipldata.strikeRate(delivery));
 
 })

 app.get('/lukiestteam', function (req, res) {
    res.send(ipldata.tossWinner(matches));
 
 })

 app.get('/powerplay', function (req, res) {
    res.send(ipldata.powerPlay(matches,delivery));
 
 })



app.listen(3000, function () {
    console.log('server started on port 3000....')
})