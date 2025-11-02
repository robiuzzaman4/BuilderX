"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { platformApi } from "@/http/platform";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader, X } from "lucide-react";

type CreatePlatformDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function CreatePlatformDialog({
  open,
  setOpen,
}: CreatePlatformDialogProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  // === auto-generate slug from name ===
  const handleNameChange = (value: string) => {
    setName(value);
    const generatedSlug = value
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(generatedSlug);
  };

  // === create platform mutation ===
  const { mutate, isPending } = useMutation({
    mutationFn: platformApi.createPlatform,
    onSuccess: (response) => {
      toast.success("Platform created successfully!");
      queryClient.invalidateQueries({ queryKey: ["platforms"] });
      setOpen(false);
      setName("");
      setSlug("");
      // === redirect to builder page ===
      router.push(`/dashboard/builder/${response.platform._id}`);
    },
    onError: (error: any) => {
      console.log("err", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to create platform! Try again."
      );
    },
  });

  // === handle create ===
  const handleCreate = () => {
    if (name.trim() === "" || slug.trim() === "") {
      toast.error("Name and slug are required.");
      return;
    }

    mutate({ name: name.trim(), slug: slug.trim() });
  };

  // === handle cancel ===
  const handleCancel = () => {
    setOpen(false);
    setName("");
    setSlug("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Platform</DialogTitle>
          <DialogDescription>Enter platform name and slug.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Platform Name"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              placeholder="platform-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              disabled={isPending}
            />
            <p className="text-xs text-muted-foreground">
              This will be your domain for this platform
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={isPending}>
            {isPending ? (
              <>
                <Loader className="size-4 animate-spin mr-2" /> Creating..
              </>
            ) : (
              "Create"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
