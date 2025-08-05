
import Link from 'next/link';
import { ArrowRight, Building2, Globe, Users, Shield, Zap, Target, CheckCircle, Star, Monitor, Database, Settings, Code, Cpu, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import HeroCarousel from '@/components/hero-carousel';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Banner Section */}
      <HeroCarousel>
        <div className="text-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 italic drop-shadow-2xl">
            Oriontek
          </h1>
          <p className="text-lg md:text-xl text-white/95 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
            We deliver end-to-end software solutions that significantly reduce cost, increase productivity 
            and enhance the market position of our clients. We put in consistent efforts on exceeding client 
            expectations and providing them comprehensive & cost effective solutions to their business and IT problems.
          </p>
        </div>
      </HeroCarousel>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive technology solutions across multiple domains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-lg w-fit">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Web Development</CardTitle>
                <CardDescription className="text-base">
                  Custom web applications and enterprise solutions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Responsive web applications
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    E-commerce platforms
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Content management systems
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-green-100 rounded-lg w-fit">
                  <Monitor className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Software Development</CardTitle>
                <CardDescription className="text-base">
                  Enterprise software and custom applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Custom software solutions
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Enterprise applications
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    System integration
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-lg w-fit">
                  <Database className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Database Solutions</CardTitle>
                <CardDescription className="text-base">
                  Database design, optimization and management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Database design & architecture
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Performance optimization
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Data migration services
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-red-100 rounded-lg w-fit">
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-xl">IT Consulting</CardTitle>
                <CardDescription className="text-base">
                  Strategic technology consulting and planning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Technology strategy
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Digital transformation
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Process optimization
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-yellow-100 rounded-lg w-fit">
                  <Cpu className="h-8 w-8 text-yellow-600" />
                </div>
                <CardTitle className="text-xl">System Integration</CardTitle>
                <CardDescription className="text-base">
                  Seamless integration of business systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    API development
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Legacy system modernization
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Third-party integrations
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-indigo-100 rounded-lg w-fit">
                  <PieChart className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle className="text-xl">Business Intelligence</CardTitle>
                <CardDescription className="text-base">
                  Data analytics and reporting solutions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Data visualization
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Custom reporting
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Performance dashboards
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About Oriontek
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Oriontek Inc. is a technology consulting company that specializes in delivering 
                end-to-end software solutions. We have extensive experience in various industries 
                including insurance, healthcare, financial services, and technology sectors.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our consultative approach ensures that we understand your business needs thoroughly 
                and provide solutions that are not just technically sound but also aligned with 
                your strategic objectives.
              </p>
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6 text-center bg-blue-50">
                  <div className="text-3xl font-bold text-blue-600">15+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </Card>
                <Card className="p-6 text-center bg-green-50">
                  <div className="text-3xl font-bold text-green-600">500+</div>
                  <div className="text-sm text-gray-600">Projects Delivered</div>
                </Card>
                <Card className="p-6 text-center bg-purple-50">
                  <div className="text-3xl font-bold text-purple-600">100+</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </Card>
                <Card className="p-6 text-center bg-red-50">
                  <div className="text-3xl font-bold text-red-600">24/7</div>
                  <div className="text-sm text-gray-600">Support Available</div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We have deep domain expertise across multiple industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Insurance</h3>
              <p className="text-gray-600 text-sm">Policy management, claims processing, and customer portal solutions</p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <Monitor className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Healthcare</h3>
              <p className="text-gray-600 text-sm">Electronic health records, patient management, and compliance solutions</p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <PieChart className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Financial Services</h3>
              <p className="text-gray-600 text-sm">Banking systems, payment processing, and regulatory compliance</p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <Cpu className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Technology</h3>
              <p className="text-gray-600 text-sm">Software development, system integration, and digital transformation</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Let's discuss your technology needs and how we can help transform your business with our proven solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <Link href="/contact">
                Contact Us Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-gray-300 text-gray-200 hover:bg-gray-200 hover:text-gray-800 transition-all duration-300">
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
