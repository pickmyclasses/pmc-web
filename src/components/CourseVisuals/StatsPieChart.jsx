import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';

let option = {
  title: {
    text: 'Rating Distribution',
    subtext: '',
    x: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['One Stars', 'Two Stars', 'Three Stars', 'Four Stars', 'Five Stars'],
  },
  series: [
    {
      name: 'Distribution',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 0, name: 'One Stars' },
        { value: 0, name: 'Two Stars' },
        { value: 0, name: 'Three Stars' },
        { value: 0, name: 'Four Stars' },
        { value: 0, name: 'Five Stars' },
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
};

function onChartLegendselectchanged(param, echarts) {
  //console.log(param, echarts);
}
function onChartReady(echarts) {
  //console.log('echarts is ready', echarts);
}
function onChartClick(param, echarts) {
  //console.log(param, echarts);
}
function generateStarValues(reviews, option) {
  option.title.subtext = 'Based on ' + reviews.length + ' reviews';
  for (let i = 0; i < reviews.length; i++) {
    option.series[0].data[reviews[i].rating - 1].value += 1;
  }
}
export default function ReviewPieChart({ reviews }) {
  const [count, setCount] = useState(0);

  generateStarValues(reviews, option);

  return (
    <ReactECharts
      option={option}
      style={{ height: 400 }}
      onChartReady={onChartReady}
      onEvents={{
        'click': onChartClick,
        'legendselectchanged': onChartLegendselectchanged,
      }}
    />
  );
}
