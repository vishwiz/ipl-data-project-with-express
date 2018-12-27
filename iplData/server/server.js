let delivery = require('./ipldta-javascript/deliveries.json')
let matches = require('./ipldta-javascript/matches.json')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const app = express()

var mysql = require('mysql')
var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'vbnm123!@#',
   database: 'iplData'
});

connection.connect()

// connection.query('select season from matches', function (err, rows, fields) {
//    if (err) throw err

//    console.log('The solution is: ', rows)
// })



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


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: false
// }));

//Set Static Path
app.use(express.static(path.join(__dirname, '../client')));

var ipldata = require('./ipldta-javascript/economical-bowler.js');

app.get('/bowledovers', function (req, res) {
   connection.query("select bowler,sum(total_runs)  / (count(*)/6) as economy from deliveries where over > 16  group by bowler order by economy;", function (err, result) {
      if (err) throw err;
      res.send(result);
      // console.log(res.send(result))
   });

})
app.get('/strikedata', function (req, res) {
   connection.query("select batsman , (sum(total_runs)/count(*))*100 as strike_rate from deliveries group by batsman;", function (err, result) {
      if (err) throw err;
      res.send(result);
      // console.log(res.send(result))
   });

})

app.get('/luckiestteam', function (req, res) {
   connection.query("select toss_winner, count(*) as count FROM matches  GROUP BY toss_winner;", function (err, result) {
      if (err) throw err;
      res.send(result);
      // console.log(res.send(result))
   });

})

app.get('/powerplay', function (req, res) {
   connection.query("select batting_team , sum(total_runs)/count(distinct match_id) as averagePowerPlay from deliveries where match_id in (select max(id) as id from matches group by season) and over<=6 group by batting_team;", function (err, result) {
      if (err) throw err;
      res.send(result);
      // console.log(res.send(result))
   });

})




app.listen(3000, function () {
   console.log('server started on port 3000....')
})