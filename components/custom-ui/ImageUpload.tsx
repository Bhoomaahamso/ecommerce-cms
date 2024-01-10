"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ImagePlus, Trash2 } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

interface IImageUpload {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<IImageUpload> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) return null;

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => onRemove(url)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
        <CldUploadWidget onUpload={onUpload} uploadPreset="or3v8ekz">
          {({ open }) => {
            const onClick = () => {
              open();
            };
            return (
              <Button
                type="button"
                onClick={onClick}
                variant="secondary"
                disabled={disabled}
              >
                <ImagePlus className="h-4 w-4 mr-2" />
                Upload an Image
              </Button>
            );
          }}
        </CldUploadWidget>
      </div>
    </div>
  );
};
export default ImageUpload;