// wwwroot/js/site.js

function initializeChart() {
    var chart = echarts.init(document.getElementById('chart-container'));

    var option = {
        toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: [0,1]
              },
              dataView: {
                readOnly: false
              },
              magicType: {
                type: ["line", "bar"]
              },
              restore: {},
              saveAsImage: {}
            }
          },
        xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            type: 'value'
        },
        tooltip: {
            alwaysShowContent: true,
            position: function (pt) {
                return [pt[0], 130]; // Adjust position if necessary
            },
            formatter: function (params) {
                // Custom formatter with button
                return `
                    <div class="tooltip">
                        <strong>${params.seriesName}</strong><br/>
                        ${params.name}: ${params.value}<br/>
                        <button class="tooltip-button" onclick="handleButtonClick()">Click Me</button>
                    </div>
                `;
            },
            enterable: true
        },
        dataZoom: [
            {
              type: 'slider',
              show: true,
              start: 94,
              end: 100,
              handleSize: 8
            },
            {
              type: 'inside',
              start: 0,
              end: 100
            },
            {
              type: 'slider',
              show: true,
              yAxisIndex: 0,
              filterMode: 'none',
              width: 12,
              height: '70%',
              handleSize: 8,
              showDataShadow: false,
              left: '93%'
            }
          ],
        series: [
            {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            },
            {
                name: 'Forecast Data',
                type: 'line',
                data: [null, null, null, null, null, null, 260, 270, 280, 290, 300],
                lineStyle: {
                    type: 'dashed' // Dashed line style for forecast
                }
            }
        ]
    };

    chart.setOption(option);

    // Save the chart instance for later updates
    window.chartInstance = chart;
}

function handleButtonClick() {
    alert('Ian want to  click!');
}
