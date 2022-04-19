import ReactECharts from 'echarts-for-react';

let option = {
  title: {
    text: '',
    left: 'left',
    top: 'bottom',
  },

  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}%',
  },

  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['A', 'B', 'C', 'D'],
  },
  series: [
    {
      color: ['#568EA6', '#F1D1B5', '#F0B7A4', '#F18C8E'],

      name: 'Pyramid',
      type: 'funnel',
      width: '60%',
      height: '85%',
      left: '25%',
      top: '5%',
      sort: 'ascending',
      data: [
        { value: 60, name: 'A' },
        { value: 30, name: 'B' },
        { value: 10, name: 'C' },
        { value: 80, name: 'D' },
      ],
    },
  ],
};

function populateData(reviews) {
  for (let i = 0; i < reviews.length; i++) {}
}

// Stats Class Size Visualization with line
export default function StatsClassSize({ reviews }) {
  populateData(reviews);
  return <ReactECharts option={option} style={{ height: 200 }} onEvents={{}} />;
}
