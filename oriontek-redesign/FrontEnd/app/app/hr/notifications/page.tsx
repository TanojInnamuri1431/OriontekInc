
import { Bell, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import PageHeader from '@/components/page-header';
import NotificationList from '@/components/hr/notification-list';

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isHRSection />
      
      <PageHeader
        title="Notifications"
        description="View and manage system notifications and alerts"
        icon={Bell}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NotificationList />
      </div>

      <Footer />
    </div>
  );
}
