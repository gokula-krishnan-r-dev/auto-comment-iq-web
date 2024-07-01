import React, { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface DialogModelProps {
  children: ReactNode;
  button: ReactNode;
  className?: string;
}

const DialogModel: React.FC<DialogModelProps> = ({
  children,
  button,
  className,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{button}</DialogTrigger>
      <DialogContent className={cn("sm:max-w-[425px]", className)}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DialogModel;
