"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const ViewStory = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Story</Button>
      </DialogTrigger>
      <DialogContent className="h-[800px] w-[450px]  max-sm:h-[90%] max-sm:w-[90%] bg-white">
        <DialogHeader>
          <DialogDescription className="flex items-center justify-center h-[90%]">
            <Carousel className="w-full h-full max-w-sm mt-7">
              <CarouselContent>
                <CarouselItem>
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="preview"
                      className="w-full h-auto mb-3"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <p className="mb-3">Add Story</p>
                      <label htmlFor="picture" className="cursor-pointer">
                        <Image
                          src="/assets/icons/upload.svg"
                          alt="upload icon"
                          width={200}
                          height={200}
                        />
                      </label>
                      <input
                        id="picture"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>
                  )}
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ViewStory;
