"use client"

import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

interface AnalyticsBarChartProps {
  data: { name: string; value: number }[]
}

export function AnalyticsBarChart({ data }: AnalyticsBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RechartsBarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
