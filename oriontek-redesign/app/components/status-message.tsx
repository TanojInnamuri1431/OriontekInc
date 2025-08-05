
import { LucideIcon, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusMessageProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  className?: string;
}

const typeConfig = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-green-50',
    textColor: 'text-green-800',
    iconColor: 'text-green-600'
  },
  error: {
    icon: AlertCircle,
    bgColor: 'bg-red-50',
    textColor: 'text-red-800',
    iconColor: 'text-red-600'
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-800',
    iconColor: 'text-yellow-600'
  },
  info: {
    icon: Info,
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-800',
    iconColor: 'text-blue-600'
  }
};

export default function StatusMessage({ type, title, message, className }: StatusMessageProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className={cn(
      'rounded-lg p-4 border',
      config.bgColor,
      config.textColor,
      className
    )}>
      <div className="flex items-start space-x-3">
        <Icon className={cn('h-5 w-5 mt-0.5', config.iconColor)} />
        <div>
          <h3 className="font-medium">{title}</h3>
          {message && (
            <p className="mt-1 text-sm opacity-90">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
