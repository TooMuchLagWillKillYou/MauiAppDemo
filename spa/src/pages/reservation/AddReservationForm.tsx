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
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

function AddReservationForm() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>
            <Plus /> New
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add new reservation</DialogTitle>
            <DialogDescription>Click Save when you're done</DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input id="name" placeholder="Name" required />
            </Field>
            <div className="grid grid-cols-3 gap-4">
              <Field>
                <FieldLabel htmlFor="hour">Hour</FieldLabel>
                <Input id="hour" placeholder="Hour" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="people">People</FieldLabel>
                <Input id="people" placeholder="People" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="table">Table</FieldLabel>
                <Input id="table" placeholder="Table" />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="notes">Notes</FieldLabel>
              <Input id="notes" placeholder="Notes" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default AddReservationForm;
