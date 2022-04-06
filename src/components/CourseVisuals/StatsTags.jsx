import ReactECharts from 'echarts-for-react';

let option = {
  series: [
    {
      levels: [
        {
          itemStyle: {
            borderWidth: 3,
            gapWidth: 3,
          },
        },
        {
          color: ['#b85042', '#1b6535'],
          colorMappingBy: 'id',
          itemStyle: {
            gapWidth: 1,
          },
        },
      ],

      breadcrumb: {
        show: false,
      },
      type: 'treemap',
      data: [
        {
          name: 'PostiveTags',
          value: 20,
          children: [
            {
              name: 'Great Lecture',
              value: 10,
              isPos: 1,
            },
            {
              name: 'Great Organization',
              value: 10,
              isPos: 1,
            },
          ],
        },
        {
          name: 'NegativeTags',
          value: 10,
          children: [
            {
              name: 'Heavy Homework',
              value: 10,
              isPos: 0,
            },
            {
              name: 'Heavy Exam',
              value: 10,
              isPos: 0,
            },
          ],
        },
      ],
    },
  ],
};
export default function StatsTags({ reviews }) {
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
