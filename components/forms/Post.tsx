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
import { addPost } from "@/lib/actions/post.action";
import router from "next/router";

interface Props {
  mongoUserId: string;
}

const FormSchema = z.object({
  caption: z
    .string()
    .min(10, { message: "caption must be at least 10 characters." }),
  image: z.string(),
});

const AddPost = ({ mongoUserId }: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function handleImageUpload(file: any) {
    // Set up AWS S3 configuration
    console.log(file);
    const s3 = new AWS.S3({
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
      region: process.env.NEXT_PUBLIC_AWS_REGION,
    });

    // Set up S3 parameters
    const fileName = file.name || "default"; // Use a default name if file.name is undefined

    const fileExtension = file.type === "image/jpeg" ? "jpeg" : "png";
    const params = {
      Bucket:
        process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME || "default-bucket-name",
      Key: `uploads/${Date.now()}_${fileName}.${fileExtension}`,
      Body: file,
      ACL: "public-read",
    };

    try {
      // Upload the file to S3
      const uploadResult = await s3.upload(params).promise();

      // Return the URL of the uploaded file
      return uploadResult.Location;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error; // Rethrow the error to be caught in the onSubmit function
    }
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const caption = form.getValues("caption");
      const imageFiles = form.getValues("image");

      console.log(imageFiles); // Make sure the file object is correct

      if (imageFiles && imageFiles.length > 0) {
        const imageUrl = await handleImageUpload(imageFiles[0]); // Use imageFiles[0] instead of imageFiles
        console.log(imageUrl);

        await addPost({
          caption: caption,
          imageUrl: imageUrl,
          user: JSON.parse(mongoUserId),
          path: "",
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <input type="file" accept="image/*" {...field} />
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
