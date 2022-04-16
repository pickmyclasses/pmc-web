import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Typography } from '@mui/material';

let option = {
  title: {
    left: 'center',
    text: 'Average Student Grade by Professors',
  },

  tooltip: {
    trigger: 'axis',
    confine: true,
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '5%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      data: [],
      axisTick: {
        alignWithLabel: true,
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      max: 4,
    },
  ],
  series: [
    {
      name: 'Average Grade',
      type: 'bar',
      barWidth: '40%',
      data: [],
    },
  ],
};

function populateProfessorLabels(professorRanking, reviews) {
  option.xAxis[0].data = [];
  option.series[0].data = [];

  for (let i = 0; i < professorRanking.length; i++) {
    option.xAxis[0].data.push(professorRanking[i].name);
    option.series[0].data.push(professorRanking[i].rating);
  }
}

// Visualize the detailed average grade
export default function StatsDetailedAverage({ reviews, professorRanking, courseLoad }) {
  populateProfessorLabels(professorRanking, reviews);
  <Typography variant='subtitle2' align='left' sx={{}}>
    Exam Heavy
  </Typography>;
  return <ReactECharts option={option} style={{ height: 380 }} onEvents={{}} />;
}
