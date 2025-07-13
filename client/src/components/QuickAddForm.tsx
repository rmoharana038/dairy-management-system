import { useState } from "react";
import { Plus, Milk } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEntries } from "@/hooks/useEntries";
import LoadingSpinner from "./LoadingSpinner";

export default function QuickAddForm() {
  const [bottles, setBottles] = useState<number>(0);
  const [datetime, setDatetime] = useState<string>(
    new Date().toISOString().slice(0, 16)
  );
  const { addEntry, isAdding } = useEntries();

  const calculatedAmount = bottles * 25;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bottles <= 0) return;

    try {
      await addEntry({
        bottles,
        amount: calculatedAmount,
        timestamp: new Date(datetime).toISOString(),
        status: "completed"
      });
      
      setBottles(0);
      setDatetime(new Date().toISOString().slice(0, 16));
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Quick Add Entry
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="bottles" className="text-sm font-medium text-gray-700">
              Number of Bottles
            </Label>
            <div className="relative mt-2">
              <Input
                id="bottles"
                type="number"
                value={bottles || ""}
                onChange={(e) => setBottles(parseInt(e.target.value) || 0)}
                placeholder="Enter bottle count"
                min="1"
                className="pr-10"
              />
              <div className="absolute right-3 top-3">
                <Milk className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="datetime" className="text-sm font-medium text-gray-700">
              Date & Time
            </Label>
            <Input
              id="datetime"
              type="datetime-local"
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
              className="mt-2"
            />
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Calculated Amount:</span>
              <span className="text-lg font-semibold text-primary">
                ₹{calculatedAmount}
              </span>
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-blue-700"
            disabled={bottles <= 0 || isAdding}
          >
            {isAdding ? (
              <LoadingSpinner size="sm" className="mr-2" />
            ) : (
              <Plus className="h-4 w-4 mr-2" />
            )}
            Add Entry
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
