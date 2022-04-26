import ReactECharts from 'echarts-for-react';

let option = {
  title: {
    text: '',
    left: 'left',
    top: 'bottom',
  },

  tooltip: {
    trigger: 'item',
    axisPointer: {
      type: 'shadow',
    },
    textStyle: {
      fontWeight: 'bold',
    },
    formatter: `{c} students received {b} from this course`,
    borderRadius: 15,
    borderWidth: 8,
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
        { value: 80, name: 'E' },
        { value: 80, name: 'F' },
      ],
    },
  ],
};

function resetOption() {
  let dataContent = [
    { value: 0, name: 'A' },
    { value: 0, name: 'B' },
    { value: 0, name: 'C' },
    { value: 0, name: 'D' },
    { value: 0, name: 'E' },
    { value: 0, name: 'F' },
  ];
  option.series[0].data = dataContent;
}

function populateData(reviews) {
  // Reset the value in the chart to '0'
  resetOption();
  // Append the data to the grade distribution
  for (let i = 0; i < reviews.length; i++) {
    let gradeIndex = reviews[i].gradeReceived.charCodeAt(0) - 'A'.charCodeAt(0);
    option.series[0].data[gradeIndex].value += 1;
  }

  let dataContent = [];
  // Create a new array and push the element from the old array only if their values aren't 0.
  for (let i = 0; i < option.series[0].data.length; i++) {
    if (option.series[0].data[i].value !== 0) {
      dataContent.push(option.series[0].data[i]);
    }
  }
  option.series[0].data = dataContent;
}

// Stats Class Size Visualization with line
export default function StatsClassSize({ reviews }) {
  populateData(reviews);

  return <ReactECharts option={option} style={{ height: 200 }} onEvents={{}} />;
}
