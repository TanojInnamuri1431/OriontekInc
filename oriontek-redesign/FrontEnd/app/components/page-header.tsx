
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  className?: string;
  children?: React.ReactNode;
}

export default function PageHeader({ 
  title, 
  description, 
  icon: Icon, 
  className,
  children 
}: PageHeaderProps) {
  return (
    <div className={cn('bg-gradient-to-r from-blue-600 to-blue-700 text-white', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              {Icon && <Icon className="h-8 w-8" />}
              <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
            </div>
            {description && (
              <p className="text-lg text-blue-100 max-w-2xl">
                {description}
              </p>
            )}
          </div>
          {children && (
            <div className="hidden md:block">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
