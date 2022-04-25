import ReactECharts from 'echarts-for-react';

let option = {
  grid: {
    top: '10%',
    left: '10%',
    bottom: '20%',
  },
  xAxis: {
    boundaryGap: false,
    splitLine: {
      show: true,
    },

    axisLine: {
      show: true,
    },
    axisLabel: {
      interval: 0,
      show: false,
    },
    type: 'category',
    data: [
      '2020 Spring',
      '2020 Fall',
      '2021 Spring',
      '2021 Fall',
      '2022 Spring',
      '2022 Fall',
      '2023 Spring',
    ],
    show: true,
  },
  yAxis: {
    type: 'value',
    show: false,
    scale: true,
  },
  tooltip: {
    trigger: 'axis',
  },
  series: [
    {
      data: [156, 178, 134, 145, 167, 167, 156],
      type: 'line',
      symbol: 'none',
      itemStyle: {},
      color: '#568EA6 ',
      areaStyle: {},
      sampling: 'average',
      smooth: true,
      avoidLabelOverlap: false,
    },
  ],
};

// Visualize the popularity of a course given by reviews
export default function StatsPopularity({ coursePopularity }) {
  return <ReactECharts option={option} style={{ height: 200 }} onEvents={{}} />;
}
