import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import Stack from '@mui/material/Stack';
import { Typography, Box } from '@mui/material';

let optionExam = {
  color: ['#aed6dc', '#ff9a8d'],
  title: {
    text: '',
    subtext: '',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
    },
  },
  legend: { bottom: 1 },
  grid: {
    top: '20%',
    left: '4%',
    bottom: '15%',
  },
  yAxis: {
    type: 'value',
    showGrid: false,
    show: false,
  },
  xAxis: {
    show: false,
    type: 'category',
    data: [''],
  },
  series: [
    {
      barWidth: '50%',
      name: 'Yes',
      type: 'bar',
      stack: 'total',
      color: '#aed6dc',
      label: {
        show: false,
      },
      emphasis: {
        focus: 'series',
      },
      data: [],
    },
    {
      name: 'No',
      type: 'bar',
      stack: 'total',
      color: '#ff9a8d',
      label: {
        show: false,
      },
      emphasis: {
        focus: 'series',
      },
      data: [],
    },
  ],
};

let optionHomework = {
  color: ['#aed6dc', '#ff9a8d'],
  title: {
    text: '',
    subtext: '',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
    },
  },
  legend: { bottom: 1 },
  grid: {
    top: '20%',
    left: '4%',
    bottom: '15%',
  },
  yAxis: {
    type: 'value',
    showGrid: false,
    show: false,
  },
  xAxis: {
    show: false,
    type: 'category',
    data: [''],
  },
  series: [
    {
      barWidth: '50%',
      name: 'Yes',
      type: 'bar',
      stack: 'total',
      color: '#aed6dc',
      label: {
        show: false,
      },
      emphasis: {
        focus: 'series',
      },
      data: [],
    },
    {
      name: 'No',
      type: 'bar',
      stack: 'total',
      color: '#ff9a8d',
      label: {
        show: false,
      },
      emphasis: {
        focus: 'series',
      },
      data: [],
    },
  ],
};
let optionRecommend = {
  color: ['#aed6dc', '#ff9a8d'],
  title: {
    text: '',
    subtext: '',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
    },
  },
  legend: { bottom: 1 },
  grid: {
    top: '20%',
    left: '4%',
    bottom: '15%',
  },
  yAxis: {
    type: 'value',
    showGrid: false,
    show: false,
  },
  xAxis: {
    show: false,
    type: 'category',
    data: [''],
  },
  series: [
    {
      barWidth: '50%',
      name: 'Yes',
      type: 'bar',
      stack: 'total',
      color: '#aed6dc',
      label: {
        show: false,
      },
      emphasis: {
        focus: 'series',
      },
      data: [],
    },
    {
      name: 'No',
      type: 'bar',
      stack: 'total',
      color: '#ff9a8d',
      label: {
        show: false,
      },
      emphasis: {
        focus: 'series',
      },
      data: [],
    },
  ],
};

function generateExamHeavy(reviews) {
  optionExam.series[0].title = 'Yes';
  optionExam.series[1].title = 'No';
  optionExam.series[0].data[0] = 0;
  optionExam.series[1].data[0] = 0;
  optionExam.series[0].color = '#568EA6';
  optionExam.series[1].color = '#F18C8E';
  for (let i = 0; i < reviews.length; i++) {
    if (reviews[i].isExamHeavy) {
      optionExam.series[0].data[0] += 1;
    } else {
      optionExam.series[1].data[0] += 1;
    }
  }
}

function generateHomeworkHeavy(reviews) {
  optionHomework.series[0].title = 'Yes';
  optionHomework.series[1].title = 'No';
  optionHomework.series[0].data[0] = 0;
  optionHomework.series[1].data[0] = 0;
  optionHomework.series[0].color = '#568EA6';
  optionHomework.series[1].color = '#F18C8E';
  for (let i = 0; i < reviews.length; i++) {
    if (reviews[i].isHomeworkHeavy) {
      optionHomework.series[0].data[0] += 1;
    } else {
      optionHomework.series[1].data[0] += 1;
    }
  }
}

function generateRecommendation(reviews) {
  optionRecommend.series[0].title = 'Yes';
  optionRecommend.series[1].title = 'No';
  optionRecommend.series[0].data[0] = 0;
  optionRecommend.series[1].data[0] = 0;
  optionRecommend.series[0].color = '#568EA6';
  optionRecommend.series[1].color = '#F18C8E';
  for (let i = 0; i < reviews.length; i++) {
    if (reviews[i].isHomeworkHeavy) {
      optionRecommend.series[0].data[0] += 1;
    } else {
      optionRecommend.series[1].data[0] += 1;
    }
  }
}

export default function StatsWorkLoad({ reviews }) {
  generateExamHeavy(reviews);
  generateHomeworkHeavy(reviews);
  generateRecommendation(reviews);

  return (
    <Stack direction='row' spacing={1}>
      <Box flex={1}>
        <Typography
          variant='subtitle2'
          align='center'
          sx={{ marginLeft: '-28px', marginBottom: '-25px' }}
        >
          Exam Heavy
        </Typography>
        <ReactECharts option={optionExam} style={{ height: 200, width: 200 }} />
      </Box>
      <Box flex={1}>
        <Typography
          variant='subtitle2'
          align='center'
          sx={{ marginLeft: '-28px', marginBottom: '-25px' }}
        >
          Homework Heavy
        </Typography>
        <ReactECharts option={optionHomework} style={{ height: 200, width: 200 }} />
      </Box>
      <Box flex={1}>
        <Typography
          variant='subtitle2'
          align='center'
          sx={{ marginLeft: '-28px', marginBottom: '-25px' }}
        >
          Recommendation
        </Typography>
        <ReactECharts option={optionRecommend} style={{ height: 200, width: 200 }} />
      </Box>
    </Stack>
  );
}
