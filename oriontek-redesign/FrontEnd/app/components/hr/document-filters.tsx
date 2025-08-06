
'use client';

import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DOCUMENT_CATEGORIES } from '@/lib/constants';

interface FilterState {
  category: string;
  status: string;
  employee: string;
}

export default function DocumentFilters() {
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    status: '',
    employee: ''
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      status: '',
      employee: ''
    });
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="mr-2 h-4 w-4" />
          Filter
          {activeFiltersCount > 0 && (
            <Badge variant="destructive" className="ml-2 h-4 w-4 p-0 text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Filter Documents</DialogTitle>
        </DialogHeader>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {DOCUMENT_CATEGORIES.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="valid">Valid</SelectItem>
                    <SelectItem value="expiring">Expiring Soon</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={clearFilters}>
                  <X className="mr-2 h-4 w-4" />
                  Clear Filters
                </Button>
                <Button onClick={() => setIsOpen(false)}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
