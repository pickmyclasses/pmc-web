import ReactECharts from 'echarts-for-react';

let option = {
  tooltip: {
    trigger: 'item',
    axisPointer: {
      type: 'shadow',
    },
    textStyle: {
      fontWeight: 'bold',
    },
    formatter: `Students mentioned {b} {c} times`,
    borderRadius: 15,
    borderWidth: 8,
  },
  series: [
    {
      roam: false,
      levels: [
        {
          // itemStyle: {
          //   borderWidth: 3,
          //   gapWidth: 3,
          // },
        },
        {
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
          name: 'Positive Tags',
          type: 'treemap',
          visibleMin: 300,
          color: ['#568EA6 '],

          label: {
            show: true,
            formatter: '{b}',
          },
          upperLabel: {
            show: true,
            height: 20,
            color: '#fff',
          },
          itemStyle: {
            borderWidth: 3,
            borderColor: '#305F72',
            gapWidth: 3,
          },
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
          name: 'Negative Tags',
          type: 'treemap',
          visibleMin: 300,
          color: ['#F0B7A4'],

          label: {
            show: true,
            formatter: '{b}',
          },
          upperLabel: {
            show: true,
            height: 20,
            color: '#fff',
          },
          itemStyle: {
            borderWidth: 3,
            borderColor: '#F18C8E',
            gapWidth: 3,
          },
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

// Visualze the stats tags with a tree map
export default function StatsTags({ tags }) {
  populateCourseTags(tags);
  return <ReactECharts option={option} style={{ height: 200 }} onEvents={{}} />;
}
