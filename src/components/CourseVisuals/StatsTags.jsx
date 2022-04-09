import ReactECharts from 'echarts-for-react';

let option = {
  tooltip: {
    trigger: 'item',
    formatter: `{b} {c} times`,
  },
  series: [
    {
      levels: [
        {
          // itemStyle: {
          //   borderWidth: 3,
          //   gapWidth: 3,
          // },
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
          value: 10,
          children: [
            // {
            //   name: 'Great Lecture',
            //   value: 10,
            //   isPos: 1,
            // },
            // {
            //   name: 'Great Organization',
            //   value: 10,
            //   isPos: 1,
            // },
          ],
        },
        {
          name: 'NegativeTags',
          value: 10,
          children: [
            // {
            //   name: 'Heavy Homework',
            //   value: 10,
            //   isPos: 0,
            // },
            // {
            //   name: 'Heavy Exam',
            //   value: 10,
            //   isPos: 0,
            // },
          ],
        },
      ],
    },
  ],
};
function populateCourseTags(hasChangedCourse, tags) {
  if (hasChangedCourse) {
    option.series[0].data[0].children = [];
    option.series[0].data[1].children = [];
    for (let i = 0; i < (tags.length > 5 ? 5 : tags.length); i++) {
      // Negative
      if (tags[i].type === 0) {
        option.series[0].data[1].children.push({
          name: tags[i].name,
          value: tags[i].voteCount,
          isPos: 0,
        });
        // Positive
      } else {
        option.series[0].data[0].children.push({
          name: tags[i].name,
          value: tags[i].voteCount,
          isPos: 1,
        });
      }
    }
  }
}

export default function StatsTags({ hasChangedCourse, tags }) {
  populateCourseTags(hasChangedCourse, tags);
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
