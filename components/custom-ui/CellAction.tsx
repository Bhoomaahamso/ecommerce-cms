"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { useParams, useRouter } from "next/navigation";
import { Billboard } from "@prisma/client";
import AlertModal from "./AlertModal";
import axios from "axios";
import toast from "react-hot-toast";

const CellAction = ({ data }: { data: Billboard }) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(data.id);
    toast.success("Billboard ID copied to clipboard");
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${data.storeId}/billboards/${data.id}`);
      router.refresh();
      toast.success("Billboard deleted");
    } catch (err) {
      toast.error(
        "Make sure you removed all categories using this billboard first"
      );
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };
  return (
    <div>
      <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onCopy}>Copy ID</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${data.storeId}/billboards/${data.id}`)
            }
          >
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default CellAction;
