
import { Upload, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import PageHeader from '@/components/page-header';
import DocumentUploadForm from '@/components/hr/document-upload-form';
import Link from 'next/link';

export default function NewDocumentPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isHRSection />
      
      <PageHeader
        title="Upload Document"
        description="Upload a new document for an employee"
        icon={Upload}
      >
        <Button variant="outline" asChild>
          <Link href="/hr/documents">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Documents
          </Link>
        </Button>
      </PageHeader>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DocumentUploadForm />
      </div>

      <Footer />
    </div>
  );
}
