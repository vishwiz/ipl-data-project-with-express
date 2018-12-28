const express = require('express')
const path = require('path');
let delivery = require('./ipldta-javascript/deliveries.json')
let matches = require('./ipldta-javascript/matches.json')
const app = express()
//Set Static Path
app.use(express.static(path.join(__dirname, '../client')));

var ipldata = require('./ipldta-javascript/economical-bowler.js');

app.get('/bowledovers', function (req, res) {
   res.send(ipldata.bowledOvers(delivery));

})
app.get('/strikedata', function (req, res) {
   res.send(ipldata.strikeRate(delivery));

})

app.get('/luckiestteam', function (req, res) {
   res.send(ipldata.tossWinner(matches));

})

app.get('/powerplay', function (req, res) {
   res.send(ipldata.powerPlay(matches, delivery));

})




app.listen(3000, function () {
   console.log('server started on port 3000....')
})