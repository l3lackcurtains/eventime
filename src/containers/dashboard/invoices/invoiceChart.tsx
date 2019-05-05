import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "Jan, 2019", amount: 2400 },
  { name: "Feb, 2019", amount: 1398 },
  { name: "Mar, 2019", amount: 9800 },
  { name: "Apr, 2019", amount: 3908 },
  { name: "May, 2019", amount: 4800 },
  { name: "Jun, 2019", amount: 3800 },
  { name: "Jul, 2019", amount: 4300 },
  { name: "Aug, 2019", amount: 100 },
  { name: "Sep, 2019", amount: 4500 },
  { name: "Oct, 2019", amount: 1200 },
  { name: "Nov, 2019", amount: 200 },
  { name: "Dec, 2019", amount: 3400 }
];

const InvoiceChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="0 0" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" stackId="a" fill="#30336b" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default InvoiceChart;
