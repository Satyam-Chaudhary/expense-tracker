import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";
import { api } from "@/lib/api";

export const Route = createFileRoute("/create-expense")({
  component: CreateExpense,
});

function CreateExpense() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      title: "",
      amount: 0,
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      await new Promise((r) => setTimeout(r, 1000));
      const res = await api.expenses.$post({ json: value });
      if (!res.ok) {
        throw new Error("Failed to create expense Server error");
      }
      form.reset();
      navigate({ to: "/expenses" });
    },
  });

  return (
    <div className="p-2">
      <h2 className="text-center">Create Expense</h2>
      <form
        className="m-auto max-w-xl"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="title"
          children={(field) => {
            // Avoid hasty abstractions. Render props are great!
            return (
              <>
                <Label htmlFor={field.name}>Title</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.isTouched &&
                field.state.meta.errors.length ? (
                  <em>{field.state.meta.errors.join(", ")}</em>
                ) : null}
              </>
            );
          }}
        />

        <form.Field
          name="amount"
          children={(field) => {
            return (
              <>
                <Label htmlFor={field.name}>Amount</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  type="number"
                />
                {field.state.meta.isTouched &&
                field.state.meta.errors.length ? (
                  <em>{field.state.meta.errors.join(", ")}</em>
                ) : null}
              </>
            );
          }}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={!canSubmit}
              className="m-4 ml-0 min-w-fit"
            >
              {isSubmitting ? "Creating Expense..." : "Create Expense"}
            </Button>
          )}
        />
      </form>
    </div>
  );
}
