let delivery = require('./deliveries.json');
let matches = require('./matches.json');

//  Bowlers economy in death overs
let bowledOvers = (delivery) => {

   let countOvers = 0;
   let overs = delivery.reduce((overs, delivery) => {
      if (delivery['over'] > 16) {
         if (overs.hasOwnProperty(delivery['bowler'])) {
            if (countOvers !== delivery['over']) {
               overs[delivery['bowler']][0] += 1;
               countOvers = delivery['over'];
            }
            overs[delivery['bowler']][1] += parseInt(delivery["total_runs"]);
         } else {

            overs[delivery['bowler']] = [1, parseInt(delivery["total_runs"])];

            countOvers = delivery['over'];

         }
      }
      return overs
   }, {});

   let bowlersEconomy = Object.keys(overs).splice(0, 8).reduce((economy, bowlerDetail) => {
      economy[bowlerDetail] = overs[bowlerDetail][
         [1]
      ] / overs[bowlerDetail][
         [0]
      ]
      return economy;
   }, {})

   return bowlersEconomy;
}

// console.log(bowledOvers(delivery))

// ---------------------------------------------------------------------------------------------------------
// Strike Rate of a batsman

let strikeRate = (delivery) => {

   let batsmanRuns = delivery.reduce((batsmanRuns, delivery) => {
      if (!batsmanRuns.hasOwnProperty(delivery['batsman'])) {
         batsmanRuns[delivery['batsman']] = [parseInt(delivery['batsman_runs']), 1];
      } else {
         batsmanRuns[delivery['batsman']][0] += parseInt(delivery['batsman_runs']);
         batsmanRuns[delivery['batsman']][1] += 1;
      }
      return batsmanRuns
   }, {});
   let strikeRate = Object.keys(batsmanRuns).splice(0, 8).reduce((strikeRate, batsmanDetail) => {
      strikeRate[batsmanDetail] = ((batsmanRuns[batsmanDetail][
         [0]
      ] / batsmanRuns[batsmanDetail][
         [1]
      ]) * 100).toFixed(2)
      return strikeRate;
   }, {})


   return strikeRate
}

// console.log(strikeRate(delivery))
// --------------------------------------------------------------------------------------------------------------

// Lukiest teams in ipl 

let tossWinner = (matchesData) => {
   let toss = matchesData.reduce((tossWinner, count) => {
      tossWinner[count['toss_winner']] = (tossWinner[count['toss_winner']] || 0) + 1;
      return tossWinner;
   }, {})
   return toss;
}
// console.log(tossWinner(matches));

// ----------------------------------------------------------------------------------------------------------------------
//Power play overs
let powerPlay = (matches, delivery) => {
   let yearFinalId = matches.reduce((check, data) => {
      check[data['season']] = parseInt(data['id']);
      return check;

   }, {})
   let matchId = Object.values(yearFinalId);

   let numberOfTimesTeamsPlayed = matches.reduce((data, data1) => {
      if (matchId.includes(parseInt(data1['id']))) {
         data[data1['team1']] = (data[data1['team1']] || +0) + 1;
         data[data1['team2']] = (data[data1['team2']] || +0) + 1;
      }
      return data
   }, {})


   let powerPlay = delivery.reduce((data, data1) => {
      if (matchId.includes(parseInt(data1['match_id']))) {
         if (data1['over'] <= 6)
            data[data1['batting_team']] = (data[data1['batting_team']] || 0) + parseInt(data1['total_runs'])
      }

      return data
   }, {})

   let average = Object.keys(numberOfTimesTeamsPlayed).reduce((data, data1) => {
      data[data1] = powerPlay[data1] / numberOfTimesTeamsPlayed[data1]
      return data;
   }, {})
   return average;
}

// console.log(average(matches,delivery))

module.exports = {
   bowledOvers: bowledOvers,
   strikeRate: strikeRate,
   tossWinner: tossWinner,
   powerPlay: powerPlay
}