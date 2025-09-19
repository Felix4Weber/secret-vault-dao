import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { TrendingUpIcon, PieChartIcon } from "lucide-react";

interface AllocationData {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

export const AllocationChart = () => {
  const allocations: AllocationData[] = [
    { name: "Development", value: 2847, color: "hsl(var(--primary))", percentage: 35 },
    { name: "Operations", value: 1823, color: "hsl(var(--secondary))", percentage: 23 },
    { name: "Marketing", value: 1214, color: "hsl(var(--accent))", percentage: 15 },
    { name: "Reserve Fund", value: 1619, color: "hsl(var(--success))", percentage: 20 },
    { name: "Governance", value: 567, color: "hsl(var(--warning))", percentage: 7 }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-xl">
          <p className="font-semibold text-foreground">{data.name}</p>
          <p className="text-primary font-mono">{data.value} ETH</p>
          <p className="text-sm text-muted-foreground">{data.percentage}% of total</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Pie Chart */}
      <Card className="lg:col-span-2 bg-gradient-to-br from-card via-card/95 to-muted/20 border-border/50 hover:border-primary/30 transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="w-5 h-5 text-primary" />
            Treasury Allocation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={allocations}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {allocations.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Allocation Breakdown */}
      <Card className="bg-gradient-to-br from-card via-card/95 to-muted/20 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUpIcon className="w-5 h-5 text-success" />
            Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {allocations.map((allocation, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{allocation.name}</span>
                <span className="text-muted-foreground">{allocation.percentage}%</span>
              </div>
              <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000 ease-out animate-treasure-fill"
                  style={{ 
                    backgroundColor: allocation.color, 
                    width: `${allocation.percentage}%`,
                    boxShadow: `0 0 10px ${allocation.color}30`
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{allocation.value} ETH</span>
                <span className="animate-value-count">
                  ${(allocation.value * 2.54).toFixed(2)}K
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};