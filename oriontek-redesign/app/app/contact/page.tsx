
'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Building2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { COMPANY_INFO } from '@/lib/constants';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real implementation, this would submit to an API
      // For now, we'll simulate the submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Get in <span className="text-yellow-300">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
              Ready to transform your business? Let's discuss your project requirements and how we can help you achieve your goals.
            </p>
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              <CheckCircle className="h-3 w-3 mr-1" />
              Response within 24 hours
            </Badge>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => updateFormData('name', e.target.value)}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company *</Label>
                        <Input
                          id="company"
                          type="text"
                          value={formData.company}
                          onChange={(e) => updateFormData('company', e.target.value)}
                          placeholder="Your Company Name"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          placeholder="john@company.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service">Service of Interest</Label>
                      <select
                        id="service"
                        value={formData.service}
                        onChange={(e) => updateFormData('service', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select a service</option>
                        <option value="offshore-development">Offshore Development</option>
                        <option value="insurance-solutions">Insurance Solutions</option>
                        <option value="sdlc-consulting">SDLC Consulting</option>
                        <option value="oracle-services">Oracle Services</option>
                        <option value="web20-development">Web 2.0 Development</option>
                        <option value="microsoft-practice">Microsoft Practice</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Project Details *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => updateFormData('message', e.target.value)}
                        placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                        rows={5}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={loading}
                    >
                      {loading ? (
                        'Sending Message...'
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Reach out to us through any of these channels. Our team is ready to help you with your technology needs.
                </p>
              </div>

              {/* Global Offices */}
              <div className="space-y-6">
                {Object.entries(COMPANY_INFO.offices).map(([key, office]) => (
                  <Card key={key} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl flex items-center">
                        <Building2 className="h-5 w-5 mr-2 text-blue-600" />
                        {office.name}
                      </CardTitle>
                      <Badge variant="secondary" className="w-fit">
                        {office.timezone}
                      </Badge>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                        <div className="text-sm text-gray-600">
                          {office.address}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <div className="text-sm font-medium">
                          {office.phone}
                        </div>
                      </div>
                      {office.fax && (
                        <div className="flex items-center space-x-3">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <div className="text-sm text-gray-600">
                            Fax: {office.fax}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Email Contacts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-blue-600" />
                    Email Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="font-medium text-sm">General Inquiries</div>
                    <a 
                      href={`mailto:${COMPANY_INFO.emails.general}`}
                      className="text-blue-600 hover:text-blue-700 text-sm"
                    >
                      {COMPANY_INFO.emails.general}
                    </a>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Insurance Services</div>
                    <a 
                      href={`mailto:${COMPANY_INFO.emails.insurance}`}
                      className="text-blue-600 hover:text-blue-700 text-sm"
                    >
                      {COMPANY_INFO.emails.insurance}
                    </a>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Web 2.0 & Open Source</div>
                    <a 
                      href={`mailto:${COMPANY_INFO.emails.web20}`}
                      className="text-blue-600 hover:text-blue-700 text-sm"
                    >
                      {COMPANY_INFO.emails.web20}
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-blue-600" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM (Local Time)</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Saturday</span>
                    <span>10:00 AM - 2:00 PM (Local Time)</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Sunday</span>
                    <span>Emergency Support Only</span>
                  </div>
                  <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-blue-700">
                    24/7 support available for enterprise clients
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
