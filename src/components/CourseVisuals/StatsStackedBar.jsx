import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { Typography, Box } from '@mui/material';
import { pluralize } from '../../utils';

let option = {
  color: ['#1E1F26', '#cfb845', '#e1dd72', '#a8c66c', '#1b6535'],
  title: {
    text: '',
    subtext: '',
  },
  tooltip: {
    trigger: 'axis',
    marginTop: '5%',
    axisPointer: {
      type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
    },
  },

  legend: { orient: 'vertical', left: 0, top: 'center' },
  grid: {
    top: '10%',
    left: '25%',
    bottom: '0%',
  },
  xAxis: {
    type: 'value',
    showGrid: false,
    show: false,
  },
  yAxis: {
    show: false,
    type: 'category',
    data: [''],
  },
  series: [
    {
      name: 'One Stars',
      type: 'bar',
      stack: 'total',
      color: '#F18C8E ',
      label: {
        show: false,
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
      color: '#F0B7A4 ',
      label: {
        show: false,
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
      color: '#F1D1B5 ',

      label: {
        show: false,
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
      color: '#568EA6 ',
      label: {
        show: false,
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
      color: '#305F72',

      label: {
        show: false,
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

export default function StatsStackedBar({ reviews }) {
  generateStarValues(reviews, option);

  // 'Based on ' + reviews.length + ' reviews'
  return (
    <Box flex={1}>
      <Typography variant='subtitle2'>Rating Distribution</Typography>
      <Typography variant='body2' align='left' fontStyle='italic' sx={{ opacity: 0.75 }}>
        {reviews.length ? `Based on ${pluralize(reviews.length, 'review')}` : 'No reviews'}
      </Typography>
      <ReactECharts
        option={option}
        style={{ height: 150, width: 450 }}
        onChartReady={onChartReady}
        onEvents={{
          'click': onChartClick,
          'legendselectchanged': onChartLegendselectchanged,
        }}
      />
    </Box>
  );
}
