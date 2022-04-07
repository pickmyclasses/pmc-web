import { colors } from '@mui/material';
import EChartsReact from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
import { pluralize } from 'utils';

export default function HistoryBreakdownChart({ historyBreakdown }) {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const totalCourses = historyBreakdown.reduce(
      (acc, { numRequiredCourses }) => acc + numRequiredCourses,
      0
    );
    const gapValue = totalCourses * (8 / 576);

    setChartData(
      historyBreakdown.reduce(
        (acc, { title, completedCourses, inProgressCourses, numRequiredCourses: total }, i) => {
          // Start out with no colors, then play transition
          const completed = isFirstRender ? 0 : Math.min(completedCourses.length, total);
          const inProgress = Math.min(inProgressCourses.length, total);
          const toGo = total - completed - inProgress;
          acc.push({ value: completed, title, completed, inProgress, toGo });
          acc.push({ value: inProgress, title, completed, inProgress, toGo });
          acc.push({ value: toGo, title, completed, inProgress, toGo });
          if (i < historyBreakdown.length - 1) acc.push({ value: gapValue }); // gap

          return acc;
        },
        []
      )
    );

    if (isFirstRender) setIsFirstRender(false);
  }, [historyBreakdown, isFirstRender]);

  return (
    <EChartsReact
      option={getChartOptions(chartData)}
      style={{ height: '72px', marginTop: '-8px' }}
    />
  );
}

const getChartOptions = (data) => ({
  series: data.map(getSeriesItem),
  xAxis: { max: 'dataMax', axisLine: { show: false }, splitLine: { show: false } },
  yAxis: { type: 'category', axisLine: { show: false }, axisTick: { show: false } },
  textStyle: { fontFamily: 'Roboto' },
  grid: { top: 8, right: 0, bottom: 0, left: 0 },
  color: chartBarColors,
  tooltip: {
    borderColor: 'white',
    transitionDuration: 0.25,
    hideDelay: 0,
    axisPointer: { trigger: 'axis' },
  },
});

const getSeriesItem = ({ title, completed, inProgress, toGo, value }, i) => ({
  data: [value],
  type: 'bar',
  stack: 'progress',
  tooltip: {
    show: i % 4 !== 3,
    formatter: formatTooltipText(title, completed, inProgress, toGo, i % 4 === 0),
    textStyle: { fontSize: 16, lineHeight: 24 },
  },
  label: {
    show: i % 4 === 0,
    formatter: `${getShortenedCategoryName(title)} ${completed + inProgress}/${
      completed + inProgress + toGo
    }`,
    position: 'insideBottomLeft',
    offset: [-4, 24],
    textBorderColor: 'white',
    textBorderWidth: 1.5,
  },
  emphasis: { disabled: i % 4 > 1 },
  barMaxWidth: '24px',
  itemStyle: {
    opacity: (3 - (i % 4)) / 3,
    borderRadius: getBorderRadius(completed, inProgress, toGo, i),
  },
  animationDuration: 0,
});

const chartBarColors = [
  colors.blue,
  colors.purple,
  colors.deepOrange,
  colors.green,
  colors.cyan,
].reduce((acc, color) => [...acc, color[300], color[200], colors.grey[400], 'white'], []);

const getBorderRadius = (completed, inProgress, toGo, i) => {
  const leftRadius =
    4 * +(i % 4 === 0 || (i % 4 === 1 && !completed) || (!completed && !inProgress));
  const rightRadius = 4 * +(i % 4 === 2 || (i % 4 === 1 && !toGo) || (!toGo && !inProgress));
  return [leftRadius, rightRadius, rightRadius, leftRadius];
};

const formatTooltipText = (title, completed, inProgress, toGo) =>
  [
    '<div style="text-align: center">',
    `  <b>${title}</b>`,
    '  <br />',
    `  ${pluralize(completed, 'course')} taken`,
    '  <br />',
    `  ${pluralize(inProgress, 'course')} scheduled`,
    '  <br />',
    `  ${pluralize(toGo, 'course')} to go`,
    '</div>',
  ].join('');

const getShortenedCategoryName = (fullName) => {
  if (!fullName?.trim()) return '';
  if (fullName.toLowerCase().includes('math')) return 'Math';
  if (fullName.toLowerCase().includes('elective')) return 'Electives';
  if (fullName.toLowerCase().includes('major')) return 'Major';
  if (fullName.toLowerCase().includes('gen')) return 'Gen-Eds';
  return fullName.split(' ')[0];
};
