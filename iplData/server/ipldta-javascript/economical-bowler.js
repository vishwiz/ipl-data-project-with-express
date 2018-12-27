let delivery = require('./deliveries.json');
let matches = require('./matches.json');

//  Bowlers economy in death overs
let bowledOvers = (delivery) => {
   // console.log(delivery[0])
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

   let bowlersEconomy = Object.keys(overs).slice(0, 8).reduce((economy, bowlerDetail) => {
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

   let numberOfTimesTeamsPlayed = matches.reduce((finalMatch, matches) => {
      if (matchId.includes(parseInt(matches['id']))) {
         finalMatch[matches['team1']] = (finalMatch[matches['team1']] || +0) + 1;
         finalMatch[matches['team2']] = (finalMatch[matches['team2']] || +0) + 1;
      }
      return finalMatch
   }, {})


   let powerPlay = delivery.reduce((totalRuns, deliveries) => {
      if (matchId.includes(parseInt(deliveries['match_id']))) {
         if (deliveries['over'] <= 6)
            totalRuns[deliveries['batting_team']] = (totalRuns[deliveries['batting_team']] || 0) + parseInt(deliveries['total_runs'])
      }

      return totalRuns
   }, {})

   let average = Object.keys(numberOfTimesTeamsPlayed).reduce((bestTeams, teamsPlayed) => {
      bestTeams[teamsPlayed] = powerPlay[teamsPlayed] / numberOfTimesTeamsPlayed[teamsPlayed]
      return bestTeams;
   }, {})
   return average;
}

console.log(powerPlay(matches,delivery))

// module.exports = {
//    bowledOvers: bowledOvers,
//    strikeRate: strikeRate,
//    tossWinner: tossWinner,
//    powerPlay: powerPlay
// }