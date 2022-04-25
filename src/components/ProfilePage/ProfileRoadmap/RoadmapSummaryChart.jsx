import { colors } from '@mui/material';
import Color from 'color';
import EChartsReact from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
import HistoryBreakdownChart from '../ProfileHistory/HistoryBreakdownChart';

export default function RoadmapSummaryChart({
  requirements,
  requirementProgressByID,
  onRequirementClick,
  hideTransitions = false,
}) {
  const getChartOptions = (data, style) => ({
    series: {
      data: data.map(getSeriesData),
      type: 'sunburst',
      radius: ['25%', '100%'],
      nodeClick: false,
    },
    color: chartBarColors,
    tooltip: { confine: true },
  });

  const getSeriesData = (requirement) => {
    const { completed, total } = requirementProgressByID?.[requirement.id] || {};
    return {
      id: requirement.id,
      name: requirement.setName,
      value: requirement.subSets?.length ? undefined : requirement.courseNeeded,
      children: requirement.subSets?.length
        ? requirement.subSets.map(getSeriesData)
        : undefined,
      label: { fontSize: 0 },
      itemStyle: {
        borderWidth: 2,
        borderRadius: 4,
        color: completed === 0 ? colors.grey[500] : undefined,
        opacity: completed < total ? 0.33 : undefined,
      },
    };
  };

  const handleChartItemClick = (target) => onRequirementClick(target.data.id);

  return (
    <EChartsReact
      option={getChartOptions(requirements, { hideTransitions })}
      style={{ height: '100%' }}
      opts={{ renderer: 'svg' }}
      onEvents={{ click: handleChartItemClick }}
    />
  );
}

const chartBarColors = [
  colors.green,
  colors.blue,
  colors.purple,
  colors.deepOrange,
  colors.cyan,
  colors.brown,
].map((color) => color[900]);
