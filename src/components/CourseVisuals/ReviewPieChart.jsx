import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const colors = ['#ff4545', '#ffa534', '#ffe234', '#b7dd29', '#57e32c'];

function generateStarValues(reviews, data) {
  for (let i = 0; i < reviews.length; i++) {
    data[reviews[i].rating - 1].value += 1;
  }
}

export default function ReviewPieChart({ reviews }) {
  const data = [
    { name: 'One-Star', value: 0 },
    { name: 'Two-Star', value: 0 },
    { name: 'Three-Star', value: 0 },
    { name: 'Four-Star', value: 0 },
    { name: 'Five-Star', value: 0 },
  ];

  generateStarValues(reviews, data);
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
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}
