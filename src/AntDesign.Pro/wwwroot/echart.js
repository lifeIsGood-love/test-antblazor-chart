// wwwroot/js/site.js

// function initializeChart() {
//     var chart = echarts.init(document.getElementById('chart-container'));

//     var option = {
//         toolbox: {
//             show: true,
//             feature: {
//               dataZoom: {
//                 yAxisIndex: [0,1]
//               },
//               dataView: {
//                 readOnly: false
//               },
//               magicType: {
//                 type: ["line", "bar"]
//               },
//               restore: {},
//               saveAsImage: {}
//             }
//           },
//         xAxis: {
//             type: 'category',
//             data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
//         },
//         yAxis: {
//             type: 'value'
//         },
//         tooltip: {
//             alwaysShowContent: true,
//             position: function (pt) {
//                 return [pt[0], 130]; // Adjust position if necessary
//             },
//             formatter: function (params) {
//                 // Custom formatter with button
//                 return `
//                     <div class="tooltip">
//                         <strong>${params.seriesName}</strong><br/>
//                         ${params.name}: ${params.value}<br/>
//                         <button class="tooltip-button" onclick="handleButtonClick()">Click Me</button>
//                     </div>
//                 `;
//             },
//             enterable: true
//         },
//         dataZoom: [
//             {
//               type: 'slider',
//               show: true,
//               start: 94,
//               end: 100,
//               handleSize: 8
//             },
//             {
//               type: 'inside',
//               start: 0,
//               end: 100
//             },
//             {
//               type: 'slider',
//               show: true,
//               yAxisIndex: 0,
//               filterMode: 'none',
//               width: 12,
//               height: '70%',
//               handleSize: 8,
//               showDataShadow: false,
//               left: '93%'
//             }
//           ],
//         series: [
//             {
//                 data: [150, 230, 224, 218, 135, 147, 260],
//                 type: 'line'
//             },
//             {
//                 name: 'Forecast Data',
//                 type: 'line',
//                 data: [null, null, null, null, null, null, 260, 270, 280, 290, 300],
//                 lineStyle: {
//                     type: 'dashed' // Dashed line style for forecast
//                 }
//             }
//         ]
//     };

//     chart.setOption(option);

//     // Save the chart instance for later updates
//     window.chartInstance = chart;
// }

function handleButtonClick() {
    alert('Ian want to  click!');
}

function initializeChart(){
var myChart = echarts.init(document.getElementById("chart-container"));
var echartJson ={
    "series":[
        {
            "edgeLabel":{
                "normal":{
                    "formatter":"{c}",
                }
            },
            "force":{
                "repulsion":200,//枝干线的长短 
                'edgeLength':[80,130]
            },
            "layout":"force",
            "roam":true,
            "itemStyle":{
                "normal":{
                    "color":"#f1f9f7"//文字颜色
                }
            },
            "label":{
                "normal":{
                    "show":true,//是否显示文字
                    "position": "bottom",
                }
            },
            "symbol":"circle",
            "symbolSize":1,
            "type":"graph",
            'lineStyle': {//线的样式
                'normal': {
                    opacity: .6,
                    curveness: 0,
                    color: '#4fffd4',
                    type: 'solid'
                }
            },
        }
    ],
    "tooltip":{
        "show":true//鼠标经过提示文字
    }
};
loadEcharts(echartJson);

// 关系链数据
var links=[
    {
        "source":"prente1",
        "target":"c1"
    },
    {
        "source":"prente1",
        "target":"c2"
    },
    {
        "source":"prente1",
        "target":"c3"
    },
    {
        "source":"prente1",
        "target":"c4"
    },
    {
        "source":"prente1",
        "target":"c7"
    },
    {
        "source":"c6",
        "target":"s1"
    },
    {
        "source":"prente1",
        "target":"c6"
    }
];

// 数据
var map =[
    {
        "name":"",
        "symbolSize":100,
        "symbol":"../assets/RDC.png",
        "id":"prente1",
        "itemStyle":{
            "normal":{
                "color":"red"
            }
        }
    },
    {
        "name":"母亲:夏雪",
        "symbol":"../assets/Sensor.png",
        "symbolSize":50,
        "id":"c1",
    },
    {
        "name":"父亲:梅长苏",
        "symbol":"../assets/Sensor.png",
        "symbolSize":50,
        "id":"c2",
    },
    {
        "name":"女儿:梅芳芳",
        "symbol":"../assets/Sensor.png",
        "symbolSize":40,
        "id":"c3",
    },
    {
        "name":"妻子:游泳",
        "symbol":"../assets/Sensor.png",
        "symbolSize":50,
        "id":"c4",
    },
    {
        "name":"朋友:姜文",
        "symbol":"../assets/Sensor.png",
        "symbolSize":50,
        "id":"c6",
    },
    {
        "name":"朋友:唐宛如",
        "symbolSize":50,
        "symbol":"../assets/Sensor.png",
        "id":"c7",
    }
];
pubdata(map);

function loadEcharts(echartJson) {
    var option = echartJson;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}

function getImgData(imgSrc) {
    var fun = function (resolve) {
        const canvas = document.createElement('canvas');
        const contex = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = '';
        img.onload = function () {
            //设置图形宽高比例
            center = {
                x: img.width / 2,
                y: img.height / 2
            };
            var diameter = img.width;//半径
            canvas.width = diameter;
            canvas.height = diameter;
            contex.clearRect(0, 0, diameter, diameter);
            contex.save();
            contex.beginPath();
            radius = img.width / 2;
            contex.arc(radius, radius, radius, 0, 2 * Math.PI); //画出圆
            contex.clip(); //裁剪上面的圆形
            contex.drawImage(img, center.x - radius, center.y - radius, diameter, diameter, 0, 0,
                diameter, diameter); // 在刚刚裁剪的园上画图
            contex.restore(); // 还原状态
            resolve(canvas.toDataURL('image/png', 1))
        };
        img.src = imgSrc;
    };
    var promise = new Promise(fun);
    return promise
}

function pubdata(json) {
    var androidMap = json;
    var picList = [];//获取出全部图片
    for (var i = 0; i < androidMap.length; i++) {
        //把图片路径转成canvas 
        let p = getImgData(androidMap[i].symbol);
        console.log(p)
        picList.push(p);
    }
    Promise.all(picList).then(function (images) {
        //取出base64 图片 然后赋值到jsondata中
        for (var i = 0; i < images.length; i++) {
            var img = "image://" + images[i];
            console.log(img);
            androidMap[i].symbol = img;
        }
        // 把数据设置到Echart中data
        myChart.setOption({
            series: [{
                data: androidMap,
                links:links,
                
            }]
        })
    })
}
}
