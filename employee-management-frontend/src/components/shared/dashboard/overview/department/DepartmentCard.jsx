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
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { error: "Department name must have at least 2 characters." }),
});

const DepartmentCard = () => {
  const { id } = useParams();
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/departments/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 404) {
          setNotFound(true);
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to load the department!");
        }
        const result = await response.json();
        form.reset({ name: result.name });
      } catch (error) {
        toast.error("Error", { description: error.message });
      } finally {
        setLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/departments/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the department");
      }

      const result = await response.json();
      toast.success("Success", {
        description: "Department updated successfully!",
      });
      form.reset({ name: result.name });
    } catch (error) {
      toast.error("Error", {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (notFound) {
    return (
      <h1 className="text-red-500 text-center text-2xl">
        Department not found!
      </h1>
    );
  }

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
          <Button type="submit" form="department-form" disabled={loading}>
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default DepartmentCard;
