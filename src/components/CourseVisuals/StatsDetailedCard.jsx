import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import Box from '@mui/material/Box';
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import * as echarts from 'echarts';

let ratings = [];
let semesters = [];
let option = {
  tooltip: {
    trigger: 'axis',
    position: function (pt) {
      return [pt[0], '10%'];
    },
  },
  title: {
    left: 'center',
    text: 'Overall Rating By Semesters',
  },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: 'none',
      },
      restore: {},
      saveAsImage: {},
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: semesters,
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%'],
    max: 5,
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 10,
    },
    {
      start: 0,
      end: 10,
    },
  ],
  series: [
    {
      name: 'Average Ratings',
      type: 'line',
      symbol: 'none',
      sampling: 'lttb',
      itemStyle: {
        color: 'rgb(255, 70, 131)',
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 1,
            color: 'rgb(237, 41, 56)',
          },
          {
            offset: 0.75,
            color: 'rgb(178, 95, 74)',
          },
          {
            offset: 0.5,
            color: 'rgb(119, 148, 92)',
          },
          {
            offset: 0.25,
            color: 'rgb(59, 202, 109)',
          },
          {
            offset: 0,
            color: 'rgb(0, 255, 127)',
          },
        ]),
      },
      data: ratings,
      smooth: true,
    },
  ],
};

function populateDataset(courseTrend) {
  for (let i = 0; i < courseTrend.length; i++) {
    semesters.push(courseTrend[i].semesterName);
    ratings.push(courseTrend[i].rating);
  }
}

function onChartLegendselectchanged(param, echarts) {
  //console.log(param, echarts);
}
function onChartReady(echarts) {
  //console.log('echarts is ready', echarts);
}
function onChartClick(param, echarts) {
  //console.log(param, echarts);
}

function generateStackBars(reviews) {
  // name: 'Direct',
  // type: 'bar',
  // stack: 'total',
  // label: {
  //   show: true,
  // },
  // emphasis: {
  //   focus: 'series',
  // },
  // data: [320, 302, 301, 334, 390, 330, 320],
  console.log(option.series[0]);
}
function generateStarValues(reviews) {}
export default function StatsDetailedCard({
  ratingCondition,
  setRatingCondition,
  courseTrend,
}) {
  if (ratingCondition) {
    populateDataset(courseTrend);
    setRatingCondition(!ratingCondition);
  }
  return (
    <ReactECharts
      option={option}
      style={{ height: 380 }}
      onChartReady={onChartReady}
      onEvents={{
        'click': onChartClick,
        'legendselectchanged': onChartLegendselectchanged,
      }}
    />
  );
}
