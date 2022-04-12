import React from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

let professors = [];
let option = {
  title: {
    left: 'center',
    text: 'Average Student Grade by Professors',
  },

  tooltip: {
    trigger: 'axis',
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

export default function StatsDetailedAverage({ reviews, professorRanking, courseLoad }) {
  populateProfessorLabels(professorRanking, reviews);
  console.log(courseLoad);
  return <ReactECharts option={option} style={{ height: 380 }} onEvents={{}} />;
}

const dataset = [
  ['CS 1410', 3.5],
  ['CS 2420', 3.7],
  ['CS 3810', 3.5],
  ['CS 4400', 3.7],
  ['CS 4500', 3.7],
  ['CS 2100', 3.0],
];
