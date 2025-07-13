import { z } from "zod";

// Milk bottle entry schema
export const insertEntrySchema = z.object({
  bottles: z.number().min(1, "Bottles must be at least 1"),
  amount: z.number().min(0, "Amount must be positive"),
  timestamp: z.string().datetime(),
  status: z.enum(["pending", "completed"]).default("completed"),
});

export const entrySchema = insertEntrySchema.extend({
  id: z.string(),
  userId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// User profile schema for Firestore
export const userProfileSchema = z.object({
  uid: z.string(),
  email: z.string().email(),
  displayName: z.string().optional(),
  photoURL: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// User schema (for backward compatibility)
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  displayName: z.string().optional(),
  createdAt: z.string().datetime(),
});

// Statistics schema
export const statsSchema = z.object({
  totalEntries: z.number(),
  totalBottles: z.number(),
  totalRevenue: z.number(),
  avgPerDay: z.number(),
});

export type InsertEntry = z.infer<typeof insertEntrySchema>;
export type Entry = z.infer<typeof entrySchema>;
export type User = z.infer<typeof userSchema>;
export type UserProfile = z.infer<typeof userProfileSchema>;
export type Stats = z.infer<typeof statsSchema>;
