
    $('#economical-bowler').click(() => {
       var bowler = new Array();
          $.get('/bowledovers', function (data) {
            bowler = Object.keys(data).map(keys=>[keys, parseInt(data[keys])]);       
       $('#container').highcharts({
                  chart: {
                      type: "column"
                  },
                  title: {
                      text: "Top Death Over Bowler"
                  },
                  xAxis: {
                      type: 'category',
                      allowDecimals: false,
                      title: {
                          text: "Players"
                      }
                  },
                  yAxis: {
                      title: {
                          text: "Econimical-bowler"
                      }
                  },
                  series: [{
                      name: 'Bowler',
                      data: bowler
                  }]
              });
            });  
    })


    $('#striker').click(() => {
       var strikeRate = new Array();
          $.get('/strikedata', function (data) {
            strikeRate = Object.keys(data).map(keys=>[keys, parseInt(data[keys])]);            
       $('#container').highcharts({
                  chart: {
                      type: "column"
                  },
                  title: {
                      text: "Top 5 Strike Rate"
                  },
                  xAxis: {
                      type: 'category',
                      allowDecimals: false,
                      title: {
                          text: "Players"
                      }
                  },
                  yAxis: {
                      title: {
                          text: "Strike Rate"
                      }
                  },
                  series: [{
                      name: 'Batsman',
                      data: strikeRate
                  }]
              });
            });  
    })

    $('#luckiest-teams').click(() => {
        var luckiestTeams = new Array();
           $.get('/lukiestteam', function (data) {
             luckiestTeams = Object.keys(data).map(keys=>[keys, parseInt(data[keys])]);
          
        $('#container').highcharts({
                   chart: {
                       type: "bar"
                   },
                   title: {
                       text: "Top Luckiest teams"
                   },
                   xAxis: {
                       type: 'category',
                       allowDecimals: false,
                       title: {
                           text: "Teams"
                       }
                   },
                   yAxis: {
                       title: {
                           text: "Luckiest Teams"
                       }
                   },
                   series: [{
                       name: 'Teams',
                       data: luckiestTeams
                   }]
               });
             });  
     })

     $('#power-play').click(() => {
        var powerPlay = new Array();
           $.get('/lukiestteam', function (data) {
         powerPlay = Object.keys(data).map(keys=>[keys, parseInt(data[keys])]);
             
        $('#container').highcharts({
                   chart: {
                       type: "column"
                   },
                   title: {
                       text: "Top Teams in Power Play"
                   },
                   xAxis: {
                       type: 'category',
                       allowDecimals: false,
                       title: {
                           text: "Teams"
                       }
                   },
                   yAxis: {
                       title: {
                           text: "Power Play"
                       }
                   },
                   series: [{
                       name: 'Teams',
                       data: powerPlay
                   }]
               });
             });  
     })



