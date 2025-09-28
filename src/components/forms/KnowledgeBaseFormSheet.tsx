import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KnowledgeBaseFormValues, knowledgeBaseFormSchema, KnowledgeBaseArticle } from '@/lib/types';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
interface KnowledgeBaseFormSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: KnowledgeBaseFormValues) => void;
  defaultValues?: KnowledgeBaseArticle | null;
  isLoading: boolean;
}
export function KnowledgeBaseFormSheet({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
  isLoading,
}: KnowledgeBaseFormSheetProps) {
  const form = useForm<KnowledgeBaseFormValues>({
    resolver: zodResolver(knowledgeBaseFormSchema),
  });
  React.useEffect(() => {
    if (isOpen) {
      form.reset(
        defaultValues
          ? { id: defaultValues.id, title: defaultValues.title, content: defaultValues.content }
          : { id: undefined, title: '', content: '' }
      );
    }
  }, [defaultValues, form, isOpen]);
  const title = defaultValues ? 'Edit Article' : 'Add New Article';
  const description = defaultValues
    ? "Update the article's content. This will re-index it in the AI knowledge base."
    : 'Add a new article to the AI knowledge base. It will be automatically indexed.';
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., How to reset your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a detailed answer or explanation..."
                      className="min-h-[200px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Article'}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}