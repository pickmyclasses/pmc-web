import ReactECharts from 'echarts-for-react';

let option = {
  xAxis: {
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
    show: false,
  },
  yAxis: {
    type: 'value',
    show: false,
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {},
  series: [
    {
      data: [56, 78, 52, 34, 67, 67, 56],
      type: 'line',
      smooth: true,
      showSymbol: false,
      color: '#568EA6 ',
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' },
        ],
      },
    },
  ],
};
// Stats Class Size Visualization with line chart
export default function StatsClassSize({ reviews }) {
  return <ReactECharts option={option} style={{ height: 150 }} onEvents={{}} />;
}
