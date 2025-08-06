
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileText, Download, Eye, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock data for demonstration
const mockDocuments = [
  {
    id: '1',
    title: 'Employee Handbook',
    category: 'Policy',
    fileName: 'employee-handbook.pdf',
    uploadDate: new Date('2024-01-15'),
    employeeId: '1',
    fileSize: 2048000,
    fileType: 'application/pdf'
  }
];

export default function DocumentList() {
  const [documents] = useState(mockDocuments);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <Card key={doc.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{doc.title}</h3>
                  <p className="text-sm text-gray-600">{doc.fileName}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-500">
                      <Calendar className="h-3 w-3 inline mr-1" />
                      {doc.uploadDate.toLocaleDateString()}
                    </span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{formatFileSize(doc.fileSize)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Badge variant="secondary">{doc.category}</Badge>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
