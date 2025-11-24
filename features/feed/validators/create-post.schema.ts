import z from "zod";

export const createPostSchema = z.object({
  content: z.string().min(1, { message: "Content is required" }),
  visibility: z.enum(["PUBLIC", "PRIVATE", "FRIENDS"]),
  mediaUrls: z.array(
    z.object({
      publicId: z.string().min(1, { message: "Public ID is required" }),
      url: z.string().min(1, { message: "URL is required" }),
    })
  ),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;
