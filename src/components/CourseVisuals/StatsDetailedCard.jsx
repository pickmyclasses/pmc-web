import React from 'react';
import ReactECharts from 'echarts-for-react';
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
      end: 100,
    },
    {
      start: 0,
      end: 100,
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
  // Clear out the data from both the variables and also the option so that its not pushing duplicate data
  option.xAxis.data = [];
  option.series[0].data = [];
  semesters = [];
  ratings = [];
  for (let i = 0; i < courseTrend.length; i++) {
    semesters.push(courseTrend[i].semesterName);
    ratings.push(courseTrend[i].rating);
  }
  option.xAxis.data = semesters;
  option.series[0].data = ratings;
}

function getSeasonVal(season) {
  switch (season) {
    case 'Spring':
      return 0;
    case 'Summer':
      return 1;
    case 'Fall':
      return 2;
    default:
      return 0;
  }
}

// Sort by the year and then the semester
// aStr[0] and bStr[0] are the year
function sortDataset(courseTrend) {
  courseTrend.sort((a, b) => {
    let aStr = a.semesterName.split(' ');
    let bStr = b.semesterName.split(' ');
    let aSeason = getSeasonVal(aStr[0]);
    let bSeason = getSeasonVal(bStr[0]);
    return parseInt(aStr[1] - bStr[1]) * 100000 + (aSeason - bSeason);
  });
}

export default function StatsDetailedCard({ courseTrend }) {
  sortDataset(courseTrend);
  populateDataset(courseTrend);
  return <ReactECharts option={option} style={{ height: 380 }} onEvents={{}} />;
}
