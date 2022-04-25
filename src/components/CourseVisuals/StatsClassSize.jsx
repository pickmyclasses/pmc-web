import ReactECharts from 'echarts-for-react';

let option = {
  title: {
    text: '',
    left: 'left',
    top: 'bottom',
  },

  tooltip: {
    trigger: 'item',
    formatter: '{b} received : {c}',
  },

  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['A', 'B', 'C', 'D'],
  },
  series: [
    {
      color: ['#568EA6', '#F1D1B5', '#F0B7A4', '#F18C8E'],

      name: '',
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
  // Reset the value in the chart to '0'
  for (let i = 0; i < option.series[0].data.length; i++) {
    option.series[0].data[i].value = 0;
  }
  // Append the data to the grade distribution
  for (let i = 0; i < reviews.length; i++) {
    let gradeIndex = reviews[i].gradeReceived.charCodeAt(0) - 'A'.charCodeAt(0);
    option.series[0].data[gradeIndex].value += 1;
  }

  // Remove the items if their values are 0
  for (let i = 0; i < option.series[0].data.length; i++) {
    if (option.series[0].data[i].value === 0) {
      option.series[0].data.splice(i, i + 1);
    }
  }
}

// Stats Class Size Visualization with line
export default function StatsClassSize({ reviews }) {
  populateData(reviews);
  return <ReactECharts option={option} style={{ height: 200 }} onEvents={{}} />;
}
