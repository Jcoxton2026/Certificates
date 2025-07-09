import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const certificateTemplates = pgTable("certificate_templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  isPremium: boolean("is_premium").notNull().default(false),
  config: jsonb("config").notNull(),
});

export const certificates = pgTable("certificates", {
  id: serial("id").primaryKey(),
  templateId: integer("template_id").notNull(),
  recipientName: text("recipient_name").notNull(),
  courseName: text("course_name").notNull(),
  completionDate: text("completion_date").notNull(),
