import { z } from 'zod';
import { users, knowledgeBaseArticles } from '../../db/schema';
export type User = typeof users.$inferSelect;
export const userFormSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
});
export type UserFormValues = z.infer<typeof userFormSchema>;
// --- Academic Types ---
export type Course = {
  id: string;
  name: string;
  subject: string | null;
  teacherId: string | null;
  teacherFirstName: string | null;
  teacherLastName: string | null;
  studentCount: number;
};
export const classFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, { message: "Class name must be at least 3 characters." }),
  subject: z.string().min(2, { message: "Subject must be at least 2 characters." }),
  teacherId: z.string().uuid().nullable().optional(),
});
export type ClassFormValues = z.infer<typeof classFormSchema>;
export type Assignment = {
    id: string;
    title: string;
    dueDate: Date | null;
    courseName: string;
    submissions: number;
    graded: number;
};
export const assignmentFormSchema = z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters." }),
    description: z.string().optional(),
    dueDate: z.date(),
    courseId: z.string().min(1, { message: "Please select a class." }),
});
export type AssignmentFormValues = z.infer<typeof assignmentFormSchema>;
// --- Knowledge Base Types ---
export type KnowledgeBaseArticle = typeof knowledgeBaseArticles.$inferSelect;
export const knowledgeBaseFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  content: z.string().min(50, { message: "Content must be at least 50 characters." }),
});
export type KnowledgeBaseFormValues = z.infer<typeof knowledgeBaseFormSchema>;
// --- Studio Editor Types ---
export type ElementType = 'rectangle' | 'text';
export interface StudioElement {
  id: string;
  type: ElementType;
  position: { x: number; y: number };
  size: { width: number; height: number };
  rotation: number;
  zIndex: number;
  content?: string;
  props?: {
    backgroundColor?: string;
    color?: string;
    fontSize?: number;
    fontWeight?: 'normal' | 'bold';
    textAlign?: 'left' | 'center' | 'right';
  };
}
export interface StudioState {
  elements: StudioElement[];
  selectedElementId: string | null;
}