import { breadcrumbsClasses } from '@mui/material';
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
    scale: false,
  },

  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    textStyle: {
      fontWeight: 'bold',
    },
    formatter: `{c} students attended this course on {b}`,
    borderRadius: 15,
    borderWidth: 8,
  },
  dataZoom: [
    {
      type: 'slider',
      start: 0,
      end: 100,
    },
  ],
  series: [
    {
      data: [156, 178, 134, 145, 167, 167, 156],
      type: 'line',
      symbol: 'none',
      itemStyle: {},
      color: '#568EA6 ',
      areaStyle: {},
      smooth: true,
      avoidLabelOverlap: false,
    },
  ],
};

function getSemesterOrderVal(semester) {
  let order = 0;
  switch (semester) {
    case 'Spring':
      order = 0;
      break;
    case 'Summer':
      order = 1;
      break;
    case 'Fall':
      order = 2;
      break;
    default:
      order = 0;
      break;
  }
  return order;
}

function sortBySemester(trends) {
  trends.sort(function (first, second) {
    let firstSemester = first.semester.split(' ')[0];
    let firstYear = first.semester.split(' ')[1];
    let secondSemester = second.semester.split(' ')[0];
    let secondYear = second.semester.split(' ')[1];

    return (
      getSemesterOrderVal(firstSemester) -
      getSemesterOrderVal(secondSemester) +
      (parseInt(firstYear) - parseInt(secondYear)) * 10
    );
  });
}

function populuateData(trends) {
  option.xAxis.data = [];
  option.series[0].data = [];

  for (let i = 0; i < trends.length; i++) {
    option.xAxis.data.push(trends[i].semester);
    if (trends[i].popularity < 50) {
      option.series[0].data.push(trends[i].popularity + 40);
    } else if (trends[i].popularity > 100) {
      option.series[0].data.push(trends[i].popularity - 50);
    } else {
      option.series[0].data.push(trends[i].popularity);
    }
  }
}

// Visualize the popularity of a course given by reviews
export default function StatsPopularity({ coursePopularity }) {
  sortBySemester(coursePopularity.trends);
  populuateData(coursePopularity.trends);

  return <ReactECharts option={option} style={{ height: 200 }} onEvents={{}} />;
}
