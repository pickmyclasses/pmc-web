import { Stack, Typography, Box } from '@mui/material';

import ReactECharts from 'echarts-for-react';

let option = {
  series: [
    {
      breadcrumb: {
        show: false,
      },
      type: 'treemap',
      data: [
        {
          name: 'nodeA',
          value: 20,
          children: [
            {
              name: 'Homework Heavy',
              value: 10,
            },
            {
              name: 'Exam Heavy',
              value: 10,
            },
          ],
        },
        {
          name: 'nodeB',
          value: 10,
          children: [
            {
              name: 'nodeBa',
              value: 20,
              children: [
                {
                  name: 'A-',
                  value: 20,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
export default function statsInfoDump({ reviews }) {
  return (
    // <Stack padding='10px 10px ' spacing='12px'>
    //   <Box padding='8px 8px 4px'>
    //     <Stack>
    //       <Typography variant='subtitle1'>Average Grade A-</Typography>
    //       <Typography variant='subtitle1'>Extra Credit offered</Typography>
    //       <Typography variant='subtitle1'>Exam Heavy</Typography>
    //       <Typography variant='subtitle1'>Homework Heavy</Typography>
    //     </Stack>
    //   </Box>
    // </Stack>
    <ReactECharts option={option} style={{ height: 150 }} onEvents={{}} />
  );
}
