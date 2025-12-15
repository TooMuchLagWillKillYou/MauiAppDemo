import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { useForm } from '@tanstack/react-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { useTablesForDropdown } from '@/hooks/tableHooks';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAddReservation } from '@/hooks/reservationHooks';
import { timeRegex } from '@/lib/constants';
import { buildLocalDateTime, formatAxiosErrors } from '@/lib/utils';
import { format, isBefore, isSameDay } from 'date-fns';
import type { AddReservation } from '@/types/AddReservation';
import { useState } from 'react';
import axios from 'axios';

interface AddReservationFormProps {
  day: string;
}
function AddReservationForm({ day }: AddReservationFormProps) {
  const [open, setOpen] = useState<boolean>(false);
  const { data } = useTablesForDropdown();
  const addReservationMutation = useAddReservation();
  const formSchema = z
    .object({
      name: z.string().min(1, 'Name field in mandatory'),
      hour: z.string().regex(timeRegex, 'Invalid time format'),
      people: z
        .number()
        .min(1, 'There must be at least 1 person for this reservation'),
      tableId: z.number().nullable(),
      notes: z.string().nullable(),
    })
    .superRefine((data, ctx) => {
      const reservationDatetime = buildLocalDateTime(day, data.hour);

      if (isBefore(reservationDatetime, new Date())) {
        ctx.addIssue({
          path: ['hour'],
          code: z.ZodIssueCode.custom,
          message: 'The selected time is already in the past',
        });
      }
    });
  const form = useForm({
    defaultValues: {
      name: '',
      hour: '',
      people: 2,
      tableId: null,
      notes: null,
    },
    validators: {
      onChange: formSchema,
    },
    onSubmit: async (e) => {
      try {
        const parsed = formSchema.parse(e.value);

        await addReservationMutation.mutateAsync({
          ...parsed,
          day,
        } as AddReservation);

        form.reset();
        setOpen(false);
        toast.success('Reservation created successfully!');
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const validationErrors = error.response.data.errors;

          if (validationErrors) {
            toast.error(
              <div style={{ whiteSpace: 'pre-wrap' }}>
                {formatAxiosErrors(validationErrors) ||
                  'An unknown validation error occurred.'}
              </div>,
              {
                duration: 5000,
              }
            );
          } else {
            toast.error('An unexpected error occurred. Please try again.');
          }
        } else {
          toast.error('A critical error occurred.');
        }
      }
    },
  });
  const handleOpen = (open: boolean) => {
    form.reset();
    setOpen(open);
  };
  const handleClose = () => {
    form.reset();
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <form
        id="add-reservation-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)}>
            <Plus /> New
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add new reservation</DialogTitle>
            <DialogDescription>Click Save when you're done</DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Name"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <div className="grid grid-cols-3 gap-4">
              <form.Field
                name="hour"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Hour</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="time"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Hour"
                        min={
                          isSameDay(day, new Date())
                            ? format(new Date(), 'HH:mm')
                            : undefined
                        }
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="people"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>People</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="number"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(parseInt(e.target.value))
                        }
                        aria-invalid={isInvalid}
                        placeholder="People"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="tableId"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Table</FieldLabel>
                      <Select
                        name={field.name}
                        value={field.state.value?.toString() ?? ''}
                        onValueChange={(e) => field.handleChange(parseInt(e))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose table" />
                        </SelectTrigger>
                        <SelectContent>
                          {data?.map((x, i) => (
                            <SelectItem
                              key={`option-table-${i}`}
                              value={x.value}
                            >
                              {x.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </div>

            <form.Field
              name="notes"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Notes</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value ?? ''}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Notes"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" form="add-reservation-form">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

// TODO:
// - fix update reservation operation
// - tableId validation: should be an existing table

export default AddReservationForm;
