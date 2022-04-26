import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Typography, Box } from '@mui/material';

let option = {
  title: {
    left: '',
    text: '',
  },

  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    textStyle: {
      fontWeight: 'bold',
    },
    formatter: `The Average Grade for Professor {b} is {c}`,
    borderRadius: 15,
    borderWidth: 8,
  },
  grid: {
    left: '10%',
    right: '10%',
    bottom: '20%',
    containLabel: true,
  },

  xAxis: [
    {
      type: 'category',
      data: [],
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
    },
  ],
  yAxis: [
    {
      show: false,
      type: 'category',
      data: ['D', 'D+', 'C-', 'C', 'C+', 'B-', 'B', 'B+', 'A-', 'A'],
      axisLabel: {
        fontSize: 14,
        align: 'right',
      },
    },
  ],
  series: [
    {
      name: 'Average Grade',
      type: 'scatter',
      data: [],
      symbolSize: 25,
      color: '#F18C8E',
    },
  ],
};
function generateLetterGrade(value) {
  if (value >= (3.7 + 4) / 2) return 'A';
  if (value >= (3.3 + 3.7) / 2) return 'A-';
  if (value >= (3 + 3.3) / 2) return 'B+';
  if (value >= (2.7 + 3) / 2) return 'B';
  if (value >= (2.3 + 2.7) / 2) return 'B-';
  if (value >= (2 + 2.3) / 2) return 'C+';
  if (value >= (1.7 + 2) / 2) return 'C';
  if (value >= (1.3 + 1.7) / 2) return 'C-';
  if (value >= (1 + 1.3) / 2) return 'D+';
  if (value >= (0.7 + 1) / 2) return 'D';
  return 'F';
}
function populateProfessorLabels(professorRanking, reviews) {
  option.xAxis[0].data = [];
  option.series[0].data = [];
  for (let i = 0; i < professorRanking.length; i++) {
    option.xAxis[0].data.push(professorRanking[i].name);
    option.series[0].data.push(generateLetterGrade(professorRanking[i].grade));
  }
}

// Average Grades with respect to professors
export default function StatsDetailedProfessor({ reviews, professorRanking }) {
  populateProfessorLabels(professorRanking, reviews);
  return (
    <Box>
      <Typography variant='subtitle2'>Average Grades / Professors</Typography>
      <ReactECharts option={option} style={{ height: '200px' }} onEvents={{}} />
    </Box>
  );
}
