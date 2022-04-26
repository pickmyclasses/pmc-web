import { colors } from '@mui/material';
import EChartsReact from 'echarts-for-react';
import React, { memo } from 'react';
import { pluralize } from 'utils';

const RoadmapSummaryChart = ({
  requirements,
  requirementProgressByID,
  onRequirementClick,
  hideTransitions = false,
}) => {
  const getChartOptions = (data) => ({
    series: {
      data: data.map(getSeriesData),
      type: 'sunburst',
      radius: ['33.3%', '100%'],
      sort: null,
      nodeClick: false,
    },
    color: chartBarColors,
    textStyle: { fontFamily: 'Roboto' },
    tooltip: {
      formatter: ({ data }) => formatTooltipText(data.requirement),
      zIndex: 1002,
      z: 1002,
      borderColor: '#ccc',
      transitionDuration: 0.25,
      hideDelay: 0,
      position: [0, '100%'],
      padding: [8, 16],
      textStyle: { fontSize: 16, lineHeight: 24, color: 'black' },
      extraCssText: 'margin-top: 16px; margin-left: 16px; width: calc(100% - 64px);',
    },
  });

  const getSeriesData = (requirement) => {
    const { completed, total } = requirementProgressByID?.[requirement.id] || {};
    return {
      requirement,
      name: requirement.id,
      value: requirement.subSets?.length ? undefined : requirement.courseNeeded,
      children: requirement.subSets?.length
        ? requirement.subSets.map(getSeriesData)
        : undefined,
      label: { fontSize: 0 },

      itemStyle: {
        borderWidth: 3,
        borderRadius: 4,
        color: completed === 0 ? colors.grey[500] : undefined,
        opacity: completed < total ? 0.33 : undefined,
      },
    };
  };

  const formatTooltipText = (requirement) => {
    const { completed, total } = requirementProgressByID?.[requirement.id] || {};

    return [
      '<div style="text-align: center; white-space: normal;">',
      `  <b style="font-weight: 500;">${requirement.setName}</b>`,
      '  <br />',
      '  <span style="font-size: 0.75rem; opacity: 0.75;">',
      `    ${completed >= total ? '✅ Completed' : '⌛ In progress'}`,
      '  </span>',
      '  <br />',
      `  ${Math.min(completed, total)}/${pluralize(total, 'course')} taken`,
      '</div>',
    ]
      .filter(Boolean)
      .join('');
  };

  const handleChartItemClick = (target) =>
    onRequirementClick(target.treePathInfo.slice(1).map(({ name }) => +name));

  return (
    <EChartsReact
      option={getChartOptions(requirements, { hideTransitions })}
      style={{ height: '100%' }}
      opts={{ renderer: 'svg' }}
      onEvents={{ click: handleChartItemClick }}
    />
  );
};

const chartBarColors = [
  colors.brown,
  colors.green,
  colors.blue,
  colors.purple,
  colors.deepOrange,
  colors.cyan,
].map((color) => color[800]);

// Memoize to prevent the stupid EChart from flashing due to rerendering.
export default memo(
  RoadmapSummaryChart,
  (x, y) => x.requirementProgressByID === y.requirementProgressByID
);
