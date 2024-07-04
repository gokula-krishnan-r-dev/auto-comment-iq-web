import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
const UserCollaboration = ({ collabData }: any) => {
  return (
    <div>
      <Dialog open={!!collabData}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <div className=""></div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserCollaboration;
