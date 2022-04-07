import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import Box from '@mui/material/Box';

let option = {
  color: ['#b85042', '#cfb845', '#e1dd72', '#a8c66c', '#1b6535'],
  title: {
    text: 'Rating Detailed Distribution',
    subtext: '',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
    },
  },
  legend: { bottom: 1 },
  grid: {
    left: '4%',
    bottom: '15%',
  },
  xAxis: {
    type: 'value',
    showGrid: false,
    splitLine: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
  },
  yAxis: {
    type: 'category',
    data: [''],
    showGrid: false,
    splitLine: {
      show: false,
    },
  },
  series: [
    {
      name: 'One Stars',
      type: 'bar',
      stack: 'total',
      color: '#b85042',
      label: {
        show: true,
      },
      emphasis: {
        focus: 'series',
      },
      data: [],
    },
    {
      name: 'Two Star',
      type: 'bar',
      stack: 'total',
      color: '#cfb845',
      label: {
        show: true,
      },
      emphasis: {
        focus: 'series',
      },
      data: [],
    },
    {
      name: 'Three Star',
      type: 'bar',
      stack: 'total',
      color: '#e1dd72',
      label: {
        show: true,
      },
      emphasis: {
        focus: 'series',
      },
      data: [],
    },
    {
      name: 'Four Star',
      type: 'bar',
      stack: 'total',
      color: '#a8c66c',
      label: {
        show: true,
      },
      emphasis: {
        focus: 'series',
      },
      data: [],
    },
    {
      name: 'Five Star',
      type: 'bar',
      stack: 'total',
      color: '#1b6535',
      label: {
        show: true,
      },
      emphasis: {
        focus: 'series',
      },
      data: [],
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
function generateStarValues(reviews) {
  option.title.subtext = 'Based on ' + reviews.length + ' reviews';
  let distribution = [0, 0, 0, 0, 0];
  for (let i = 0; i < reviews.length; i++) {
    distribution[reviews[i].rating - 1] += 1;
  }

  for (let i = 0; i < option.series.length; i++) {
    if (distribution[i] !== 0) {
      option.series[i].data[0] = distribution[i];
    }
  }
}
export default function StatsDetailedCard({ reviews }) {
  generateStarValues(reviews, option);
  return (
    <ReactECharts
      option={option}
      style={{ height: 150 }}
      onChartReady={onChartReady}
      onEvents={{
        'click': onChartClick,
        'legendselectchanged': onChartLegendselectchanged,
      }}
    />
  );
}
