
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import PageHeader from '@/components/page-header';
import { SERVICES } from '@/lib/constants';

interface ServicePageProps {
  params: {
    serviceId: string;
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = SERVICES.find(s => s.id === params.serviceId);
  
  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <PageHeader
        title={service.title}
        description={service.description}
      >
        <Button variant="outline" asChild className="border-white text-white hover:bg-white hover:text-blue-600">
          <Link href="/services">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Link>
        </Button>
      </PageHeader>

      {/* Service Details */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Service Overview
                </h2>
                <p className="text-gray-600 mb-8">
                  {service.description}
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Key Features & Capabilities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Service-specific content */}
                {service.id === 'insurance' && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Insurance Domain Expertise
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Health & Life Insurance</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <div className="h-2 w-2 bg-blue-600 rounded-full mr-3" />
                              <span className="text-sm">Long Term Care</span>
                            </li>
                            <li className="flex items-center">
                              <div className="h-2 w-2 bg-blue-600 rounded-full mr-3" />
                              <span className="text-sm">Term Life, Universal Life</span>
                            </li>
                            <li className="flex items-center">
                              <div className="h-2 w-2 bg-blue-600 rounded-full mr-3" />
                              <span className="text-sm">Variable Life</span>
                            </li>
                            <li className="flex items-center">
                              <div className="h-2 w-2 bg-blue-600 rounded-full mr-3" />
                              <span className="text-sm">Disability Insurance</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Property & Casualty</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <div className="h-2 w-2 bg-green-600 rounded-full mr-3" />
                              <span className="text-sm">Commercial Lines</span>
                            </li>
                            <li className="flex items-center">
                              <div className="h-2 w-2 bg-green-600 rounded-full mr-3" />
                              <span className="text-sm">Automobile Insurance</span>
                            </li>
                            <li className="flex items-center">
                              <div className="h-2 w-2 bg-green-600 rounded-full mr-3" />
                              <span className="text-sm">Homeowners Insurance</span>
                            </li>
                            <li className="flex items-center">
                              <div className="h-2 w-2 bg-green-600 rounded-full mr-3" />
                              <span className="text-sm">Workers Compensation</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {service.id === 'offshore-development' && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      O-3 Delivery Model
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Onsite</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600">
                            Requirements gathering, stakeholder meetings, and system analysis
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Offsite</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600">
                            Satellite delivery center in Georgia for project coordination
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Offshore</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600">
                            Development center in Vijayawada, India for cost-effective delivery
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Service Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Enterprise-grade solutions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">24/7 global support</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Proven methodologies</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Quality assurance</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Get Started</CardTitle>
                  <CardDescription>
                    Ready to discuss your requirements?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button className="w-full" asChild>
                      <Link href="/contact">
                        Contact Us Today
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/about">
                        Learn More About Us
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    serviceId: service.id,
  }));
}
