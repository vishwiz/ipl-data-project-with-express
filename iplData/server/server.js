const express = require('express')
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

//Set Static Path
app.use(express.static(path.join(__dirname, '../client')));

app.get('/bowledovers', function (req, res) {
   connection.query("select bowler,sum(total_runs)  / (count(*)/6) as economy from deliveries where over > 16  group by bowler order by economy;", function (err, result) {
      if (err) throw err;
      res.send(result);
   });

})
app.get('/strikedata', function (req, res) {
   connection.query("select batsman , (sum(total_runs)/count(*))*100 as strike_rate from deliveries group by batsman;", function (err, result) {
      if (err) throw err;
      res.send(result);
   });

})

app.get('/luckiestteam', function (req, res) {
   connection.query("select toss_winner, count(*) as count FROM matches  GROUP BY toss_winner;", function (err, result) {
      if (err) throw err;
      res.send(result);
   });

})

app.get('/powerplay', function (req, res) {
   connection.query("select batting_team , sum(total_runs)/count(distinct match_id) as averagePowerPlay from deliveries where match_id in (select max(id) as id from matches group by season) and over<=6 group by batting_team;", function (err, result) {
      if (err) throw err;
      res.send(result);
   });

})


app.on('listening',function(){
   console.log('ok, server is running');
});

app.listen(3000, function () {
   console.log('server started on port 3000....')
})