'use strict'

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var whiteColor = "#fff"
    var chartColorBlue1 = "#0f71bc"
    var chartColorBlue2= "#3ccfff"

    // 学習時間
    var data = google.visualization.arrayToDataTable([
        ["Date", "Hour", { role: "style" } ],
        ["", 2, chartColorBlue1],
        ["2", 8, chartColorBlue2],
        ["" , 1, chartColorBlue1],
        ["4", 2, chartColorBlue2],
        ["" , 3, chartColorBlue1],
        ["6", 4, chartColorBlue2],
        ["" , 5, chartColorBlue1],
        ["8", 6, chartColorBlue2],
        ["" , 7, chartColorBlue1],
        ["10", 1, chartColorBlue2],
        [""  , 2, chartColorBlue1],
        ["12", 3, chartColorBlue2],
        [""  , 4, chartColorBlue1],
        ["14", 7, chartColorBlue2],
        [""  , 2, chartColorBlue1],
        ["16", 7, chartColorBlue2],
        [""  , 4, chartColorBlue1],
        ["18", 3, chartColorBlue2],
        [""  , 3.2, chartColorBlue1],
        ["20", 3.5, chartColorBlue2],
        [""  , 3.2, chartColorBlue1],
        ["22", 3.5, chartColorBlue2],
        [""  , 3.2, chartColorBlue1],
        ["24", 3.5, chartColorBlue2],
        [""  , 3.2, chartColorBlue1],
        ["26", 3.5, chartColorBlue2],
        [""  , 3.2, chartColorBlue1],
        ["28", 6.5, chartColorBlue2],
        ["", 8, chartColorBlue1],
        ["30", 2, chartColorBlue2],
    ]);
    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
        { calc: "stringify",
            type: "string",
            role: "annotation" },
        2]);
    var pc_options = {
        width: '100%',
        height: '400',
        bar: {groupWidth: "50%"},
        legend: { position: "none" },
        vAxis:{
            format:'0h',
            gridlines:{
                color:whiteColor
            }
        }
    };
    var chart = new google.visualization.ColumnChart(document.getElementById("pc_columnchart_values"));
    chart.draw(view, pc_options);

    var sp_options = {
        width: '100%',
        height: '200',
        bar: {groupWidth: "50%"},
        legend: { position: "none" },
        vAxis:{
            format:'0h',
            gridlines:{
                color:whiteColor
            }
        }
    };
    var chart = new google.visualization.ColumnChart(document.getElementById("sp_columnchart_values"));
    chart.draw(view, sp_options);

    // 学習言語
    var data = google.visualization.arrayToDataTable([
        ['Language', 'Hour'],
        ['HTML', 9],
        ['CSS', 2],
        ['JavaScript', 6],
        ['PHP', 2],
        ['Laravel', 7],
        ['SQL', 5],
        ['SHELL', 4],
        ['情報システム基礎知識(その他)', 1],
    ]);

    var options = {
        legend:{
            position:"none",
        },
        pieHole:0.5,
        slices: {
            0: { color: '#2222ff' },
            1: { color: '#3344ff' },
            2: { color: '#4466ff' },
            3: { color: '#5588ff' },
            4: { color: '#6699ff' },
            5: { color: '#77aaff' },
            6: { color: '#88ccff' },
            7: { color: '#99ddff' },
            8: { color: '#aaeeff' },
        },
        chartArea: {
            width: '100%',
            height: '100%'
        }
    };

    var chart = new google.visualization.PieChart(document.getElementById('language_piechart'));
    chart.draw(data, options);

    // var options_legend = {
    //   legend:{
    //     position:"top",
    //     maxLines: 10,
    //     textStyle: {
    //       fontSize: 14,
    //       color: "#666666"
    //     }
    //   },
    //   pieHole:0.5,
    //   slices: {
    //     0: { color: '#2222ff' },
    //     1: { color: '#3344ff' },
    //     2: { color: '#4466ff' },
    //     3: { color: '#5588ff' },
    //     4: { color: '#6699ff' },
    //     5: { color: '#77aaff' },
    //     6: { color: '#88ccff' },
    //     7: { color: '#99ddff' },
    //     8: { color: '#aaeeff' },
    //   },
    //   chartArea: {
    //     height: 0,
    //     width: '88%'
    //   },
    //   enableInteractivity: false,
    // };

    // var chart = new google.visualization.PieChart(document.getElementById('language_piechart_legend'));

    // chart.draw(data, options_legend);

    // 学習コンテンツ
    var data = google.visualization.arrayToDataTable([
        ['Contents', 'Hour'],
        ['ドットインストール', 9],
        ['N予備校', 4],
        ['POSSE課題', 6],
    ]);

    var options = {
        legend:{
            position:"none",
        },
        pieHole:0.5,
        slices: {
            0: { color: '#2222ff' },
            1: { color: '#66aaff' },
            2: { color: '#aaddff' },
        },
        chartArea: {
            width: '100%',
            height: '100%',
        }
    };

    var chart = new google.visualization.PieChart(document.getElementById('contents_piechart'));
    chart.draw(data, options);

    // var options_legend = {
    //   legend:{
    //     position:"top",
    //     maxLines: 10,
    //     textStyle: {
    //       fontSize: 14,
    //       color: "#666666"
    //     }
    //   },
    //   pieHole:0.5,
    //   slices: {
    //     0: { color: '#2222ff' },
    //     1: { color: '#66aaff' },
    //     2: { color: '#aaddff' },
    //   },
    //   chartArea: {
    //     height: 0,
    //     width: '88%'
    //   },
    //   enableInteractivity: false,
    // };

    // var chart = new google.visualization.PieChart(document.getElementById('contents_piechart_legend'));

    // chart.draw(data, options_legend);
}

// resize時に、チャートを作り直し、windowサイズに合わせたチャートをレンダリングする
window.addEventListener('resize', $.throttle(250, drawChart))