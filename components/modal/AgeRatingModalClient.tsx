"use client";
import { useState } from "react";
import AgeRatingModal from "./AgeRatingModal";

interface Props {
  rating: string;
  description?: string;
}

export default function AgeRatingModalClient({ rating, description }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <AgeRatingModal
      isOpen={open}
      onClose={() => setOpen(false)}
      rating={rating}
      description={description}
    />
  );
}