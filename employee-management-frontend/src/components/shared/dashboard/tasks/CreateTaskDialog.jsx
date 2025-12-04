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
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  title: z
    .string()
    .min(2, { error: "Task title must have at least 2 characters." }),
  status: z.string({ required_error: "Please select a status." }),
  priority: z.string({ required_error: "Please select a priority." }),
  asignedId: z.number(),
});

const CreateTaskDialog = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      status: null,
      priority: null,
      asignedId: null,
    },
  });

  function onSubmit(data) {
    console.log(data);
    toast.success("Success", {
      description: "Task added successfully",
    });
  }

  return (
    <Dialog>
      <form id="employee-form" onSubmit={form.handleSubmit(onSubmit)}>
        <DialogTrigger asChild>
          <Button>
            <Plus />
            Create new Task
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create new Task</DialogTitle>
            <DialogDescription>
              Provide Task details that you want to add.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Task Title </FieldLabel>
                  <Input
                    id="employee-name"
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Task Title..."
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="status"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="employee-status">Status </FieldLabel>
                  <Select
                    id="employee-status"
                    aria-invalid={fieldState.invalid}
                    onValueChange={field.onChange}
                    defaultValues={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select task status" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="doing">Doing</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="priority"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="priority">Priority </FieldLabel>
                  <Select
                    id="priority"
                    aria-invalid={fieldState.invalid}
                    onValueChange={field.onChange}
                    defaultValues={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select task priori" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
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
            <Button type="submit" form="employee-form">
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CreateTaskDialog;
