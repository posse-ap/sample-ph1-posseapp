'use strict'

{
  const colors = {
    primary: '#0f71bc',
    primaryLight: '#97b9d1',
    primaryBright: '#3ccfff'
  }
  const doughnutColors = [
    '#0345EC',
    '#0F71BD',
    '#20BDDE',
    '#3CCEFE',
    '#B29EF3',
    '#6D46EC',
    '#4A17EF',
    '#3105C0',
  ]

  const jsonURLs = {
    time: 'http://posse-task.anti-pattern.co.jp/1st-work/study_time.json',
    contents: 'http://posse-task.anti-pattern.co.jp/1st-work/study_contents.json',
    language: 'http://posse-task.anti-pattern.co.jp/1st-work/study_language.json',
  }

  let width, height, gradient;
  const getGradient = (ctx, chartArea) => {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;

    if (!gradient || width !== chartWidth || height !== chartHeight) {
      // Create the gradient because this is either the first render
      // or the size of the chart has changed
      width = chartWidth;
      height = chartHeight;
      gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
      gradient.addColorStop(0,colors.primary);
      gradient.addColorStop(1, colors.primaryBright);
    }

    return gradient;
  }

  const htmlLegendPlugin = {
    id: 'htmlLegend',
    afterUpdate(chart, args, options) {
      // const ul = getOrCreateLegendList(chart, options.containerID);
      const ul = document.getElementById(options.containerID)

      // Remove old legend items
      while (ul.firstChild) {
        ul.firstChild.remove();
      }

      // Reuse the built-in legendItems generator
      const items = chart.options.plugins.legend.labels.generateLabels(chart);

      items.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('study__item')

        li.onclick = () => {
          const {type} = chart.config;
          if (type === 'pie' || type === 'doughnut') {
            // Pie and doughnut charts only have a single dataset and visibility is per item
            chart.toggleDataVisibility(item.index);
          } else {
            chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
          }
          chart.update();
        };

        // Color box
        const circle = document.createElement('span');
        circle.classList.add('study__item__circle')
        circle.style.background = item.fillStyle;

        // Text
        if(item.hidden) li.classList.add('--hidden')
        const text = document.createTextNode(item.text);

        li.appendChild(circle);
        li.appendChild(text);
        ul.appendChild(li);
      });
    }
  }

  const dataLabelPlugin = {
    afterDatasetsDraw: function (chart, easing) {
      // To only draw at the end of animation, check for easing === 1
      var ctx = chart.ctx;

      chart.data.datasets.forEach(function (dataset, i) {
        let dataSum = 0;
        dataset.data.forEach(function (element){
          dataSum += element;
        });

        let meta = chart.getDatasetMeta(i);
        if (!meta.hidden) {
          meta.data.forEach(function (element, index) {
            // Draw the text in black, with the specified font
            ctx.fillStyle = '#fff';

            var fontSize = 15;
            var fontStyle = 'normal';
            var fontFamily = '"Poppins", sans-serif';
            ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily, 300);

            // Just naively convert to string for now
            // var dataString = dataset.data[index].toString() + '%';
            let percent = Math.round(dataset.data[index] / dataSum * 1000)/10

            // Make sure alignment settings are correct
            var position = element.tooltipPosition();

            if(percent >= 10) { // 10%以上で表示
              ctx.fillText(percent + "%", position.x - (fontSize), position.y + 5);
            }
          });
        }
      });
    }
  };

  const createBarChart = (timeDay, timeHour) => {
    const data = {
      labels: timeDay,
      datasets: [{
        label: 'hour',
        data: timeHour,
        borderRadius: 20,
        borderSkipped: false,
        barPercentage: .7,
        backgroundColor: function({chart}) {
          const {ctx, chartArea} = chart;
          if (!chartArea) return
          return getGradient(ctx, chartArea);
        },
      }]
    };

    const config = {
      type: 'bar',
      data: data,
      options: {
        plugins: {
          legend: false, // ラベル削除
        },
        scales: {
          x: {
            grid: {
              color: 'transparent',
              borderColor: 'transparent',
              tickColor: 'transparent' // マイナス部分
            },
            ticks: {
              color: colors.primaryLight,
              maxRotation: 0, // 目盛りラベルを回転させないようにする
            }
          },
          y: {
            grid: {
              color: 'transparent',
              borderColor: 'transparent',
              tickColor: 'transparent'
            },
            ticks: {
              color: colors.primaryLight,
              callback: (value, index, values) => {
                // 奇数番目のラベルだけ消す
                if (index % 2 === 1) return
                return `${value}h`
              }
            }
          }
        }
      }
    };

    new Chart(document.getElementById('js-barChart'), config)
  }

  const createStudyChart = (target, keys, values) => {
    const data = {
      labels: keys,
      datasets: [{
        data: values,
        backgroundColor: doughnutColors,
        borderWidth: 0
      }]
    }

    const config = {
      type: 'doughnut',
      data: data,
      options: {
        plugins: {
          htmlLegend: {
            // ID of the container to put the legend in
            containerID: `js-legend-${target}`,
          },
          legend: {
            display: false,
          }
        }
      },
      plugins: [htmlLegendPlugin, dataLabelPlugin],
    }

    new Chart(document.getElementById(`js-studyChart-${target}`), config)
  }

  /**
  * 学習時間　線グラフ
  */
  fetch(jsonURLs.time)
  .then((response) => response.json() )
  .then(function(json) {
    const { timeDays, timeHours } = json.reduce((obj, element) => {
      obj.timeDays.push(element.day)
      obj.timeHours.push(element.time)
      return obj
    }, {timeDays: [], timeHours: []});

    createBarChart(timeDays, timeHours)
  })

  /**
  * 学習言語　ドーナッツチャート
  */
  fetch(jsonURLs.language)
  .then((response) => response.json() )
  .then(function(json) {
    const obj = json[0]
    createStudyChart('language', Object.keys(obj), Object.values(obj))
  })

  /**
  * 学習コンテンツ　ドーナッツチャート
  */
  fetch(jsonURLs.contents)
  .then((response) => response.json() )
  .then(function(json) {
    const obj = json[0]
    createStudyChart('contents', Object.keys(obj), Object.values(obj))
  })
}
