let matches = require('./matches.json');
let delivery = require('./deliveries.json');

let strikeRate = (delivery)=>{
    
    let batsmanRuns =  delivery.reduce((batsmanRuns ,delivery) => {
       if (!batsmanRuns.hasOwnProperty(delivery['batsman'])) {
          batsmanRuns[delivery['batsman']] = [parseInt(delivery['batsman_runs']), 1];
       } else {
          batsmanRuns[delivery['batsman']][0] += parseInt(delivery['batsman_runs']);
          batsmanRuns[delivery['batsman']][1] +=   1;
       }
       return batsmanRuns
    },{});
    let strikeRate = Object.keys(batsmanRuns).splice(0,8).reduce((strikeRate, batsmanDetail)=>{
        strikeRate[batsmanDetail] = ((batsmanRuns[batsmanDetail][[0]]/batsmanRuns[batsmanDetail][[1]]) *100).toFixed(2)
        return strikeRate;
    },{})
 
    
      return strikeRate
  }

 console.log(strikeRate(delivery))