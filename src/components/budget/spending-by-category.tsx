"use client";

import { BudgetCategory } from "@/features/budget/types";

interface SpendingByCategoryProps {
  categories: BudgetCategory[];
  totalSpent: number;
}

export function SpendingByCategory({
  categories,
  totalSpent,
}: SpendingByCategoryProps) {
  // Calculate angles for each segment
  const segments = categories.map((cat, index) => {
    const startAngle = categories
      .slice(0, index)
      .reduce((sum, c) => sum + (c.percentage / 100) * 360, 0);
    const endAngle = startAngle + (cat.percentage / 100) * 360;
    return { ...cat, startAngle, endAngle };
  });

  // SVG donut chart parameters
  const size = 240;
  const radius = 80;
  const innerRadius = 45;
  const center = size / 2;

  const angleToCoordinates = (angle: number) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(rad),
      y: center + radius * Math.sin(rad),
    };
  };

  const createPath = (startAngle: number, endAngle: number) => {
    const start = angleToCoordinates(startAngle);
    const end = angleToCoordinates(endAngle);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    const innerStart = {
      x: center + innerRadius * Math.cos(((startAngle - 90) * Math.PI) / 180),
      y: center + innerRadius * Math.sin(((startAngle - 90) * Math.PI) / 180),
    };
    const innerEnd = {
      x: center + innerRadius * Math.cos(((endAngle - 90) * Math.PI) / 180),
      y: center + innerRadius * Math.sin(((endAngle - 90) * Math.PI) / 180),
    };

    return `
      M ${start.x} ${start.y}
      A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}
      L ${innerEnd.x} ${innerEnd.y}
      A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}
      Z
    `;
  };

  return (
    <div className="rounded-lg bg-white p-6">
      <h3 className="text-lg font-semibold text-slate-700">
        Spending by Category
      </h3>

      <div className="mt-6 flex items-center justify-between gap-8">
        {/* Donut Chart */}
        <div className="shrink-0">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {segments.map((segment) => (
              <path
                key={segment.name}
                d={createPath(segment.startAngle, segment.endAngle)}
                fill={segment.color}
                className="transition-opacity hover:opacity-80"
              />
            ))}
            {/* Center text */}
            <text
              x={center}
              y={center - 5}
              textAnchor="middle"
              className="fill-slate-700 text-xs font-semibold"
            >
              TOTAL SPENT
            </text>
            <text
              x={center}
              y={center + 18}
              textAnchor="middle"
              className="fill-slate-900 text-2xl font-bold"
            >
              ${totalSpent.toLocaleString()}
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-1 flex-col gap-4">
          {categories.map((cat) => (
            <div key={cat.name} className="flex items-center gap-3">
              <div
                className="h-3 w-3 rounded-full shrink-0"
                style={{ backgroundColor: cat.color }}
              />
              <div className="flex items-center justify-between flex-1 gap-2">
                <span className="text-sm text-slate-600">
                  {cat.label} ({cat.percentage}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
