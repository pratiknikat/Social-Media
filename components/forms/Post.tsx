"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import AWS from "aws-sdk";
import router from "next/router";
import { ChangeEvent } from "react";
import { addPost } from "@/lib/actions/post.action";
import { usePathname, useRouter } from "next/navigation";
interface Props {
  mongoUserId: string;
}

const FormSchema = z.object({
  caption: z
    .string()
    .min(10, { message: "caption must be at least 10 characters." }),
  image: z.custom<File>(),
});

const AddPost = ({ mongoUserId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function handleImageUpload(file: any) {
    const s3 = new AWS.S3({
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
      region: process.env.NEXT_PUBLIC_AWS_REGION,
    });
    const fileName = file.name || "default";
    const params = {
      Bucket:
        process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME || "default-bucket-name",
      Key: `uploads/${Date.now()}_${fileName}`,
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

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const caption = form.getValues("caption");
      const imageFiles = form.getValues("image");

      if (imageFiles) {
        const imageUrl = await handleImageUpload(imageFiles);

        await addPost({
          caption: caption,
          imageUrl: imageUrl,
          user: JSON.parse(mongoUserId),
          path: pathname,
        });

        router.push("/");
        toast({
          title: "Post added successfully!",
          description: `Image URL: ${imageUrl}`,
        });
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      toast({
        title: "Error",
        description: "There was an error during form submission.",
      });
    }
  }

  // ... (existing code)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>caption</FormLabel>
              <FormControl>
                <Textarea
                  style={{ borderRadius: "7px" }}
                  className="w-full rounded-md "
                  placeholder="Enter post caption"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* You can add an input for uploading the image here */}
        {/* Show image here when image */}
        <FormField
          control={form.control}
          name="image"
          render={({ field: { ref, name, onBlur, onChange } }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <input
                  ref={ref}
                  name={name}
                  onBlur={onBlur}
                  type="file"
                  accept="image/*"
                  // {...field}÷
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    onChange(e.target.files?.[0])
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          style={{ borderRadius: "5px" }}
          className="text-white float-end bg-black w-40px max-sm:w-full"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AddPost;
