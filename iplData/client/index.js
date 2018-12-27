$('#economical-bowler').click(() => {
    let bowler = () => {
        return fetch('/bowledovers')
            .then(res => res.json())
           .then(data => data.map(x=>[x['bowler'],x['economy']]).slice(0,10))
            .then(chartData => Highcharts.chart('container', {
                chart: {
                    type: "line"
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
                    data: chartData
                }]
            }));

    }
    bowler();
})



$('#striker').click(() => {
    let strikeRate = () => {
        return fetch('/strikedata')
            .then(res => res.json())
            .then(data => data.map(x=> [x['batsman'],x['strike_rate']]).slice(0,8))
            .then(chartData => Highcharts.chart('container', {
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
                    data: chartData
                }]
            }));

    }
    strikeRate();
})

$('#luckiest-teams').click(() => {
    let luckiestTeams = () => {
        return fetch('/luckiestteam')
            .then(res => res.json())
            .then(data => data.map(x=>[x['toss_winner'] , x['count']]))
            .then(chartData => Highcharts.chart('container', {
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
                    data: chartData
                }]
            }));

    }
    luckiestTeams();
})


$('#power-play').click(() => {
    let powerPlay = () => {
        return fetch('/powerplay')
            .then(res => res.json())
            .then(data=> data.map(x=> [x['batting_team'], x['averagePowerPlay']]))
            .then(chartData => Highcharts.chart('container', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Best Teams in the Power PLay'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    name: 'Teams',
                    colorByPoint: true,
                    data: chartData
                }]
            }));

    }
    powerPlay();
})