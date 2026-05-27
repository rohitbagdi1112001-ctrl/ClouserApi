import { z } from "zod";

export const videoListSchema = z.object({
  query: z.object({
    limit: z
      .string()
      .optional()
      .transform((value) => Number(value || 10))
      .refine((value) => value > 0 && value <= 50, "limit must be between 1 and 50"),
    page: z
      .string()
      .optional()
      .transform((value) => Number(value || 1))
      .refine((value) => value > 0, "page must be a positive number"),
    cursor: z.string().optional()
  })
});

export const likeSchema = z.object({
  params: z.object({
    id: z.string().min(1)
  })
});

export const shareSchema = z.object({
  params: z.object({
    id: z.string().min(1)
  }),
  body: z.object({
    platform: z.string().min(1, "Platform is required")
  })
});

export const commentQuerySchema = z.object({
  params: z.object({
    id: z.string().min(1)
  }),
  query: z.object({
    limit: z
      .string()
      .optional()
      .transform((value) => Number(value || 10))
      .refine((value) => value > 0 && value <= 50, "limit must be between 1 and 50"),
    page: z
      .string()
      .optional()
      .transform((value) => Number(value || 1))
      .refine((value) => value > 0, "page must be a positive number")
  })
});

export const commentBodySchema = z.object({
  params: z.object({
    id: z.string().min(1)
  }),
  body: z.object({
    text: z.string().min(1, "Comment cannot be empty")
  })
});
