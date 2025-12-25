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

import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { addDepartment } from "@/store/departmentsSlice";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Department name must have at least 2 characters."),
});

const CreateDepartmentDialog = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("SUBMIT FIRED", data);
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/departments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to create new Department!"
        );
      }

      const result = await response.json();
      console.log("API result:", result);
      // dispatch(addDepartment(result));
      dispatch(
        addDepartment({
          id: result.id,
          name: data.name,
          employee_count: result.employee_count ?? 0,
        })
      );
      form.reset();

      toast.success("Success", {
        description: `Department "${result.data.name}" created successfully!`,
      });
    } catch (error) {
      toast.error("Error", {
        description: error.message || "An unexpected error ocurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <form id="departmentForm" onSubmit={form.handleSubmit(onSubmit)}>
        <DialogTrigger asChild>
          <Button>
            <Plus />
            Create new Department
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create new Department</DialogTitle>
            <DialogDescription>
              Provide department details that you want to create.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="departmentForm-title">
                    Department name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="departmentForm-title"
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
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" form="departmentForm" disabled={loading}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CreateDepartmentDialog;
