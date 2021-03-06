import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function generateLineData(reviews) {
  const reviewArray = [];
  for (let i = 0; i < reviews.length; i++) {
    let date = new Date(reviews[i].createdAt);
    reviewArray.push({
      'createDate': date.toLocaleDateString(),
      'rating': reviews[i].rating,
      'recommended': reviews[i].recommended,
    });
  }
  return reviewArray;
}

export default function ReviewDotLineChart({ reviews }) {
  const reviewArray = generateLineData(reviews);
  return (
    <LineChart
      width={800}
      height={300}
      data={reviewArray}
      margin={{
        top: 20,
        right: 50,
        left: 20,
        bottom: 20,
      }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='createDate' />
      <YAxis dataKey='rating' />
      <Tooltip />
      <Legend />
      <Line type='monotone' dataKey='rating' stroke='#8884d8' />
    </LineChart>
  );
}
