
import { FileText, Upload, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import PageHeader from '@/components/page-header';
import DocumentList from '@/components/hr/document-list';
import DocumentFilters from '@/components/hr/document-filters';
import Link from 'next/link';

export default function DocumentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isHRSection />
      
      <PageHeader
        title="Document Management"
        description="Manage employee documents, certificates, and files"
        icon={FileText}
      >
        <Button asChild>
          <Link href="/hr/documents/new">
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Link>
        </Button>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search documents..."
                  className="pl-10"
                />
              </div>
            </div>
            <DocumentFilters />
          </div>
        </div>

        {/* Document List */}
        <DocumentList />
      </div>

      <Footer />
    </div>
  );
}
