import React from 'react';
import ReactECharts from 'echarts-for-react';
import Stack from '@mui/material/Stack';
import { Typography, Box } from '@mui/material';

let optionExam = {
  title: {
    text: '',
    subtext: '',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    axisPointer: {
      type: 'shadow',
    },
    textStyle: {
      fontWeight: 'bold',
    },
    formatter: `{c} students give this question a {a}`,
    borderRadius: 15,
    borderWidth: 8,
  },
  legend: { show: false },

  grid: {
    top: '-33%',
    left: '5%',
    right: '5%',
    bottom: '33%',
  },
  xAxis: {
    type: 'value',
    showGrid: false,
    show: false,
  },
  yAxis: {
    show: false,
    type: 'category',
    data: [''],
  },
  series: [
    {
      barWidth: '100%',
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
  title: {
    text: '',
    subtext: '',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    axisPointer: {
      type: 'shadow',
    },
    textStyle: {
      fontWeight: 'bold',
    },
    formatter: `{c} students give this question a {a}`,
    borderRadius: 15,
    borderWidth: 8,
  },
  legend: { show: false },
  grid: {
    top: '-33%',
    left: '5%',
    right: '5%',
    bottom: '33%',
  },
  xAxis: {
    type: 'value',
    showGrid: false,
    show: false,
  },
  yAxis: {
    show: false,
    type: 'category',
    data: [''],
  },
  series: [
    {
      barWidth: '100%',
      name: 'yes',
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
      name: 'no',
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
  title: {
    text: '',
    subtext: '',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    axisPointer: {
      type: 'shadow',
    },
    textStyle: {
      fontWeight: 'bold',
    },
    formatter: `{c} students give this question a {a}`,
    borderRadius: 15,
    borderWidth: 8,
  },
  legend: { show: false },
  grid: {
    top: '-33%',
    left: '5%',
    right: '5%',
    bottom: '33%',
  },
  xAxis: {
    type: 'value',
    showGrid: false,
    show: false,
  },
  yAxis: {
    show: false,
    type: 'category',
    data: [''],
  },
  series: [
    {
      barWidth: '100%',
      name: 'yes',
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
      name: 'no',
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
  optionExam.series[0].title = 'yes';
  optionExam.series[1].title = 'no';
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
  optionHomework.series[0].title = 'yes';
  optionHomework.series[1].title = 'no';
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
  optionRecommend.series[0].title = 'yes';
  optionRecommend.series[1].title = 'no';
  optionRecommend.series[0].data[0] = 0;
  optionRecommend.series[1].data[0] = 0;

  for (let i = 0; i < reviews.length; i++) {
    if (reviews[i].recommended) {
      optionRecommend.series[0].data[0] += 1;
    } else {
      optionRecommend.series[1].data[0] += 1;
    }
  }
}

//Visualize the work load based on a reviews
export default function StatsWorkLoad({ reviews }) {
  generateExamHeavy(reviews);
  generateHomeworkHeavy(reviews);
  generateRecommendation(reviews);

  return (
    <Box>
      <Typography variant='subtitle2'>Course Load</Typography>
      <Stack direction='column' spacing={1}>
        <Box flex={1}>
          <Typography
            variant='body2'
            fontStyle='italic'
            sx={{ opacity: 0.75, marginLeft: 3 }}
            align='left'
          >
            Exam Heavy
          </Typography>
          <ReactECharts option={optionExam} style={{ height: '33%', width: '100%' }} />
        </Box>
        <Box flex={1}>
          <Typography
            variant='body2'
            fontStyle='italic'
            sx={{ opacity: 0.75, marginLeft: 3 }}
            align='left'
          >
            {' '}
            Homework Heavy
          </Typography>
          <ReactECharts option={optionHomework} style={{ height: '33%', width: '100%' }} />
        </Box>
        <Box flex={1}>
          <Typography
            variant='body2'
            fontStyle='italic'
            sx={{ opacity: 0.75, marginLeft: 3 }}
            align='left'
          >
            {' '}
            Recommendation
          </Typography>
          <ReactECharts option={optionRecommend} style={{ height: '33%', width: '100%' }} />
        </Box>
      </Stack>
    </Box>
  );
}
