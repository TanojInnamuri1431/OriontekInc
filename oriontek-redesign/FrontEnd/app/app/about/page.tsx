
import Link from 'next/link';
import { ArrowRight, Building2, Globe, Users, Award, Target, TrendingUp, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { COMPANY_INFO, SERVICES } from '@/lib/constants';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="flex justify-center space-x-2 mb-6">
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                <Star className="h-3 w-3 mr-1 fill-current" />
                {COMPANY_INFO.metrics.experience} Years of Excellence
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                Global Presence
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              About <span className="text-yellow-300">Oriontek Inc</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto text-blue-100">
              {COMPANY_INFO.mission}
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story & Mission
              </h2>
              <div className="space-y-6 text-lg text-gray-700">
                <p>
                  For over {COMPANY_INFO.metrics.experience} years, Oriontek Inc has been a specialist provider of technology-driven business solutions and software services. We cater to insurance, healthcare, technology, and financial services companies, including small-to-mid sized Independent Software Vendors (ISVs).
                </p>
                <p>
                  {COMPANY_INFO.description}
                </p>
                <p>
                  Our approach is built on constant investments in upgrading and expanding infrastructure and human resource capabilities, with key organizational members who have been with the company since inception.
                </p>
              </div>
              
              <div className="mt-8">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Start Your Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">{COMPANY_INFO.metrics.projects}</div>
                <div className="text-sm text-gray-600 font-medium">Projects Delivered</div>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">{COMPANY_INFO.metrics.clients}</div>
                <div className="text-sm text-gray-600 font-medium">Happy Clients</div>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">{COMPANY_INFO.metrics.countries}</div>
                <div className="text-sm text-gray-600 font-medium">Countries Served</div>
              </div>
              <div className="text-center p-6 bg-yellow-50 rounded-lg">
                <div className="text-3xl font-bold text-yellow-600 mb-2">{COMPANY_INFO.metrics.uptime}</div>
                <div className="text-sm text-gray-600 font-medium">Uptime SLA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The principles that guide our work and define our commitment to client success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Consultative Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  We act as strategic partners, not just vendors, understanding your business needs deeply.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Quality Assurance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Multi-tier validation process ensures excellence in every deliverable.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full w-fit">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Continuous Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Constant investment in infrastructure and human resource capabilities.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-yellow-100 rounded-full w-fit">
                  <Globe className="h-6 w-6 text-yellow-600" />
                </div>
                <CardTitle className="text-lg">Global Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Seamless service delivery across multiple time zones and geographies.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Global Presence
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Strategic locations across three countries enable 24/7 support and seamless project delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(COMPANY_INFO.offices).map(([key, office]) => (
              <Card key={key} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-fit">
                    <Building2 className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{office.name}</CardTitle>
                  <CardDescription className="text-base font-medium text-blue-600">
                    {office.city}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="text-sm text-gray-600 leading-relaxed">
                    {office.address}
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-900">{office.phone}</div>
                    <div className="text-xs text-gray-500">{office.timezone}</div>
                  </div>
                  <div className="pt-2">
                    <Badge variant="secondary" className="text-xs">
                      {key === 'us' ? 'Headquarters' : key === 'india' ? 'Development Center' : 'Regional Office'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Excellence */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Service Excellence
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive service offerings designed to meet diverse business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.slice(0, 6).map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg mr-3">
                      {service.icon === 'Globe' && <Globe className="h-4 w-4 text-blue-600" />}
                      {service.icon === 'Shield' && <Award className="h-4 w-4 text-blue-600" />}
                      {service.icon === 'Settings' && <Target className="h-4 w-4 text-blue-600" />}
                      {service.icon === 'Database' && <Building2 className="h-4 w-4 text-blue-600" />}
                      {service.icon === 'Monitor' && <Users className="h-4 w-4 text-blue-600" />}
                    </div>
                    {service.title}
                  </CardTitle>
                  <CardDescription>{service.shortDescription}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/services">
                Explore All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Partner With Us?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Let's discuss how our proven methodologies and global delivery model can transform your business operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              <Link href="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="/services">
                View Our Services
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
