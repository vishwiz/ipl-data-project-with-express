$('#economical-bowler').click(() => {
    return fetch('/bowledovers')
        .then(res => res.json())
        .then(data => Object.keys(data).map(keys => [keys, Number(data[keys])]))
        .then(chartData => Highcharts.chart('container', {
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
                data: chartData
            }]
        }));
})



$('#striker').click(() => {

    return fetch('/strikedata')
        .then(res => res.json())
        .then(data => Object.keys(data).map(keys => [keys, Number(data[keys])]))
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

})

$('#luckiest-teams').click(() => {
    return fetch('/luckiestteam')
        .then(res => res.json())
        .then(data => Object.keys(data).map(keys => [keys, Number(data[keys])]))
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


})


$('#power-play').click(() => {
    return fetch('/powerplay')
        .then(res => res.json())
        .then(data => Object.keys(data).map(keys => [keys, Number(data[keys])]))
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
})