"use client";

import { useEffect, useState } from "react";
import { StoreModal } from "../modals/use-store";
import { Toaster } from 'react-hot-toast'

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <Toaster />
      <StoreModal />
    </>
  );
};
