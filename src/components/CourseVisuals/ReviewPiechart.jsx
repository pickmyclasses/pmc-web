import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const data = [
  { name: 'Five-Star', value: 0 },
  { name: 'Four-Star', value: 0 },
  { name: 'Three-Star', value: 0 },
  { name: 'Two-Star', value: 0 },
  { name: 'One-Star', value: 0 },
];
const COLORS = ['#57e32c', '#b7dd29', '#ffe234', '#ffa534', '#ff4545'];
function generateStarValues(reviews) {
  for (let i = 0; i < reviews.length; i++) {
    data[reviews[i].rating].value += 1;
  }
}

export default function ReviewPiechart({ reviews }) {
  generateStarValues(reviews);
  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        cx='50%'
        cy='50%'
        labelLine={false}
        outerRadius={100}
        fill='#8884d8'
        dataKey='value'
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}
