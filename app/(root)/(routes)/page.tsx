"use client";

import { Modal } from "@/components/custom-ui/modal";
import { useStoreModel } from "@/hooks/use-store-model";
import prismadb from "@/lib/prismadb";
import { useEffect } from "react";

export default function HomePage() {
  const isOpen = useStoreModel((state) => state.isOpen);
  const onOpen = useStoreModel((state) => state.onOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}
