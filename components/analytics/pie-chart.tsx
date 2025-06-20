"use client"

import { Cell, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"

interface AnalyticsPieChartProps {
  data: { name: string; value: number }[]
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#f97316"]

export function AnalyticsPieChart({ data }: AnalyticsPieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value}명`, "방문자 수"]} />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  )
}
