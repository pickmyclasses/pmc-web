import React from 'react';
import ReactECharts from 'echarts-for-react';

let option = {
  graphic: {
    elements: [
      {
        type: 'group',
        left: 'center',
        top: 'center',
        children: new Array(7).fill(0).map((val, i) => ({
          type: 'rect',
          x: i * 20,
          shape: {
            x: 0,
            y: -40,
            width: 10,
            height: 80,
          },
          style: {
            fill: '#a3a3a3',
          },
          keyframeAnimation: {
            duration: 1000,
            delay: i * 200,
            loop: true,
            keyframes: [
              {
                percent: 0.5,
                scaleY: 0.3,
                easing: 'cubicIn',
              },
              {
                percent: 1,
                scaleY: 1,
                easing: 'cubicOut',
              },
            ],
          },
        })),
      },
    ],
  },
};
export default function StatsLoading() {
  return <ReactECharts option={option} style={{ height: 150 }} />;
}
