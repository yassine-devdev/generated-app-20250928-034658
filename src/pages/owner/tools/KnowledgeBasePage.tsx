import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { DataTable } from '@/components/data-table/DataTable';
import { columns } from '@/components/data-table/KnowledgeBaseColumns';
import { useAuthStore } from '@/store/authStore';
import { KnowledgeBaseArticle, KnowledgeBaseFormValues } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { Row } from '@tanstack/react-table';
import { KnowledgeBaseFormSheet } from '@/components/forms/KnowledgeBaseFormSheet';
export function KnowledgeBasePage() {
  const [articles, setArticles] = useState<KnowledgeBaseArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeBaseArticle | null>(null);
  const token = useAuthStore((state) => state.token);
  const fetchArticles = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const response = await fetch('/api/owner/kb', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.success) {
        setArticles(result.data);
      } else {
        toast.error('Failed to fetch knowledge base articles.');
      }
    } catch (error) {
      toast.error('An error occurred while fetching articles.');
    } finally {
      setIsLoading(false);
    }
  }, [token]);
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);
  const handleAdd = () => {
    setSelectedArticle(null);
    setIsSheetOpen(true);
  };
  const handleEdit = (row: Row<KnowledgeBaseArticle>) => {
    setSelectedArticle(row.original);
    setIsSheetOpen(true);
  };
  const handleDelete = async (row: Row<KnowledgeBaseArticle>) => {
    const articleToDelete = row.original;
    try {
      const response = await fetch(`/api/owner/kb/${articleToDelete.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.success) {
        toast.success(`Article "${articleToDelete.title}" deleted successfully.`);
        fetchArticles();
      } else {
        toast.error(result.error || 'Failed to delete article.');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the article.');
    }
  };
  const handleFormSubmit = async (data: KnowledgeBaseFormValues) => {
    setIsSubmitting(true);
    const url = selectedArticle ? `/api/owner/kb/${selectedArticle.id}` : '/api/owner/kb';
    const method = selectedArticle ? 'PUT' : 'POST';
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        toast.success(`Article ${selectedArticle ? 'updated' : 'created'} successfully.`);
        setIsSheetOpen(false);
        fetchArticles();
      } else {
        toast.error(result.error || 'Failed to save article.');
      }
    } catch (error) {
      toast.error('An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Toaster />
      <h1 className="text-3xl font-display font-bold mb-8">
        AI Knowledge Base
      </h1>
      {isLoading ? (
        <div className="space-y-4 mt-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={articles}
          filterColumnId="title"
          filterPlaceholder="Filter by title..."
          onAddUser={handleAdd}
          onEditRow={handleEdit as (row: Row<any>) => void}
          onDeleteRow={handleDelete as (row: Row<any>) => void}
        />
      )}
      <KnowledgeBaseFormSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onSubmit={handleFormSubmit}
        defaultValues={selectedArticle}
        isLoading={isSubmitting}
      />
    </motion.div>
  );
}