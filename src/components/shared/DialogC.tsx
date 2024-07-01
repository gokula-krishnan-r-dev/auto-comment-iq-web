import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function DialogC({
  button,
  children,
  header,
  footer,
  className = "sm:max-w-[425px]",
}: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>{button}</DialogTrigger>
      <DialogContent className={className}>
        {header}
        {children}
        {footer}
      </DialogContent>
    </Dialog>
  );
}
