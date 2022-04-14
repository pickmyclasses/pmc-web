import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { Typography, Box } from '@mui/material';
import { pluralize } from '../../utils';
const colorPalette = ['#F18C8E', '#F0B7A4', '#F1D1B5', '#568EA6', '#305F72'];
let option = {
  title: {
    text: '',
    subtext: '',
    x: 'center',
  },

  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c} ({d}%)',
  },

  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['One Stars', 'Two Stars', 'Three Stars', 'Four Stars', 'Five Stars'],
  },
  series: [
    {
      label: {
        show: false,
      },
      name: 'Distribution',
      type: 'pie',
      radius: '90%',
      center: ['60%', '48%'],

      emphasis: {
        label: {
          show: false,
        },
      },
      data: [
        { value: 0, name: 'One Stars' },
        { value: 0, name: 'Two Stars' },
        { value: 0, name: 'Three Stars' },
        { value: 0, name: 'Four Stars' },
        { value: 0, name: 'Five Stars' },
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
      color: colorPalette,
    },
  ],
};

function generateStarValues(reviews, option) {
  for (let i = 0; i < reviews.length; i++) {
    option.series[0].data[reviews[i].rating - 1].value += 1;
  }
}
export default function ReviewPieChart({ reviews }) {
  const [count, setCount] = useState(0);

  generateStarValues(reviews, option);

  return (
    <Box flex={1}>
      <Typography variant='subtitle2'>Rating Distribution</Typography>
      <Typography variant='body2' align='left' fontStyle='italic' sx={{ opacity: 0.75 }}>
        {reviews.length ? `Based on ${pluralize(reviews.length, 'review')}` : 'No reviews'}
      </Typography>
      <ReactECharts option={option} style={{ height: 170 }} />
    </Box>
  );
}
