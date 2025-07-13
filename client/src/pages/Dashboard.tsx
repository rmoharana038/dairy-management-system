import { Plus, FileText, TrendingUp, DollarSign, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, FileSpreadsheet, FileText as FilePdf } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import QuickAddForm from "@/components/QuickAddForm";
import UsageChart from "@/components/UsageChart";
import EntriesTable from "@/components/EntriesTable";
import EntriesTableMobile from "@/components/EntriesTableMobile";
import { useEntries } from "@/hooks/useEntries";

export default function Dashboard() {
  const { stats, exportToExcel, exportToPDF } = useEntries();

  return (
    <DashboardLayout>
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Entries"
          value={stats.totalEntries}
          Icon={FileText}
          iconColor="text-primary"
          iconBgColor="bg-blue-50"
          change="12% from last month"
          changeType="increase"
        />
        <StatCard
          title="Total Bottles"
          value={stats.totalBottles}
          Icon={Package}
          iconColor="text-green-600"
          iconBgColor="bg-green-50"
          change="8% from last month"
          changeType="increase"
        />
        <StatCard
          title="Total Revenue"
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          Icon={DollarSign}
          iconColor="text-yellow-600"
          iconBgColor="bg-yellow-50"
          change="15% from last month"
          changeType="increase"
        />
        <StatCard
          title="Avg. per Day"
          value={stats.avgPerDay}
          Icon={TrendingUp}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-50"
          subtitle="bottles/day"
        />
      </div>

      {/* Quick Actions & Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1">
          <QuickAddForm />
        </div>
        <div className="lg:col-span-2">
          <UsageChart />
        </div>
      </div>

      {/* Recent Entries Table */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <CardTitle className="text-lg font-semibold text-gray-900">
              Recent Entries
            </CardTitle>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search entries..."
                  className="pl-10 pr-4 py-2"
                />
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={exportToExcel}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Excel
                </Button>
                <Button
                  onClick={exportToPDF}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <FilePdf className="h-4 w-4 mr-2" />
                  PDF
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <EntriesTable />
          <EntriesTableMobile />
        </CardContent>
      </Card>

      {/* Floating Action Button (Mobile) */}
      <Button
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary hover:bg-blue-700 rounded-full shadow-lg lg:hidden"
        size="icon"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </DashboardLayout>
  );
}
