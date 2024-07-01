import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function EditComment({ button, children }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>{button}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">{children}</DialogContent>
    </Dialog>
  );
}
