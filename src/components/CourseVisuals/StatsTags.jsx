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
function populateCourseTags(tags) {
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

export default function StatsTags({ tags }) {
  populateCourseTags(tags);
  return <ReactECharts option={option} style={{ height: 150 }} onEvents={{}} />;
}
