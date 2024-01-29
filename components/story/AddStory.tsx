"use client";
import React, { useState, ChangeEvent } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import AWS from "aws-sdk";
import { addStory } from "@/lib/actions/story.action"; // Import your story action
import { toast } from "../ui/use-toast";
import { usePathname, useRouter } from "next/navigation";
interface Props {
  mongoUserId: string;
}

const AddStory = ({ mongoUserId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  async function handleImageUpload(file: File) {
    const s3 = new AWS.S3({
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || "",
      region: process.env.NEXT_PUBLIC_AWS_REGION || "",
    });
    const fileName = file.name || "default";
    const params = {
      Bucket:
        process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME || "default-bucket-name",
      Key: `story/${Date.now()}_${fileName}`,
      Body: file,
      ACL: "public-read",
      ContentType: "image/jpg",
    };

    try {
      const uploadResult = await s3.upload(params).promise();
      return uploadResult.Location;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  }

  async function onSubmit() {
    try {
      if (selectedImage) {
        const imageUrl = await handleImageUpload(selectedImage);

        await addStory({
          user: JSON.parse(mongoUserId),
          mediaUrl: imageUrl,
          expiresAt: new Date(),
          path: pathname,
        });
        router.push("/");
        toast({
          title: "Post added successfully!",
          description: `Image URL: ${imageUrl}`,
        });
      }
    } catch (error) {
      console.error("Error submitting story:", error);
    }
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="btn-primary1">
          Story
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[800px] w-[450px] pt-10 max-sm:h-[90%] max-sm:w-[90%] bg-white">
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
        <Button onClick={onSubmit}>Add Story</Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddStory;
