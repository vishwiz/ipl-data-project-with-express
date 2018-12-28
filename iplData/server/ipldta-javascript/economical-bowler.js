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

// --------------------------------------------------------------------------------------------------------------

// Lukiest teams in ipl 

let tossWinner = (matchesData) => {
   let toss = matchesData.reduce((tossWinner, count) => {
      tossWinner[count['toss_winner']] = (tossWinner[count['toss_winner']] || 0) + 1;
      return tossWinner;
   }, {})
   return toss;
}

// ----------------------------------------------------------------------------------------------------------------------
//Power play overs
let powerPlay = (matches, delivery) => {
   let yearFinalId = matches.reduce((seasonFinalId, matches) => {
      seasonFinalId[matches['season']] = parseInt(matches['id']);
      return seasonFinalId;

   }, {})
   let matchId = Object.values(yearFinalId);

   let numberOfTimesTeamsPlayed = matches.reduce((teamsPlayedFinals, matches) => {
      if (matchId.includes(parseInt(matches['id']))) {
         teamsPlayedFinals[matches['team1']] = (teamsPlayedFinals[matches['team1']] || +0) + 1;
         teamsPlayedFinals[matches['team2']] = (teamsPlayedFinals[matches['team2']] || +0) + 1;
      }
      return teamsPlayedFinals
   }, {})


   let powerPlay = delivery.reduce((teamsRuns, delivery) => {
      if (matchId.includes(parseInt(delivery['match_id']))) {
         if (delivery['over'] <= 6)
            teamsRuns[delivery['batting_team']] = (teamsRuns[delivery['batting_team']] || 0) + parseInt(delivery['total_runs'])
      }

      return teamsRuns
   }, {})

   let average = Object.keys(numberOfTimesTeamsPlayed).reduce((average, teamsName) => {
      average[teamsName] = powerPlay[teamsName] / numberOfTimesTeamsPlayed[teamsName]
      return average;
   }, {})
   return average;
}

module.exports = {
   bowledOvers: bowledOvers,
   strikeRate: strikeRate,
   tossWinner: tossWinner,
   powerPlay: powerPlay
}