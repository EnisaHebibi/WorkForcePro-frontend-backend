import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(6, { error: "Password must be at least 6 characters long." }),
});

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data) {
    console.log(data);
    toast("Succesfully✅");
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-96 space-y-2">
      <div>
        <h1 className="text-primary font-bold text-2xl mb-1">Login</h1>
        <p className="text-muted-foreground">
          Welcome back, please login to continue.
        </p>
      </div>

      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Email</FieldLabel>
            <Input
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="Email..."
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Password</FieldLabel>
            <Input
              type="password"
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="********"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;
