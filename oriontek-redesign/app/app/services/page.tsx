
import Link from 'next/link';
import { ArrowRight, Globe, Shield, Zap, Building2, Users, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { SERVICES } from '@/lib/constants';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our <span className="text-yellow-300">Services</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
              Comprehensive technology solutions tailored to insurance, healthcare, and financial services industries.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <CardHeader>
                  <div className="p-3 bg-blue-100 rounded-lg w-fit mb-4 group-hover:bg-blue-200 transition-colors">
                    {service.icon === 'Globe' && <Globe className="h-6 w-6 text-blue-600" />}
                    {service.icon === 'Shield' && <Shield className="h-6 w-6 text-blue-600" />}
                    {service.icon === 'Settings' && <Zap className="h-6 w-6 text-blue-600" />}
                    {service.icon === 'Database' && <Building2 className="h-6 w-6 text-blue-600" />}
                    {service.icon === 'Monitor' && <Users className="h-6 w-6 text-blue-600" />}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm text-gray-900 mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {service.features.slice(0, 4).map((feature, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-600">
                            <div className="h-1.5 w-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {service.technologies && (
                      <div>
                        <h4 className="font-medium text-sm text-gray-900 mb-2">Technologies:</h4>
                        <div className="flex flex-wrap gap-1">
                          {service.technologies.slice(0, 3).map((tech, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      asChild 
                      className="w-full mt-4 group-hover:bg-blue-600 group-hover:text-white transition-colors"
                    >
                      <Link href={`/services/${service.id}`}>
                        Learn More
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Let's discuss your project requirements and how our services can help transform your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              <Link href="/contact">
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="/about">
                Learn About Us
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
