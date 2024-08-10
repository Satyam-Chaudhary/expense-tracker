import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function App() {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    async function fetchTotalSpent() {
      const res = await fetch("/api/expenses/totalExpenses");
      const data = await res.json();
      setTotalSpent(data.total);
    }
    fetchTotalSpent();
  }, []);

  return (
    <div className="max-w-md m-auto">
      <Card className="w-[350px] mt-10">
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>The total amount you have spent</CardDescription>
        </CardHeader>
        <CardContent className="text-lg">{totalSpent}</CardContent>
      </Card>
    </div>
  );
}

export default App;
