'use client';

import { useCategories } from '@/hooks/useApi';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { ICategory } from '@/models/category';

interface CategoryFilterProps {
  selectedCategory?: string;
  onCategoryChange: (categoryId: string | undefined) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const { data: categoriesResponse, isLoading } = useCategories();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="ml-2">Loading categories...</span>
      </div>
    );
  }

  if (!categoriesResponse?.data) {
    return null;
  }

  const categories = categoriesResponse.data;
  
  // Group categories by parent
  const rootCategories = categories.filter(cat => !cat.parent_id);
  const getChildCategories = (parentId: string) => 
    categories.filter(cat => String(cat.parent_id) === parentId);

  const toggleExpanded = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const CategoryItem = ({ category, level = 0 }: { category: ICategory; level?: number }) => {
    const children = getChildCategories(category._id as string);
    const hasChildren = children.length > 0;
    const isExpanded = expandedCategories.has(category._id as string);
    const isSelected = selectedCategory === category._id;

    return (
      <div className={`ml-${level * 4}`}>
        <div className="flex items-center gap-2 py-1">
          {hasChildren && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => toggleExpanded(category._id as string)}
            >
              <ChevronRight 
                className={`h-3 w-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
              />
            </Button>
          )}
          
          <Button
            variant={isSelected ? "default" : "ghost"}
            size="sm"
            className={`justify-start ${!hasChildren ? 'ml-8' : ''}`}
            onClick={() => onCategoryChange(isSelected ? undefined : (category._id as string))}
          >
            {category.name}
          </Button>
        </div>

        {hasChildren && isExpanded && (
          <div className="ml-4">
            {children.map((child) => (
              <CategoryItem key={String(child._id)} category={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Categories</h3>
        {selectedCategory && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCategoryChange(undefined)}
          >
            Clear
          </Button>
        )}
      </div>

      <div className="space-y-1">
        <Button
          variant={!selectedCategory ? "default" : "ghost"}
          size="sm"
          className="w-full justify-start"
          onClick={() => onCategoryChange(undefined)}
        >
          All Categories
        </Button>

        {rootCategories.map((category) => (
          <CategoryItem key={category._id as string} category={category} />
        ))}
      </div>

      {selectedCategory && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Selected:</h4>
          <Badge variant="secondary" className="mr-2">
            {categories.find(cat => cat._id === selectedCategory)?.name}
          </Badge>
        </div>
      )}
    </div>
  );
}
