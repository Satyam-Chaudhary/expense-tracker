import { createFileRoute } from "@tanstack/react-router";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
export const Route = createFileRoute("/expenses")({
  component: Expenses,
});
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Skeleton } from "@/components/ui/skeleton"

async function getAllExpenses() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await api.expenses.$get();
  if (!res.ok) {
    throw new Error("Server wrong");
  }
  const data = await res.json();
  return data;
}

function Expenses() {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-all-expenses"],
    queryFn: getAllExpenses,
  });

  if (error) return "An error occurred " + error.message;
  console.log(data);

  return (
    <>
      <Table className="max-w-3xl m-auto">
        <TableCaption>A list of all your expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending
            ?
            Array(3).fill(0).map((_, i) => (
                <TableRow key={i}>
                    <TableCell>
                    <Skeleton className="h-4 w-10" />
                    </TableCell>
                    <TableCell>
                    <Skeleton className="h-4 w-20" />
                    </TableCell>
                    <TableCell className="text-right">
                    <Skeleton className="h-4 w-auto" />
                    </TableCell>
                </TableRow>
            ))

            : data?.expenses.map((expense) => (
                <>
                  <TableRow key={expense.id}>
                    <TableCell>{expense.id}</TableCell>
                    <TableCell>{expense.title}</TableCell>
                    <TableCell className="text-right">
                      {'$ ' + expense.amount }
                    </TableCell>
                  </TableRow>
                </>
              ))}
        </TableBody>
      </Table>
    </>
  );
}
