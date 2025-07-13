import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  Icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  change?: string;
  changeType?: 'increase' | 'decrease';
}

export default function StatCard({ 
  title, 
  value, 
  subtitle, 
  Icon, 
  iconColor, 
  iconBgColor, 
  change, 
  changeType 
}: StatCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            {change && (
              <p className={`text-xs mt-1 ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                <span className="inline-block mr-1">
                  {changeType === 'increase' ? '↑' : '↓'}
                </span>
                {change}
              </p>
            )}
            {subtitle && (
              <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
          <div className={`p-3 rounded-lg ${iconBgColor}`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
