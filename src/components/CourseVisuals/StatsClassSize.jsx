import ReactECharts from 'echarts-for-react';

const gaugeData = [
  {
    value: 54,
    name: '',
    title: {
      offsetCenter: ['0%', '0%'],
    },
    detail: {
      valueAnimation: true,
      offsetCenter: ['0%', '0%'],
    },
  },
];
let option = {
  series: [
    {
      type: 'gauge',
      startAngle: 90,
      endAngle: -270,
      pointer: {
        show: false,
      },
      progress: {
        show: true,
        overlap: false,
        roundCap: true,
        clip: false,
        itemStyle: {
          borderWidth: 1,
          borderColor: '#464646',
        },
      },
      axisLine: {
        lineStyle: {
          width: 10,
        },
      },
      splitLine: {
        show: false,
        distance: 0,
        length: 10,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
        distance: 50,
      },
      data: gaugeData,
      title: {
        fontSize: 14,
      },
      detail: {
        width: 20,
        height: 14,
        fontSize: 14,
        color: 'auto',
        borderColor: 'auto',
        borderRadius: 20,
        borderWidth: 1,
        formatter: '{value}',
      },
    },
  ],
};
export default function StatsClassSize({ reviews }) {
  return <ReactECharts option={option} style={{ height: 150 }} onEvents={{}} />;
}
