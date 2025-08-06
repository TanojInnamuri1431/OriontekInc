
'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { DEPARTMENTS, EMPLOYEE_STATUS } from '@/lib/constants';

interface EmployeeFiltersProps {
  filters: {
    search?: string;
    department?: string;
    status?: string;
  };
  onFiltersChange: (filters: any) => void;
}

export default function EmployeeFilters({ filters, onFiltersChange }: EmployeeFiltersProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="Search employees..."
          value={filters.search || ''}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="department">Department</Label>
          <select
            id="department"
            value={filters.department || ''}
            onChange={(e) => onFiltersChange({ ...filters, department: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">All Departments</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            value={filters.status || ''}
            onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">All Status</option>
            {EMPLOYEE_STATUS.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <Button
        variant="outline"
        onClick={() => onFiltersChange({})}
      >
        Clear Filters
      </Button>
    </div>
  );
}
