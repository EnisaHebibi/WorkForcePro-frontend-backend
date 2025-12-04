import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { da } from "zod/v4/locales";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { error: "Department name must have at least 2 characters." }),
});

const DepartmentCard = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    toast.success("Succesfully✅");
  };

  return (
    <Card className={"lg:w-96 w-full"}>
      <CardHeader>
        <CardTitle>Edit Department</CardTitle>
        <CardDescription>Update the Department's name</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="department-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="department-form-title">
                    Department name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="department-form-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Department name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="submit" form="department-form">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default DepartmentCard;
