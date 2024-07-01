import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function StoryPopup({
  children,
  button,
  className,
}: {
  children: React.ReactNode;
  button: React.ReactNode;
  className?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>{button}</button>
      </DialogTrigger>
      <DialogContent className={cn(className)}>{children}</DialogContent>
    </Dialog>
  );
}
