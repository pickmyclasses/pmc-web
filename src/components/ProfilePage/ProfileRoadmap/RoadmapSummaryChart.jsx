import EChartsReact from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
import HistoryBreakdownChart from '../ProfileHistory/HistoryBreakdownChart';

export default function RoadmapSummaryChart({
  requirements,
  expandedRequirements,
  onExpandedRequirementsChange,
  hideTransitions = false,
}) {
  const [chartData, setChartData] = useState([]);

  // return <HistoryBreakdownChart historyBreakdown={requirements} style={{ height: '100%' }} />;

  const handleChartItemClick = (target) => {
    // const { requirement } = target.data.target;
    // onExpandedRequirementsChange(
    //   expandedRequirements?.id === requirement.id ? null : requirement
    // );
    // onExpandedRequirementsChange({ ...target });
    // setChartData([]);
  };

  // const handleChartItemClick = (target) => {
  //   // if (target.data.name === expandedRequirements[expandedRequirements.length - 1]?.name)
  //   //   // Clicked on expanded item; deselect.
  //   //   return void onExpandedRequirementsChange(expandedRequirements.slice(0, -1));

  //   // // Reconstruct the path to the requirement represented by the clicked item.
  //   // let newExpandedRequirements = [{ subSets: requirements }];
  //   // for (let i = 1; i < target.treePathInfo; i++)
  //   //   newExpandedRequirements.push(
  //   //     newExpandedRequirements[i - 1].subSets.find(
  //   //       (x) => x.name === target.treePathInfo[i].name
  //   //     )
  //   //   );
  //   // onExpandedRequirementsChange(newExpandedRequirements.slice(1));
  //   onExpandedRequirementsChange(expandedRequirements.concat());
  // };

  return (
    <EChartsReact
      option={getChartOptions(requirements, { hideTransitions })}
      notMerge
      style={{ height: '100%' }}
      opts={{ renderer: 'svg' }}
      onEvents={{ click: handleChartItemClick }}
    />
  );
}

// const getChartOptions = (data, style) => ({
//   series: data.map((x, i) => getSeriesItem(i, x, style)),
// });

// const getSeriesItem = (
//   i,
//   { visible, title, completed, inProgress, toGo, value },
//   { hideTransitions }
// ) => ({
//   name: title,
//   type: 'pie',
//   tooltip: { show: i % 4 < 3 },
//   emphasis: { disabled: i % 4 > 1 },
//   itemStyle: {
//     opacity: visible ? (3 - (i % 4)) / 3 : 0,
//     borderRadius: getBorderRadius(completed, inProgress, toGo, i),
//   },
//   animationDurationUpdate: hideTransitions ? 0 : undefined,
// });

// const getBorderRadius = (completed, inProgress, toGo, i) => {
//   const leftRadius =
//     4 * +(i % 4 === 0 || (i % 4 === 1 && !completed) || (!completed && !inProgress));
//   const rightRadius = 4 * +(i % 4 === 2 || (i % 4 === 1 && !toGo) || (!toGo && !inProgress));
//   return [leftRadius, rightRadius, leftRadius, rightRadius];
// };

const getRootRequirement = (target, requirements) =>
  target.rootSetID ? requirements.find((x) => x.id === target.rootSetID) : target.id;

const getChartOptions = (data, style) => $option;
const $getChartOptions = (data, style) => ({
  series: {
    data: data.map(getSeriesData),
    type: 'sunburst',
    radius: ['37.5%', '100%'],
    // nodeClick: false,
  },
  tooltip: {},
});

const getSeriesData = (requirement) => ({
  name: requirement.setName,
  value: requirement.subSets?.length ? undefined : requirement.courseNeeded,
  children: requirement.subSets?.length ? requirement.subSets.map(getSeriesData) : undefined,
  itemStyle: {
    borderRadius: [0, 4, 16, 64],
  },
});

var $data = [
  {
    name: 'Grandpa',
    children: [
      {
        name: 'Uncle Leo',
        value: 12,
        children: [
          {
            name: 'Cousin Jack',
            value: 2,
          },
          {
            name: 'Cousin Mary',
            value: 5,
            children: [
              {
                name: 'Jackson',
                value: 2,
              },
            ],
          },
          {
            name: 'Cousin Ben',
            value: 4,
          },
        ],
      },
      {
        name: 'Father',
        value: 10,
        children: [
          {
            name: 'Me',
            value: 5,
          },
          {
            name: 'Brother Peter',
            value: 1,
          },
        ],
      },
    ],
  },
  {
    name: 'Nancy',
    children: [
      {
        name: 'Uncle Nike',
        children: [
          {
            name: 'Cousin Betty',
            value: 1,
          },
          {
            name: 'Cousin Jenny',
            value: 2,
          },
        ],
      },
    ],
  },
];
const $option = {
  series: {
    type: 'sunburst',
    data: $data,
    radius: [60, '90%'],
    itemStyle: {
      borderRadius: 7,
      borderWidth: 2,
    },
    label: {
      show: false,
    },
  },
};
