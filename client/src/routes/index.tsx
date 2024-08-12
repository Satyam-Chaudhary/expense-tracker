import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api";

export const Route = createFileRoute("/")({
  component: () => <Index />,
});

async function getTotalSpent() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await api.expenses["totalExpenses"].$get();
  if (!res.ok) {
    throw new Error("Server wrong");
  }
  const data = await res.json();
  return data;
}

function Index() {
  // const [totalSpent, setTotalSpent] = useState(0);

  // useEffect(() => {
  //   async function fetchTotalSpent() {
  //     const res = await api.expenses['totalExpenses'].$get();
  //     // const res = await fetch("/api/expenses/totalExpenses");
  //     const data = await res.json();
  //     setTotalSpent(data.total);
  //   }
  //   fetchTotalSpent();
  // }, []);

  const { isPending, error, data } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSpent,
  });

  if (error) {
    return "An error occurred " + error.message;
  }

  return (
    <div className="max-w-md m-auto">
      <Card className="w-[350px] mt-10">
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>The total amount you have spent</CardDescription>
        </CardHeader>
        <CardContent className="text-lg">
          {isPending ? (
            <Skeleton className="w-[80px] h-[20px] rounded-full" />
          ) : (
            data?.total + " USD"
          )}
        </CardContent>
      </Card>
    </div>
  );
}
